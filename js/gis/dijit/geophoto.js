define([
      // "esri/map", 
      //  "esri/tasks/GeometryService",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/Color",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
       // "esri/dijit/editing/Editor",
	   "esri/dijit/editing/Editor-all",
      //  "esri/dijit/editing/TemplatePicker",
	  "esri/dijit/editing/TemplatePicker-all",
        "esri/config",
     //   "dojo/i18n!esri/nls/jsapi",
        "dojo/_base/array", 
		"dojo/parser", 
		"dojo/keys",
		'dojo/_base/declare',

		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dijit/_WidgetsInTemplateMixin',
		'dojo/text!./Geophoto/templates/Geophoto.html',
		'xstyle/css!./Geophoto/css/Geophoto.css',
		"dijit/layout/BorderContainer",
		"dijit/layout/ContentPane",
        "dojo/domReady!"
      ], function(
     //   Map, 
	//	GeometryService,
        ArcGISTiledMapServiceLayer, 
		FeatureLayer,
        Color, 
		SimpleMarkerSymbol, 
		SimpleLineSymbol, 
        Editor, 
		TemplatePicker,
        esriConfig, 
	//	jsapiBundle,
        arrayUtils, 
		parser, 
		keys,
		declare,
		_WidgetBase,
	    _TemplatedMixin,
		_WidgetsInTemplateMixin,
        template
        ) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

        templateString: template,
      //  baseClass: 'esri-DnD',
        widgetsInTemplate: true,
        // Properties to be sent into constructor
        //list of lat and lon field strings
     //   latFieldStrings: ['lat', 'latitude', 'y', 'ycenter'],
     //   longFieldStrings: ['lon', 'long', 'longitude', 'x', 'xcenter'],
     //   iconSize: 23,
     //   showManualAdd: true,
     //   layerCount: 0,

        postCreate: function () {
			        //This service is for development and testing purposes only. We recommend that you create your own geometry service for use within your applications. 
       // esriConfig.defaults.geometryService = new GeometryService("https://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

		//	this.initEditor();
          //  this.droppedItems = {};
          //  this.layerAddListeners = {};
          //  this.setupDropZone();
          //  this.determineShowManualAdd();
            this.inherited(arguments);
			
			        //add boundaries and place names 
 //       this.labels = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer");
//        this.map.addLayer(this.labels);

        this.responsePoints = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/0", {
          mode: FeatureLayer.MODE_ONDEMAND, 
          outFields: ['*']
        });

        this.responsePolys = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/2", {
          mode: FeatureLayer.MODE_ONDEMAND, 
          outFields: ['*']
        });

        this.map.addLayers([this.responsePolys, this.responsePoints]);
		this.setuplisteners();
        },
  //    parser.parse();       
setuplisteners: function(evt) {
	this.map.on("layers-add-result", this.initEditor);
	
},
        // snapping is enabled for this sample - change the tooltip to reflect this
        //jsapiBundle.toolbars.draw.start = jsapiBundle.toolbars.draw.start +  "<br>Press <b>ALT</b> to enable snapping";
       
        // refer to "Using the Proxy Page" for more information:  https://developers.arcgis.com/javascript/jshelp/ags_proxy.html
        //esriConfig.defaults.io.proxyUrl = "/proxy/";    


        

        
       


    initEditor: function(evt) {
		//var attachNode = dom.byId('templateDiv');
		console.log(evt);
	//	console.log("fired");
		
	//	console.log(attachNode);
	//	console.log("fired");
          var templateLayers = arrayUtils.this.map(evt.layers, function(result){
            return result.layer;
          });
		  console.log("fired");
          var templatePicker = new TemplatePicker({
            featureLayers: templateLayers,
            grouping: true,
            rows: "auto",
            columns: 3
          }, 'templateDiv');
          templatePicker.startup();
		  templatePicker.update();

          var layers = arrayUtils.this.map(evt.layers, function(result) {
            return { featureLayer: result.layer };
          });
          var settings = {
            map: this.map,
            templatePicker: templatePicker,
            layerInfos: layers,
            toolbarVisible: true,
            createOptions: {
              polylineDrawTools:[ Editor.CREATE_TOOL_FREEHAND_POLYLINE ],
              polygonDrawTools: [ Editor.CREATE_TOOL_FREEHAND_POLYGON,
                Editor.CREATE_TOOL_CIRCLE,
                Editor.CREATE_TOOL_TRIANGLE,
                Editor.CREATE_TOOL_RECTANGLE
              ]
            },
            toolbarOptions: {
              reshapeVisible: true
            }
          };

          var params = { settings: settings };
          var myEditor = new Editor(params, 'editorDiv');
          //define snapping options
          var symbol = new SimpleMarkerSymbol(
            SimpleMarkerSymbol.STYLE_CROSS, 
            15, 
            new SimpleLineSymbol(
              SimpleLineSymbol.STYLE_SOLID, 
              new Color([255, 0, 0, 0.5]), 
              5
            ), 
            null
          );
    //      this.map.enableSnapping({
    //        snapPointSymbol: symbol,
    //        tolerance: 20,
    //        snapKey: keys.ALT
    //      });
    
          myEditor.startup();
        }
      });

});