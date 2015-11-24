define([
    "dojo/_base/lang"
    , "esri/layers/LayerInfo"
    , "esri/layers/ArcGISDynamicMapServiceLayer"
    , "../../../dijits/Filter/Filter"
], function (lang, LayerInfo, ArcGISDynamicMapServiceLayer, Filter) {
    lang.extend(LayerInfo, {

        getSubLayerInfos: function(){
            if(this._subLayerInfos){
                 return this._subLayerInfos;                         
            }else{
              return [];
            }
        }, 
    
        getParentLayerInfo: function(){
            if(this._parentLayerInfo){
                 return this._parentLayerInfo;                         
            }else{
              return null;
            }
        },
        setFilters: function (filters) {
            this._filters = filters;
        }
    });
});