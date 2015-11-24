define([
        "dojo/_base/lang",
        "esri/geometry/Polygon",
        "esri/geometry/Polyline",
        "esri/geometry/Point",
        "../geometry",
        "esri/geometry/mathUtils",
        "esri/geometry/geodesicUtils",
        "esri/geometry/webMercatorUtils",
        "esri/map"
    ], 
    function (lang, Polygon,Polyline, Point, toolkitGeometry, mathUtils, geodesicUtils, webMercatorUtils) {
        lang.extend(Polygon, {

            // summary: 
            //      Returns twice the signed area of the triangle determined by points a,b,c.
            //      Positive if a,b,c are oriented ccw, and negative if cw.
            _getArea2: function(a, b, c){
	            return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
            },
            getArea: function(areaUnit, places){
                var newGeometry = webMercatorUtils.webMercatorToGeographic(this),
                    places = places || 2,
                    area = geodesicUtils.geodesicAreas([newGeometry], areaUnit);

                area = area[0] = area[0] < 0 ? area[0] * -1 : area[0];
                return area.toFixed(places);
            },
            getPerimeter: function(lengthUnit, places){
                var newGeometry = webMercatorUtils.webMercatorToGeographic(this),
                    places = places || 2,
                    perimeter = geodesicUtils.geodesicLengths([new Polyline(newGeometry.rings[0])], lengthUnit)[0];

                // Perimeter
                return perimeter.toFixed(places);
            },
            // summary:
            //      Computes the centroid (center of gravity) of an arbitrary
	        //      simple polygon via a weighted sum of signed triangle areas,
	        //      weighted by the centroid of each triangle.
            // ringIndex: Integer
            //      The ring index to get the point for. Default is 0 (this first ring)
            // returns: esri.geometry.Point
            //      The centroid point
            getCentroid: function(ringIndex){
                /*      
                    Computes the weighted sum of each triangle's area times its centroid.  Twice area
	                and three times centroid is used to avoid division until the last moment.
                    FAQ: http://www.cgafaq.info/wiki/Polygon_Centroid
                */
                var ring = this.rings[ringIndex],
                    n = ring.length,
                    a2, 
                    cent3,
                    Areasum2 = 0,        /* Partial area sum */    
	                cg = [0,0];
	   
                for(var i = 1; i < n-2; i++) {
	                cent3 = this._getCentroidOfTriangle(ring[0], ring[i], ring[i+1]);
	                a2 =  this._getArea2(ring[0], ring[i], ring[i+1]);
		            cg[0] += a2 * cent3[0];
		            cg[1] += a2 * cent3[1];
		            Areasum2 += a2;
	            }
                cg[0] = cg[0] / (3 * Areasum2);
                cg[1] = cg[1]/ (3 * Areasum2);
	            return new Point(cg[0], cg[1]);
            },

            // summary: 
	        //      Returns three times the centroid.  The factor of 3 is
	        //      left in to permit division to be avoided until later.
            _getCentroidOfTriangle: function(p1, p2, p3){
                var x = p1[0] + p2[0] + p3[0],
                    y = p1[1] + p2[1] + p3[1];
	            return [ x, y ];
            },

            getLabelPoint: function () {
                var centroid = this.getCentroid(0);            

                if (!this.contains(centroid)) {
                    centroid = toolkitGeometry.getSnapPoint(centroid, this.rings);
                }
                return centroid;
            },
            get_perimiter: function (geometryUnits, outputUnits, significantDigits) {
                var len = 0;

                for (var i = 0; i < this.rings.length; i++) {
                    var sigFig = significantDigits || 4;

                    for (var i = 0; i < this.segments.length; i++) {
                        len += this.segments[i].get_length(geometryUnits, outputUnits, significantDigits);
                    }
                    //len += this.rings[i].get_perimiter(geometryUnits, outputUnits);
                }

                //round to specified significant digits
                if (significantDigits != null && significantDigits >= 0 && significantDigits < 20) {
                    var roundFactor = Math.pow(10, significantDigits);
                    len = Math.round(len * roundFactor) / roundFactor;
                }

                return len;
            }
        });
});