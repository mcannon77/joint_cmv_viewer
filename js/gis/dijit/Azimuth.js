//console.log("wvs/dijits/Azimuth.js");

define([
    "dojo/_base/declare"
    , "dijit/_WidgetBase"
    , "dijit/_TemplatedMixin"
    , "dojo/text!./azimuth/templates/AzimuthTool.html"
    , "dojo/_base/lang"
    , "dojo/on"
    , "dojo/_base/array"
    , "esri/units"
    , "dijit/form/Button"
    , "dijit/form/ToggleButton"
    , "dijit/form/TextBox"
    , "dijit/form/Select"
    , "esri/toolbars/draw"
    , "esri/toolbars/edit"
    , "dojo/dom-style"
    , "esri/symbols/jsonUtils"
    , "esri/geometry/geodesicUtils"
    , "esri/geometry/webMercatorUtils"
    , "esri/geometry/Polyline"
    , "esri/geometry/Polygon"
    , "esri/geometry/Point"
    , "esri/graphic"
    , "dojo/dom-class"
    , "dojo/dom-construct"
    , "dojo/dom"
    , "dojo/topic"
    , "./azimuth/common/Converter"
    , "esri/symbols/SimpleMarkerSymbol"
    , "esri/symbols/SimpleLineSymbol"
    , "esri/geometry/mathUtils"
    , "dijit/Tooltip"
    , "./azimuth/common/ZoomToXY"
    , "./azimuth/common/Common"
    , "dojo/_base/connect"
    , "dojo/Evented"
    , "dojo/fx/Toggler"
    , "dojo/fx"
    , "dojo/query"
    , "dojo/dom-attr"
    , "./azimuth/common/SimpleButton"
    , "esri/symbols/TextSymbol"
    , "dojo/_base/Color"
    , "dojo/store/Memory"
    , "dojo/string"
    , "./azimuth/extensions/esri/geometry/Polygon"
    , "./azimuth/extensions/esri/geometry/Polyline"
    , "./azimuth/extensions/esri/geometry"
   // , "xstyle/css!./Azimuth/css/azimuth.css"
], function (declare, _WidgetBase, _TemplatedMixin, template, lang, on, array, Units, Button, ToggleButton, TextBox, Select, Draw, Edit, domStyle, jsonUtils, geodesicUtils, webMercatorUtils, Polyline, Polygon, Point, Graphic, domClass, domConstruct, dom, topic, Converter, SimpleMarkerSymbol, SimpleLineSymbol, mathUtils, Tooltip, ZoomToXY, Common, connect, Evented, Toggler, coreFx, query, domAttr, SimpleButton, TextSymbol, Color, Memory, string) {
    var Azimuth = declare([_WidgetBase, _TemplatedMixin], {
        idIndexString: "ABCDEFGHIJKLMNOPQRSTUVWXYZ12345679",

        templateString: template,

        declaredClass: "wvs.dijits.Azimuth",

        markerSymbol: jsonUtils.fromJson({ "color": [0, 0, 255, 230], "size": 15, "angle": 0, "xoffset": 0, "yoffset": 0, "type": "esriSMS", "style": "esriSMSCircle", "outline": { "color": [0, 0, 128, 128], "width": 4.5, "type": "esriSLS", "style": "esriSLSSolid" } }),

        lineSymbol: jsonUtils.fromJson({ "color": [0, 0, 255, 128], "width": 2.25, "type": "esriSLS", "style": "esriSLSSolid" }),

        textSymbol: { "color": [255, 255, 255, 255], "type": "esriTS", "horizontalAlignment": "center", "angle": 0, "xoffset": 0, "yoffset": -3.75, "text": "", "rotated": false, "kerning": true, "font": { "size": 12, "style": "normal", "variant": "normal", "weight": "normal", "family": "Arial" } },

        distanceUnits: [
            { label: "Kilometers", id: Units.KILOMETERS, abbr: "km" },
            { label: "Miles", id: Units.MILES, abbr: "miles" },
            { label: "Meters", id: Units.METERS, abbr: "m" },
            { label: "Feet", id: Units.FEET, abbr: "ft" }
        ],

        distanceTooltipTemplate: "<strong>Distance: </strong>${distance}<br /><strong>Initial Bearing: </strong>${initBearing}<br /><strong>Final Bearing: </strong>${finalBearing}",

        multiDestination: true,

        noWayPoints: 0,

        quickDrawEnabled: false,

        constructor: function (params, srcNodeRef) {
            // Doubly-linked List
            this.rootWayPoint = null;

            this._pointGfx = [];
            this._textGfx = [];
            this._lineGfx = null;


            if (!params.map) {
                throw new Error("map required for " + this.declaredClass);
            }

            lang.mixin(this, params);

            this._tempGraphic = null;
        },
        postCreate: function () {
            var self = this;

            this.quickDrawButton = new ToggleButton({
                label: "Draw My Points",
                iconClass: "icon-pencil",
                onChange: lang.hitch(this, function (value) {
                    if (value) {
                        if (this.hasPoints()) {
                            var confirm = Common.confirmDialog("This action will remove all defined points. Are you sure you want to do this?");
                            confirm.then(function (confirmed) {
                                if (confirmed) {
                                    connect.publish("waypoint-acquireMap", this);
                                    self.enableQuickDrawMode();
                                }
                                else
                                    self.quickDrawButton.set("checked", false);
                            });
                        }
                        else {
                            connect.publish("waypoint-acquireMap", this);
                            this.enableQuickDrawMode();
                        }
                    }
                    else {
                        if (!this._finishedDrawing)
                            this._resetState();
                        this.set("quickDrawEnabled", false);
                    }
                })
            }, this.quickDrawButton);

            this.distanceUnitsSelect = new Select({
                store: new Memory({ data: this.distanceUnits }),
                labelAttr: "label",
                onChange: function (value) {
                    var distanceAbbr = this.store.query({ id: value })[0].abbr;

                    // change total units label
                    self.totalUnits.innerHTML = distanceAbbr;

                    // set units on waypoints and recalc (for those who may define points using bearing/dst)
                    var waypoints = self._getWayPointsAsArray();
                    array.forEach(waypoints, function (waypoint) {
                        waypoint.setDistanceUnits(value, distanceAbbr);
                    }, this);

                    // recalculate distances
                    self._calculateMeasurements();
                }
            }, this.distanceUnitsSelect);

            this.distanceUnitsSelect.set("value", Units.KILOMETERS);

            this.optionsToggler = new Toggler({
                node: this.optionsNode,
                showFunc: coreFx.wipeIn,
                hideFunc: coreFx.wipeOut
            });

            this.optionsVisible = false;

            // Events
            var destLinkClick = on(this.addDestLink, "click", lang.hitch(this, function () { this.addWayPointFromPoint(); }));
            var showOptionsLinkClick = on(this.showOptionsLink, "click", lang.hitch(this, function () { this.toggleOptions(); }));
            this.own(destLinkClick, showOptionsLinkClick);

            if (!this.multiDestination) {
                domStyle.set(this.addDestLink, { display: "none" });
            }

            // Watches

            this.watch("quickDrawEnabled", lang.hitch(this, function (name, oldVal, newVal) {
                if (newVal) {
                    domStyle.set(this.addDestLink, { display: "none" });
                }
                else {
                    var nl = query(".icon-trash", this.wayPoints);
                    array.forEach(nl, function (node) {
                        domStyle.set(node, { display: "block" });
                    });
                    domStyle.set(this.addDestLink, { display: "inline" });
                }
                connect.publish("map-lock", newVal);
            }));

            // Topics
            connect.publish("map-acquire", { target: this, acquired: true });
        },
        startup: function () {
            this.addWayPointFromPoint();
            this.addWayPointFromPoint();
            this.inherited(arguments);
        },
        destroy: function () {
            this._resetState();
            connect.publish("map-acquire", { target: this, acquired: false });
            this.inherited(arguments);
        },
        toggleOptions: function () {
            if (this.optionsVisible) {
                this.optionsToggler.hide();
                this.showOptionsLink.innerHTML = "Show Options";
            }
            else {
                this.optionsToggler.show();
                this.showOptionsLink.innerHTML = "Hide Options";
            }

            this.optionsVisible = !this.optionsVisible;
        },
        hasPoints: function () {
            return this.rootWayPoint && this.rootWayPoint.point;
        },
        indexOfWayPoint: function (waypoint) {
            var index = 0;
            var curWayPoint = this.rootWayPoint;
            if (waypoint === curWayPoint)
                return index;
            while (curWayPoint.hasNext()) {
                curWayPoint = curWayPoint.next;
                index++;
                if (curWayPoint === waypoint)
                    return index;
            }

            return -1;
        },
        getWayPointFromIndex: function (index) {
            var i = 0;
            var curWayPoint = this.rootWayPoint;
            if (curWayPoint && index == 0) {
                return curWayPoint
            }
            else if (curWayPoint) {
                while (curWayPoint.hasNext()) {
                    curWayPoint = curWayPoint.next;
                    i++;
                    if (i === index) {
                        return curWayPoint;
                    }
                }

                return null;
            }

            return null;
        },
        addWayPointFromPoint: function (point) {
            var index = 0;
            var curWayPoint = this.rootWayPoint;
            if (curWayPoint) {
                while (curWayPoint.hasNext()) {
                    curWayPoint = curWayPoint.next;
                    index++;
                }
                index++;
            }

            var distanceUnits = this.distanceUnitsSelect.value;
            var distanceAbbr = this.distanceUnitsSelect.store.query({ id: this.distanceUnitsSelect.value })[0].abbr;
            var wayPoint = new _WayPoint({
                map: this.map,
                point: point,
                prev: null,
                next: null,
                style: "display:inline;",
                distanceUnits: distanceUnits,
                distanceAbbr: distanceAbbr,
                manualInputEnabled: !this.quickDrawEnabled
            });
            this.insertWayPoint(wayPoint, index);
        },
        insertWayPoint: function (wayPoint, index) {
            var noWayPoints = this.noWayPoints;

            // Link widgets properly
            if (index === 0) {
                if (noWayPoints > 0) {
                    this.rootWayPoint.set("prev", wayPoint);
                    wayPoint.set("next", this.rootWayPoint);
                }
                this.rootWayPoint = wayPoint;
            }
            else if (index === noWayPoints) {
                var prev = this.getWayPointFromIndex(index - 1);
                prev.set("next", wayPoint);
                wayPoint.set("prev", prev);
            }
            else {
                var prev = this.getWayPointFromIndex(index - 1);
                prev.set("next", wayPoint);
                wayPoint.set("prev", prev);
                var next = this.getWayPointFromIndex(index + 1);
                next.set("prev", wayPoint);
                wayPoint.set("next", next);
            }

            // Attach to DOM
            if (index !== 0) {
                var measurementDiv = domConstruct.create("div", { "data-waypoint-measurement": index });
                var hr = domConstruct.create("hr", { style: "width: 270px;display:inline-block;margin-right:1em;" }, measurementDiv);
                var segmentLength = domConstruct.create("span", { "data-waypoint-segmentLength": index }, measurementDiv);
                domConstruct.place(measurementDiv, this.wayPoints);
            }

            var containingDiv = domConstruct.create("div", { "data-waypoint": index, "class": "row-fluid" });
            var indexLetter = domConstruct.create("div", { innerHTML: this.idIndexString.substr(index, 1), "class": "colspan1 toolkit-waypoint-letter jstoolkit-circle-dot jstoolkit-circle-dot-blue" }, containingDiv);
            domClass.add(wayPoint.domNode, this.multiDestination ? "colspan10" : "colspan11");
            domConstruct.place(wayPoint.domNode, containingDiv);
            if (this.multiDestination) {
                var delIcon = domConstruct.create("div", { "class": "colspan1 icon-trash", style: this.quickDrawEnabled ? "cursor:pointer;display:none;" : "cursor:pointer;"  }, containingDiv);
                on(delIcon, "click", lang.hitch(this, this.removeWayPoint, wayPoint));
            }
            domConstruct.place(containingDiv, this.wayPoints);

            // Increment WayPoint Count
            this.noWayPoints = this.noWayPoints + 1;

            // listen to point updates for this waypoint
            on(wayPoint, "point-updated", lang.hitch(this, function (pt) {
                this._drawWayPoints();
                this._calculateMeasurements();
            }));

            // startup the waypoint widget
            wayPoint.startup();


        },
        removeWayPoint: function (wayPoint) {
            var i = this.indexOfWayPoint(wayPoint);

            if (i === -1) {
                return false;
            }

            if (i == 0) {
                if (wayPoint.hasNext()) {
                    wayPoint.next.set("prev", null);
                    this.rootWayPoint = wayPoint.next;
                }
                else
                    this.rootWayPoint = null;
            }
            else if (i === this.noWayPoints - 1) {
                wayPoint.prev.set("next", null);
            }
            else {
                wayPoint.prev.set("next", wayPoint.next);
                wayPoint.next.set("prev", wayPoint.prev);
            }

            var nl = query("div[data-waypoint=" + i + "]", this.wayPoints);
            wayPoint.destroy();
            domConstruct.destroy(nl[0]);

            if (i > 0) {
                var measure = query("div[data-waypoint-measurement=" + i + "]", this.wayPoints);
                domConstruct.destroy(measure[0]);
            }

            nl = query("div[data-waypoint]", this.wayPoints);
            array.forEach(nl, function (n, index) {
                domAttr.set(n, "data-waypoint", index);
                var l = query(".toolkit-waypoint-letter", n);
                l[0].innerHTML = this.idIndexString.substr(index, 1)
            }, this);

            nl = query("div[data-waypoint-measurement]", this.wayPoints);
            array.forEach(nl, function (n, index) {
                domAttr.set(n, "data-waypoint-measurement", index + 1);
            }, this);


            // Decrement WayPoint Count
            this.noWayPoints = this.noWayPoints - 1;
            this._drawWayPoints();

            if (this.noWayPoints > 1)
                this._calculateMeasurements();
            else
                domStyle.set(this.totalLabel, { display: "none" });
            return true;
        },
        clearWayPoints: function () {
            if (this.rootWayPoint) {
                var waypoints = this._getWayPointsAsArray();
                for (var i = waypoints.length - 1; i >= 0; i--) {
                    this.removeWayPoint(waypoints[i]);
                }
            }
        },
        _clearGraphics: function () {
            array.forEach(this._pointGfx, function (pt) {
                this.map.graphics.remove(pt);
            }, this);
            this._pointGfx = [];
            array.forEach(this._textGfx, function (text) {
                this.map.graphics.remove(text);
            }, this);
            this._textGfx = [];
            if (this._lineGfx) {
                this.map.graphics.remove(this._lineGfx);
                this._lineGfx = null;
            }
        },
        _drawWayPoints: function () {
            // clear the graphics
            this._clearGraphics();

            // we only draw if our waypoints have points
            var pts = [];
            var valid = true;
            var waypoint = this.rootWayPoint;
            if (waypoint) {
                if (waypoint.point) {
                    pts.push(waypoint.point);
                }
                else {
                    valid = false;
                }
                if (valid) {
                    while (waypoint.hasNext()) {
                        waypoint = waypoint.next;
                        if (waypoint.point) {
                            pts.push(waypoint.point);
                        }
                        else {
                            break;
                            valid = false;
                        }
                    }
                }

                if (valid) {
                    // draw points
                    array.forEach(pts, function (pt, i) {
                        var gfx = new Graphic(pt, this.markerSymbol);
                        this.map.graphics.add(gfx);
                        this._pointGfx.push(gfx);
                        var txtSymbol = jsonUtils.fromJson(this.textSymbol);
                        txtSymbol.setText(this.idIndexString.substr(i, 1));
                        var txtGfx = new Graphic(pt, txtSymbol);
                        this.map.graphics.add(txtGfx);
                        this._textGfx.push(txtGfx);
                    }, this);

                    // draw line
                    var lineGfx = new Graphic(this._createLine(pts), this.lineSymbol);
                    var moveToBack = setInterval(function () {
                        if (lineGfx && lineGfx.getDojoShape && lineGfx.getDojoShape()) {
                            lineGfx.getDojoShape().moveToBack();
                            clearInterval(moveToBack);
                        }
                        else if (!lineGfx)
                            clearInterval(moveToBack);
                    }, 10);

                    this.map.graphics.add(lineGfx);
                    this._lineGfx = lineGfx;
                }
            }
            else
                valid = false;

            return valid;
        },
        _calculateMeasurements: function () {
            var waypoints = this._getWayPointsAsArray();
            var total = 0;
            if (waypoints.length > 1) {
                for (var i = 1; i < waypoints.length; i++) {
                    // if we have both of our points, calculate length between segment
                    if (waypoints[i].point && waypoints[i - 1].point) {
                        var line = this._createLine([waypoints[i - 1].point, waypoints[i].point]);
                        var length = line.getLength(this.distanceUnitsSelect.value);
                        total = total + parseFloat(length);
                        var nl = query("div[data-waypoint-measurement=" + i + "]" + " span[data-waypoint-segmentLength]", this.wayPoints);
                        if (nl[0]) {
                            var distanceAbbr = this.distanceUnitsSelect.store.query({ id: this.distanceUnitsSelect.value })[0].abbr;
                            nl[0].innerHTML = length + " (" + distanceAbbr + ")";
                            var start = waypoints[i - 1].point;
                            var end = waypoints[i].point;
                            var initBearing = mathUtils.formatCompassBearing(mathUtils.calculateBearing(start.getLatitude(), start.getLongitude(), end.getLatitude(), end.getLongitude()));
                            var finalBearing = mathUtils.formatCompassBearing(mathUtils.calculateBearing(end.getLatitude(), end.getLongitude(), start.getLatitude(), start.getLongitude()));
                            var tooltipLabel = string.substitute(this.distanceTooltipTemplate, { distance: length + " (" + distanceAbbr + ")", initBearing: initBearing, finalBearing: finalBearing });                           
                            
                            topic.publish('growler/growl', {
                            title: 'Bearing Results',
                            message: 'Initial Bearing:' + ' ' + initBearing + '<br>' + 'Final Bearing:' + ' ' + finalBearing,
                            level: 'default',
                            timeout: 5000
                            });                           
                            
                            var tooltip = new Tooltip({
                                label: tooltipLabel,
                                connectId: [nl[0]]
                            });                            
                        }
                    }
                }

                if (total && this.multiDestination) {
                    this.totalValue.innerHTML = total.toFixed(2);
                    domStyle.set(this.totalLabel, { display: "inline-block", "float": "right" });
                }
            }
        },
        _getWayPointsAsArray: function () {
            var waypoints = [];
            var waypoint = this.rootWayPoint;
            if (waypoint) {
                waypoints.push(waypoint);
                while (waypoint.hasNext()) {
                    waypoint = waypoint.next;
                    waypoints.push(waypoint);
                }
            }

            return waypoints;
        },
        _createLine: function (pointArray) {
            var polyline = new Polyline(this.map.spatialReference);
            polyline.addPath(pointArray);
            var geodesicGeom = geodesicUtils.geodesicDensify(webMercatorUtils.webMercatorToGeographic(polyline), 100000);
            return webMercatorUtils.geographicToWebMercator(geodesicGeom);
        },
        // functions used for quick draw
        _clearEvents: function () {
            // clear out old events and graphics
            if (this._onMouseClickHandler) {
                this._onMouseClickHandler.remove();
            }
            if (this._onMouseMoveHandler) {
                this._onMouseMoveHandler.remove();
            }
            if (this._onMouseDblClickHandler) {
                this._onMouseDblClickHandler.remove();
            }
            if (this._tempGraphic) {
                this.map.graphics.remove(this._tempGraphic);
                this._tempGraphic = null;
            }
            this._firstPointDrawn = false;

            this._finishedDrawing = false;
        },
        _resetState: function() {
            this.clearWayPoints();
            this._clearGraphics();
            this._clearEvents();
        },
        enableQuickDrawMode: function () {
            // start from scratch
            this._resetState();

            this.set("quickDrawEnabled", true);

            this.map.disableDoubleClickZoom();

            this._onMouseClickHandler = on(this.map, "click", lang.hitch(this, this._onMouseClick));
            this._onMouseMoveHandler = on(this.map, "mouse-move", lang.hitch(this, this._onMouseMove));
            this._onMouseDblClickHandler = on(this.map, "dbl-click", lang.hitch(this, this._onMouseDblClick));
        },
        _onMouseClick: function (evt) {
            if (this._firstPointDrawn && !this.multiDestination) {
                this._clearEvents();
                this.map.enableDoubleClickZoom();
                this._finishedDrawing = true;
                this.quickDrawButton.set("checked", false);
            }
            if (!this._firstPointDrawn)
                this._firstPointDrawn = true;

            this.addWayPointFromPoint(evt.mapPoint);
        },
        _onMouseMove: function (evt) {
            if (this._firstPointDrawn) {
                var linePoints = array.map(this._getWayPointsAsArray(), function (waypoint) { return waypoint.point; });
                var geodesicGeom = this._createLine([linePoints[linePoints.length - 1], evt.mapPoint]);
                if (this._tempGraphic === null) {
                    this._tempGraphic = new Graphic(geodesicGeom, this.lineSymbol);
                    this.map.graphics.add(this._tempGraphic);
                }
                else {
                    this._tempGraphic.setGeometry(geodesicGeom);
                }
            }
        },
        _onMouseDblClick: function (evt) {
            if (this._firstPointDrawn) {
                // remove event handlers
                this._clearEvents();

                this.map.enableDoubleClickZoom();
                this._finishedDrawing = true;
                this.quickDrawButton.set("checked", false);

                // add the point to the map
                this.addWayPointFromPoint(evt.mapPoint);
            }
        }
    });

    var _WayPoint = declare([_WidgetBase, Evented], {

        distanceUnits: Units.MILES,

        distanceAbbr: "miles",

        bearingDistMode: false,

        manualInputEnabled: true,

        constructor: function (params, srcNodeRef) {
            if (!params.map) {
                throw new Error("map required for WayPoint");
            }

            lang.mixin(this, params);

            this._mapClickEvent = null;
        },
        postCreate: function () {

            var self = this;

            this.locationTextBox = new TextBox({
                placeHolder: "Lat Lon",
                onKeyUp: function () {
                    if (!this.readOnly && !this.disabled) {
                        self._parseLonLat(this.displayedValue);
                    }
                }
            }, this.locationTextBox);
            this.locationTextBox.placeAt(this.domNode);

            this.pointFromMapButton = new SimpleButton({
                leftIconClass: "icon-globe",
                tooltip: "Define a point from the map",
                toggleable: true,
                onClick: function (evt) {
                    self.locationTextBox.set("readonly", false);
                    if (self.prev) {
                        self.set("bearingDistMode", false);
                        domStyle.set(self.bearingOptionsDiv, { display: "none" });
                    }
                    if (!self.pointFromMapButton.checked) {
                        self._mapClickEvent.remove();
                    }
                    else {
                        self._pointFromMap();
                    }
                }
            }, this.pointFromMapButton);
            this.pointFromMapButton.placeAt(this.domNode);

            if (this.prev) {
                this._enableBrnDst();
            }

            this.pointFromZoomXY = new SimpleButton({
                leftIconClass: "icon-screenshot",
                tooltip: "Define a point using the Zoom to XY tool",
                onClick: lang.hitch(this, function () {
                    var dialog = Common.showWidgetInDialog(ZoomToXY, lang.mixin({ map: this.map }), { title: "Zoom to XY" });

                    on.once(dialog.content, "point-created", lang.hitch(this, function (pt) {
                        dialog.hide();
                        this.point = pt;
                        this._updateLocTextBoxFromPoint(pt);
                        this.emit("point-updated", this);
                    }));
                })
            }, this.pointFromZoomXY);
            this.pointFromZoomXY.placeAt(this.domNode);
                
            this.setEventsAndWatches();
        },
        startup: function () {
            if (!this.manualInputEnabled) {
                this.locationTextBox.set("readonly", true);
                this.pointFromMapButton.set("disabled", true);
                this.pointFromZoomXY.set("disabled", true);
                if (this.prev) {
                    this.pointFromBrnDst.set("disabled", true);
                }
            }

            if (this.point) {
                this._updateLocTextBoxFromPoint(this.point);
                this.emit("point-updated", this);
            }
        },
        _enableBrnDst: function () {
            // summary:
            //      in order to enable calculating lat/lon from a bearing/distance, we need a starting point

            var self = this;

            var bearingOptionsDiv = domConstruct.create("div", { style: "display:none;" });
            var bearingLabel = domConstruct.create("label", { innerHTML: "Initial Bearing" }, bearingOptionsDiv);
            this.initialBearingTextBox = new TextBox({
                trim: true,
                onKeyUp: lang.hitch(this, this._calculateDestination)
            });
            domConstruct.place(this.initialBearingTextBox.domNode, bearingOptionsDiv);


            this.distanceLabel = domConstruct.create("label", { innerHTML: "Distance (" + this.distanceAbbr + ")" }, bearingOptionsDiv);
            this.distanceTextBox = new TextBox({
                trim: true,
                onKeyUp: lang.hitch(this, this._calculateDestination),
                style: "width: 75px;"
            });
            domConstruct.place(this.distanceTextBox.domNode, bearingOptionsDiv);
            domConstruct.place(bearingOptionsDiv, this.domNode);

            this.bearingOptionsDiv = bearingOptionsDiv;

            this.pointFromBrnDst = new SimpleButton({
                leftIconClass: "icon-pencil",
                tooltip: "Define a point using bearing/distance",
                toggleable: true,
                onClick: function () {
                    if (self.pointFromBrnDst.checked && !self.prev || !self.prev.point) {
                        Common.errorDialog("To provide a bearing/distance, your previous point must be defined");
                        self.set("bearingDistMode", false);
                        return;
                    }

                    // remove previous map event
                    self._removeMapClickEvent();
                    self.pointFromMapButton.set("checked", false);

                    if (self.pointFromBrnDst.checked) {
                        self.set("bearingDistMode", true);
                        self.locationTextBox.set("readonly", true);
                        domStyle.set(self.bearingOptionsDiv, { display: "block" });
                    }
                    else {
                        self.locationTextBox.set("readonly", false);
                        self.set("bearingDistMode", false);
                        domStyle.set(self.bearingOptionsDiv, { display: "none" });
                    }
                }
            }, this.pointFromBrnDst);
            this.pointFromBrnDst.placeAt(this.pointFromMapButton, 'after');
        },
        setEventsAndWatches: function () {
            var self = this;

            // Watches
            this.watch("prev", function (name, oldVal, newVal) {
                if (newVal && !self.pointFromBrnDst) {
                    self._enableBrnDst();
                }
                else if(!newVal && self.pointFromBrnDst) {
                    self.pointFromBrnDst.destroy();
                }
            });

            this.watch("bearingDistMode", function (name, oldVal, newVal) {
                self.bearingDistMode = newVal;
                self.pointFromBrnDst.set("checked", newVal);
            });

            // Subscriptions
            connect.subscribe("waypoint-acquireMap", function (wayPoint) {
                if (wayPoint != self) {
                    self.pointFromMapButton.set("checked", false);
                    self._removeMapClickEvent();
                }
            });
            connect.subscribe("map-lock", function (locked) {
                if (!locked) {
                    self.locationTextBox.set("readonly", false);
                    self.pointFromMapButton.set("disabled", false);
                    self.pointFromZoomXY.set("disabled", false);
                    if (self.prev) {
                        self.pointFromBrnDst.set("disabled", false);
                    }
                }
            });
        },
        _removeMapClickEvent: function(){
            if (this._mapClickEvent) {
                this._mapClickEvent.remove();
            }
        },
        _pointFromMap: function () {
            connect.publish("waypoint-acquireMap", this);
            this._mapClickEvent = on(this.map, "click", lang.hitch(this, function (evt) {
                this.point = evt.mapPoint;
                this._updateLocTextBoxFromPoint(evt.mapPoint);

                this.emit("point-updated", this);
            }));
        },
        _parseLonLat: function (text) {
            // get legal bounds of decimal degrees
            var latLon = text.split(" ");
            if (latLon.length != 2) {
                this.point = null;
                return;
            }

            var lat = parseFloat(latLon[0]),
                lon = parseFloat(latLon[1]);

            if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon > 180 || lat < -180) {
                this.point = null;
                return;
            }

            var newPoint = new Point(lon, lat, this.map.spatialReference);
            newPoint.setLatitude(lat);
            newPoint.setLongitude(lon);
            this.point = newPoint;
            this.emit("point-updated", this);
        },
        _calculateDestination: function(){
            var brng = mathUtils.formattedBearingToDegrees(this.initialBearingTextBox.displayedValue) || parseFloat(this.initialBearingTextBox.displayedValue),
                d = parseFloat(this.distanceTextBox.displayedValue);

            // TODO: Parse bearing according to abbreviated syntax and look for proper bounds
            if (isNaN(brng) || isNaN(d) || d <= 0 || brng < 0 || brng > 360) {
                return;
            }

            var pt = mathUtils.calculateDestinationPoint(this.prev.point, brng, d, this.distanceUnits);
            if (pt) {
                pt = webMercatorUtils.geographicToWebMercator(pt);
                this._updateLocTextBoxFromPoint(pt);
                this.point = pt;
                this.emit("point-updated", this);
            }
        },
        setDistanceUnits: function(distanceUnits, unitAbbr){
            this.distanceUnits = distanceUnits;
            this.distanceAbbr = unitAbbr;

            if (this.pointFromBrnDst) {
                this.distanceLabel.innerHTML = "Distance (" + this.distanceAbbr + ")";
                this._calculateDestination();
            }
        },
        getPointFromZoomToXY: function () {
            var dialog = common.showWidgetInDialog(ZoomToXY, { map: map }, { title: "Get Point" });
            on(dialog.content, "point-created", lang.hitch(this, function (pt) {
                this._updateLocTextBoxFromPoint(pt);
            }));
        },
        _updateLocTextBoxFromPoint: function(pt){
            this.locationTextBox.set("value", pt.getLatitude().toFixed(4) + " " + pt.getLongitude().toFixed(4));
        },
        hasNext: function(){
            if(this.next){
                return true;
            }
            return false;
        },
        hasPrev: function(){
            if(this.prev){
                return true;
            }
            return false;
        }
    });

    return Azimuth;
});