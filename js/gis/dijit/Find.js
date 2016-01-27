/*  ConfigurableMapViewerCMV
 *  version 1.3.4
 *  Project: http://cmv.io/
 */
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/dom-construct",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/on",
    "dojo/keys",
    "dojo/dom-style",
    "dojo/store/Memory",
    "dgrid/OnDemandGrid",
    "dgrid/Selection",
    "dgrid/Keyboard",
    "dgrid/extensions/ColumnResizer",
    "esri/layers/GraphicsLayer",
    "esri/symbols/jsonUtils",
    "esri/graphicsUtils",
    "esri/tasks/FindTask",
    "esri/tasks/FindParameters",
    "esri/geometry/Extent",
    "dojo/text!./Find/templates/Find.html",
    "dojo/i18n!./Find/nls/resource",
    "dijit/form/Form",
    "dijit/form/DropDownButton",
    "dijit/TooltipDialog",
    "dijit/form/FilteringSelect",
    "dijit/form/ValidationTextBox",
    "dijit/form/CheckBox",
    "xstyle/css!./Find/css/Find.css"
        ], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
    return a([b, c, d], {
        widgetsInTemplate: !0,
        templateString: v,
        baseClass: "gis_AdvancedFindDijit",
        i18n: w,
        spatialReference: null,
        showOptionsButton: !1,
        zoomOptions: {
            select: !0,
            deselect: !1
        },
        defaultResultsSymbols: {
            point: {
                type: "esriSMS",
                style: "esriSMSCircle",
                size: 25,
                color: [0, 255, 255, 32],
                angle: 0,
                xoffset: 0,
                yoffset: 0,
                outline: {
                    type: "esriSLS",
                    style: "esriSLSSolid",
                    color: [0, 255, 255, 255],
                    width: 2
                }
            },
            polyline: {
                type: "esriSLS",
                style: "esriSLSSolid",
                color: [0, 255, 255, 255],
                width: 3
            },
            polygon: {
                type: "esriSFS",
                style: "esriSFSSolid",
                color: [0, 255, 255, 32],
                outline: {
                    type: "esriSLS",
                    style: "esriSLSSolid",
                    color: [0, 255, 255, 255],
                    width: 3
                }
            }
        },
        defaultSelectionSymbols: {
            point: {
                type: "esriSMS",
                style: "esriSMSCircle",
                size: 25,
                color: [4, 156, 219, 32],
                angle: 0,
                xoffset: 0,
                yoffset: 0,
                outline: {
                    type: "esriSLS",
                    style: "esriSLSSolid",
                    color: [4, 156, 219, 255],
                    width: 2
                }
            },
            polyline: {
                type: "esriSLS",
                style: "esriSLSSolid",
                color: [4, 156, 219, 255],
                width: 3
            },
            polygon: {
                type: "esriSFS",
                style: "esriSFSSolid",
                color: [4, 156, 219, 32],
                outline: {
                    type: "esriSLS",
                    style: "esriSLSSolid",
                    color: [4, 156, 219, 255],
                    width: 3
                }
            }
        },
        postCreate: function () {
            this.inherited(arguments), this.showOptionsButton && j.set(this.optionsDropDownDijit.domNode, "display", "inline-block"), this.initializeGlobalVariables(), this.addKeyUpHandlerToSearchInput(), this.initializeQueries(), this.updateSearchPrompt()
        },
        initializeGlobalVariables: function () {
            this.queryIdx = 0, this.currentQueryEventHandlers = [], this.gridColumns = null, this.selectionMode || (this.selectionMode = "single"), this.zoomExtentFactor || (this.zoomExtentFactor = 1.5), this.spatialReference || (this.spatialReference = this.map.spatialReference.wkid), this.pointExtentSize || (this.pointExtentSize = 4326 === this.spatialReference ? 1e-4 : 25)
        },
        addKeyUpHandlerToSearchInput: function () {
            this.own(h(this.searchTextDijit, "keyup", f.hitch(this, function (a) {
                a.keyCode === i.ENTER && this.search()
            })))
        },
        initializeQueries: function () {
            var a = 0,
                b = this.queries.length;
            for (a = 0; b > a; a++) this.queries[a].id = a;
            if (this.querySelectDom.style.display = "none", b > 1) {
                var c = new k({
                    data: this.queries
                });
                this.querySelectDijit.set("store", c), this.querySelectDijit.set("value", this.queryIdx), this.querySelectDom.style.display = "block"
            }
        },
        search: function () {
            return this.userInputIsInvalid() ?
               void this.displayInvalidUserInputMessage() : this.queryConfigurationIsInvalid() ?
                void this.displayInvalidQueryConfigurationMessage() : (this.createOrResetResultsGrid(), this.displayFindMessage(this.i18n.searching), void this.executeFindTask())
        },
        executeFindTask: function () {
            var a = this.getQueryInput().query.url,
                b = this.getFindParams(),
                c = new s(a);
            c.execute(b, f.hitch(this, this.showResults))
        },
        getQueryInput: function () {
            return {
                query: this.queries[this.queryIdx] || {},
                searchText: this.searchTextDijit.get("value")
            }
        },
        queryConfigurationIsInvalid: function () {
            var a = this.getQueryInput().query;
            return a.url && a.searchFields && a.layerIds ? !1 : !0
        },
        userInputIsInvalid: function () {
            var a = this.getQueryInput().searchText;
            return 0 === a.length || this.userInputLessThanMinLength() ? !0 : !1
        },
        userInputLessThanMinLength: function () {
            var a = this.getQueryInput();
            return a.query.minChars && a.searchText.length < a.query.minChars ? !0 : !1
        },
        displayInvalidQueryConfigurationMessage: function () {
            this.displayFindMessage("There is a problem with the query configuration.")
        },
        displayInvalidUserInputMessage: function () {
            var a = this.getQueryInput().query.minChars;
            this.displayFindMessage("You must enter at least " + a + " characters.")
        },
        displayFindMessage: function (a) {
            e.empty(this.findResultsNode), this.findResultsNode.innerHTML = a, this.findResultsNode.style.display = "block"
        },
        getFindParams: function () {
            var a = this.getQueryInput(),
                b = new t;
            return b.returnGeometry = !0, b.layerIds = a.query.layerIds, b.searchFields = a.query.searchFields, b.layerDefinitions = a.query.layerDefs, b.searchText = a.searchText, b.contains = !this.containsSearchText.checked, b.outSpatialReference = {
                wkid: this.spatialReference
            }, b
        },
        createOrResetResultsGrid: function () {
            this.resultsGrid || (this.createResultsStore(), this.createResultsGrid(), this.attachStandardEventHandlersToResultsGrid()), this.clearResultsGrid(), this.clearFeatures(), this.resetResultsGridColumns(), this.resetResultsGridSort(), this.resetGridSelectionMode(), this.attachCustomEventHandlersToResultsGrid()
        },
        createResultsStore: function () {
            this.resultsStore || (this.resultsStore = new k({
                idProperty: "id",
                data: []
            }))
        },
        createResultsGrid: function () {
            var b = a([l, n, m, o]);
            this.resultsGrid = new b({
                selectionMode: this.selectionMode,
                cellNavigation: !1,
                showHeader: !0,
                store: this.resultsStore
            }, this.findResultsGrid), this.resultsGrid.startup()
        },
        resetResultsGridColumns: function () {
            if (this.resultsGrid) {
                var a = this.queries[this.queryIdx].gridColumns || {
                    layerName: "Layer",
                    foundFieldName: "Field",
                    value: "Result"
                };
                a instanceof Array && (a = g.filter(a, function (a) {
                    return "undefined" == typeof a.visible && (a.visible = !0), a.visible
                })), this.resultsGrid.setColumns(a)
            }
        },
        resetResultsGridSort: function () {
            if (this.resultsGrid) {
                var a = this.queries[this.queryIdx].sort || [{
                    attribute: "value",
                    descending: !1
                }];
                this.resultsGrid.set("sort", a)
            }
        },
        resetGridSelectionMode: function () {
            if (this.resultsGrid) {
                var a = this.queries[this.queryIdx].selectionMode || this.selectionMode;
                this.resultsGrid.set("selectionMode", a)
            }
        },
        attachStandardEventHandlersToResultsGrid: function () {
            this.resultsGrid && (this.own(this.resultsGrid.on("dgrid-select", f.hitch(this, "onResultsGridSelect"))), this.own(this.resultsGrid.on("dgrid-deselect", f.hitch(this, "onResultsGridDeselect"))), this.own(this.resultsGrid.on(".dgrid-row:dblclick", f.hitch(this, "onResultsGridRowClick"))))
        },
        attachCustomEventHandlersToResultsGrid: function () {
            if (this.resultsGrid) {
                g.forEach(this.currentQueryEventHandlers, function (a) {
                    a.handle.remove()
                });
                var a = this.queries[this.queryIdx].customGridEventHandlers || [];
                g.forEach(a, f.hitch(this, function (a) {
                    a.handle = this.resultsGrid.on(a.event, f.hitch(this, a.handler))
                })), this.currentQueryEventHandlers = a
            }
        },
        showResults: function (a) {
            var b = this.i18n.noResultsLabel;
            if (this.results = a, this.results.length > 0) {
                var c = 1 === this.results.length ? "" : this.i18n.resultsLabel.multipleResultsSuffix;
                b = this.results.length + " " + this.i18n.resultsLabel.labelPrefix + c + " " + this.i18n.resultsLabel.labelSuffix, this.createGraphicsLayerAndSymbols(), this.parseGridColumnProperties(), this.addResultsToGraphicsLayer(), this.zoomToGraphics(this.graphicsLayer.graphics), this.showResultsGrid()
            }
            this.displayFindMessage(b)
        },
        createGraphicsLayerAndSymbols: function () {
            this.graphicsLayer || (this.graphicsLayer = this.createGraphicsLayer()), this.graphicsSymbols || (this.graphicsSymbols = this.createGraphicsSymbols())
        },
        createGraphicsLayer: function () {
            var a = new p({
                id: this.id + "_findGraphics",
                title: "Find"
            });
            return a.on("click", f.hitch(this, "onGraphicsLayerClick")), this.map.addLayer(a), a
        },
        onGraphicsLayerClick: function (a) {
            var b = this.zoomOptions.select;
            this.zoomOptions.select = !1;
            var c = this.resultsGrid.row(a.graphic.storeid);
            this.resultsGrid.select(c), this.resultsGrid.focus(c.element), c.element.focus(), this.zoomOptions.select = b
        },
        createGraphicsSymbols: function () {
            var a, b, c = {};
            return a = f.mixin(this.defaultResultsSymbols, this.resultsSymbols || {}), c.resultsSymbols = {}, c.resultsSymbols.point = q.fromJson(a.point), c.resultsSymbols.polyline = q.fromJson(a.polyline), c.resultsSymbols.polygon = q.fromJson(a.polygon), b = f.mixin(this.defaultSelectionSymbols, this.selectionSymbols || {}), c.selectionSymbols = {}, c.selectionSymbols.point = q.fromJson(b.point), c.selectionSymbols.polyline = q.fromJson(b.polyline), c.selectionSymbols.polygon = q.fromJson(b.polygon), c
        },
        parseGridColumnProperties: function () {
            this.queries[this.queryIdx].gridColumns && g.forEach(this.results, function (a) {
                g.forEach(this.queries[this.queryIdx].gridColumns, function (a) {
                    var b = function (a, b) {
                        return a.field && !b.hasOwnProperty(a.field) && b.feature.attributes.hasOwnProperty(a.field) ? !0 : !1
                    },
                        c = function (a, b) {
                            return a.field && !b.hasOwnProperty(a.field) && a.get ? !0 : !1
                        };
                    b(a, this) ? this[a.field] = this.feature.attributes[a.field] : c(a, this) && (this[a.field] = a.get(this))
                }, a)
            }, this)
        },
        addResultsToGraphicsLayer: function () {
            var a = 0;
            g.forEach(this.results, function (b) {
                b.id = a, b.feature.storeid = b.id, a++, this.setGraphicSymbol(b.feature, !1), this.graphicsLayer.add(b.feature)
            }, this)
        },
        showResultsGrid: function () {
            var a = this.getQueryInput();
            this.resultsGrid.store.setData(this.results), this.resultsGrid.refresh();
            var b = "block";
            1 === a.query.layerIds.length && (b = "none"), this.resultsGrid.styleColumn("layerName", "display:" + b), a.query && a.query.hideGrid !== !0 && (this.findResultsGrid.style.display = "block")
        },
        onResultsGridSelect: function (a) {
            g.forEach(a.rows, f.hitch(this, function (a) {
                var b = a.data.feature;
                this.setGraphicSymbol(b, !0), b && b.getDojoShape() && b.getDojoShape().moveToFront()
            })), this.graphicsLayer.redraw(), this.zoomOptions.select && this.zoomToSelectedGraphics()
        },
        onResultsGridDeselect: function (a) {
            g.forEach(a.rows, f.hitch(this, function (a) {
                var b = a.data.feature;
                this.setGraphicSymbol(b, !1)
            })), this.graphicsLayer.redraw(), this.zoomOptions.deselect && this.zoomToSelectedGraphics()
        },
        onResultsGridRowClick: function (a) {
            var b = this.resultsGrid.row(a),
                c = b.data.feature;
            setTimeout(f.hitch(this, function () {
                this.resultsGrid.selection.hasOwnProperty(b.id) && this.zoomToGraphics([c])
            }), 100)
        },
        setGraphicSymbol: function (a, b) {
            var c = b ? this.graphicsSymbols.selectionSymbols[a.geometry.type] : this.graphicsSymbols.resultsSymbols[a.geometry.type];
            a.setSymbol(c)
        },
        zoomToSelectedGraphics: function () {
            var a = [],
                b = this.resultsGrid.selection;
            for (var c in b) b.hasOwnProperty(c) && a.push(this.resultsGrid.row(c).data.feature);
            0 !== a.length && this.zoomToGraphics(a)
        },
        zoomToGraphics: function (a) {
            var b = null;
            a.length > 1 ? b = r.graphicsExtent(a) : 1 === a.length && (b = this.getExtentFromGraphic(a[0])), b && this.setMapExtent(b)
        },
        getExtentFromGraphic: function (a) {
            var b = null;
            switch (a.geometry.type) {
                case "point":
                    b = this.getExtentFromPoint(a);
                    break;
                default:
                    b = r.graphicsExtent([a])
            }
            return b
        },
        getExtentFromPoint: function (a) {
            var b = this.pointExtentSize,
                c = a.geometry;
            return new u({
                xmin: c.x - b,
                ymin: c.y - b,
                xmax: c.x + b,
                ymax: c.y + b,
                spatialReference: {
                    wkid: this.spatialReference
                }
            })
        },
        setMapExtent: function (a) {
            this.map.setExtent(a.expand(this.zoomExtentFactor))
        },
        clearResults: function () {
            this.results = null, this.clearResultsGrid(), this.clearFeatures(), this.searchFormDijit.reset(), this.querySelectDijit.setValue(this.queryIdx), e.empty(this.findResultsNode)
        },
        clearResultsGrid: function () {
            this.resultStore && this.resultsStore.setData([]), this.resultsGrid && this.resultsGrid.refresh(), this.findResultsNode.style.display = "none", this.findResultsGrid.style.display = "none"
        },
        clearFeatures: function () {
            this.graphicsLayer && this.graphicsLayer.clear()
        },
        _onQueryChange: function (a) {
            a >= 0 && a < this.queries.length && (this.queryIdx = a, this.updateSearchPrompt())
        },
        updateSearchPrompt: function () {
            var a = this.queries[this.queryIdx].prompt || w.searchText.placeholder;
            this.searchTextDijit.set("placeholder", a), this.searchTextDijit.set("value", null)
        },
        onZoomOptionsSelectChange: function (a) {
            this.zoomOptions.select = a
        },
        onZoomOptionsDeselectChange: function (a) {
            this.zoomOptions.deselect = a
        }
    })
});