console.log("wvs/extensions/esri/Map.js");

define([
    "dojo/_base/lang"
    , "dojo/_base/array"
    , "esri/map"
    , "esri/layers/GraphicsLayer"
    , "esri/layers/FeatureLayer"
], function (lang, array, Map, GraphicsLayer, FeatureLayer) {
    lang.extend(Map, {
        removeAllLayers: function(removeBasemap){
            var removeBasemap = removeBasemap || false,
                layerIds = this.layerIds.slice();

            array.forEach(layerIds, function (layerId, index) {
                var layer = this.getLayer(layerId);
                if (removeBasemap) {
                    this.removeLayer(layer);
                }
                else if (index !== 0 && layer && (!layer._basemapGalleryLayerType || layer._basemapGalleryLayerType === "basemap")) {
                    this.removeLayer(layer);
                }
            }, this);


            var graphicLayerIds = this.graphicsLayerIds.slice();
            array.forEach(graphicLayerIds, function (graphicLayerId) {
                var layer = this.getLayer(graphicLayerId);
                this.removeLayer(layer);
            }, this);
        },
        groupLayers: [],

        // The selected basemap layer (from layerIds) should always return 0 (unless swiping)
        // NOTES: esri currently has two arrays representing the map's layers
        // Order has to be considered separately. Graphics layers always go above TiledMapServiceLayers or DynamicMapServiceLayers and this has been reflected in the TOC
        // layerIds = TiledMapServiceLayers or DynamicMapServiceLayers according to esri's documentation but it includes more than that. I will provide a more complete list as the TOC expands
        // graphicsLayerIds = any other added layers that do not go in the layerIds array
        // Returns: "top", "alone", "bottom", "between", index (Number) or -1 (layer not found)
        getLayerPosition: function (layer, reverse) {
            console.log(this.declaredClass + ' getLayerPosition');
            var self = this,
                index = -1,
                layerIds,
                groupLayer = false;

            if (layer.isInstanceOf(FeatureLayer) || layer.isInstanceOf(GraphicsLayer)) {
                layerIds = this.graphicsLayerIds;
            }
            else if (layer.isGroupLayer()) {
                layerIds = this.graphicsLayerIds;
                groupLayer = true;
            }
            else if (this.groupLayers.length) {
                layerIds = array.filter(this.layerIds, function (i) { return !self.getLayer(i).isGroupLayer(); });
            }

            else {
                layerIds = this.layerIds;
            }
            // Reverse is used to associate proper indices for the DIVS where 0 is top instead of bottom and so on.
            if (reverse) {
                layerIds = layerIds.slice().reverse();
            }
            if (!groupLayer) {
                array.forEach(layerIds, function (layerId, i) {
                    if (layer.id === layerId) {
                        index = i;
                    }
                });
            }
            else {
                switch (layer.declaredClass) {
                    case "esri.layers.GeoRSSLayer":
                        var lowestIndex = Number.MAX_VALUE,
                            fls = layer.getFeatureLayers(),
                            highestIndex = Number.MAX_VALUE;
                        array.forEach(fls, function (fl) {
                            array.forEach(layerIds, function (layerId, i) {
                                if (fl.id === layerId && i < lowestIndex) {
                                    lowestIndex = i;
                                }
                            });
                        });
                        index = lowestIndex < Number.MAX_VALUE? lowestIndex : -1;
                        highestIndex = lowestIndex + fls.length - 1;
                        break;
                }
            }

            if (!groupLayer) {
                var minIndex = 0;
                if (!layer.isInstanceOf(FeatureLayer) || !layer.isInstanceOf(GraphicsLayer)) {
                    array.forEach(layerIds, function (layerId, layerIndex) {
                        var layer = this.getLayer(layerId);
                        if (layer._basemapGalleryLayerType && layer._basemapGalleryLayerType === "basemap") {
                            minIndex = layerIndex + 1;
                        }
                    }, this);
                    minIndex = minIndex === 0 ? 1 : minIndex;
                }
                if (index === minIndex && index === layerIds.length - 1) {
                    return { pos: "alone", index: index };
                }
                if (index === minIndex && index !== layerIds.length - 1) {
                    return { pos: "bottom", index: index };
                }
                if (index === layerIds.length - 1) {
                    return { pos: "top", index: index };
                }
            }
            else {
                if (index === 0 && highestIndex !== layerIds.length - 1) {
                    return { pos: "bottom", index: index };
                }
                if (index === 0 && highestIndex === layerIds.length - 1) {
                    return { pos: "alone", index: index };
                }
                if (highestIndex === layerIds.length - 1) {
                    return { pos: "top", index: index };
                }
            }

            // Common case
            return { pos: "between", index: index };
        },
        moveLayerDown: function (layer) {
            console.log(this.declaredClass + ' moveLayerUp');
            var self = this;
            if (!layer.isGroupLayer()) {
                var layerPos = this.getLayerPosition(layer);
                if (layerPos.index > 0) {
                    var placeIndex = layerPos.index - 1;
                    if (this.groupLayers.length && (layer.isInstanceOf(FeatureLayer) || !layer.isInstanceOf(GraphicsLayer))) {
                        for (placeIndex; placeIndex >= 0; placeIndex--) {
                            if (array.indexOf(this.groupLayers, this.graphicsLayerIds[placeIndex]) === -1) {
                                break;
                            }
                        }
                    }
                        this.reorderLayer(layer, placeIndex);
                        return true;
                }
            }
            else {
                switch (layer.declaredClass) {
                    case "esri.layers.GeoRSSLayer":
                        var fls = layer.getFeatureLayers(),
                            moveable = true;
                        array.forEach(fls, function (fl) {
                            if (self.getLayerPosition(fl).index < 1) {
                                moveable = false;
                            }
                        });
                        if (moveable) {
                            array.forEach(fls, function (fl) {
                                self.moveLayerDown(fl);
                            });
                        }
                        break;
                }
            }
            return false;
        },

        moveLayerUp: function (layer) {
            console.log(this.declaredClass + ' moveLayerDown');
            var layerPos = this.getLayerPosition(layer),
                numLayers = (layer.isInstanceOf(FeatureLayer) || !layer.isInstanceOf(GraphicsLayer)) || layer.isGroupLayer() ? this.graphicsLayerIds.length : this.layerIds.length,
                self = this;
            if (!layer.isGroupLayer()) {
                var layerPos = this.getLayerPosition(layer);
                if (layerPos.index >= 0) {
                    var placeIndex = layerPos.index + 1;
                    if (this.groupLayers.length && (layer.isInstanceOf(FeatureLayer) || !layer.isInstanceOf(GraphicsLayer))) {
                        for (placeIndex; placeIndex < this.graphicsLayerIds.length - 1; placeIndex++) {
                            if (array.indexOf(this.groupLayers, this.graphicsLayerIds[placeIndex]) === -1) {
                                break;
                            }
                        }
                    }
                    this.reorderLayer(layer, placeIndex);
                    return true;
                }
            }
            else {
                switch (layer.declaredClass) {
                    case "esri.layers.GeoRSSLayer":
                        var fls = layer.getFeatureLayers(),
                            moveable = true;
                        array.forEach(fls, function (fl) {
                            if (self.getLayerPosition(fl).index == numLayers.length - 1) {
                                moveable = false;
                            }
                        });
                        if (moveable) {
                            array.forEach(fls, function (fl) {
                                self.moveLayerUp(fl);
                            });
                        }
                        break;
                }
            }
            return false;
        }

    });
});