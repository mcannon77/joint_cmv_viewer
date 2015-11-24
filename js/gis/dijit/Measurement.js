/*  ConfigurableMapViewerCMV
 *  version 1.3.3
 *  Project: http://cmv.io/
 */
define(["dojo/_base/declare", "dijit/_WidgetBase", "esri/dijit/Measurement", "dojo/aspect", "dojo/_base/lang", "dojo/dom-construct", "dojo/topic", 'esri/geometry/Point', 'esri/geometry/webMercatorUtils'], function(a, b, c, d, e, f, g, Point, webMercatorUtils) {
    return a([b], {
        declaredClass: "gis.dijit.Measurement",
        mapClickMode: null,
        postCreate: function() {
            this.inherited(arguments), this.measure = new c({
                map: this.map,
                advancedLocationUnits: this.advancedLocationUnits,
                defaultAreaUnit: this.defaultAreaUnit,
                defaultLengthUnit: this.defaultLengthUnit
            }, f.create("div")).placeAt(this.domNode), this.measure.startup(), d.after(this.measure, "setTool", e.hitch(this, "checkMeasureTool")), d.after(this.measure, "closeTool", e.hitch(this, "checkMeasureTool")), this.own(g.subscribe("mapClickMode/currentSet", e.hitch(this, "setMapClickMode"))), this.parentWidget && this.parentWidget.toggleable && this.own(d.after(this.parentWidget, "toggle", e.hitch(this, function() {
                this.onLayoutChange(this.parentWidget.open)
            })))
            
            //this.activateListeners();

        },
        checkMeasureTool: function() {
            this.measure.activeTool && "" !== this.measure.activeTool ? "measure" !== this.mapClickMode && this.disconnectMapClick() : "measure" === this.mapClickMode && this.connectMapClick()
            
            if(this.measure.activeTool == "distance") {
            	console.log("locked");
            	this.activateListeners();
            } else {
           // this.activateListeners() == null;
            console.log("disengage");
            }
            if(this.handle != null && this.measure.activeTool != "distance") {
            console.log("worked");
            this.handle.remove();
            }

        },
        disconnectMapClick: function() {
            g.publish("mapClickMode/setCurrent", "measure")
        },
        connectMapClick: function() {
            g.publish("mapClickMode/setDefault")
        },
        onLayoutChange: function(a) {
            a || "measure" !== this.mapClickMode || this.connectMapClick()
        },
        setMapClickMode: function(a) {
            this.mapClickMode = a, "measure" !== a && (this.measure.setTool("area", !1), this.measure.setTool("distance", !1), this.measure.setTool("location", !1), this.measure.clearResult())
            //console.log(this.mapClickMode);
        },
        activateListeners: function() {
           var pointArray = [];

         console.log(this.measure.activeTool);
        this.handle = this.map.on("click", function(evt){


        var point = webMercatorUtils.webMercatorToGeographic(new Point(evt.mapPoint.x, evt.mapPoint.y));
        console.log(point);
        pointArray.push([point.x, point.y]);

      if ((pointArray.length % 2) == 0 ) {

      var pointA = pointArray[0];
      var pointB = pointArray[1];
          	    
      computeAngle(pointA, pointB);
      	    
      function computeAngle(pointA, pointB){

                var dLon = (pointB[0] - pointA[0]) * Math.PI / 180;

                if (dLon == 0) {
                return;
                } else {

                var lat1 = pointA[1] * Math.PI / 180;
                var lat2 = pointB[1] * Math.PI / 180;
                var y = Math.sin(dLon) * Math.cos(lat2);
                var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
                var bearing = Math.atan2(y, x)  * 180 / Math.PI;
                bearing = ((bearing + 360) % 360).toFixed(1); //Converting -ve to +ve (0-360)
                if(bearing >= 0 && bearing < 90){
                var bearing0 = 'N ' + bearing != 0  ? bearing + '&deg E' : '';
                            g.publish('growler/growl', {
                            title: 'Bearing Results',
                            message: bearing0,
                            level: 'default',
                            timeout: 5000
                            });
                 //   return 'N' + (bearing != 0  ? bearing + 'E' : '');
                }
                if(bearing >= 90 && bearing < 180){
                var bearing1 = (bearing != 90  ? 'S ' + (180 - bearing).toFixed(1) : '') + '&deg E';
                            g.publish('growler/growl', {
                            title: 'Bearing Results',
                            message: bearing1,
                            level: 'default',
                            timeout: 5000
                            });

                   // return (bearing != 90  ? 'S' + (180 - bearing).toFixed(1) : '') + 'E';
                }
                if(bearing >= 180 && bearing < 270){
                var bearing2 = 'S ' + (bearing != 180  ? (bearing - 180).toFixed(1) + '&deg W' : '');
                            g.publish('growler/growl', {
                            title: 'Bearing Results',
                            message: bearing2,
                            level: 'default',
                            timeout: 5000
                            });
                   // return 'S' + (bearing != 180  ? (bearing - 180).toFixed(1) + 'W' : '');
                }
                if(bearing >= 270){
                var bearing3 = (bearing != 270  ? 'N ' + (360 - bearing).toFixed(1) : '') + '&deg W';
                            g.publish('growler/growl', {
                            title: 'Bearing Results',
                            message: bearing3,
                            level: 'default',
                            timeout: 5000
                            });
                   // return (bearing != 270  ? 'N' + (360 - bearing).toFixed(1) : '') + 'W';
                }
                return 'N';
      }
      }
       pointArray.shift();
     }

        })
                this.map.on("dbl-click", function(evt) {
        console.log("fired");
        })
        }
    })
});