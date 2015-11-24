define([
    "dojo/_base/lang"
    , "esri/layers/ArcGISDynamicMapServiceLayer"
    , "./_commonArcGISMethods"
    , "dojo/dom-style"
    , "dojo/_base/array"
    , "esri/request"
], function (lang, ArcGISDynamicMapServiceLayer, common, domStyle, array, request) {
    lang.extend(ArcGISDynamicMapServiceLayer, common);
    lang.extend(ArcGISDynamicMapServiceLayer, {
        // TODO: Remove this function when esri decides to sensibly support opacity changes on layers in IE8 and below
        // Supported as of 3.6
        setOpacityIE: function (opacity) {
            this.opacity = opacity;
            domStyle.set(this._img, "filter", "alpha(opacity=" + opacity * 100 + ")");
        },
        toJson: function () {
            return {
                url: this.url,
                type: "ArcGISDynamicMapServiceLayer",
                options: {
                    id: this.id,
                    opacity: this.opacity,
                    visible: this.visible
                },
                onLoadSettings: {
                    setVisibleLayers: this.visibleLayers,
                    setLayerDefinitions: this.layerDefinitions
                }
            };
        },
        getAllSubLayersInfos: function (layer, frontier) {
            var layer = layer || this,
                frontier = frontier || [layer],
                allSubLayerInfos = [];
            frontier.splice(array.indexOf(frontier,layer), 1);

            var subLayerInfos = layer.getSubLayerInfos();
            frontier = frontier.concat(subLayerInfos);
            allSubLayerInfos = allSubLayerInfos.concat(subLayerInfos);
            array.forEach(subLayerInfos, function (subLayerInfo) {
                allSubLayerInfos = allSubLayerInfos.concat(this.getAllSubLayersInfos(subLayerInfo, frontier));
            }, this);

            return allSubLayerInfos;
        },
        getExtendedLayerInfo: function (callback) {
            var self = this;

            // Don't need fetch if we already have it
            if (this.fields) {
                callback();
                return;
            }

            // Add a callback queue as we could get this called by multiple sources (aka. race condition)
            this._callbackQueue = this._callbackQueue || [];
            this._callbackQueue.push(callback);

            if (!this._extendedDeferred) {
                this._extendedDeferred = request({
                    url: this.url + '/layers',
                    content: { f: "json" },
                    handleAs: "json",
                    callbackParamName: "callback"
                }).then(
                    function success(data) {
                        // Extend every LayerInfo
                        for (var i = 0; i < data.layers.length; i++) {
                            self.layerInfos[i].fields = data.layers[i].fields;
                        }
                        array.forEach(self._callbackQueue, function (cb) {
                            cb();
                        });

                        // Get rid of these temp vars
                        delete self._callbackQueue;
                        delete self._extendedDeferred;
                    },
                    function failure(error) { });
            }
        }
    });
   }
);