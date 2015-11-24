console.log("wvs/common/Converter.js");
define([
    "dojo/_base/lang"
    , "./main"
    , "esri/units" 
    , "esri/geometry/Point"
    , "esri/SpatialReference"
    , "./Constants"
    ],
    function (lang, Proj4js, Units, Point, SpatialReference, Constants) {
        // module:
        //		wvs/common/Converter
        // description:
        //      A utility object used for conversions
        return {
            convertUnits: function (distance, fromUnits, toUnits) {
                // summary:
                //      Converts a distance from one unit to another
                // distance: Number
                //      The value that will be converted
                // fromUnits: Unit
                //      The source units of the distance
                // toUnits: Unit
                //      The destination units of the distance
                // returns:
                //      converted value
                var _mDistance = distance;
                if (fromUnits == toUnits) {
                    _mDistance = distance;
                } else {
                    switch (fromUnits) {
                        case Units.FEET:
                            switch (toUnits) {
                                case Units.MILES:
                                    _mDistance = distance / 5280;
                                    break;
                                case Units.METERS:
                                    _mDistance = distance * 0.304800609601;
                                    break;
                                case Units.KILOMETERS:
                                    _mDistance = distance * 0.000304800609;
                                    break;
                            }
                            break;
                        case Units.METERS:
                            switch (toUnits) {
                                case Units.MILES:
                                    _mDistance = distance * 0.0006213700922;
                                    break;
                                case Units.FEET:
                                    _mDistance = distance * 3.280839895;
                                    break;
                                case Units.KILOMETERS:
                                    _mDistance = distance / 1000;
                                    break;
                            }
                            break;
                        case Units.DECIMAL_DEGREES:
                               
                            break;
                        case Units.KILOMETERS:
                            switch (toUnits) {
                                case Units.MILES:
                                    _mDistance = distance * 0.6213700922;
                                    break;
                                case Units.FEET:
                                    _mDistance = distance * 3280.839895;
                                    break;
                                case Units.METERS:
                                    _mDistance = distance * 1000;
                                    break;
                            }

                        case Units.MILES:
                            switch (toUnits) {
                                case Units.FEET:
                                    _mDistance = distance / 5280;
                                    break;
                                case Units.METERS:
                                    _mDistance = distance / 0.0006213700922;
                                    break;
                                case Units.KILOMETERS:
                                    _mDistance = distance / 0.6213700922;
                                    break;
                            }
                    }
                }
                return _mDistance;
            },
            calcGreatCircleDistance: function(fromPoint, toPoint, units)
            {
                // summary:
                //      Calculates the Great-circle distance between two points in a specific unit. For more information, review http://en.wikipedia.org/wiki/Great-circle_distance
                // fromPoint: Point
                //      the source point
                // toPoint: Point
                //      the destination point
                // return:
                //      The Great-circle distance between the two points
                if (!units) {
                    units = Units.FEET;
                }
    
                // use great circle formula
                var lat1 = this.degreesToRadians(fromPoint.y);
                var lat2 = this.degreesToRadians(toPoint.y);
                var lon1 = this.degreesToRadians(fromPoint.x);
                var lon2 = this.degreesToRadians(toPoint.x);
                var lonDist = lon1 - lon2;
                var latDist = lat1 - lat2;
                var distance = Math.pow(Math.sin(latDist / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(lonDist / 2), 2);
                distance = 2 * Math.asin(Math.min(1, Math.sqrt(distance)));
                distance = (3963 - 13 * Math.sin((lat1 + lat2) / 2)) * distance;

                var feetDistance = distance * 5280; 
                var convertedValue = this.convertUnits(feetDistance, Units.FEET, units);
                return convertedValue;
            },
            degreesToRadians: function (degrees) {
                // summary:
                //      Convert degrees to radians
                // degrees: Number
                //      The degrees value to convert
                // return:
                //      the radians representation of the input degrees
                return (degrees * Math.PI / 180);
            },
            radiansToDegrees: function (radians) {
                // summary:
                //      Convert radians to degrees
                // radians: Number
                //      The radian to convert
                // return:
                //      the degree representation of the input radians
                return radians * 180 / Math.PI;
            },
            radiansToBearingDegrees: function(radians){
                // summary:
                //      Convert radians to bearing degreees
                // radians: Number
                //      Radians to convert
                // return:
                //      the bearing degrees representation of the input radians
                return (this.radiansToDegrees(radians) + 360) % 360;
            },
            calculateDistanceByHaversine: function (lat1, lon1, lat2, lon2) {
                // summary:
                //      Use Haversine formula to Calculate distance (in km) between two points specified by latitude/longitude (in numeric degrees)
                var dLat = this.degreesToRadians(lat2 - lat1);
                var dLon = this.degreesToRadians(lon2-lon1);
                lat1 = this.degreesToRadians(lat1.toRad()), lat2 = this.degreesToRadians(lat2.toRad());

                var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                var d = Constants.EARTH_RADIUS_IN_KILOMETERS * c;
                return d;
            },
            mapUnitPointToDDPoint: function (map, point, clone) {
                // summary:
                //      Converts a point in map units to a decimal-degree point
                // map: Map
                //      an instance of an esri map
                // point: Point
                //      the point to convert
                // clone: boolean
                //      whether to clone the point before conversion
                // return:
                //      the converted point, or undefined if conversion fails
                if (clone === undefined || clone == null) {
                    clone = true;
                }

                var v_point;
                var _wgs84SpatialReference = new SpatialReference({ wkid: 4326 });
                var _mapUnitProj = map.spatialReference.toProj4js();

                if (_mapUnitProj) {
                    if (clone) {
                        v_point = new Point(point.x, point.y, map.spatialReference);
                    } else {
                        v_point = point;
                    }

                    if (_mapUnitProj.units != "degrees") {
                        Proj4js.transform(_mapUnitProj, _wgs84SpatialReference.toProj4js(), v_point);
                    }
                    return v_point;  // Point
                }
            },
            stringToDMS: function(string){
                if (!isNaN(string)) return Number(string); // signed decimal degrees without NSEW

                var degLL = string.replace(/^-/, '').replace(/[NSEW]/i, ''); // strip off any sign or compass dir'n
                var dms = degLL.split(/[^0-9.]+/); // split out separate d/m/s
                for (var i in dms) if (dms[i] == '') dms.splice(i, 1); // remove empty elements (see note below)
                switch (dms.length) { // convert to decimal degrees...
                    case 3: // interpret 3-part result as d/m/s
                        var deg = dms[0] / 1 + dms[1] / 60 + dms[2] / 3600; break;
                    case 2: // interpret 2-part result as d/m
                        var deg = dms[0] / 1 + dms[1] / 60; break;
                    case 1: // decimal or non-separated dddmmss
                        if (/[NS]/i.test(string)) degLL = '0' + degLL; // - normalise N/S to 3-digit degrees
                        var deg = dms[0].slice(0, 3) / 1 + dms[0].slice(3, 5) / 60 + dms[0].slice(5) / 3600; break;
                    default: return NaN;
                }
                if (/^-/.test(string) || /[WS]/i.test(string)) deg = -deg; // take '-', west and south as -ve
                return deg;
            },
            numberToDMS: function (number) {
                // summary:
                //      Converts a number to a degrees-minutes-seconds string
                // number: Number
                //      the number to convert
                // returns:
                //      a formatted string representing degrees-minutes-seconds
                var d = Math.abs(number); // (unsigned result ready for appending compass dir'n)
                d += 1/7200; // add ½ second for rounding
                var deg = Math.floor(d);
                var min = Math.floor((d-deg)*60);
                var sec = Math.floor((d-deg-min/60)*3600);
                // add leading zeros if required
                if (deg < 100) deg = '0' + deg; if (deg < 10) deg = '0' + deg;
                if (min < 10) min = '0' + min;
                if (sec < 10) sec = '0' + sec;
                return deg + '\u00B0' + min + '\u2032' + sec + '\u2033';
            },
            numberToLat: function(number){
                // summary:
                //      Converts a number to deg/min/sec latitude in numeric degrees
                // number: Number
                //      the number to convert
                // returns:
                //      a formatted string representing deg/min/sec latitude
                return this.numberToDMS(number).slice(1) + (number < 0 ? 'S' : 'N');
            },
            numberToLon: function (number) {
                // summary:
                //      Converts a number to deg/min/sec longitude in numeric degrees
                // number: Number
                //      the number to convert
                // returns:
                //      a formatted string representing deg/min/sec longitude
                return this.numberToDMS(number) + (number > 0 ? 'E' : 'W');
            },
            numberToPrecision: function(number, fig){
                if (number == 0) return 0; // trailing zeros in place of exponential notation
                var scale = Math.ceil(Math.log(number) * Math.LOG10E);
                var mult = Math.pow(10, fig - scale);
                return Math.round(number * mult) / mult;
            },
            ddPointToMapUnitPoint: function (map, point, clone) {
                // summary:
                //      Converts a point in decimal degrees to map units
                // map: Map
                //      an instance of an esri map
                // point: Point
                //      the point to convert
                // clone: boolean
                //      whether to clone the point before conversion
                // return:
                //      the converted point, or undefined if conversion fails
                if (clone === undefined || clone == null) {
                    clone = true;
                }

                var v_point;
                var _wgs84SpatialReference = new SpatialReference({ wkid: 4326 });
                var _mapUnitProj = map.spatialReference.toProj4js();

                if (_mapUnitProj) {

                    if (clone) {
                        v_point = new Point(point.x, point.y, map.spatialReference);
                    } else {
                        v_point = point;
                    }
        
                    if (_mapUnitProj.units != "degrees") {
                        Proj4js.transform(_wgs84SpatialReference.toProj4js(), _mapUnitProj, v_point);
                    }
                    return v_point; // Point
                }
            },
            DDtoDegreesDecimalMinutes: function (decimalDegree, axis, plainText, useAltformat) {
                if (plainText == null)
                    plainText = false;

                if (useAltformat == null)
                    useAltformat = false;

                var dd = parseFloat(decimalDegree);
                if (dd < 0) dd = dd * -1;
                var deg = Math.floor(dd);
                dd = dd - deg;
                var min = dd / (1 / 60);  //Math.floor(dd / (1 / 60));

                //var av = dd - min / 60;
                //var sec = (Math.floor((av / (1 / 3600)) * 100)) / 100;
                //if (sec == 60) {
                //    min++;
                //    sec = 0;
                //}

                if (min == 60) {
                    deg++;
                    min = 0;
                }
                var quadrasphere;
                if (axis == "x") {
                    if (parseFloat(decimalDegree) < 0) {
                        quadrasphere = "W";
                    } else {
                        quadrasphere = "E";
                    }
                }
                else {
                    if (parseFloat(decimalDegree) < 0) {
                        quadrasphere = "S";
                    } else {
                        quadrasphere = "N";
                    }
                }

                min = min.toFixed(5);
                var _result = "";

                if (useAltformat) {
                    if (plainText) {
                        if (deg < 10) deg = "  //" + deg;
                        //else if (deg < 100) deg = " " + deg;
                        //if (sec < 10) sec = '0' + sec;
                        if (min < 10) min = '0' + min;
                        _result = quadrasphere + deg + "-" + min;
                    } else {
                        //if (deg < 10) deg = "&nbsp;&nbsp;" + deg;
                        //else if (deg < 100) deg = "&nbsp;" + deg;
                        //if (sec < 10) sec = '0' + sec;
                        if (min < 10) min = '0' + min;
                        _result = quadrasphere + deg + "-" + min;
                    }
                } else {
                    if (plainText) {
                        if (deg < 10) deg = "  " + deg;
                        else if (deg < 100) deg = " " + deg;
                        //if (sec < 10) sec = '0' + sec;
                        if (min < 10) min = '0' + min;
                        _result = deg + "&#186; " + min + "' " + quadrasphere;
                    } else {
                        if (deg < 10) deg = "&nbsp;&nbsp;" + deg;
                        else if (deg < 100) deg = "&nbsp;" + deg;
                        //if (sec < 10) sec = '0' + sec;
                        if (min < 10) min = '0' + min;
                        _result = deg + "&#186; " + min + "' " + quadrasphere;
                    }
                }

                return _result;
            },
            DDtoDegreesMinutesSeconds: function (decimalDegree, axis, plainText) {
                if (plainText == null)
                    plainText = false;

                var dd = parseFloat(decimalDegree);
                if (dd < 0) dd = dd * -1;
                var deg = Math.floor(dd);
                dd = dd - deg;
                var min = Math.floor(dd / (1 / 60));
                var av = dd - min / 60;
                var sec = (Math.floor((av / (1 / 3600)) * 100)) / 100;
                if (sec == 60) {
                    min++;
                    sec = 0;
                }
                if (min == 60) {
                    deg++;
                    min = 0;
                }
                var quadrasphere;
                if (axis == "x") {
                    if (parseFloat(decimalDegree) < 0) {
                        quadrasphere = "W";
                    } else {
                        quadrasphere = "E";
                    }
                }
                else {
                    if (parseFloat(decimalDegree) < 0) {
                        quadrasphere = "S";
                    } else {
                        quadrasphere = "N";
                    }
                }

                if (plainText) {
                    sec = sec.toFixed(2);
                    if (deg < 10) deg = "  " + deg;
                    else if (deg < 100) deg = " " + deg;
                    if (sec < 10) sec = '0' + sec;
                    if (min < 10) min = '0' + min;
                    return deg + "° " + min + "' " + sec + "\"" + quadrasphere;
                } else {
                    sec = sec.toFixed(2);
                    if (deg < 10) deg = "&nbsp;&nbsp;" + deg;
                    else if (deg < 100) deg = "&nbsp;" + deg;
                    if (sec < 10) sec = '0' + sec;
                    if (min < 10) min = '0' + min;
                    return deg + "&#186; " + min + "' " + sec + "\"" + quadrasphere;
                }
        }
        };
});

