console.log("wvs/_base/config.js");
define(["dojo/_base/lang","require"],
    function (lang,require) {  
        var config = {
            defaults: {
                    services: {
                        geometry: "http://vm101.worldviewsolutions.net:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer",
                        print: "http://vm102.worldviewsolutions.net:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export Web Map Task",
                        exportService: null,
                        viewShed: null,
                        markup: null
                    },
                    map: null,
                    mapViewerController: null,
                    searchResultStore: null,
                    markupLayer: null,
                    identityManager: null,
                    symbols:{
                        polygon: { "color": [0, 0, 0, 64], "outline": { "color": [255, 0, 0, 255], "width": 1.5, "type": "esriSLS", "style": "esriSLSSolid" }, "type": "esriSFS", "style": "esriSFSSolid" },
                        point: { "angle": 0, "xoffset": -0.75, "yoffset": 11.25, "type": "esriPMS", "url": require.toUrl('../dijits/images/pushpins/teal.png'), "width": 32, "height": 32 },
                        line: { "color": [0, 0, 255, 255], "width": 2.25, "type": "esriSLS", "style": "esriSLSSolid" },
                        selectionPolygon: { "color": [127, 255, 0, 74], "outline": { "color": [255, 255, 255, 255], "width": 1.5, "type": "esriSLS", "style": "esriSLSDash" }, "type": "esriSFS", "style": "esriSFSSolid" }
                    },
                    hyperlinks: {
                        enabled: true,
                        hyperlinkFieldAliases: [{
                            key: "ObjectID",
                            replacement: "http://www.test.com/${val}", // EXAMPLES: HTTP link -> "http://www.example.com/${val}" File link -> "file:///C:/SomeDir/${val}.txt" Javascipt -> "alert('${layerId} has value ${val}')"
                            type: 'link' // supported types: link, js
                            //displayAs: 'Alternate Title'
                        }]
                    },
                    showCustomMapIcons: false,
                    globalSpatialFilter: null,
                    buttonWidgetClass: "btn",
                    layers: {
                        ArcGISMapServiceLayer: {
                            // baseUrl: Base URL (Host) of the WCF services.
                            baseUrl: "http://localhost:63301/",

                            // serviceUrl: String
                            //      URL to the JSToolkit WCF service endpoint
                            serviceUrl: "AgsMapService.svc/json/"
                        },
                        templates: {}
                    },
                    proj4js: {
                        "102100": {
                            name: "SR-ORG:6",
                            def:  "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"
                        },
                        "4326": {
                            name: "EPSG:4326",
                            def: "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"
                        }
                    }
            }
        };
        lang.setObject("window.wvsConfig", config);
        return config;
    }
 );