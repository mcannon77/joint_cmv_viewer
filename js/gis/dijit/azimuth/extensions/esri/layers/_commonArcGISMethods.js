define([
        "../../../_base/config"
        , "dojo/_base/lang"
        , "dojo/_base/array"
        , "esri/request"
    ],
    function (wvsConfig, lang, array, esriRequest) { 
        return {
            getLegend: function(callback, useSpriteImage){
                // summary:
                //      Get the legend information
                // description:
                //      This method will only return data if the layer type supports legends.
                // callback: Function    
                //      The callback method to execute once the legend information has been requested from the server. 
                //      The callback method will pass the layer and the legend as parameters.
                //      Example: function processLegend(layer, legend){ do stuff.... } 
                // useSpriteImage: Boolean
                //      Use the custom sprite image for the legend icons. When false, the "Legend" REST service will be used for 10.01 and newer services.                
                // returns:
                //      void
                if(typeof callback != 'function'){
                    throw "'callback' is not defined or not a valid function";
                }
   
                if(useSpriteImage || this.version < 10.01){
                    // call the JSToolkit's WCF service to get the legend information
                
                    esriRequest({
                        url: wvsConfig.defaults.layers.ArcGISMapServiceLayer.baseUrl + wvsConfig.defaults.layers.ArcGISMapServiceLayer.serviceUrl + "Legend",
                        content: {url: this._url.path},
                        callbackParamName: "callback",
                        load: lang.hitch(this, function (data) {
                            this.legend = data.layers;
                            this.legendSpriteUrl = wvsConfig.defaults.layers.ArcGISMapServiceLayer.baseUrl + data.legendSpriteUrl.substr(1);
                            callback(this, this.legend);
                        }),
                        error: lang.hitch(this, function (data) {
                            callback(this, null);
                        })
                    });
                }else{  
                    var url = this.url + '/legend';
                    var handle = esriRequest({
                        url: url,
                        content: {
                            f: "json"
                        },
                        callbackParamName: 'callback',
                        handleAs: 'json',
                        load: lang.hitch(this, function (data) {
                            this.legend = data.layers;
                            callback(this, this.legend);
                        }),
                        error: lang.hitch(this, function (data) {
                            callback(this, null);
                        })
                    });
                }   
            },

        //    _processLegendInfo: function(json) {
        //        this.mapService.legend = json;
        //        this._createChildNodes();
        //    },

            getLegendInfo: function(layerId){
                if(this.legend === undefined){
                    throw "Legend has not been populated yet. Call the 'getLegend' method first.";
                }

                var legend = this.legend;
                for(var len = legend.length, i = 0; i < len; i++){
                    if(legend[i].layerId == layerId){
                        return legend[i].legend;
                    }
                }

                return [];
            },

            getLayer: function(layerId){
                if(!this.layerInfos){
                    throw "Layer type '" + this.declaredClass + "' does not support layers";
                }

                for(var len = this.layerInfos.length, i = 0; i < len; i++){
                    if(this.layerInfos[i].id == layerId){
                        return this.layerInfos[i];
                    }
                }
           
                return null;
            },

             _getServiceName: function(){
                var url = this.url.toLowerCase();
                var start = url.indexOf('/rest/services/');
                var end = url.indexOf('/mapserver', start);
                var name = this.url.substring(start + 15, end);

                // strip off the folder
                start = name.indexOf('/');
                if(start > 0){
                    name = name.substring(start+1);
                }
                            
                return name
                    //replace underscores with a space. Example My_Service --> My Service
                    .replace(/_/g,' ').replace(/([A-Z](?=[a-z]))/g, function($1){return " " + $1;})
                    // convert camel casing to spaces. Example: MyService --> My Service
                    .replace(/([A-Z](?=[a-z]))/g, function($1){return " " + $1;});
            },
            
            getSubLayerInfos: function(){
                if(!this.layerInfos){
                    throw "Layer type " + this.declaredClass + " does not support layers";
                }

                if(!this._subLayerInfos){
                    // nest layer Infos
                    array.forEach(this.layerInfos, function(layerInfo) {
                        if (layerInfo.subLayerIds) {                    
                            var subLayerInfos = [];
                            array.forEach(layerInfo.subLayerIds, function (id) {
                                var l = this.getLayer(id);
                                if(l != null){
                                    l._parentLayerInfo = layerInfo;
                                    subLayerInfos.push(l);
                                }
                            }, this);
                            layerInfo._subLayerInfos = subLayerInfos;
                        }
                    }, this);

                    // assign all layers that do not have parent the service layer as a parent
                    var subLayerInfos = []; 
                    array.forEach(this.layerInfos, function (layerInfo, i) {
                        if(layerInfo.parentLayerId == -1){
                            layerInfo._parentLayerInfo = this;
                            subLayerInfos.push(layerInfo);
                        }
                    }, this);
                    this._subLayerInfos = subLayerInfos;
                }
                return this._subLayerInfos;
            }
        };
    }
);