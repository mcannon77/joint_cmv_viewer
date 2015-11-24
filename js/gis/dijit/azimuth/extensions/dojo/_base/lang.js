define([
    "dojo/_base/lang",
    "esri/geometry/Extent"
], function (lang, Extent) {

    var mixinMissing = function (dest, src) {
        // summary:
        //		Clones objects (including DOM nodes) and all children.
        //		Warning: do not clone cyclic structures.
        // src:
        //	    The object to clone
        // dest:
        //      The destination object to receive the missing properties
        if (src instanceof Date) {
            // Date
            dest = new Date(src.getTime());	// Date
        } else if (src instanceof RegExp) {
            // RegExp
            dest = new RegExp(src);   // RegExp
        } else if (typeof src == "object") {
            for (var key in src) {
                if ((src[key] instanceof Array || typeof src[key] == "array")) {
                    dest[key] = src[key];
                } else if (typeof src[key] == "object") {
                    // EIS 10/28/13
                    // If destination object doesn't have a defined key, create an empty object
                    if (typeof dest[key] === "undefined") {
                        dest[key] = {};
                    }
                    mixinMissing(dest[key], src[key]);
                } else {
                    dest[key] = src[key];
                }
            }
        }
    };

    lang.mixin(lang, {
        mixinMissing: mixinMissing
    });
});