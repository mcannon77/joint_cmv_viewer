define([
    'esri/dijit/Basemap',
    'esri/dijit/BasemapLayer',
    'esri/layers/osm'
    
   
   
], function (Basemap, BasemapLayer, osm, VETiledLayer) {
    
    return {
        map: true,
        mapStartLayer: 'directtile', 
	   basemapsToShow: ['directtile', 'streets', 'satellite', 'bing'], 
         basemaps: {  
            directtile: { 
                title: 'AF Imagery', 
                 type: 'TiledMapServiceLayer',               
                spatialReference: new esri.SpatialReference({ wkid: 102100 }), 
                extent: new esri.geometry.Extent(-18502000, -3737000, 19069000, 11780000, new esri.SpatialReference({ wkid: 102100 })), 
                rootURL: "https://www.my.af.mil/accgeoprod/arcgiscache/basemap_ACCAerials/Layers/_alllayers/",     
                tileInfo: new esri.layers.TileInfo({ 
                    "rows": 256, 
                    "cols": 256, 
                    "dpi": 96, 
                     "format": "JPG", 
                     "compressionQuality": 65, 
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
                     return "https://www.my.af.mil/accgeoprod/arcgiscache/basemap_ACCAerials/Layers/_alllayers/" + 
                       "L" + dojo.string.pad(level, 2, '0') + "/" + 
                       "R" + dojo.string.pad(row.toString(16), 8, '0') + "/" + 
                       "C" + dojo.string.pad(col.toString(16), 8, '0') + "." + 
                       "jpg"; 
                 } 
             }, 
             streets: { 
                 title: 'Streets', 
                 type: 'ArcGISTiledMapServiceLayer',               
                 url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer' 
             }, 
             satellite: { 
                 title: 'Satellite', 
                 type: 'ArcGISTiledMapServiceLayer',              
                 url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer' 
             }, 
            bing: { 
                 title: 'Bing', 
                 type: 'VETiledLayer', 
                 bingMapsKey: "AhRVWTf0dNDM_xvRKQDMtR9LBLeEEJ182SQ6VxdZVM8JZxndHQadWG8d1yysRAAi", 
                 mapStyle: "aerial" 
               
             } 
	   	
            
        }
    };
});