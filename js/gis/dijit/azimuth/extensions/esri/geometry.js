define([
    "dojo/_base/lang",
    "esri/geometry/mathUtils",
    "esri/geometry/webMercatorUtils",
    "../../common/Converter",
    "../../common/Constants",
    "esri/geometry/Point",
    "esri/units",
    "esri/map"
], function (lang, mathUtils, webMercatorUtils, Converter, Constants, Point, Units) {
    //NOTE: Using lang.extend() does not work with the esri.geometry object so instead manually extend it.

        
        lang.mixin(mathUtils, {

            buildBufferPointArray: function(map, mapUnitCenterPoint, radius, units, numPoints) {
                var ddCenterPoint = Converter.mapUnitPointToDDPoint(map, mapUnitCenterPoint),
                    outArray = [],
                    increment = 0,
                    counter = 0,
                    kmRadius = Converter.convertUnits(radius, units, Units.KILOMETERS);
    
                while (increment < 360) {
                    var ddBearingEndPoint = this.calcDestinationDDPointByBearingAndDistance_Km(ddCenterPoint, kmRadius, increment);
                    var mapUnitBearingEndPoint = Converter.ddPointToMapUnitPoint(map, ddBearingEndPoint);
        
                    outArray[counter] = mapUnitBearingEndPoint;

                    counter++;
                    increment += (360 / numPoints);
                }

                //create last point to "close" the ring
                outArray[counter] = outArray[0];

                return outArray;
            },
            getInitialBearing: function (p1, p2) {

                var _p1 = webMercatorUtils.webMercatorToGeographic(p1);
                var _p2 = webMercatorUtils.webMercatorToGeographic(p2);

                var lon1 = _p1.x;
                var lat1 = _p1.y;
                var lon2 = _p2.x;
                var lat2 = _p2.y;

                //console.log("fromPoint:" + _l.fromPoint.toString());
                //console.log("toPoint:" + _l.toPoint.toString());

                lat1 = Converter.degreesToRadians(lat1); lat2 = Converter.degreesToRadians(lat2);
                var dLon = Converter.degreesToRadians(lon2 - lon1);

                var y = Math.sin(dLon) * Math.cos(lat2);
                var x = Math.cos(lat1) * Math.sin(lat2) -
                        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
                return Converter.radiansToBearingDegrees(Math.atan2(y, x));
            },
            getFinalBearing: function(p1, p2){
                var _p1 = webMercatorUtils.webMercatorToGeographic(p1);
                var _p2 = webMercatorUtils.webMercatorToGeographic(p2);

                //calc from end point to start point
                var lon2 = _p1.x;
                var lat2 = _p1.y;
                var lon1 = _p2.x;
                var lat1 = _p2.y;

                lat1 = Converter.degreesToRadians(lat1); lat2 = Converter.degreesToRadians(lat2);
                var dLon = Converter.degreesToRadians(lon2 - lon1);

                var y = Math.sin(dLon) * Math.cos(lat2);
                var x = Math.cos(lat1) * Math.sin(lat2) -
                        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
                var bearing = Converter.radiansToBearingDegrees(Math.atan2(y, x));

                //return bearing;

                //reverse the bearing
                return (bearing + 180) % 360;
            },
            formattedBearingToDegrees: function (formattedBearing) {
                // summary:
                //      takes a formatted bearing (N 70E) and converts it to its decimal representation
                var bearingArr = formattedBearing.match(/([ns])\s?([0-9]{1,3}(\.[0-9]+)?)([ew])/i);
                var bearing = 0;
                if (bearingArr && bearingArr.length >= 4) {
                    var latDir = bearingArr[1].toLowerCase(),
                        lonDir = bearingArr[bearingArr.length === 4 ? 3 : 4].toLowerCase(),
                        angle = parseFloat(bearingArr[2]);
                    if (latDir === "n" && lonDir === "e" && angle <= 90) {
                        return angle;
                    }
                    else if (latDir === "n" && lonDir === "w" && angle <= 90) {
                        return 360 - angle;
                    }
                    else if (latDir === "s" && lonDir === "w" && angle <= 90) {
                        return angle + 180;
                    }
                    else if (latDir === "s" && lonDir === "e" && angle <= 90) {
                        return 180 - angle;
                    }
                }
                
                return null;
            },
            formatCompassBearing: function(bearing, significantDigits) {
                if (bearing < 0 || bearing > 360) {
                    return "error: " + bearing + " is an invalid bearing";
                }

                if (significantDigits = null) {
                    significantDigits = 2;
                }

                var LatDir = "";
                var LonDir = "";
                var angle = 0;
    
                if (bearing <= 90) {
                    LatDir = "N";
                    LonDir = "E";
                    angle = bearing;
                }
                else if (bearing <= 180) {
                    LatDir = "S";
                    LonDir = "E";
                    angle = 90 - (bearing-90);
                }
                else if (bearing <= 270) {
                    LatDir = "S";
                    LonDir = "W";
                    angle = bearing - 180;
                } else {
                    LatDir = "N";
                    LonDir = "W";
                    angle = 360 - bearing;
                }
    
                //round to specified significant digits
                var roundFactor = Math.pow(10, significantDigits);
                angle = Math.round(angle * roundFactor) / roundFactor;

                return LatDir + " " + angle + "&#186;" + LonDir;
            },
            calculateDistanceByCosineLaw: function(lat1, lon1, lat2, lon2) {
                var d = Math.acos(Math.sin(lat1.toRad())*Math.sin(lat2.toRad()) +
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.cos((lon2 - lon1).toRad())) * Constants.EARTH_RADIUS_IN_KILOMETERS;
                return d;
            },
            calculateBearing: function (lat1, lon1, lat2, lon2) {
                lat1 = Converter.degreesToRadians(lat1); lat2 = Converter.degreesToRadians(lat2);
                var dLon = Converter.degreesToRadians(lon2 - lon1);

                var y = Math.sin(dLon) * Math.cos(lat2);
                var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
                return Converter.radiansToBearingDegrees(Math.atan2(y, x));
            },
            calculateDestinationPoint: function (point, bearing, distance, units) {
                // summary:
                //      get a destination point from a point (lat/lon), bearing (decimal degrees) and distance (km)
                // point: Point
                //      a point in a geographic or Web Mercator projection
                // bearing: Number
                //      bearing in decimal degrees
                // distance: Number
                //      distance in kilometers
                // unit: Unit
                //      the input units for distance

                units = units || Units.KILOMETERS;
                if (units != Units.KILOMETERS) {
                    distance = Converter.convertUnits(distance, units, Units.KILOMETERS);
                }
                var R = Constants.EARTH_RADIUS_IN_KILOMETERS;
                var lat1 = Converter.degreesToRadians(point.getLatitude()), lon1 = Converter.degreesToRadians(point.getLongitude());
                bearing = Converter.degreesToRadians(bearing);

                var lat2 = Math.asin(Math.sin(lat1) * Math.cos(distance / R) +
                Math.cos(lat1) * Math.sin(distance / R) * Math.cos(bearing));
                var lon2 = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(distance / R) * Math.cos(lat1),
                Math.cos(distance / R) - Math.sin(lat1) * Math.sin(lat2));

                if (isNaN(lat2) || isNaN(lon2)) return null;
                return new Point({ longitude: Converter.radiansToDegrees(lon2), latitude: Converter.radiansToDegrees(lat2) });
            },
            calcDestinationDDPointByBearingAndDistance_Km: function(startPoint, distance, initialBearing) {
                //angular distance (in radians) is the distance travelled divided by the earth’s radius
                initialBearing = Converter.degreesToRadians(initialBearing);
                var angularRadianDistance = distance / Constants.EARTH_RADIUS_IN_KILOMETERS,
                    lat1 = Converter.degreesToRadians(startPoint.y),
                    lon1 = Converter.degreesToRadians(startPoint.x);
    
                var lat2 = Math.asin( Math.sin(lat1)*Math.cos(angularRadianDistance) + Math.cos(lat1)*Math.sin(angularRadianDistance)*Math.cos(initialBearing) );
                var lon2 = lon1 + Math.atan2(Math.sin(initialBearing)*Math.sin(angularRadianDistance)*Math.cos(lat1), Math.cos(angularRadianDistance)-Math.sin(lat1)*Math.sin(lat2));
    
                lat2 = Converter.radiansToDegrees(lat2);
                lon2 = Converter.radiansToDegrees(lon2);
    
                var flippedTheLon = 0;
                if (lon2 > 180) { 
                    var diff=lon2-180;
                    lon2=-180+diff;
                    flippedTheLon = 1;
                }
                if (lon2 < -180) {
                    var diff=180+lon2;
                    lon2=180+diff;
                    flippedTheLon = -1;
                }
                var endPoint = new Point(lon2, lat2);

                return endPoint;
            },

            // summary:
            //      Computes the distance from a point to a line defined by a fromPoint and toPoint.
            //      Note: NON-ROBUST!
            // point: esri.geometry.Point
            //      The point to compute the distance for.
            // fromPoint: esri.geometry.Point
            //      The starting point of the line.
            // toPoint: esri.geometry.Point
            //      The ending point of the line.
            // returns: Number
            //      The distance from 'point' to line defined by the fromPoint and toPoint.
            getDistancePointFromLine: function (point, fromPoint, toPoint) {
                var p = point,
                    A = fromPoint,
                    B = toPoint;

                // if start == end, then use length method
                if (A.x == B.x && A.y == B.y)
                    return mathUtils.getLength(p, A);

                // otherwise use comp.graphics.algorithms Frequently Asked Questions method
                /*(1)     	      AC dot AB
                            r =   ---------
                                    ||AB||^2
     
                            r has the following meaning:
                            r=0 Point = A
                            r=1 Point = B
                            r<0 Point is on the backward extension of AB
                            r>1 Point is on the forward extension of AB
                            0<r<1 Point is interior to AB
                */
                var r = ((p.x - A.x) * (B.x - A.x) + (p.y - A.y) * (B.y - A.y)) / ((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));
                if (r <= 0.0) return mathUtils.getLength(p, A);
                if (r >= 1.0) return mathUtils.getLength(p, B);

                /*(2)
                                (Ay-Cy)(Bx-Ax)-(Ax-Cx)(By-Ay)
                            s = -----------------------------
             	                            Curve^2

                            Then the distance from C to Point = |s|*Curve.
                */
                var s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) / ((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));
                var result = Math.abs(s) * Math.sqrt(((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y)));
                return result;
            },
            // summary:
            //      Determines the point along the paths/rings that is closet to the input point
            // point: esri.geometry.Point
            //      The point to compute the distance for.
            // geometry: Number[][][]
            //      When working with a Polyline this would be "paths" array. When working with a Polygon this would be the "rings" array.
            // returns: esri.geometry.Point
            //      Point
            getSnapPoint : function(point, geometry) {
                var closestDistance = Number.MAX_VALUE,
                    currentDistance,
                    currentPath,
                    currentSegment,
                    fromPoint,
                    toPoint,
                    closestSegment = { fromPoint: null, toPoint: null };

                for (var p = 0; p < geometry.length; p++) {
                    currentPath = geometry[p];
                    for (var s = 1; s < currentPath.length; s++) {
                        currentSegment = currentPath[s];
                        fromPoint = { x: currentPath[s-1][0], y: currentPath[s-1][1] };
                        toPoint = { x: currentPath[s][0], y: currentPath[s][1] };
                        var currentDistance = mathUtils.getDistancePointFromLine(point, fromPoint, toPoint);

                        if (currentDistance < closestDistance) {
                            closestDistance = currentDistance;
                            closestSegment.fromPoint = fromPoint;
                            closestSegment.toPoint = toPoint;
                        }
                    }
                }
                return mathUtils._getSnappedPoint(point, closestSegment.fromPoint, closestSegment.toPoint);
            },
            _getSnappedPoint: function(point, fromPoint, toPoint){
                var c = point, 
                    a = fromPoint, 
                    b = toPoint,
                    dot_ta,
                    dot_tb,
                    nearest = { x: null, y: null };

                // SEE IF a IS THE NEAREST POINT - ANGLE IS OBTUSE
                dot_ta = (c.x - a.x) * (b.x - a.x) + (c.y - a.y) * (b.y - a.y);
    
                // IT IS OFF THE AVERTEX
                if (dot_ta <= 0){
                    nearest.x = a.x;
                    nearest.y = a.y;
                    return nearest;
                }
    
                dot_tb = (c.x - b.x) * (a.x - b.x) + (c.y - b.y) * (a.y - b.y);
                // SEE IF b IS THE NEAREST POINT - ANGLE IS OBTUSE
                if (dot_tb <= 0){
                    nearest.x = b.x;
                    nearest.y = b.y;
                    return nearest;
                }
                // FIND THE REAL NEAREST POINT ON THE LINE SEGMENT - BASED ON RATIO
                nearest.x = a.x + ((b.x - a.x) * dot_ta)/(dot_ta + dot_tb);
                nearest.y = a.y + ((b.y - a.y) * dot_ta)/(dot_ta + dot_tb);
                return nearest;
            }
        });
    }
);