define([
    'esri/dijit/Basemap',
    'esri/dijit/BasemapLayer',   
    'esri/layers/osm'
   
   
], function (Basemap, BasemapLayer, osm) {
    
    return {
        map: true,
        mapStartLayer: 'streets',
        basemapsToShow: ['directtile', 'streets', 'satellite', 'bing', 'wtmslayertest'],
        basemaps: { 
            directtile: {
                title: 'AF Imagery',
                type: 'TiledMapServiceLayer',              
                spatialReference: new esri.SpatialReference({ wkid: 102100 }),
                extent: new esri.geometry.Extent(-18502000, -3737000, 19069000, 11780000, new esri.SpatialReference({ wkid: 102100 })),
                rootURL: "http://localhost:41056/acc_cache/layers/_alllayers/",     
                tileInfo: new esri.layers.TileInfo({
                    "rows": 256,
                    "cols": 256,
                    "dpi": 96,
                    "format": "JPG",
                    "compressionQuality": 75,
                    "origin": { "x": -20037508.342787, "y": 20037508.342787 },
                    "spatialReference": { "wkid": 102100 },
                    "lods": [
                      { "level": 0, "resolution": 156543.033928, "scale": 591657527.591555 },
                      { "level": 1, "resolution": 78271.5169639999, "scale": 295828763.795777 },
                      { "level": 2, "resolution": 39135.7584820001, "scale": 147914381.897889 },
                      { "level": 3, "resolution": 19567.8792409999, "scale": 73957190.948944 },
                      { "level": 4, "resolution": 9783.93962049996, "scale": 36978595.474472 },
                      { "level": 5, "resolution": 4891.96981024998, "scale": 18489297.737236 },
                      { "level": 6, "resolution": 2445.98490512499, "scale": 9244648.868618 },
                      { "level": 7, "resolution": 1222.99245256249, "scale": 4622324.434309 },
                      { "level": 8, "resolution": 611.49622628138, "scale": 2311162.217155 },
                      { "level": 9, "resolution": 305.748113140558, "scale": 1155581.108577 },
                      { "level": 10, "resolution": 152.874056570411, "scale": 577790.554289 },
                      { "level": 11, "resolution": 76.4370282850732, "scale": 288895.277144 },
                      { "level": 12, "resolution": 38.2185141425366, "scale": 144447.638572 },
                      { "level": 13, "resolution": 19.1092570712683, "scale": 72223.819286 },
                      { "level": 14, "resolution": 9.55462853563415, "scale": 36111.909643 },
                      { "level": 15, "resolution": 4.77731426794937, "scale": 18055.954822 },
                      { "level": 16, "resolution": 2.38865713397468, "scale": 9027.977411 },
                      { "level": 17, "resolution": 1.19432856685505, "scale": 4513.988705 },
                      { "level": 18, "resolution": 0.597164283559817, "scale": 2256.994353 },
                      { "level": 19, "resolution": 0.298582141647617, "scale": 1128.497176 }

                    ]
                }),
               
                getTileUrl: function (level, row, col) {
                    return "http://localhost:41056/acc_cache/layers/_alllayers/" +
                      "L" + dojo.string.pad(level, 2, '0') + "/" +
                      "R" + dojo.string.pad(row.toString(16), 8, '0') + "/" +
                      "C" + dojo.string.pad(col.toString(16), 8, '0') + "." +
                      "jpg";
                }
            },
            streets: {
                title: 'Streets',
                type: 'ArcGISTiledMapServiceLayer',              
                url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
            },
            satellite: {
                title: 'Satellite',
                type: 'ArcGISTiledMapServiceLayer',             
                url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
            },

            bing: {
                title: 'Bing',
                type: 'VETiledLayer',
                bingMapsKey: "Aph4_BbdTAPWv_Sz_SPkHAF2tRO8WKOBkcL5XhWNo3tMIs7HQ1j5jmcyMfOsqshG",
                mapStyle: "aerial"
             
            }/*,
          
            wtmslayertest: {
                title: 'WMTS Test',
                type: 'WMTSLayer',
                spatialReference: new esri.SpatialReference({ wkid: 4326 }),
                extent: new esri.geometry.Extent(-179.99999, -89.99999, 179.99999, 89.99999, new esri.SpatialReference({ wkid: 4326 })),
                rootURL: "http://v2.suite.opengeo.org/geoserver/gwc/service/wmts",
                connectID: "5ed1dbad-ffc3-4c7a-ba78-6feb8f4ced51",
                version: "1.0.0",
                copyright: "open layer",
                serviceMode: "KVP",
                identifier: "usa:states",
                tileMatrixSet: "EPSG:4326",
                format: "png",
                style: "_null",

                tileInfo: new esri.layers.TileInfo({
                    "rows": 256,
                    "cols": 256,
                    "dpi": 90.71428571428571,
                    "format": "image/jpeg",
                    "compressionQuality": 0,
                    "origin": { "x": -180, "y": 90 },
                    "spatialReference": { "wkid": 4326 },
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
                    }]
                }),



                spatialReference2: new esri.SpatialReference({ wkid: 3857 }),
                extent2: new esri.geometry.Extent(-13686470, 5203832, -13669272, 5215298, new esri.SpatialReference({ wkid: 3857 })),             
                identifier2: "medford:zoning",
                tileMatrixSet2: "EPSG:900913",
                format2: "gif",
                style2: "_null",
                
                tileInfo2: new esri.layers.TileInfo({
                    "rows": 256,
                    "cols": 256,
                    "dpi": 90.71428571428571,
                    "format": "image/png",
                    "compressionQuality": 0,
                    "origin": { "x": -20037508.34,"y": 20037508.34 },
                    "spatialReference": { "wkid": 3857 },
                    "lods": [{
                        "level": "EPSG:900913:8",
                        "scale": 2183915.0935581755,
                        "resolution": 611.4962261962892
                    }, {
                        "level": "EPSG:900913:9",
                        "scale": 1091957.5467790877,
                        "resolution": 305.7481130981446
                    }, {
                        "level": "EPSG:900913:10",
                        "scale": 545978.7733895439,
                        "resolution": 152.8740565490723
                    }, {
                        "level": "EPSG:900913:11",
                        "scale": 272989.38669477194,
                        "resolution": 76.43702827453615
                    }, {
                        "level": "EPSG:900913:12",
                        "scale": 136494.69334738597,
                        "resolution": 38.21851413726807
                    }, {
                        "level": "EPSG:900913:13",
                        "scale": 68247.34667369298,
                        "resolution": 19.109257068634037
                    }, {

                        "level": "EPSG:900913:14",
                        "scale": 34123.67333684649,
                        "resolution": 9.554628534317018
                    }, {

                        "level": "EPSG:900913:15",
                        "scale": 17061.836668423246,
                        "resolution": 4.777314267158509
                    }, {
                        "level": "EPSG:900913:16",
                        "scale": 8530.918334211623,
                        "resolution": 2.3886571335792546
                    }, {
                        "level": "EPSG:900913:17",
                        "scale": 4265.4591671058115,
                        "resolution": 1.1943285667896273
                    }, {
                        "level": "EPSG:900913:18",
                        "scale": 2132.7295835529058,
                        "resolution": 0.5971642833948136
                    }, {
                        "level": "EPSG:900913:19",
                        "scale": 1066.3647917764529,
                        "resolution": 0.2985821416974068
                    }]
                })
                

            } */
          

        }
    };
});