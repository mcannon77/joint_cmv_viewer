define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dijit/_WidgetsInTemplateMixin",
   "esri/layers/ArcGISImageServiceLayer",
   "esri/layers/ImageParameters",
   "esri/layers/ImageServiceParameters",
   "esri/layers/MosaicRule",
   "esri/tasks/query",
   "esri/tasks/QueryTask",
   "esri/request",
   "esri/layers/GraphicsLayer",
   "esri/graphic",
   "esri/symbols/SimpleFillSymbol",
   "esri/symbols/SimpleLineSymbol",
   "esri/Color",
   "dojo/topic",
   "dojo/_base/lang",
   "dojo/dom",
   "dojo/parser",
   "dojo/on",
   "dojo/query",
   "dojo/store/Memory",  
   "dojo/_base/array",
   "dojo/dom-style",
   "dojo/dom-construct",
   "dojo/dom-class",
   "dojo/ready",
   "dojo/_base/connect",
   "dgrid/Grid",
   "dgrid/OnDemandGrid", 
   "dgrid/Selection", 
   "dgrid/selector",
   "dojo/i18n!./ImageFilter/nls/resource",
   "dijit/registry",
   "dijit/form/Button",
   "dijit/form/ToggleButton",

   "dojo/text!./ImageFilter/templates/ImageFilter.html",
   "xstyle/css!./ImageFilter/css/ImageFilter.css"//,
   ],
   function(
     declare,
     _WidgetBase,
     _TemplatedMixin,
     _WidgetsInTemplateMixin,
     
    // Map,
   //  ArcGISDynamicMapServiceLayer,
     ArcGISImageServiceLayer,
     ImageParameters,
     ImageServiceParameters,
     MosaicRule,
     Query,
     QueryTask,
 //    Extent,
 esriRequest,
 GraphicsLayer,
 Graphic,
 SimpleFillSymbol,
 SimpleLineSymbol,
// SimpleMarkerSymbol,
 Color,
      topic,
     lang,
     dom,
     parser,
     on,
     query,
     Memory,   
     array,
     Style,
    // domConst,
    domConstruct,
     domClass,
     ready,
     connect,
 //    ItemFileReadStore,
	 Grid,
	 OnDemandGrid,
	 Selection,
	 selector,
     i18n,
     registry,
     Button,
	 ToggleButton,
   //  ComboBox,
	 template
     ) {

   var ImageFilterDijit = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		widgetsInTemplate: !0,
    	templateString: template,
    	i18n: i18n,
    	map: this.map,
    	baseClass: "imagefilterDijit",

            postCreate: function() {
                this.inherited(arguments)			
            },

		layerQuery: function() {            
             //initialize query
             query = new Query();
             query.returnGeometry = true;
             query.geometry = this.map.extent;
             query.outFields = ["Name"];
			 query.outSpatialReference = {"wkid":102100};			 
          //execute query
            var queryTask = new QueryTask("http://imagery.arcgisonline.com/arcgis/rest/services/LandsatGLS/LandsatMaster/ImageServer");		
			//console.log(queryTask);
            queryTask.execute(query, lang.hitch(this, 'showResults'));

            },
	/*	getFootprints: function(featureSet)	{
					
			this.map.graphics.clear();

			var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL,
				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
				new Color([255,0,0]), 2),new Color([255,255,0,0.25])
				);


			console.log(featureSet.features);
			dojo.forEach(featureSet.features, function(feature){
				console.log(features);
            var graphic = feature;
			 console.log(graphic);
            graphic.setSymbol(symbol);
            graphic.setInfoTemplate(infoTemplate);
            console.log(graphic);
            this.map.graphics.add(graphic);
          });
		},	*/	
		footPrint: function() {
			var toggled = false;
			if (this.map.graphics.visible === true) {
				myToggleButton.set("iconClass", toggled ? "fa fa-check-square-o" : "fa fa-square-o");
				toggled = !toggled;				
			this.map.graphics.hide();
			} else {
				myToggleButton.set("iconClass", toggled ? "fa fa-square-o" : "fa fa-check-square-o");
				toggled = !toggled;
			this.map.graphics.show();
			}
		},
        showResults: function(featureSet) {
			
			this.map.graphics.clear();
					
			var infoTemplate = new esri.InfoTemplate();
				infoTemplate.setTitle("${NAME}");
			var features = featureSet.features;
			var symbol = new SimpleFillSymbol(
			SimpleFillSymbol.STYLE_SOLID,
				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]), 2),
				new Color([200,200,200,0.01])
				);

		//	console.log(features);
			dojo.forEach(features, function(feature){
		//	console.log(feature);
            var graphic = feature;
		//	console.log(graphic);
            graphic.setSymbol(symbol);
			//graphic.setOpacity(0.50);
            graphic.setInfoTemplate(infoTemplate);
         //   console.log(graphic);
		//	this.map.graphics.setOpacity(0.50);
            this.map.graphics.add(graphic);
          }, this);
		  
		  
/*			this.map.graphics.enableMouseEvents();

			    this.map.graphics.on('mouse-over', lang.hitch(this, function(event) {
                map.graphics.clear();  //use the maps graphics layer as the highlight layer
                var graphic = event.graphic;
                this.map.infoWindow.setContent(graphic.getContent());
                this.map.infoWindow.setTitle(graphic.getTitle());
                var highlightGraphic = new Graphic(graphic.geometry, symbol);
                this.map.graphics.add(highlightGraphic);
                this.map.infoWindow.show(event.screenPoint,
                this.map.getInfoWindowAnchor(event.screenPoint));
              }));

              //listen for when map.graphics mouse-out event is fired
              //and then clear the highlight graphic
              //and hide the info window
              this.map.graphics.on('mouse-out', lang.hitch(this, function(){
                this.map.graphics.clear();
                this.map.infoWindow.hide();
              }));
*/

         	var zone;
			var objID;
         	var values = [];
         	var testVals={};        	

			//console.log(features);
         	array.forEach(features, function(feature) {
           		zone = feature.attributes.Name;
				objID = feature.attributes.OBJECTID;
				//console.log(zone);
           			if (!testVals[zone]) {
             				testVals[zone] = true;
             				values.push({id: objID, Iname:zone});
							//console.log(values);
          			 }
         	});	
			
			var store = new Memory({idProperty: "id", data:values});
			//var store = new Memory(dataItems);
			//console.log(store)
			var SelectionGrid = declare([OnDemandGrid, Selection]);
			var grid = new SelectionGrid({
				store: store,
				selectionMode: "toggle",
				columns: [
					selector({label: "Select", selectorType: "checkbox"}),
					{field: 'id', label: 'ObjectID'},
					{field: 'Iname', label: 'Name'}]
				}, "attributesContainer");

			grid.renderArray(values);
		var imageServiceLayer = new ArcGISImageServiceLayer("http://imagery.arcgisonline.com/arcgis/rest/services/LandsatGLS/LandsatMaster/ImageServer",{imageServiceParameters: params, opacity: 0.75, id: "LandSat"});
		var params = new ImageServiceParameters();
		//var iSelect = [];
    grid.on('dgrid-select', lang.hitch(this, function(event) {
        // Get the rows that were just selected
		 var rows = event.rows;
		 var mmValue = rows[0].data.Iname;
		
         	var mr = new MosaicRule();
				mr.where =  "Name" + " = '" + mmValue + "'"
				imageServiceLayer.setMosaicRule(mr)
				this.map.addLayer(imageServiceLayer);

				//console.log(mr.where);
			return imageServiceLayer;
    }));
	
    grid.on('dgrid-deselect', lang.hitch(this, function(event) {
        // Get the rows that were just deselected
        var rows = event.rows;
		var mmValue = rows[0].data.Iname;
		this.map.removeLayer(imageServiceLayer);
        // ...
    }));
     }
  });
  
  return ImageFilterDijit;
});