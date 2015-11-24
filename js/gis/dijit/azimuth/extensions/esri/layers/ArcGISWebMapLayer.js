
define([
    "dojo/_base/declare"
    , "dojo/_base/lang"
    , "dojo/_base/array"
    , "dojo/Evented"
    , "esri/layers/layer"
    , "esri/arcgis/Portal"
    , "dojo/on"
    , "esri/request"
    , "esri/renderers/SimpleRenderer"
    , "esri/symbols/jsonUtils"
    , "esri/renderers/jsonUtils"
    , "esri/layers/KMLLayer"
    , "esri/layers/GeoRSSLayer"
    , "esri/layers/FeatureLayer"
    , "esri/layers/ArcGISImageServiceLayer"
    , "esri/layers/ArcGISDynamicMapServiceLayer"
    , "dojo/dom-construct"
    , "dojo/dom-style"
    , "../../../common/InfoTemplateManager"
    , "esri/IdentityManager"
    , "dojo/has"
    , "esri/dijit/PopupTemplate"
    , "dojo/_base/connect"
    , "./GroupLayer"
    , "esri/SpatialReference"
    , "../../../common/Common"
], function (
    declare
    , lang
    , array
    , Evented
    , Layer
    , esriPortal
    , on
    , esriRequest
    , SimpleRenderer
    , symbolJsonUtils
    , rendererJsonUtils
    , KMLLayer
    , GeoRSSLayer
    , FeatureLayer
    , ArcGISImageServiceLayer
    , ArcGISDynamicMapServiceLayer
    , domConstruct
    , domStyle
    , InfoTemplateManager
    , IdentityManager
    , has
    , PopupTemplate
    , connect
    , GroupLayer
    , SpatialReference
    , Common
) {
    var ArcGISWebMapLayer = declare([Layer, Evented], {

        // portalUrl: String
        //      the url to the esri portal
        portalUrl: "https://www.arcgis.com",

        declaredClass: "wvs.layers.ArcGISWebMapLayer",

        constructor: function(url, opts){
            var opts = opts || {};
            this.opacity = typeof opts.opacity === "number" && opts.opacity >= 0 && opts.opacity <= 1 ? opts.opacity : 1;

            // layers: Layer[]
            //      the array of layers
            this.layers = [];

            // url: Object|String
            //      the url parameter may either be a webmap id to get from the ArcGIS portal or a webmap object
            this.url = url;

            // title: String
            //      the title of the webmap layer
            this.title = opts.title ? opts.title : "";

            // spatialReference: SpatialReference
            //      the spatial reference that some layers will use. should be passed in from the map
            this.spatialReference = opts.spatialReference ? opts.spatialReference : new SpatialReference(102100);

            this._init();
        },
        _init: function () {
            // summary:
            //      initialize the portal, log in, get the web map (if the webmap was not passed in) and add its layers
            var self = this,
                isSSL = location.protocol === "https:",
                portal = new esriPortal.Portal(this.portalUrl);

            portal.allSSL = isSSL;

            // sign in
            on.once(portal, "load", function () {
                var signIn = portal.signIn();
                signIn.then(
                    function (loggedInUser) {
                        // Save credentials to local storage

                        if (typeof self.url === "string") {
                            loggedInUser.getItem(self.url).then(
                                function (portalItem) {
                                    self.title = portalItem.title;
                                    var request = esriRequest({
                                        url: portalItem.itemDataUrl,
                                        content: {},
                                        handleAs: "json",
                                        callbackParamName: "callback"
                                    });

                                    request.then(
                                        function (webmap) {
                                            self._loadWebmapObject(webmap);
                                        },
                                        function (error) {
                                            self.emit("error", error);
                                        }
                                    );
                                },
                                function (error) {
                                    self.emit("error", error);
                                }
                            );
                        }
                        else if (typeof self.url === "object")
                            self._loadWebmapObject(self.url);
                        else
                            throw new Error("invalid url argument for ", self.declaredClass);
                    },
                    function (error) {
                        self.emit("error", error);
                    }
                );
            });

        },
        _loadWebmapObject: function (webmap) {
            // summary:
            //      the main workhorse function to load a webmap
            console.dir(webmap.operationalLayers);
            var self = this;
            var operationalLayers = webmap.operationalLayers;
            var numLayers = operationalLayers.length;
            // We're goin to fire the load function if we have AT LEAST ONE of the web map layers load
            var layerOnLoad = function (customProps, evt) {
                numLayers--;
                lang.mixin(evt.layer, customProps);
                if (numLayers <= 0) {
                    self.loaded = true;
                    self.emit("load", { target: self, layer: self });
                }
            };
            array.forEach(operationalLayers, function (ol) {
                var layer;
                if (ol.type) {
                    // KML Layer
                    if (ol.type === "KML") {
                        layer = self._loadKmlLayer(ol);
                        self.layers.push(layer);
                    }
                    // GeoRSS Layer
                    else if (ol.type === "GeoRSS") {
                        layer = self._loadGeoRSSLayer(ol)
                        self.layers.push(layer);
                    }
                }
                // Feature Collection
                else if (ol.featureCollection) {
                    layer = self._loadFeatureCollection(ol);
                    self.layers.push(layer);
                }
                // esri Map Services
                else {
                    var endPointUrl = ol.url;
                    // ArcGISDynamicMapServiceLayer
                    if (endPointUrl.match(/MapServer\/*$/g)) {
                        layer = self._loadDynamicService(ol);
                        self.layers.push(layer);
                    }
                    // ArcGISImageServiceLayer
                    else if (endPointUrl.match(/ImageServer\/*$/g)) {
                        layer = self._loadImageService(ol);
                        self.layers.push(layer);
                    }
                        // Feature Layer
                    else if (endPointUrl.match(/(MapServer|FeatureServer)\/[0-9]$/g)) {
                        layer = self._loadFeatureLayer(ol);
                        self.layers.push(layer);
                    }
                }
                if (layer) {
                    if (!layer.loaded)
                        on.once(layer, "load", lang.hitch(self, layerOnLoad, { title: ol.title, _webmap: self }));
                    else
                        layerOnLoad({ title: ol.title, _webmap: self }, { layer: layer });
                        on.once(layer, "error", function (error) {
                            Common.errorDialog(error.message);
                            layerOnLoad({ title: ol.title, _webmap: self }, { layer: layer });
                            self.emit("error");
                    });
                }
            });
        },
        /* Start webmap layer loading functions */
        _loadKmlLayer: function (json) {
            // summary:
            //      creates a kml layer via webmap json
            // json: Object
            //      the json object that creates the kml layer
            // returns:
            //      a kml layer
            var options = {
                id: json.id,
                opacity: json.opacity,
                visible: json.visibility,
                outSR: this.spatialReference,
                refreshInterval: typeof json.refreshInterval !== "undefined" ? json.refreshInterval : 0
            };
            if (typeof json.maxScale !== "undefined")
                options.maxScale = json.maxScale;
            if (typeof json.minScale !== "undefined")
                options.minScale = json.minScale;
            return new KMLLayer(json.url, options); // KMLLayer
        },
        _loadGeoRSSLayer: function (json) {
            // summary:
            //      creates a georss layer via webmap json
            // json: Object
            //      the json object that creates the georss layer
            // returns:
            //      a georss layer
            var self = this,
                options = {
                opacity: json.opacity,
                visible: json.visibility,
                spatialReference: this.spatialReference
            };
            if (json.pointSymbol) {
                options.pointSymbol = symbolJsonUtils.fromJson(json.pointSymbol);
            }
            if (json.polygonSymbol) {
                options.polygonSymbol = symbolJsonUtils.fromJson(json.polygonSymbol);
            }
            if (json.polylineSymbol) {
                options.polylineSymbol = symbolJsonUtils.fromJson(json.polylineSymbol);
            }
            var layer = new GeoRSSLayer(json.url, options);
            on.once(layer, "load", function () {
                var fls = layer.getFeatureLayers();
                array.forEach(fls, function (fl) {
                    fl._webmap = self;
                });
            });
            return layer; // GeoRSSLayer
        },
        _loadFeatureCollection: function (json) {
            // summary:
            //      creates a FeatureLayer or GroupLayer via webmap json
            // description:
            //      Feature collections in ArcGIS Online are 1 or more feature layers.
            //      For 1 layer, we only need to return a feature layer
            //      For 2+ layers, we need to use the GroupLayer object to ensure we can visually group these elements
            // json: Object
            //      the json object that creates the layer
            // returns:
            //      a FeatureLayer or GroupLayer
            var options = {
                    visible: json.visibility,
                    opacity: json.opacity
                },
                featureCollection = json.featureCollection,
                featureCollectionLayers = [];

            array.forEach(featureCollection.layers, function (l) {
                var fcDefinition = {
                    featureSet: l.featureSet,
                    layerDefinition: l.layerDefinition,
                    nextObjectId: l.nextObjectId
                };

                options.infoTemplate = InfoTemplateManager.getTabularAttributeTemplate({ popupInfo: l.popupInfo ? l.popupInfo : null, createWidgetsFromGeometry: true });
                layer = new FeatureLayer(fcDefinition, featureCollection.layers.length == 1 ? lang.mixin({ title: json.title, id: json.id, _webmap: true }, options) : options);
                featureCollectionLayers.push(layer);
            });

            if (featureCollectionLayers.length == 1) {
                return featureCollectionLayers[0]; // FeatureLayer
            }
            else if (featureCollectionLayers.length > 1) {
                return new GroupLayer(lang.mixin({ title: json.title, id: json.id, layers: featureCollectionLayers, _webmap: true }, options)); // GroupLayer
            }
        },
        _loadDynamicService: function(json){
            // summary:
            //      creates an ArcGISDynamicMapServiceLayer via webmap json
            // json: Object
            //      the json object that creates the layer
            // returns:
            //      an ArcGISDynamicMapServiceLayer
            var layer = new ArcGISDynamicMapServiceLayer(json.url, {
                id: json.id,
                visible: json.visiblity,
                opacity: json.opacity,
                minScale: json.minScale,
                maxScale: json.maxScale,
                refreshInterval: typeof json.refreshInterval !== "undefined" ? json.refreshInterval : 0
            });
            var layerDefinitions = [];
            array.forEach(json.layers, function (l) {
                if (l.popupInfo) {
                    // This is used with the Quick Identify widget (if it is enabled)
                    connect.publish("sublayer-popup", { layer: layer, sublayerId: l.id, popup: l.popupInfo });
                }
                if (l.layerDefinition && l.layerDefinition.definitionExpression)
                    layerDefinitions[l.id] = l.layerDefinition.definitionExpression;
            });
            // We can't seem to pass layer definitions upon initialize so we do so after the layer loads
            if (layerDefinitions.length) {
                on.once(layer, "load", function () { layer.setLayerDefinitions(layerDefinitions); });
            }
            return layer; // ArcGISDynamicMapServiceLayer
        },
        _loadImageService: function (json) {
            // summary:
            //      creates an ArcGISImageServiceLayer via webmap json
            // json: Object
            //      the json object that creates the layer
            // returns:
            //      an ArcGISImageServiceLayer
            var options = {
                id: json.id,
                visible: json.visiblity,
                opacity: json.opacity,
                refreshInterval: typeof json.refreshInterval !== "undefined" ? json.refreshInterval : 0
            };

            if (typeof json.maxScale !== "undefined")
                options.maxScale = json.maxScale;
            if (typeof json.minScale !== "undefined")
                options.minScale = json.minScale;
            return new ArcGISImageServiceLayer(json.url, options); // ArcGISImageServiceLayer
        },
        _loadFeatureLayer: function (json) {
            // summary:
            //      creates a FeatureLayer via webmap json
            // json: Object
            //      the json object that creates the layer
            // returns:
            //      a FeatureLayer
            var hasEsriPopup = json.disablePopup ? false : true;
            var infoTemplate, outFields;
            if (hasEsriPopup) {
                // if we have a popup, it's possible only certain fields are actually visible for viewing so we only request those from the server
                outFields = array.map(
                                array.filter(json.popupInfo.fieldInfos, function (fieldInfo) {
                                    return fieldInfo.visible === true;
                                }), function (visibleField) {
                                    return visibleField.fieldName;
                                }
                            );
                infoTemplate = InfoTemplateManager.getTabularAttributeTemplate({ popupInfo: json.popupInfo, createWidgetsFromGeometry: true });
            }
            else {
                outFields = ["*"];
                infoTemplate = InfoTemplateManager.getTabularAttributeTemplate({ createWidgetsFromGeometry: true })
            }

            var options = {
                id: json.id,
                visible: json.visiblity,
                opacity: json.opacity,
                mode: json.mode,
                outFields: outFields,
                infoTemplate: infoTemplate,
                refreshInterval: json.refreshInterval
            };

            if (json.layerDefinition) {
                if (typeof json.layerDefinition.maxScale !== "undefined")
                    options.maxScale = json.layerDefinition.maxScale;
                if (typeof json.layerDefinition.minScale !== "undefined")
                    options.minScale = json.layerDefinition.minScale;
            }


            // these properties cannot be set on load of the feature layer. bummer.
            var onLoad = function (evt) {

                if (json.layerDefinition) {
                    if (json.layerDefinition.drawingInfo) {
                        var renderer = rendererJsonUtils.fromJson(json.layerDefinition.drawingInfo.renderer);
                        evt.layer.setRenderer(renderer);
                    }

                    if (json.layerDefinition.definitionExpression) {
                        evt.layer.setDefinitionExpression(json.layerDefinition.definitionExpression);
                    }
                }
            };
            on.once(layer, "load", onLoad);
            return new FeatureLayer(json.url, options); // FeatureLayer
        },
        /* End webmap layer loading functions */
        /* Start overriden layer function */
        _setMap: function(map, container){
            this._map = map;
            var style = {
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '0px',
                height: '0px'
            };
            var element = domConstruct.create('div', {}, container);
            if (this.id) {
                element.id = this.id;
            }
            domStyle.set(element, style);
            this._element = element;
            array.forEach(this.layers, function(layer){
                map.addLayer(layer);
            });

            return element;
        },
        _unsetMap: function (map, layersDiv) {
            array.forEach(this.layers, function (layer) {
                map.removeLayer(layer);
            });

            this._map = null;
        },
        setVisibility: function(isVisible){
            domStyle.set(this._element, { display: isVisible ? "block" : "none" });
            array.forEach(this.layers, function (layer) {
                layer.setVisibility(isVisible);
            });
            this.emit("visiblity-change", { target: this, visible: isVisible });
        },
        setOpacity: function (opacity) {
            array.forEach(this.layers, function (layer) {
                layer.setOpacity(opacity);
            });
            this.opacity = opacity;
            this.emit("opacity-change", { target: this, opacity: opacity});
        },
        /* End overriden layer function */
        toJson: function () {
            var exportLayer = {
                url: this.url,
                type: "ArcGISWebMapLayer",
                options: {
                    id: this.id,
                    visible: this.visible,
                    opacity: this.opacity,
                    title: this.title
                }
            };
            return exportLayer;
        }
    });

    return ArcGISWebMapLayer;
});