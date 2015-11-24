console.log("wvs/extensions/esri/SpatialReference.js");

define([
    "dojo/_base/lang"
    , "wvs/libs/proj4js/main"
    , "esri/SpatialReference"
    , "../../_base/config"
], function (lang, Proj4js, SpatialReference, wvsConfig) {
    lang.extend(SpatialReference, {

        // summary:
        //      Returns the proj4js projection for this spatial reference. This currently only supports WKID and the developer must
        //      manually add each proj4js string in the default config settings. Example: 
        //          jstoolkit.config.defaults.proj4js["102100"] =  {
        //              name: "SR-ORG:6",
        //              def:  "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"
        //          };
        // returns: Object
        toProj4js: function(){
            if(this._proj4js === undefined){
                var c;
                if(this.wkid){        
                    if (wvsConfig.defaults.proj4js["" + this.wkid] === undefined) {
                        alert("No Proj4js seeting defined for wkid " +  this.wkid);
                        return;
                    }
                    c = wvsConfig.defaults.proj4js["" + this.wkid];
                }else{
                    // wkt
                }

                if(Proj4js.defs[c.name] === undefined){
                    Proj4js.defs[c.name] = c.def;
                }
                this._proj4js = new Proj4js.Proj(c.name);
            }
            return this._proj4js;    
        }
    });
});