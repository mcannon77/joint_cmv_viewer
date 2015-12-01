define([
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "esri/layers/ArcGISImageServiceLayer",
        "esri/layers/ImageServiceParameters",
        "esri/layers/MosaicRule",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/layers/GraphicsLayer",
        "esri/graphic",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/Color",
        "esri/dijit/LayerSwipe",
        "dojo/topic",
        "dojo/_base/lang",
        "dojo/dom",
        "dojo/on",
        "dojo/query",
        "dojo/store/Memory",
        "dojo/_base/array",
        "dojo/dom-construct",
        "dojo/dom-class",
        "dojo/ready",
        "dojo/_base/connect",
        "dgrid/Grid",
        "dgrid/OnDemandGrid",
        "dgrid/Selection",
        "dgrid/selector",
        "dijit/form/Select",
        "dijit/form/TextBox",
        "dijit/registry",
        "dijit/form/Button",
        "dijit/form/ToggleButton",
	"dijit/form/DropDownButton",
        "dijit/DropDownMenu",
        "dijit/MenuItem",
        "dijit/form/HorizontalSlider",
        "dojo/text!./Imagery/templates/Imagery.html",
        "dojo/i18n!./Imagery/nls/resource",
        'dijit/layout/LayoutContainer',
        'dijit/layout/ContentPane',
        'dijit/layout/TabContainer',
        "xstyle/css!./Imagery/css/Imagery.css"
    ],
    function(
        declare,
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,

        ArcGISImageServiceLayer,
        ImageServiceParameters,
        MosaicRule,
        Query,
        QueryTask,
        GraphicsLayer,
        Graphic,
        SimpleFillSymbol,
        SimpleLineSymbol,
        Color,
        LayerSwipe,
        topic,
        lang,
        dom,
        on,
        query,
        Memory,
        array,
        domConstruct,
        domClass,
        ready,
        connect,
        Grid,
        OnDemandGrid,
        Selection,
        selector,
        Select,
        TextBox,
        registry,
        Button,
        ToggleButton,
	DropDownButton,
        DropDownMenu,
        MenuItem,
        HorizontalSlider,
        template,
        i18n
   //     ContentPane,
   //     TabContainer
    ) {

        var ImageryDijit = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
            widgetsInTemplate: true,
            templateString: template,
            i18n: i18n,
            baseClass: "ImageryDijit",             	

            postCreate: function() {
                this.inherited(arguments);
                this.connect(this.parentWidget, 'toggle', 'onWidgetToggle');
		this.selectGraphic = new GraphicsLayer({id:"footprint"});
		this.grid = null;		
		this.values = [];
                this.store = new Memory({data: this.values});
                this.queryTask = new QueryTask(this.imageServiceUrl);
		this.params = new ImageServiceParameters();
		this.imageServiceLayer = new ArcGISImageServiceLayer(this.imageServiceUrl, {
                    imageServiceParameters: this.params,
                    minScale: 300000, //tweak against mosaic PS
                    id: "ACCImagery"
                });
                this.nMenu = new DropDownMenu({
                    style: "display: none;"
                });
                this.mi = new MenuItem({
                    label: "Clear Selected",
                    id: "clearImage",
                    onClick: dojo.hitch(this, function(evt) {
                    this.grid.clearSelection();
                    this.map.removeLayer(this.imageServiceLayer);
                })
                });
                this.mi2 = new MenuItem({
                    label: "Clear Grid",
                    id: "clearGrid",
                    onClick: lang.hitch(this, function() {
                    //experiementing with proper Grid clear
                this.grid.clearSelection(); 
                this.selectGraphic.clear();
                this.map.removeLayer(this.imageServiceLayer);
                this.grid.set('columns', []);
                this.values = [];
                this.grid.set('store', new Memory({
		    idProperty: "",
                    data: this.values
                }));              
                this.grid.set('store', this.store);
                this.grid.refresh();
                this.grid.renderArray(this.values); 
            })
                });
                this.n = new DropDownButton({
                    label: "Clear",
                    iconClass: 'fa fa-times-circle-o',
                    id: "clearButton",
                    dropDown: this.nMenu
                });
                this.fp = new Button({
                    label: "Toggle FootPrint",
                    iconClass: 'fa fa-check-square-o',
                    id: 'clearFp',
                    onClick: dojo.hitch(this, function(evt) {
                    var toggled = false;
                    if (this.selectGraphic.visible === true) {
                        dijit.byId('clearFp').set("iconClass", toggled ? "fa fa-check-square-o" : "fa fa-square-o");
                        toggled = !toggled;
                        this.selectGraphic.hide();
                    } else {
                        dijit.byId('clearFp').set("iconClass", toggled ? "fa fa-square-o" : "fa fa-check-square-o");
                        toggled = !toggled;
                        this.selectGraphic.show();
                    }
                })
                });
                 /*this.ls = new Button({
                    label: "Toggle Swipe",
                    iconClass: 'fa fa-check-square-o',
                    id: 'ls',
                    onClick: dojo.hitch(this, function(evt) {
                    var toggled = false;
                    if (this.selectGraphic.visible === true) {
                        dijit.byId('ls').set("iconClass", toggled ? "fa fa-check-square-o" : "fa fa-square-o");
                        this.swipeNode = domConstruct.create("div", {id: "lsNode"}, 'mapCenter');
                        this.imageSwipe.placeAt('lsNode');
                        toggled = !toggled;
                        this.imageSwipe.enable();
                    } else {
                        dijit.byId('ls').set("iconClass", toggled ? "fa fa-square-o" : "fa fa-check-square-o");
                        toggled = !toggled;
                        this.imageSwipe.disable();
                    }
                })
                });*/
                
                this.opacitySlider = new HorizontalSlider({
                	name: "slider",
                	value: 1,
                	minimum: 0,
                	maximum: 1,             	
                	style: "width: 250px;",
                	onChange: dojo.hitch(this, function(value) {
                		this.imageServiceLayer.setOpacity(value);
                		})
                	}, "");               	
            },

            onWidgetToggle: function(evt) {
                if (this.parentWidget.open) {
                    console.log("open");
                    //Tab bug fix
                    this.tabContainer.resize();
                    topic.publish('viewer/togglePane', {
                        pane: 'bottom',
                        show: false
                    });
                    //widget is openend
                } else {
                    console.log("closed");
                    this.tabContainer.resize();
                    topic.publish('viewer/togglePane', {
                        pane: 'bottom',
                        show: true
                    });
                    //widget is closed
                }
            },
	    //onlayerChange: function() {
	    //code for selecting different imagery services
	    //not implimented yet
	    //},	
	    createGrid: function() {
		var SelectionGrid = declare([OnDemandGrid, Selection]);
                this.grid = new SelectionGrid({
                    store: this.store,
                    allowTextSelection: false,
                    selectionMode: "none",
                    columns: [
                            selector({
                                field: 'sel',
                                label: "Select",
                                selectorType: "radio"
                            }), {
                                field: 'iSel',
                                label: 'Find',
                                formatter: function() {
                                    return '<img src="images/search.png" alt="" height="14" width="14"/>';
                                }
                            },{
                                field: 'iInst',
                                label: 'Installation'
                            }, {
                                field: 'iDate',
                                label: 'Acquisition Date',
                                formatter: function(value) {
                               var inputDate = new Date(value);
                               //return inputDate.toString();
                               return dojo.date.locale.format(inputDate, {
                               		selector: 'date',
                                       datePattern: 'MM/dd/yyyy'
                                       });
                                       }
                             }, {
                                field: 'iRes',
                                label: 'Resolution (cm)'
                             }, {
                                field: 'iMC',
                                label: 'MAJCOM'
                             }, {
                                 field: 'iCtry',
                                 label: 'Country'
                             }, {
                                 field: 'iState',
                                 label: 'State/Prov'
                             }, {
                                 field: 'idaysOld',
                                 label: 'Acquisition Age (Days)'
                             }]
                }, "attributesContainer");
			},
            attQuery: function() {
                if (dojo.indexOf(this.map.graphicsLayerIds, "footprint") != -1) {
                    this.selectGraphic.clear();
                    this.map.removeLayer(this.imageServiceLayer);
                } 
            var value = this.inputSearch.displayedValue;
            //console.log(this.inputSearch.displayedValue);
            if (value.length < 3) {
                        topic.publish('growler/growl', {
                        title: 'Search Results',
                        message: 'Search term must be at least 3 characters',
                        level: 'error',
                        timeout: 5000
                    });
            } else if(!isNaN(value)) {
            	        topic.publish('growler/growl', {
                        title: 'Search Results',
                        message: 'Invalid Search',
                        level: 'error',
                        timeout: 5000
                    });
            } else {
                //initialize query
                query = new Query();
                query.returnGeometry = true;
                query.where = "Installation LIKE upper('" +'%' + value + '%' + "')";
                query.outFields = ["Name", "Installation", "AcquisitionDate", "ImageResolution", "MAJCOM", "Country", "StateProvince", "DaysOld"];
                query.outSpatialReference = {
                    "wkid": 102100
                };
                this.queryTask.execute(query, lang.hitch(this, 'showResults'));
		}
            },
            extentQuery: function() {
                if (dojo.indexOf(this.map.graphicsLayerIds, "footprint") != -1) {
                    this.selectGraphic.clear();
                    this.map.removeLayer(this.imageServiceLayer);
                } 
                //initialize query
                query = new Query();
                query.returnGeometry = true;
                query.geometry = this.map.extent;
                query.outFields = ["Name", "Installation", "AcquisitionDate", "ImageResolution", "MAJCOM", "Country", "StateProvince", "DaysOld"];
                query.outSpatialReference = {
                    "wkid": 102100
                };
                this.queryTask.execute(query, lang.hitch(this, 'showResults'));
            },
            showResults: function(featureSet) { 
                    if (dojo.indexOf(this.map.graphicsLayerIds, "footprint") != -1) {
                    this.selectGraphic.clear();
                }
                	if (this.values.length > 0) {
			this.values = [];
			}           

           // console.log(this.oNode);
            if (this.oNode == undefined) {
            console.log("initialized");
		//create buttons and grid
                this.n.startup();
                this.fp.startup();               
                this.nMenu.addChild(this.mi);
                this.nMenu.addChild(this.mi2);
                dom.byId("testNode").appendChild(this.n.domNode);
                dom.byId("testNode").appendChild(this.fp.domNode);
               // dom.byId("testNode").appendChild(this.ls.domNode);
               this.oNode = domConstruct.create("div", {id: "opacityNode"}, 'testNode');
              //  console.log(this.oNode);

               this.opacitySlider.placeAt('opacityNode');	
               this.opacitySlider.startup();
           // this.imageSwipe.startup();
	    this.createGrid();
	    } else {
	    console.log("refreshed");
	    this.createGrid();
	    this.grid.refresh();
	    }		


                var features = featureSet.features;
		//console.log(featureSet.features);
		
		   topic.publish('growler/growl', {
                        title: 'Search Results',
                        message: 'Search returned' + ' ' + featureSet.features.length + ' ' + 'results',
                        level: 'default',
                        timeout: 4000
                    });		

                var symbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 0]), 1),
                    new Color([200, 200, 200, 0.001])
                );

                //	console.log(features);
                array.forEach(features, lang.hitch(this, function(feature) {

                    var graphic = feature;
                    graphic.setSymbol(symbol);
                    this.selectGraphic.add(graphic);
                    this.map.addLayer(this.selectGraphic);

                }), this);

                array.forEach(features, lang.hitch(this, function(feature) {

                    // if (!testVals[name]) {
                    //    testVals[name] = true;
                    this.values.push({
                        objID: feature.attributes.OBJECTID,
                        iInst: feature.attributes.Installation,
                        iName: feature.attributes.Name,
                        iDate: feature.attributes.AcquisitionDate,
                        iRes: feature.attributes.ImageResolution,                       
                        iMC: feature.attributes.MAJCOM,
                        iCtry: feature.attributes.Country,
                        iState: feature.attributes.StateProvince,
                        idaysOld: feature.attributes.DaysOld
                    });
                    // }
                }), this);
                console.log(this.values.length);
            //if (rows && rows.length > 0) {
                this.grid.set('store', new Memory({
		    idProperty: "objID",
                    data: this.values
                }));
            //}              
		// this.grid.refresh();
                this.grid.renderArray(this.values);
                this.grid.set('sort', 'idaysOld');
               // console.log(this.grid.columns.length);
                
                this.grid.on('dgrid-select', lang.hitch(this, function(event) {
                    // Get the rows that were just selected
                    var rows = event.rows;
                    var mmValue = rows[0].data.iName;
                    var features = featureSet.features;

                        array.forEach(features, lang.hitch(this, function(feature) {
                            if (feature.attributes.OBJECTID == rows[0].id) {                            
                                if (this.map.getScale() > this.imageServiceLayer.minScale) {
                                var selectedLayer = feature.geometry.getExtent();
                                this.map.setExtent(selectedLayer.expand(0.8)); 
                                 }                          
                            }
                        }), this);
                    var mr = new MosaicRule();
                    mr.where = "Name" + " = '" + mmValue + "'";
                    this.imageServiceLayer.setMosaicRule(mr);
                    this.map.addLayer(this.imageServiceLayer);
		    this.map.reorderLayer(this.imageServiceLayer, 1);
                    return this.imageServiceLayer;
                }));

                this.grid.on(".field-iSel:click", lang.hitch(this, function(evt) {
                    var row = this.grid.row(evt);
                    //var cell = this.grid.cell(evt);
                    //initialize query
                    query2 = new Query();
                    query2.returnGeometry = true;
                    query2.where = "OBJECTID = " + row.id;
                    query2.outSpatialReference = {
                        "wkid": 102100
                    };
                    this.queryTask.execute(query2, lang.hitch(this, 'showResultsTwo'));
                }));

                this.grid.on(".dgrid-row:mouseout", lang.hitch(this, function(evt) {
                    this.map.graphics.clear(); //clears Find Graphic
                }));
            },
            showResultsTwo: function(featureSet) {
                this.map.graphics.clear();
                var features = featureSet.features;
                var selectLayer = features[0].geometry.getExtent().expand(1.5);
                //console.log(selectLayer);
                this.map.setExtent(selectLayer);

                var highlightSymbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1.5),
                    new Color([1, 209, 255, 0.60])
                );
                var features = featureSet.features;
                array.forEach(features, lang.hitch(this, function(feature) {
                    var graphic2 = feature;
                        graphic2.setSymbol(highlightSymbol);
                    this.map.graphics.add(graphic2);
                }), this);
            }

        });

        return ImageryDijit;
    });