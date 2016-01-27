/*  ConfigurableMapViewerCMV
 *  version 1.3.4
 *  Project: http://cmv.io/
 */
define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/MenuItem", "dojo/_base/lang", "dojo/_base/array", "dojo/promise/all", "dojo/topic", "dojo/query", "dojo/dom-style", "dojo/dom-class", "dojo/dnd/Moveable", "dojo/store/Memory", "esri/tasks/IdentifyTask", "esri/tasks/IdentifyParameters", "esri/dijit/PopupTemplate", "dojo/text!./Identify/templates/Identify.html", "dojo/i18n!./Identify/nls/resource", "dijit/form/Form", "dijit/form/FilteringSelect", "xstyle/css!./Identify/css/Identify.css"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    return a([b, c, d], {
        widgetsInTemplate: !0,
        templateString: r,
        baseClass: "gis_IdentifyDijit",
        i18n: s,
        mapClickMode: null,
        identifies: {},
        infoTemplates: {},
        ignoreOtherGraphics: !0,
        createDefaultInfoTemplates: !0,
        draggable: !1,
        layerSeparator: "||",
        allLayersId: "***",
        postCreate: function () {
            this.inherited(arguments), this.identifies || (this.identifies = {}), this.layers = [], g.forEach(this.layerInfos, function (a) {
                var b = a.layer.id,
                    c = this.map.getLayer(b);
                if (c) {
                    var d = c.url;
                    if ("esri.layers.FeatureLayer" === c.declaredClass) {
                        if (c.capabilities && c.capabilities.toLowerCase().indexOf("data") < 0 && !c.infoTemplate) {
                            var e = this.getInfoTemplate(c, c.layerId);
                            if (e) return void c.setInfoTemplate(e)
                        }
                        var g = d.lastIndexOf("/" + c.layerId);
                        g > 0 && (d = d.substring(0, g))
                    }
                    this.layers.push({
                        ref: c,
                        layerInfo: a,
                        identifyTask: new o(d)
                    }), this.parentWidget && c.on("visibility-change", f.hitch(this, function (a) {
                        a.visible === !1 && this.createIdentifyLayerList()
                    }))
                }
            }, this), this.own(i.subscribe("mapClickMode/currentSet", f.hitch(this, "setMapClickMode"))), this.map.on("click", f.hitch(this, function (a) {
                "identify" === this.mapClickMode && this.executeIdentifyTask(a)
            })), this.mapRightClickMenu && this.addRightClickMenu(), this.parentWidget && (this.createIdentifyLayerList(), this.map.on("update-end", f.hitch(this, function () {
                this.createIdentifyLayerList()
            }))), this.draggable && this.setupDraggable()
        },
        addRightClickMenu: function () {
            this.map.on("MouseDown", f.hitch(this, function (a) {
                this.mapRightClick = a
            })), this.mapRightClickMenu.addChild(new e({
                label: this.i18n.rightClickMenuItem.label,
                onClick: f.hitch(this, "handleRightClick")
            }))
        },
        setupDraggable: function () {
            var a, b, c, d;
            a = j("div.esriPopup"), b = j("div.esriPopup div.titlePane div.title"), c = j("div.esriPopup div.outerPointer, div.esriPopup div.pointer"), a.length > 0 && b.length > 0 && (k.set(b[0], "cursor", "move"), d = new m(a[0], {
                handle: b[0]
            }), c.length > 0 && (d.onMoveStart = function () {
                g.forEach(c, function (a) {
                    l.remove(a, "left right top bottom topLeft topRight bottomLeft bottomRight")
                })
            }))
        },
        executeIdentifyTask: function (a) {
            if (this.checkForGraphicInfoTemplate(a) && (this.map.infoWindow.hide(), this.map.infoWindow.clearFeatures(), !(a.shiftKey || a.ctrlKey || a.altKey))) {
                var b = a.mapPoint,
                    c = this.createIdentifyParams(b),
                    d = [],
                    e = [],
                    i = this.getSelectedLayer();
                g.forEach(this.layers, f.hitch(this, function (a) {
                    var b = this.getLayerIds(a, i);
                    if (b.length > 0) {
                        var g = f.clone(c);
                        g.layerDefinitions = a.ref.layerDefinitions, g.layerIds = b, d.push(a.identifyTask.execute(g)), e.push(a)
                    }
                })), d.length > 0 && (this.map.infoWindow.setTitle(this.i18n.mapInfoWindow.identifyingTitle), this.map.infoWindow.setContent('<div class="loading"></div>'), this.map.infoWindow.show(b), h(d).then(f.hitch(this, "identifyCallback", e), f.hitch(this, "identifyError")))
            }
        },
        checkForGraphicInfoTemplate: function (a) {
            if (a.graphic) {
                var b = a.graphic._layer;
                if (b.infoTemplate || b.capabilities && b.capabilities.toLowerCase().indexOf("data") < 0) return !1;
                if (!this.ignoreOtherGraphics) {
                    if (!this.identifies.hasOwnProperty(b.id)) return !1;
                    if (isNaN(b.layerId) || !this.identifies[b.id].hasOwnProperty(b.layerId)) return !1
                }
            }
            return !0
        },
        createIdentifyParams: function (a) {
            var b = new p;
            return b.tolerance = this.identifyTolerance, b.returnGeometry = !0, b.layerOption = p.LAYER_OPTION_VISIBLE, b.geometry = a, b.mapExtent = this.map.extent, b.width = this.map.width, b.height = this.map.height, b.spatialReference = this.map.spatialReference, b
        },
        getSelectedLayer: function () {
            var a = this.allLayersId;
            if (this.parentWidget) {
                var b = this.identifyFormDijit.get("value");
                b.identifyLayer && "" !== b.identifyLayer ? a = b.identifyLayer : this.identifyLayerDijit.set("value", a)
            }
            return a
        },
        getLayerIds: function (a, b) {
            var c = b.split(this.layerSeparator),
                d = this.allLayersId,
                e = a.ref,
                f = a.layerInfo.layerIds,
                g = [];
            return e.visible && (c[0] === d || e.id === c[0]) && (c.length > 1 && c[1] ? g = [c[1]] : "esri.layers.FeatureLayer" !== e.declaredClass || isNaN(e.layerId) ? e.layerInfos && (g = this.getLayerInfos(e, f)) : e.capabilities && e.capabilities.toLowerCase().indexOf("data") > 0 && (g = [e.layerId])), g
        },
        getLayerInfos: function (a, b) {
            var c = [];
            return g.forEach(a.layerInfos, f.hitch(this, function (d) {
                this.includeSubLayer(d, a, b) && c.push(d.id)
            })), c
        },
        identifyCallback: function (a, b) {
            var c = [];
            g.forEach(b, function (b, d) {
                var e = a[d].ref;
                g.forEach(b, function (a) {
                    if (a.feature.geometry.spatialReference = this.map.spatialReference, void 0 === a.feature.infoTemplate) {
                        var b = this.getInfoTemplate(e, null, a);
                        if (!b) return;
                        a.feature.setInfoTemplate(b)
                    }
                    c.push(a.feature)
                }, this)
            }, this), this.map.infoWindow.setFeatures(c)
        },
        identifyError: function (a) {
            this.map.infoWindow.hide(), i.publish("viewer/handleError", {
                source: "Identify",
                error: a
            })
        },
        handleRightClick: function () {
            this.executeIdentifyTask(this.mapRightClick)
        },
        getInfoTemplate: function (a, b, c) {
            var d = null,
                e = null;
            return c ? b = c.layerId : null === b && (b = a.layerId), this.identifies.hasOwnProperty(a.id) && this.identifies[a.id].hasOwnProperty(b) && (d = this.identifies[a.id][b], d && "string" != typeof d.declaredClass && (d.content && (e = d.content), d = new q(d), e && d.setContent(e), this.identifies[a.id][b] = d)), d || (d = this.createInfoTemplate(a, b, c)), d
        },
        createInfoTemplate: function (a, b, c) {
            var d = null,
                e = [],
                f = this.getLayerName(a);
            if (c && (f = c.layerName), c && c.feature) {
                var h = c.feature.attributes;
                if (h)
                    for (var i in h) h.hasOwnProperty(i) && e.push({
                        fieldName: i,
                        visible: !0
                    })
            } else if (a._outFields && a._outFields.length && "*" !== a._outFields[0]) {
                var j = a.fields;
                g.forEach(a._outFields, function (a) {
                    var b = g.filter(j, function (b) {
                        return b.name === a
                    });
                    b.length > 0 && e.push({
                        fieldName: b[0].name,
                        label: b[0].alias,
                        visible: !0
                    })
                })
            } else a.fields && g.forEach(a.fields, function (a) {
                e.push({
                    fieldName: a.name,
                    label: a.alias,
                    visible: !0
                })
            });
            
            return e.length > 0 && (d = new q({
                title: f,
                fieldInfos: e,
                showAttachments: a.hasAttachments
            }), this.identifies[a.id] || (this.identifies[a.id] = {}), this.identifies[a.id][b] = d), d
        },
        createIdentifyLayerList: function () {
            var a = null,
                b = [],
                c = this.identifyLayerDijit.get("value"),
                d = this.layerSeparator;
            g.forEach(this.layers, f.hitch(this, function (e) {
                var h = e.ref,
                    i = e.layerInfo.layerIds;
                if (h.visible) {
                    var j = this.getLayerName(e);
                    "esri.layers.FeatureLayer" !== h.declaredClass || isNaN(h.layerId) ? g.forEach(h.layerInfos, f.hitch(this, function (e) {
                        this.includeSubLayer(e, h, i) && (b.push({
                            name: j + " \\ " + e.name,
                            id: h.id + d + e.id
                        }), h.id + d + e.id === c && (a = c))
                    })) : (b.push({
                        name: j,
                        id: h.id + d + h.layerId
                    }), h.id + d + h.layerId === c && (a = c))
                }
            })), b.sort(function (a, b) {
                return a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            }), this.identifyLayerDijit.set("disabled", b.length < 1), b.length > 0 && (b.unshift({
                name: this.i18n.labels.allVisibleLayers,
                id: "***"
            }), a || (a = b[0].id));
            var e = new n({
                data: b
            });
            this.identifyLayerDijit.set("store", e), this.identifyLayerDijit.set("value", a)
        },
        includeSubLayer: function (a, b, c) {
            if (null !== a.subLayerIds) return !1;
            if (g.indexOf(b.visibleLayers, a.id) < 0) return !1;
            if (!this.layerVisibleAtCurrentScale(a)) return !1;
            if (c && g.indexOf(c, a.id) < 0) return !1;
            if (!this.createDefaultInfoTemplates) {
                var d = this.getInfoTemplate(b, a.id);
                if (!d) return !1
            }
            return !0
        },
        getLayerName: function (a) {
            var b = null;
            return a.layerInfo && (b = a.layerInfo.title), b || g.forEach(this.layers, function (c) {
                return c.ref.id === a.id ? void (b = c.layerInfo.title) : void 0
            }), b || (b = a.name, !b && a.ref && (b = a.ref._titleForLegend)), b
        },
        layerVisibleAtCurrentScale: function (a) {
            var b = this.map.getScale();
            return !(0 !== a.maxScale && b < a.maxScale || 0 !== a.minScale && b > a.minScale)
        },
        setMapClickMode: function (a) {
            this.mapClickMode = a;
            var b = this.map;
            g.forEach(b.graphicsLayerIds, function (c) {
                var d = b.getLayer(c);
                d && ("identify" === a ? this.infoTemplates[d.id] && (d.infoTemplate = f.clone(this.infoTemplates[d.id])) : d.infoTemplate && (this.infoTemplates[d.id] = f.clone(d.infoTemplate), d.infoTemplate = null))
            }, this)
        }
    })
});