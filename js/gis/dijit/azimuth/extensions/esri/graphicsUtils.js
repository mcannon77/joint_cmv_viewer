define([
    "dojo/_base/lang",
    "esri/graphicsUtils",
    "esri/geometry/Extent"
], function (lang, graphicsUtils, Extent) {
    lang.mixin(graphicsUtils, {
        pointToExtent: function (point, factor) {
            // summary:
            //      Converts a point to an extent using an optional factor
            //  point: Point
            //      The point to convert
            // factor: Number
            //      amount of distance away from original point
            // returns: Extent
            //      the extent created from the point
            var factor = factor || 1;

            return new Extent(point.x - factor, point.y - factor, point.x + factor, point.y + factor, point.spatialReference);
        }
    });
});