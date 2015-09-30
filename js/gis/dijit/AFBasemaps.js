define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/lang',
    'dijit/DropDownMenu',
    'dijit/MenuItem',
    'dojo/_base/array',
    'dojox/lang/functional',
    'dojo/text!./AFBasemaps/templates/Basemaps.html',
    'esri/dijit/BasemapGallery',
    'esri/layers/TiledMapServiceLayer',
    'esri/layers/ArcGISTiledMapServiceLayer',
    'esri/layers/WMTSLayer',
    'esri/layers/WMTSLayerInfo',
    'esri/layers/TileInfo',
    'esri/map',
    'esri/virtualearth/VETiledLayer',
    'dojo/i18n!./AFBasemaps/nls/resource',
    'dijit/form/DropDownButton',
    'xstyle/css!./Basemaps/css/Basemaps.css'
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, lang, DropDownMenu, MenuItem, array, functional, template, BasemapGallery, TiledMapServiceLayer, ArcGISTiledMapServiceLayer,WMTSLayer,WMTSLayerInfo,TileInfo, Map,VETiledLayer, i18n) {

    // main basemap widget
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        widgetsInTemplate: true,
        i18n: i18n,
        mode: 'custom',
        title: i18n.title,      
        strTileLayerId: '',
        strSelectedBasemap: '',


        loadBingLayer: function (bingLayerInfo) {

            // bingMapsKey:  "1B2C3OlkbxWHYa1b2c3qkPrO_Ou3nRrGtSa_5Op-xvPNya1b2c3",
            var veTileLayer = new VETiledLayer({
                bingMapsKey: bingLayerInfo.bingMapsKey,
                mapStyle: bingLayerInfo.mapStyle
            });

            return veTileLayer
        },


        loadWMTSLayer: function (wmtsLayerInfo, myMap) {

            var test = 'TEST';


            var bounds = new esri.geometry.Extent(11.8895, 49.5697, 12.0673, 49.6621, new esri.SpatialReference({
                wkid: 4326
            }));
            
          
            myMap = new Map("mapCenter", {
                extent: bounds
            });



            var tileInfo2 = new esri.layers.TileInfo({
                "dpi": 90.71428571428571,
                "format": "image/jpeg",

                "compressionQuality": 0,
                "spatialReference": new esri.SpatialReference({
                    "wkid": 4326
                }),
                "rows": 256,
                "cols": 256,
                "origin": {
                    "x": -180,
                    "y": 90
                },
                "lods": [{
                    "level": "EPSG:4326:0",
                    "scale": 279541132.0143589,
                    "resolution": 0.7039144025535298
                }, {
                    "level": "EPSG:4326:1",
                    "scale": 139770566.00717944,
                    "resolution": 0.3519572012767649
                }, {
                    "level": "EPSG:4326:2",
                    "scale": 69885283.00358972,
                    "resolution": 0.17597860063838244
                }, {
                    "level": "EPSG:4326:3",
                    "scale": 34942641.50179486,
                    "resolution": 0.08798930031919122
                }, {
                    "level": "EPSG:4326:4",
                    "scale": 17471320.75089743,
                    "resolution": 0.04399465015959561
                }, {
                    "level": "EPSG:4326:5",
                    "scale": 8735660.375448715,
                    "resolution": 0.021997325079797805
                }, {
                    "level": "EPSG:4326:6",
                    "scale": 4367830.1877243575,
                    "resolution": 0.010998662539898903
                }, {
                    "level": "EPSG:4326:7",
                    "scale": 2183915.0938621787,
                    "resolution": 0.005499331269949451
                }, {
                    "level": "EPSG:4326:8",
                    "scale": 1091957.5469310894,
                    "resolution": 0.0027496656349747257
                }, {
                    "level": "EPSG:4326:9",
                    "scale": 545978.7734655447,
                    "resolution": 0.0013748328174873628
                }, {
                    "level": "EPSG:4326:10",
                    "scale": 272989.3867,
                    "resolution": 0.0006874164087
                }, {
                    "level": "EPSG:4326:11",
                    "scale": 136494.6934,
                    "resolution": 0.0003437082044
                }, {
                    "level": "EPSG:4326:12",
                    "scale": 68247.34668,
                    "resolution": 0.0001718541022
                }, {
                    "level": "EPSG:4326:13",
                    "scale": 34123.67334,
                    "resolution": 0.00008592705109
                }, {
                    "level": "EPSG:4326:14",
                    "scale": 17061.83667,
                    "resolution": 0.00004296352555
                }, {
                    "level": "EPSG:4326:15",
                    "scale": 8530.918335,
                    "resolution": 0.00002148176277
                }, {
                    "level": "EPSG:4326:16",
                    "scale": 4265.459168,
                    "resolution": 0.00001074088139
                }, {
                    "level": "EPSG:4326:17",
                    "scale": 2132.729584,
                    "resolution": 0.000005370440693
                }, {
                    "level": "EPSG:4326:18",
                    "scale": 1066.364792,
                    "resolution": 0.000002685220347
                }, {
                    "level": "EPSG:4326:19",
                    "scale": 533.182396,
                    "resolution": 0.000001342610173
                }]
            });


            var tileExtent2 = new esri.geometry.Extent(-179.99999, -89.99999, 179.99999, 89.99999, new esri.SpatialReference({
                wkid: 4326
            }));
            var tileExtent2a = new esri.geometry.Extent(-10.5, 37.5, 23.0, 57.7, new esri.SpatialReference({
                wkid: 4326
            }));
            var layerInfo2 = new WMTSLayerInfo({
                tileInfo: tileInfo2,
                fullExtent: tileExtent2,
                initialExtent: tileExtent2a,
                identifier: "DigitalGlobe:ImageryTileService&connectid=5ed1dbad-ffc3-4c7a-ba78-6feb8f4ced51&featureProfile=Global_Currency_Profile",
                tileMatrixSet: "EPSG:4326",
                format: "jpeg",
                style: "_null"
            });

            var resourceInfo = {
                version: "1.0.0",
                layerInfos: [layerInfo2],
                copyright: "open layer"
            };

            var options = {
                serviceMode: "KVP",
                resourceInfo: resourceInfo,
                layerInfo: layerInfo2
            };
            


           var wmtsLayer = new WMTSLayer("https://evwhs.digitalglobe.com/earthservice/wmtsaccess/ACC_Geobase", options);
           myMap.addLayer(wmtsLayer);       
      
         

            return new WMTSLayer("https://evwhs.digitalglobe.com/earthservice/wmtsaccess/ACC_Geobase", options);


        },

      
        loadTileLayer: function (tileLayerInfo) {
          
            dojo.declare("GeoBaseTileCache", esri.layers.TiledMapServiceLayer, { 
                constructor: function () {
                    this.spatialReference = tileLayerInfo.spatialReference; 
                    var ext = tileLayerInfo.extent;
                    this.initialExtent = this.fullExtent = ext;
                    this.tileInfo = tileLayerInfo.tileInfo
                    this.loaded = true;               
                    this.onLoad(this);
                },

                getTileUrl: function (level, row, col) {
                    var rootURL = tileLayerInfo.rootURL;
                    return rootURL +
                      "L" + dojo.string.pad(level, 2, '0') + "/" +
                      "R" + dojo.string.pad(row.toString(16), 8, '0') + "/" +
                      "C" + dojo.string.pad(col.toString(16), 8, '0') + "." +
                      "jpg";
                }
            });

            return GeoBaseTileCache;

        },

        removeBaseLayer: function () {
            var removeLayerItem = this.map.getLayer(this.strTileLayerId);
            this.map.removeLayer(removeLayerItem);
        },

        postCreate: function () {

            this.inherited(arguments);     
                    
           

            this.menu = new DropDownMenu({
                style: 'display: none;' //,
                //baseClass: this.menuClass
            });

            array.forEach(this.basemapsToShow, function (basemap) {
                if (this.basemaps.hasOwnProperty(basemap)) {
                  
                    var menuItem = new MenuItem({
                        id: basemap,
                        label: this.basemaps[basemap].title,
                        iconClass: (basemap == this.mapStartLayer) ? 'selectedIcon' : 'emptyIcon',
                        onClick: lang.hitch(this, function () {                           
                            this.strSelectedBasemap = basemap;                         
                            this.getBaseLayer();
                            var ch = this.menu.getChildren();
                            array.forEach(ch, function (c) {
                                if (c.id == basemap) {
                                    c.set('iconClass', 'selectedIcon');
                                } else {
                                    c.set('iconClass', 'emptyIcon');
                                }
                            });
                           
                        })
                    });
                    this.menu.addChild(menuItem);
                }
            }, this);
            
            this.dropDownButton.set('dropDown', this.menu);

            this.map.on('load', lang.hitch(this, this.getBaseLayer()));

        },                  

       
        getBaseLayer: function () {





            var arr = new Array();
            var strLayerIDName = '';

            if (this.strTileLayerId != '') {
                this.removeBaseLayer();
            } else {
                if (this.strSelectedBasemap === '') {
                    this.strSelectedBasemap = this.mapStartLayer;
                }
            };

            array.forEach(this.map.layerIds, function (tlayer) {
                if (typeof tlayer !== 'undefined') {
                    arr.push(tlayer)
                }
            });

            array.forEach(this.basemapsToShow, function (basemap) {

                if (this.basemaps.hasOwnProperty(basemap)) {

                    if (this.strSelectedBasemap === basemap) {

                        switch (this.basemaps[basemap].type) {
                            case "VETiledLayer":
                                var binglayer = this.loadBingLayer(this.basemaps[basemap]);
                                this.map.addLayer(binglayer);
                                break;

                            case "WMTSLayer":
                                //   var wmtslayer = this.loadWMTSLayer(this.basemaps[basemap], this.map);                               
                                //    this.map.addLayer(wmtslayer);
                                break;

                            case "TiledMapServiceLayer":
                                var tilelayer = this.loadTileLayer(this.basemaps[basemap]);
                                this.map.addLayer(new tilelayer);
                                break;
                            case "ArcGISTiledMapServiceLayer":
                                var agsTileMapService = new esri.layers.ArcGISTiledMapServiceLayer(this.basemaps[basemap].url);
                                this.map.addLayer(agsTileMapService);
                                break;
                            default:
                                alert('Layer Type Not Supported');
                                break;
                        }

                    }

                }

            }, this);

            array.forEach(this.map.layerIds, function (tlayer1) {

                if (typeof tlayer1 !== 'undefined') {
                    blnLayerFound = false;
                    array.forEach(arr, function (layeridName) {

                        if (tlayer1 === layeridName) {
                            blnLayerFound = true;
                        }

                    });

                    if (blnLayerFound === false) {
                        strLayerIDName = tlayer1;
                    }

                }

            });

            this.strTileLayerId = strLayerIDName;
            this.map.reorderLayer(this.strTileLayerId, 0);

        }

    });
});