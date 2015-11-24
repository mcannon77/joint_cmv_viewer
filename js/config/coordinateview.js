define([
    'esri/dijit/Basemap',
    'esri/dijit/BasemapLayer',
    'esri/layers/osm'
   
   
], function (Basemap, BasemapLayer, osm) {
    
    return {
        map: true,
        urltoCode: './CoordinateView/coord/usng.js',
        defaultCoord: 'coordDMS',
        optionsToShow: ['coordDMS', 'coordDM', 'coordDD', 'coordMC', 'coordUTM', 'coordMGRS', 'coordUSNG'],
        coordinate: { 
            coordDMS: {
                title: 'Degrees Min Sec',
                beforex: 'Lon (X):',
                beforey: 'Lat (Y):'
              
             
            },
            coordDM: {
                title: 'Degrees & Minutes'

            },
            coordDD: {
                title: 'Decimal Degrees'

            },
            coordMC: {
                title: 'Map Coordinates'

            },
            coordUTM: {
                title: 'UTM',
                beforex: 'N',
                beforey: '',
                afterx: 'mE',
                aftery: 'mN',
            },
            coordMGRS: {
                title: 'MGRS'

            },
            coordUSNG: {
                title: 'USNG'

            }
        }
    };
});