define({
    map: true,
    mapClickMode: true,
    
    //CIP Map Service Layers
    buildingsLayerUrl: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/CIP/MapServer/0',
    roadsLayerUrl: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/CIP/MapServer/1',
    
    buildingNumberField: 'BUILDINGNUMBER',
    roadNameField: 'ROADNAME',

    //ER Tool Map Service Layers
    incidentPointUrl: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/Third_Party/ert_admin/FeatureServer/0',
    blockadesUrl: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/Third_Party/ert_admin/FeatureServer/1',
    safeRouteUrl: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/Third_Party/ert_admin/FeatureServer/2',
    alohaFootprintUrl: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/Third_Party/ert_admin/FeatureServer/3',
    facilityStatusUrl: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/Third_Party/ert_admin/FeatureServer/4',
    cordonPolyUrl: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/Third_Party/ert_admin/FeatureServer/5',
    
    //use the Well Known ID (WKID) of the spatial reference 
    //to be used to create the cordon for higher accuracy
    //if null, the default map spatial reference will be used
    //http://resources.arcgis.com/en/help/rest/apiref/index.html?pcs.html
    bufferSpatialReference: null,
    
    //units = feet
    defaultCordonSize: 500,
    
    //portal-based geoprocessing is used for shapefile upload procedure
    //no account is required for this functionality
    portalUrl: 'http://www.arcgis.com'
});