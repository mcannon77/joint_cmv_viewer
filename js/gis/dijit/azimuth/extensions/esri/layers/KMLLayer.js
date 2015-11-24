define([
    "dojo/_base/lang"
    , "esri/layers/KMLLayer"
], function (lang, KMLLayer) {
    lang.extend(KMLLayer, {
        toJson: function () {
            return {
                url: this.url,
                options: {
                    id: this.id,
                    visible: this.visible
                },
                type: "KMLLayer"
            };
        }
    });
   }
);