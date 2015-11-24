define([
    "dojo/_base/lang"
    , "esri/layers/ArcGISImageServiceLayer"
], function (lang, ArcGISImageServiceLayer) {
    lang.extend(ArcGISImageServiceLayer, {
        toJson: function () {
            return {
                url: this.url,
                options: {
                    id: this.id,
                    opacity: this.opacity,
                    visible: this.visible
                },
                type: "ArcGISImageServiceLayer"
            };
        }
    });
   }
);