define([
    "dojo/_base/lang"
    , "./_commonArcGISMethods"
    , "esri/layers/ArcGISTiledMapServiceLayer"
], function (lang, common, ArcGISTiledMapServiceLayer) {
        lang.extend(ArcGISTiledMapServiceLayer, common);
   }
);