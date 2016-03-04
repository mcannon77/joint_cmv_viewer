
define([
// basics
//Based on CMV Widget built by Brian Bunker and uses formula's from Lary Moore and MIT
//// ***************************************************************************
// *  usng.js  (U.S. National Grid functions)
// *  Module to calculate National Grid Coordinates
// *
// *  last change or bug fix: February 2009
// ****************************************************************************/
//
// Copyright (c) 2009 Larry Moore, jane.larry@gmail.com
// Released under the MIT License; see 
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',

  'dojo/on',
  'dojo/keys',

  'esri/layers/GraphicsLayer',
  'esri/graphic',    
  'esri/symbols/SimpleMarkerSymbol',
  'esri/symbols/SimpleLineSymbol',
  'esri/symbols/CartographicLineSymbol', 
  'esri/Color',
  'esri/geometry/webMercatorUtils',
  'dojox/gfx/fx',  

  'dijit/TooltipDialog',
  'dijit/popup',

  'put-selector',
// mixins & base classes
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',

// templates & widget css
  'dojo/text!./CoordinateFind/templates/CoordinateFind.html',
  'xstyle/css!./CoordinateFind/css/CoordinateFind.css',
  "esri/geometry/Point",
 
  
// not referenced
  'dijit/form/Button',
  'dijit/form/TextBox',
  'dijit/form/Select'
], function(
  declare, lang, array,
  on, keys,
  GraphicsLayer, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, CartographicLineSymbol, esriColor, webMercatorUtils, fx,
  TooltipDialog, popup,
  put, 
  _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
  template, css, Point
) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        widgetsInTemplate: true,

        templateString: template,
        baseClass: 'gis_GotoDijit',
        returnedll: null,
        strURLtoMGRSCode: '',
        
        ngFunctionsPresent: true,
        UNDEFINED_STR: "undefined",
        UTMEasting: null,
        UTMNorthing: null,
        UTMZone: null,      // 3 chars...two digits and letter
        zoneNumber: null,   // integer...two digits
        FOURTHPI: Math.PI / 4,
        DEG_2_RAD: Math.PI / 180,
        RAD_2_DEG: 180.0 / Math.PI,
        BLOCK_SIZE: 100000, // size of square identifier (within grid zone designation),
        IS_NAD83_DATUM: true,  // if false, assumes NAD27 datum
        GRIDSQUARE_SET_COL_SIZE: 8,  // column width of grid square set  
        GRIDSQUARE_SET_ROW_SIZE: 20, // row height of grid square set
        ECC_SQUARED: null,
        EASTING_OFFSET: 500000.0,   // (meters)
        NORTHING_OFFSET: 10000000.0, // (meters)

    // scale factor of central meridian
        k0: 0.9996,

        EQUATORIAL_RADIUS: null,
        ECCENTRICTY_SQUARED: null,
        ECC_PRIME_SQUARED: null,
        E1: null,
        UTMGzdLetters: "NPQRSTUVWX", 
        USNGSqEast: "ABCDEFGHJKLMNPQRSTUVWXYZ",
        USNGSqLetOdd: "ABCDEFGHJKLMNPQRSTUV", 
        USNGSqLetEven: "FGHJKLMNPQRSTUVABCDE", 
  

        coordTypeTemplates: {
            'latlon': {
                examples: ['-76.34456 37.080613', '118&deg;44\'24.844\" W 35&deg;33\'34.36\" N', '46:24:37.613N  9:25:59.067E'],
                helpText: 'The input accepts longitude first, then latitude in Decimal degrees (DD) or Degrees, Minutes, Seconds (DMS) formats. Hemisphere designation (NSEW) are optional. The coordinate parts may be separated by spaces, colons, or conventional markup (&deg;, \', and ").'
            },
            'utm': {
                examples: ['767882.527 E  4001950.654 N Zone 16N', '665539.235E  5876246.228N 51S'],
                helpText: 'The input accepts Northing or Easting first, but coordinate designation letter is mandatory (NE). The word "Zone" is optional. The hemisphere designation (NS) is optional and defaults to N.'
            },
            'mgrs': {
                examples: ['18SUJ23480647'],
                helpText: 'The input accepts a grid zone designator (4Q), grid square id (FJ), and an even number of additional precision numbers (12345678). See <a href="http://en.wikipedia.org/wiki/Military_grid_reference_system" target="_blank">wikipedia entry</a> for additional info.'
            }
        },

        postCreate: function() {
            this.inherited(arguments);
            this.setupConnections();

            strURLtoMGRSCode = require.toUrl(this.urltoCode).toString();
          
            // check for NAD83
            if (this.IS_NAD83_DATUM) {
                this.EQUATORIAL_RADIUS = 6378137.0; // GRS80 ellipsoid (meters)
                this.ECC_SQUARED = 0.006694380023;
            }
                // else NAD27 datum is assumed
            else {
                this.EQUATORIAL_RADIUS = 6378206.4  // Clarke 1866 ellipsoid (meters)
                this.ECC_SQUARED = 0.006768658;
            }

            this.ECC_PRIME_SQUARED = this.ECC_SQUARED / (1 - this.ECC_SQUARED);

            // variable used in inverse formulas (UTMtoLL function)
            this.E1 = (1 - Math.sqrt(1 - this.ECC_SQUARED)) / (1 + Math.sqrt(1 - this.ECC_SQUARED));
            
            var handle = require.on('error', function (error) {

                alert('Unable to load MGRS code')
            });

            this.connect(this.parentWidget, 'toggle', 'onWidgetToggle');

        },

        onWidgetToggle: function (evt) {
            this.map.graphics.clear();

        },
        setupConnections: function() {
            this.helpTooltip = new TooltipDialog({
                id: this.baseClass + '_helpTooltip',
                style: 'width: 300px;',
                content: '',
                onBlur: lang.hitch(this, function(){
                    popup.close(this.helpTooltip);
                })
            });
            on(this.questionIconNode, 'click', lang.hitch(this, 'showCoordHelp'));
            this.gotoTypeSelect.on('change', lang.hitch(this, 'updateHintText'));
            this.coordinateTextBox.on('keypress', lang.hitch(this, 'handleCoordInput'));
            this.goButton.on('click', lang.hitch(this, 'gotoCoordinate'));


        },
        updateHintText: function() {
            var coordTypeDisplay = this.gotoTypeSelect.get('displayedValue');
            var coordType = this.gotoTypeSelect.get('value');
            
            this.coordinateHintNode.innerHTML = coordTypeDisplay + ' ' + this.coordTypeTemplates[coordType].examples[0];
            this.coordinateTextBox.set("value", '');
        },
        showCoordHelp: function() {
            var coordType = this.gotoTypeSelect.get('value');
            var helpString = '<p>' + this.coordTypeTemplates[coordType].helpText + '</p><p><ul>';
            array.forEach(this.coordTypeTemplates[coordType].examples, function(example) {
                helpString += '<li>' + example + '</li>';
            });
            helpString += '</ul></p>';
            this.helpTooltip.set('content', helpString);
            popup.open({
                popup: this.helpTooltip,
                around: this.questionIconNode
            });
            this.helpTooltip.focus();
        },
        handleCoordInput: function(evt) {
            if (evt.charOrCode === keys.ENTER) {
                this.gotoCoordinate();
                return;
            }
        },
        gotoCoordinate: function() {
            var inputCoord = this.coordinateTextBox.get('value');
            var coordType = this.getCoordinateType();
            var intZoomScale = this.zoomScale;
            if (inputCoord.length > 4) {
                if (coordType != 'mgrs') {
                    var latlongCoord = this.determineLatLongFromCoordinate(inputCoord);

                    if (latlongCoord !== null && !isNaN(latlongCoord[0]) && !isNaN(latlongCoord[1])) {

                        var intScale = this.map.getLevel();

                        if (intScale < intZoomScale) {
                            this.map.centerAndZoom(latlongCoord, intZoomScale);

                        } else {
                            this.map.centerAt(latlongCoord);
                        }
                        var webMerCoord = webMercatorUtils.lngLatToXY(latlongCoord[0], latlongCoord[1]);
                        //   var point = new Point(webMerCoord[0], webMerCoord[1]);
                        var point = new Point(parseFloat(webMerCoord[0]), parseFloat(webMerCoord[1]), new esri.SpatialReference({ wkid: 102100 }));

                        this.flashResults(point);


                    }
                } else {
                    this.convertMGRS(inputCoord);
                }
            } else {
                alert('No Coordinates Entered')
            }
          
           
        },   
      
        
        flashResults: function (point) {
           
          
           //remove all graphics on the maps graphics layer
            this. map.graphics.clear();

            var markerSymbolStay = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_DIAMOND, 28, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 2), new dojo.Color([255, 0, 0, 0.85]));
            var markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_DIAMOND, 28, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 2), new dojo.Color([255, 217, 0]));
            var graphicFlash = new Graphic(point, markerSymbol);

            var graphicFlashStay = new Graphic(point, markerSymbolStay);

            //Add graphic to the map graphics layer.
            this.map.graphics.add(graphicFlashStay);
            this.map.graphics.add(graphicFlash);

            var shape = graphicFlash.getShape();

            var animStroke = fx.animateStroke({
                shape: shape,
                duration: 1500,
                color: {
                    end: new dojo.Color([0, 0, 0, 0])
                }
            });

            var animFill =fx.animateFill({
                shape: shape,
                duration: 1500,
                color: {
                    end: new dojo.Color([0, 0, 0, 0])
                }
            });

            var anim = dojo.fx.combine([animStroke, animFill]).play();

            var animConnect = dojo.connect(anim, "onEnd", function () {
                this.map.graphics.remove(graphicFlash);
               
               
            });

            
            
        },
        convertMGRS: function(inputCoord) {
           
            var usngp = new Object();
            var latlonMGRS = [];
            this.parseUSNG_str(inputCoord, usngp);
            var coords = new Object();
            var intZoomScale = this.zoomScale;
           
            // convert USNG coords to UTM; this routine counts digits and sets precision
            this.USNGtoUTM(usngp.zone, usngp.let, usngp.sq1, usngp.sq2, usngp.east, usngp.north, coords)

            // southern hemisphere case
            if (usngp.let < 'N') {
                coords.N -= this.NORTHING_OFFSET
            }

            this.UTMtoLL(coords.N, coords.E, usngp.zone, coords)
            latlonMGRS[0] = coords.lat
            latlonMGRS[1] = coords.lon

            if (latlonMGRS !== null && !isNaN(latlonMGRS[0]) && !isNaN(latlonMGRS[1])) {
           
                var latLon = this.parseDec(coords.lon.toString() + ' ' + coords.lat.toString());
                var intScale = this.map.getLevel();



                if (intScale < intZoomScale) {
                    this.map.centerAndZoom(latLon, intZoomScale);

                } else {
                    this.map.centerAt(latLon);
                }
                var webMerCoord = webMercatorUtils.lngLatToXY(latLon[0], latLon[1]);
                //   var point = new Point(webMerCoord[0], webMerCoord[1]);
                var point = new Point(parseFloat(webMerCoord[0]), parseFloat(webMerCoord[1]), new esri.SpatialReference({ wkid: 102100 }));
                this.flashResults(point);



             
            }


        },

        //*************************************************************USNG.js*********************************************************************

        parseUSNG_str: function(usngStr_input, parts)
        {
            var j = 0;
            var k;
            var usngStr = [];
            var usngStr_temp = []

            usngStr_temp = usngStr_input.toUpperCase()

            // put usgn string in 'standard' form with no space delimiters
            var regexp = /%20/g
            usngStr = usngStr_temp.replace(regexp,"")
            regexp = / /g
            usngStr = usngStr_temp.replace(regexp,"")

            if (usngStr.length < 7) {
                alert("This application requires minimum USNG precision of 10,000 meters")
                return 0;
            }
                    
         

            if (isNaN(usngStr.charAt(1) * 1)) {
                parts.zone = usngStr.charAt(j++);
            } else {
                parts.zone = usngStr.charAt(j++) * 10 + usngStr.charAt(j++) * 1;;
            }

            parts.let = usngStr.charAt(j++)
            parts.sq1 = usngStr.charAt(j++)
            parts.sq2 = usngStr.charAt(j++)

            parts.precision = (usngStr.length-j) / 2;
            parts.east='';
            parts.north='';
            for (var k=0; k<parts.precision; k++) {
                parts.east += usngStr.charAt(j++)
            }

            if (usngStr[j] == " ") { j++ }
            for (var k=0; k<parts.precision; k++) {
                parts.north += usngStr.charAt(j++)
            }
        },

        USNGtoUTM: function(zone,let,sq1,sq2,east,north,ret) {

            //Starts (southern edge) of N-S zones in millons of meters
            var zoneBase = [1.1,2.0,2.9,3.8,4.7,5.6,6.5,7.3,8.2,9.1,   0, 0.8, 1.7, 2.6, 3.5, 4.4, 5.3, 6.2, 7.0, 7.9];

            var segBase = [0,2,2,2,4,4,6,6,8,8,   0,0,0,2,2,4,4,6,6,6];  //Starts of 2 million meter segments, indexed by zone 

            // convert easting to UTM
            var eSqrs=this.USNGSqEast.indexOf(sq1);          
            var appxEast=1+eSqrs%8; 

            // convert northing to UTM
            var letNorth = "CDEFGHJKLMNPQRSTUVWX".indexOf(let);
            if (zone%2)  //odd number zone
                var nSqrs="ABCDEFGHJKLMNPQRSTUV".indexOf(sq2) 
            else        // even number zone
                var nSqrs="FGHJKLMNPQRSTUVABCDE".indexOf(sq2); 

            var zoneStart = zoneBase[letNorth];
            var appxNorth = Number(segBase[letNorth])+nSqrs/10;
            if ( appxNorth < zoneStart)
                appxNorth += 2; 	  

            ret.N=appxNorth*1000000+Number(north)*Math.pow(10,5-north.length);
            ret.E=appxEast*100000+Number(east)*Math.pow(10,5-east.length)
            ret.zone=zone;
            ret.letter=let;

            return;
        } ,

        UTMtoLL: function(UTMNorthing, UTMEasting, UTMZoneNumber, ret) {

            // remove 500,000 meter offset for longitude
            var xUTM = parseFloat(UTMEasting) - this.EASTING_OFFSET; 
            var yUTM = parseFloat(UTMNorthing);
            var zoneNumber = parseInt(UTMZoneNumber);

            // origin longitude for the zone (+3 puts origin in zone center) 
            var lonOrigin = (zoneNumber - 1) * 6 - 180 + 3; 

            // M is the "true distance along the central meridian from the Equator to phi
            // (latitude)
            var M = yUTM / this.k0;
            var mu = M / ( this.EQUATORIAL_RADIUS * (1 - this.ECC_SQUARED / 4 - 3 * this.ECC_SQUARED * 
                            this.ECC_SQUARED / 64 - 5 * this.ECC_SQUARED * this.ECC_SQUARED * this.ECC_SQUARED / 256));

            // phi1 is the "footprint latitude" or the latitude at the central meridian which
            // has the same y coordinate as that of the point (phi (lat), lambda (lon) ).
            var phi1Rad = mu + (3 * this.E1 / 2 - 27 * this.E1 * this.E1 * this.E1 / 32) * Math.sin(2 * mu)
                           + (21 * this.E1 * this.E1 / 16 - 55 * this.E1 * this.E1 * this.E1 * this.E1 / 32) * Math.sin(4 * mu)
                           + (151 * this.E1 * this.E1 * this.E1 / 96) * Math.sin(6 * mu);
            var phi1 = phi1Rad * this.RAD_2_DEG;

            // Terms used in the conversion equations
            var N1 = this.EQUATORIAL_RADIUS / Math.sqrt(1 - this.ECC_SQUARED * Math.sin(phi1Rad) *
                        Math.sin(phi1Rad));
            var T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
            var C1 = this.ECC_PRIME_SQUARED * Math.cos(phi1Rad) * Math.cos(phi1Rad);
            var R1 = this.EQUATORIAL_RADIUS * (1 - this.ECC_SQUARED) / Math.pow(1 - this.ECC_SQUARED *
                          Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
            var D = xUTM / (N1 * this.k0);

            // Calculate latitude, in decimal degrees
            var lat = phi1Rad - ( N1 * Math.tan(phi1Rad) / R1) * (D * D / 2 - (5 + 3 * T1 + 10
                  * C1 - 4 * C1 * C1 - 9 * this.ECC_PRIME_SQUARED) * D * D * D * D / 24 + (61 + 90 *
                    T1 + 298 * C1 + 45 * T1 * T1 - 252 * this.ECC_PRIME_SQUARED - 3 * C1 * C1) * D * D *
                    D * D * D * D / 720);
            lat = lat * this.RAD_2_DEG;

            // Calculate longitude, in decimal degrees
            var lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * 
                      C1 * C1 + 8 * this.ECC_PRIME_SQUARED + 24 * T1 * T1) * D * D * D * D * D / 120) /
                      Math.cos(phi1Rad);

            lon = lonOrigin + lon * this.RAD_2_DEG;
            ret.lat = lat;
            ret.lon = lon;
            return;
        },



        //*************************************************************USNG.js*********************************************************************
        determineLatLongFromCoordinate: function(inputCoord) {
            if (!this.validateInput(inputCoord) || inputCoord === '') {
                return;
            }
            var coordType = this.getCoordinateType();
            if (coordType === 'latlon') {
                var latLon = null;
                latLon = this.parseDms(inputCoord);
                if (latLon.length === 2) {
                    // console.log('using dms');
                    return latLon;
                }
                latLon = this.parseDec(inputCoord);
                if (latLon.length === 2) {
                    // console.log('using decimal degrees');
                    return latLon;
                }
                return null;
            } else if (coordType === 'utm') {
                // console.log('using utm');
                return this.parseUtm(inputCoord);
            } 
        },
       
        validateInput: function(inputCoord) {
            if (this.parseDms(inputCoord)) {
                return true;
            }
        },
        getCoordinateType: function() {
            return this.gotoTypeSelect.get('value');
        },
        parseDec: function(decStr) {
            var decRe = /(-?\d+(?:\.\d+))[°,]?([NSEW])?/gi;
            var output = [],
              decMatch, degrees, hemisphere;
            while ((decMatch = decRe.exec(decStr)) !== null) {
                degrees = Number(decMatch[1]);
                hemisphere = decMatch[2] || null;
                if (hemisphere !== null && /[SW]/i.test(hemisphere)) {
                    degrees = Math.abs(degrees) * -1;
                }
                output.push(degrees);
            }
            return output;
        },
        parseDms: function(dmsStr) {
            /** Parses a Degrees Minutes Seconds string into a Decimal Degrees number.
             * Created by Jeff Jacobson (http://github.com/JeffJacobson) http://gist.github.com/JeffJacobson/2955437
             * Modified by Brian Bunker, Esri Inc., 9/25/2014, 3:27 pm, while eating grapes
             * @param {string}  dmsStr A string containing a coordinate in either DMS or DD format.
             * @return {Array} If dmsStr is a valid coordinate string, an array of value in decimal degrees will be
             *   returned (matching all instances in the input string).  Otherwise NaN will be returned.
             */
            // Matches DMS coordinates
            var dmsRe = /(-?\d+(?:\.\d+)?)[°:d]?\s?(?:(\d+(?:\.\d+)?)['′:]?\s?(?:(\d+(?:\.\d+)?)["″]?)?)?\s?([NSEW])?/gi;
            // Results of match will be [full coords string, Degrees, minutes (if any), seconds (if any), hemisphere (if any)]
            // E.g., ["40:26:46.302N", "40", "26", "46.302", "N"]
            // E.g., ["40.446195N", "40.446195", undefined, undefined, "N"]
            var output = [],
              dmsMatch, degrees, minutes, seconds, hemisphere;
            while ((dmsMatch = dmsRe.exec(dmsStr)) !== null) {
                degrees = Number(dmsMatch[1]);

                minutes = typeof(dmsMatch[2]) !== 'undefined' ? Number(dmsMatch[2]) / 60 : 0;
                seconds = typeof(dmsMatch[3]) !== 'undefined' ? Number(dmsMatch[3]) / 3600 : 0;
                hemisphere = dmsMatch[4] || null;
                if (hemisphere !== null && /[SW]/i.test(hemisphere)) {
                    degrees = Math.abs(degrees) * -1;
                }
                if (degrees < 0) {
                    output.push(degrees - minutes - seconds);
                } else {
                    output.push(degrees + minutes + seconds);
                }
            }
            return output;
        },
        parseUtm: function(dmsStr) {
            var utmRe = /(-?\d+(?:\.\d+))\s*([NE])\s*(-?\d+(?:\.\d+))\s*([NE])\s+(?:ZONE)?\s?(\d{1,2})\s*([NS])?/gi;
            var output = [],
              utmMatch, northing, easting, zoneNum, hemisphere;
            while ((utmMatch = utmRe.exec(dmsStr)) !== null) {
                if (/[N]/i.test(utmMatch[2])) {
                    northing = utmMatch[1];
                } else if (/[E]/i.test(utmMatch[2])) {
                    easting = utmMatch[1];
                }
                if (/[N]/i.test(utmMatch[4])) {
                    northing = utmMatch[3];
                } else if (/[E]/i.test(utmMatch[4])) {
                    easting = utmMatch[3];
                }
                zoneNum = utmMatch[5];
                hemisphere = (/[S]/i.test(utmMatch[6]) ? ' +south' : '');
                output = this.projectUTMToLatLong(northing, easting, zoneNum, hemisphere);
            }
            return output;
        },
        projectUTMToLatLong: function(northing, easting, zone, hemisphere) {
            var utmProj = '+proj=utm +zone=' + String(zone) + hemisphere + ' +ellps=WGS84 +datum=WGS84 +units=m +no_defs';
            var geoProj = proj4.defs('WGS84');
            return proj4(utmProj, geoProj, [easting,northing]);
        }
    });
});
