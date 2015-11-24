define(["dojo/_base/lang", "esri/geometry/Extent"], function (lang, Extent) {
    lang.extend(Extent, {
        getLabelPoint: function(){
            return this.getCenter();
        }
    });
});