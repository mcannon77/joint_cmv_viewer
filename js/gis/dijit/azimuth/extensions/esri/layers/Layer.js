define([
    "dojo/_base/lang"
    , "esri/layers/layer"
    , "dojo/_base/array"
], function(lang, Layer, array){
    lang.extend(Layer, {

        getServiceName: function(){
            if(!this._serviceName && !this.title){
        
                if(this._getServiceName !== undefined){
                    this._serviceName = this._getServiceName();
                }else{
                    // User the service ID by default
                    this._serviceName = this.id;
                }
            }
            else if (this.title) {
                this._serviceName = this.title;
            }
            return this._serviceName;    
        },
        isGroupLayer: function () {
            var groupLayers = ["esri.layers.GeoRSSLayer", "esri.layers.KMLLayer"],
                isGroupLayer = false;
            array.forEach(groupLayers, function (groupLayer) {
                if (this.declaredClass === groupLayer) {
                    isGroupLayer = true;
                }
            }, this);
            return isGroupLayer;
        }
    });
});