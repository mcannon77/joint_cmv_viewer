console.log("wvs/dijits/ZoomToXY.js");

define([
      "dojo/_base/declare",
      "dojo/_base/array",
      "dojo/dom-attr",
      "dojo/dom-style",
      "dojo/dom",
      "dojo/on",
      "dijit/_WidgetBase",
      "dijit/_TemplatedMixin",
      "dojo/text!../templates/ZoomToXY.html",
      "dojo/_base/lang",
      "dojo/dom-construct",
      "esri/symbols/PictureMarkerSymbol",
      "esri/SpatialReference",
      "esri/geometry/Point",
      "esri/graphic",
      "dijit/form/Select",
      "dijit/form/TextBox",
      "dijit/form/Button",
      "dijit/form/FilteringSelect",
      "dojo/Evented",
      "../proj4js/main",
      "dojo/query",
      "dojo/store/Memory",
      "../utilities/usng-amd"
], function (
        declare,
        array,
        domAttr, 
        domStyle, 
        dom, 
        on,
        _WidgetBase, 
        _TemplatedMixin, 
        template, 
        lang,
        domConstruct, 
        PictureMarkerSymbol, 
        SpatialReference, 
        Point, 
        Graphic, 
        Select, 
        TextBox, 
        Button,
        FilteringSelect,
        Evented,
        Proj4js,
        query,
        Memory,
        usng
    ) {
    // module:
    //      wvs/dijits/ZoomToXY
    return declare([_WidgetBase, _TemplatedMixin, Evented], {

        templateString: template,

        declaredClass: "wvs.dijits.ZoomToXY",

        _units: null,

        //default marker for display of point
        _marker: null,

        //default spatial reference for the XY coordinates when a new point object is created.
        _spatRef: null,

        map: null,

        /*
            @param params hash of properties to be mixed in to the widget.
        */
        constructor: function (params, srcNodeRef) {
            this.marker = new PictureMarkerSymbol('./images/green.png', 19, 32);

            this._spatRef = new SpatialReference(4326);

            lang.mixin(this, {
                _eventHandles: [],
                nodes: []
            });

            params = params || {};
            if (!params.map) {
                throw new Error('Map not defined in params for Toc');
            }

            this.map = params.map;
            
            lang.mixin(this, params);

        },
        postCreate: function () {
            var self = this;

            var unitOptions = [ { value: "dd", label: "Decimal Degrees"},
                    { value: "dms", label: "Degrees, Minutes, Seconds"},
                    { value: "ddm", label: "Degrees, Decimal Minutes" },
                    { value: "mgrs", label: "MGRS"},
                    { value: "mu", label: "Map Units"}
            ];

            //Allow the configured projections to be used in the window
            if (this._projections != undefined) {
                for (var i = 0; i < this._projections.length; i++) {
                    unitOptions.push({
                        value: i.toString(),
                        label: this._projections[i].name
                    });
                }
            }
            this.UnitSelect = new Select({
                options: unitOptions,
                onChange: function () {
                    self._setUnits(this.get("value"));
                }
            }, this.UnitSelect);

            // Create form widgets

            // Decimal Degrees
            this.ZoomToXY_ddLatDeg = new TextBox({ value: "", style: "width:150px" }, this.ZoomToXY_ddLatDeg);
            this.ZoomToXY_ddLongDeg = new TextBox({ value: "", style: "width:150px" }, this.ZoomToXY_ddLongDeg);

            // Degrees, Minutes, _and_ Seconds
            this.ZoomToXY_latDeg = new TextBox({ value: "", style: "width:45px" }, this.ZoomToXY_latDeg);
            this.ZoomToXY_latMin = new TextBox({ value: "", style: "width:45px" }, this.ZoomToXY_latMin);
            this.ZoomToXY_latSec = new TextBox({ value: "", style: "width:45px" }, this.ZoomToXY_latSec);
            this.ZoomToXY_latQuad = new Select({ options: [{ value: "N", label: "N", selected: true }, { value: "S", label: "S" }], style: "width:45px" }, this.ZoomToXY_latQuad);

            this.ZoomToXY_longDeg = new TextBox({ value: "", style: "width:45px" }, this.ZoomToXY_longDeg);
            this.ZoomToXY_longMin = new TextBox({ value: "", style: "width:45px" }, this.ZoomToXY_longMin);
            this.ZoomToXY_longSec = new TextBox({ value: "", style: "width:45px" }, this.ZoomToXY_longSec);
            this.ZoomToXY_longQuad = new Select({ options: [{ value: "E", label: "E" }, { value: "W", label: "W", selected: true }], style: "width:45px" }, this.ZoomToXY_longQuad);

            // MGRS
            this._createMGRS();

            // Map Units
            this.ZoomToXY_x = new TextBox({ value: "", style: "width:150px" }, this.ZoomToXY_x);
            this.ZoomToXY_y = new TextBox({ value: "", style: "width:150px" }, this.ZoomToXY_y);

            this.ZoomToXY_btnSubmit = new Button({ label: "Go", onClick: lang.hitch(this, this._submitCoords) }, this.ZoomToXY_btnSubmit);
            lang.setObject("window.zoomto", this);
            //Lon (X): -78.07075 Lat (Y): 37.25038    Lon (X): 79º 02' 15.17"W  Lat (Y): 37º 21' 18.88"N      Lon (X): 79º 10.16311' W  Lat (Y): 37º 15.02273' N\
            //Decimal DegreesLon (X): -77.47966 Lat (Y): 37.53195
            //Degrees Min SecLon (X): 77º 26' 51.21"W  Lat (Y): 37º 31' 55.03"N
            //Degrees & MinLon (X): 77º 24.83997' W  Lat (Y): 37º 31.63112' N
        },
        setMap: function (map) {
            // summary:
            //      Sets a new map to be operated on by the widget.
            // map: Map
            //      a map instance
            this.map = map;
        },
        _setUnits: function (unit) {
            // summary:
            //      This function handles changes on the units dropdown menu, defining which set of inputs the user will use to define the new center of the map.
            this._units = unit;
            var nl = query("[data-coordinate-type]", this.domNode);
            array.forEach(nl, function (n) {
                // display based on our unit and coordinate type
                domStyle.set(n, 'display', array.some(domAttr.get(n, "data-coordinate-type").split("|"), function (c) { return c === unit; }) ? 'inline' : 'none');
                // search for 'subfields' to see if they should display
                array.forEach(query("[data-coordinate-subfield]", n), function (c) {
                    domStyle.set(c, 'display', array.some(domAttr.get(c, "data-coordinate-subfield").split("|"), function (sf) { return sf === unit; }) ? 'inline' : 'none');
                });
            }, this);
        },
        _submitCoords: function (evt) {
            // summary: 
            //      The function which fires when a users clicks 'GO'. (or, soon when the user hits enter from a textbox input). It calculates the
            //      new center to the map and fires the centerAndZoom function.
            //      Alerts thrown when invalid values are put in the textbox inputs.
            var x, y, _point;
            switch (this.UnitSelect.value) {
                case "dms":
                    var latDeg = parseInt(this.ZoomToXY_latDeg.value, 10);
                    var latMin = parseInt(this.ZoomToXY_latMin.value, 10);
                    var latSec = parseFloat(this.ZoomToXY_latSec.value, 10);
                    var longDeg = parseInt(this.ZoomToXY_longDeg.value, 10);
                    var longMin = parseInt(this.ZoomToXY_longMin.value, 10);
                    var longSec = parseFloat(this.ZoomToXY_longSec.value, 10);

                    if (isNaN(latDeg) || isNaN(latMin) || isNaN(latSec) || isNaN(longDeg) || isNaN(longMin) || isNaN(longSec)) {
                        alert("Invalid");
                        return;
                    }

                    x = this._toDecimalDegrees(longDeg, longMin, longSec, this.ZoomToXY_longQuad.value);
                    y = this._toDecimalDegrees(latDeg, latMin, latSec, this.ZoomToXY_latQuad.value);

                    _point = new Point({ "x": x, "y": y, "spatialReference": this._spatRef });
                    break;
                case "ddm":
                    var latDeg = parseInt(this.ZoomToXY_latDeg.value, 10);
                    var latMin = parseInt(this.ZoomToXY_latMin.value, 10);
                    var latSec = 0;
                    var longDeg = parseInt(this.ZoomToXY_longDeg.value, 10);
                    var longMin = parseInt(this.ZoomToXY_longMin.value, 10);
                    var longSec = 0;

                    if (isNaN(latDeg) || isNaN(latMin) || isNaN(longDeg) || isNaN(longMin)) {
                        alert("Invalid");
                        return;
                    }

                    x = this._toDecimalDegrees(longDeg, longMin, longSec, this.ZoomToXY_longQuad.value);
                    y = this._toDecimalDegrees(latDeg, latMin, latSec, this.ZoomToXY_latQuad.value);

                    _point = new Point({ "x": x, "y": y, "spatialReference": this._spatRef });
                    break;
                case "dd":
                    y = parseFloat(this.ZoomToXY_ddLatDeg.value);
                    x = parseFloat(this.ZoomToXY_ddLongDeg.value);

                    if (isNaN(y) || isNaN(x)) {
                        alert("Invalid");
                        return;
                    }
                    _point = new Point({ "x": x, "y": y, "spatialReference": this._spatRef });
                    break;
                case "mu":
                    x = parseFloat(this.ZoomToXY_x.value);
                    y = parseFloat(this.ZoomToXY_y.value);

                    if (isNaN(y) || isNaN(x)) {
                        alert("Invalid");
                        return;
                    }
                    _point = new Point({ "x": x, "y": y, "spatialReference": this._spatRef });
                    break;
                case "mgrs":
                    var utmZone = this.mgrs_utmZone.value,
                        latBand = this.mgrs_latitudeBand.value,
                        col = this.mgrs_squareIdCol.value,
                        row = this.mgrs_squareIdRow.value,
                        easting = this.mgrs_easting.value,
                        northing = this.mgrs_northing.value;

                    if (!utmZone || !latBand) {
                        alert("You must have a grid zone designation");
                        return;
                    }
                    if ((col && !row) || (!col && row)) {
                        alert("a column and row must be designated if specifying a 100m square ID");
                        return;
                    }
                    if ((easting.length != northing.length) || (easting.length && isNaN(parseInt(easting))) || (northing.length && isNaN(parseInt(northing))) || easting.length > 5 || northing.length > 5) {
                        alert("easting and northing must be the same amount of digits and no more than 5 digits");
                        return;
                    }
                    var latlon = [];
                    usng.USNGtoLL(utmZone + latBand + col + row + easting + northing, latlon);
                    _point = new Point(latlon[1], latlon[0], this._spatRef );
                    break;
                default:
                    x = parseFloat(this.ZoomToXY_x.value.replace(/,/g, ''));
                    y = parseFloat(this.ZoomToXY_y.value.replace(/,/g, ''));

                    if (isNaN(x) || isNaN(y)) {
                        alert("Invalid");
                        return;
                    }

                    _point = new Point({ "x": x, "y": y, "spatialReference": this._spatRef });
                    break;
            }

            //on.once(this.map, 'zoom-start', lang.hitch(this, function () {
            //    on.once(this.map, 'zoom-end', lang.hitch(this, function () { this.map.infoWindow.show(_point); }));
            //}));
            var tmpP = { x: _point.x, y: _point.y };
            Proj4js.transform(_point.spatialReference.toProj4js(), this.map.spatialReference.toProj4js(), tmpP);
            this.emit("point-created", new Point(tmpP.x, tmpP.y, this.map.spatialReference));
            //this.map.centerAndZoom(_point, 15);
            //var graphic = new Graphic(_point, this._marker, null, null);
            //this.map.graphics.add(graphic);
            //this.map.infoWindow.show(_point);
        },
        _toDecimalDegrees: function (degrees, minutes, seconds, quadrasphere) {
            // summary:
            //      Private utility function to calculate proper X/Y coordinates for each possible set of map coordinates the user could input.
            // degrees: Number
            // minutes: Number
            // seconds: Number
            // quad: String
            var d = Math.abs(degrees);
            if (quadrasphere == "W" || quadrasphere == "S") {
                d = d * -1;
            }

            if (d < 0) {
                var azi = -1.0 * d + 1.0 * minutes / 60.0 + 1.0 * seconds / 3600.0;
                return -1.0 * azi;
            }
            else {
                var azi = 1.0 * d + 1.0 * minutes / 60.0 + 1.0 * seconds / 3600.0;
                return azi;
            }
        },
        _createMGRS: function () {
            // EIS: Implemented by reading http://en.wikipedia.org/wiki/Military_grid_reference_system
            var utmZoneRange = [1, 60], // inclusive range
                latitudeBandLetters = "CDEFGHJKLMNPQRSTUVWXYZ",
                squareCol = "ABCDEFGHJKLMNPQRSTUVWXYZ",
                squareRow = "ABCDEFGHJKLMNPQRSTUV",
                precisionRange = [1, 5];

            // create options for gzd
            var utmZones = [];
            for (var i = utmZoneRange[0]; i <= utmZoneRange[1]; i++) {
                utmZones.push({ name: i, id: i });
            };

            this.mgrs_utmZone = new FilteringSelect({
                store: new Memory({ data: utmZones})
            }, this.mgrs_utmZone);

            var latitudeBands = [];
            array.forEach(latitudeBandLetters, function (c) {
                latitudeBands.push({ name: c, id: c });
            });

            this.mgrs_latitudeBand = new FilteringSelect({
                store: new Memory({ data: latitudeBands})
            }, this.mgrs_latitudeBand);

            var squareColumns = [];

            array.forEach(squareCol, function (c) {
                squareColumns.push({ name: c, id: c });
            });

            this.mgrs_squareIdCol = new FilteringSelect({
                store: new Memory({ data: squareColumns})
            }, this.mgrs_squareIdCol);

            var squareRows = [];

            array.forEach(squareRow, function (r) {
                squareRows.push({ name: r, id: r });
            });

            this.mgrs_squareIdRow = new FilteringSelect({
                store: new Memory({ data: squareRows})
            }, this.mgrs_squareIdRow);

            this.mgrs_easting = new TextBox({}, this.mgrs_easting);
            this.mgrs_northing = new TextBox({}, this.mgrs_northing);

        }

    });
});