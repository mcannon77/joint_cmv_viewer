define([
        "dojo/_base/lang",
        "esri/geometry/Polyline",
        "../geometry",
        "esri/geometry/mathUtils",
        "esri/geometry/Point",
        "esri/geometry/geodesicUtils",
        "esri/geometry/webMercatorUtils",
        "esri/map" 
    ], 
    function (lang, Polyline, toolkitGeometry, mathUtils, Point, geodesicUtils, webMercatorUtils) {
        lang.extend(Polyline, {
            getLength: function (lengthUnit, places){
                var newGeometry = webMercatorUtils.webMercatorToGeographic(this),
                    places = places || 2,
                    length = geodesicUtils.geodesicLengths([newGeometry], lengthUnit)[0];

                // Perimeter
                return length.toFixed(places);
            },
            getLabelPoint: function () {           
                return toolkitGeometry.getSnapPoint(this.getExtent().getCenter(), this.paths);
            },

            getPointFromM: function(m) {        
                var path, len;
                if (this._getIsMOrderCorrect()) {
                    console.debug("getPointFromM: _getIsMOrderCorrect = true");
                    for (var i = 0; i < this.paths.length; i++) {
                        path = this.paths[i];                
                        console.debug("getPointFromM: " + path[path.length-1][2] + " > " + m);
                        if (path[path.length-1][2] >= m) {
                            return this._path_getPointFromM(path, m);
                        }
                    }
                } else {
                console.debug("getPointFromM: _getIsMOrderCorrect = false");
                    for (var i = this.paths.length - 1; i >= 0; i--) {
                        //check fromPoint from first segment (this should have the highest m value)
                        if (this.paths[i][0][0][2] >= m) {
                            return this._path_getPointFromM(this.paths[i][0], m);
                        }
                    }
                }
            },

            _getIsMOrderCorrect: function() {
                return this._path_getIsMOrderCorrect(this.paths[0]);
            },

            /*
            *   Private Path methods
            */

            _path_getPointFromM: function(path, m) {
                var len = path.length;
                if (this._path_getIsMOrderCorrect(path)) {
                    for (var i = 1; i < len; i++) {
                        console.debug("_path_getPointFromM: " + path[i][2] + " > " + m);
                        if (path[i][2] >= m) {
                            return this._segment_getPointFromM(path[i-1], path[i], m);
                        }
                    }
                } else {
                    for (var i = len - 1; i >= 0; i--) {
                        if (path[i][2] >= m) {
                            return this._segment_getPointFromM(path[i], m);
                        }
                    }
                }

            },
            _path_getIsMOrderCorrect: function(path) {
                var lastPoint = path.length - 1;
                //no m values for one or more points
                if (path[0][2] == null || path[lastPoint][2] == null)
                    return null;

                if (path[0][2] < path[lastPoint][2]) {
                    return true;
                }
                return false;
            },
       
            _path_getMinM: function(path) {
                if (this._path_getIsMOrderCorrect(path)) {
                    return path[0][2];
                } else {
                    return path[path.length - 1][2];
                }
            },
       
            _path_getMaxM: function(path) {
                if (this._path_getIsMOrderCorrect(path)) {
                    return path[path.length - 1][2];
                } else {
                    return path[0][2];
                }
            },

            /*
            *   private segment methods
            */

            _segment_getPointFromM: function(fromPoint, toPoint, m) {
                console.debug("_segment_getPointFromM: fromPoint = " + fromPoint[0] + ", " + fromPoint[1] + ", " + fromPoint[2]);
                //m not on segment
                if (fromPoint[2] > m || toPoint[2] < m)
                    return null;

                if (m == fromPoint[2])
                    return fromPoint;

                if (m == toPoint[2])
                    return toPoint.clone();
                    
                var totalMDiff = toPoint[2] - fromPoint[2];
                console.debug("_segment_getPointFromM: totalMDiff = " + totalMDiff);
                var partialMDiff = m - fromPoint[2];
                console.debug("_segment_getPointFromM: partialMDiff = " + partialMDiff);

                var totalLengthMapUnits = mathUtils.getLength(new Point(fromPoint[0], fromPoint[1]), new Point(toPoint[0], toPoint[1]));
                console.debug("_segment_getPointFromM: totalLengthMapUnits = " + totalLengthMapUnits);
                var sectionLengthMapUnits = 0;

                if (totalMDiff * totalLengthMapUnits > 0) {
                    sectionLengthMapUnits = partialMDiff / totalMDiff * totalLengthMapUnits;
                }

                //get ratio of length (in map units) to the m over the total length of the segment
                var sectionLengthRatio = sectionLengthMapUnits / totalLengthMapUnits;

                return this._segment_getPointFromLengthRatio(fromPoint, toPoint, sectionLengthRatio);
            },

            /**
            * Get the point that corresponds to travelling a given percentage the a line. Example: 0.75 will travel 75% of the line.
            * @method
            * @param {Number} ratio	Number between 0 and 1.
            * @param {withFlow} ratio (optional) When true, travel is from the fromPoint to the toPoint (else the opposite). Default is true.
            * @return {MapD.Geometry.Point} Point at the given M value. If the point cannot be determined. Null is returned.
            */
            _segment_getPointFromLengthRatio: function(fromPoint, toPoint, ratio) {

                var returnX,
                    returnY;        

                //get X distance
                var xDiff = Math.abs(fromPoint[0] - toPoint[0]) * ratio;

                if (xDiff == 0) {
                    returnX = fromPoint[0];
                } else {
                    if (fromPoint[0] > toPoint[0]) {
                        returnX = fromPoint[0] - xDiff;
                    } else {
                        returnX = fromPoint[0] + xDiff;
                    }
                }

                //get Y distance
                var yDiff = Math.abs(fromPoint[1] - toPoint[1]) * ratio;

                if (yDiff == 0) {
                    returnY = fromPoint[1];
                } else {
                    if (fromPoint[1] > toPoint[1]) {
                        returnY = fromPoint[1] - yDiff;
                    } else {
                        returnY = fromPoint[1] + yDiff;
                    }
                }

                return new Point(returnX, returnY);
            }
        });
});