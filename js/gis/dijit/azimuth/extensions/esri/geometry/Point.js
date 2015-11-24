define(["dojo/_base/lang", "esri/geometry/Point"], function (lang, Point) {
    lang.extend(Point, {
        m: null,
        z: null,

        setM: function(m){
            this.m = m; 
            return this;
        },

        setZ: function(z){
            this.z = z; 
            return this;
        },

        getLabelPoint: function(){
            return this;
        }
    });
});