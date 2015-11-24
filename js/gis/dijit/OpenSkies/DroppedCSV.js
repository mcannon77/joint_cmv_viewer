define([
  'put-selector',

  'esri/request',

  'esri/geometry/Extent',

  'esri/symbols/jsonUtils',
  'esri/symbols/SimpleFillSymbol',
  'esri/symbols/SimpleLineSymbol',
  'esri/symbols/SimpleMarkerSymbol',
  
  "esri/tasks/BufferParameters",
  "esri/tasks/GeometryService",
  'esri/Color',
  'esri/graphic',
  "esri/layers/GraphicsLayer",
  'esri/InfoTemplate',

  "esri/geometry/geometryEngine",
  "dijit/form/Button",
  "dijit/form/NumberTextBox",
  "esri/tasks/query",
  "esri/tasks/QueryTask",
  'dgrid/Grid',
  "dojo/store/Memory",

  'dojo/_base/array',
  'dojo/_base/declare',
  'dojo/_base/lang',

  'dojo/on',

  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',

  'dojox/gfx',

  'dojo/text!./templates/DroppedCSV.html',
  'xstyle/css!./css/DroppedCSV.css',

  'require'
], function(
  put,
  esriRequest,
  Extent,
  symbolJsonUtils, SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol,
  BufferParameters, GeometryService, Color, Graphic, GraphicsLayer, InfoTemplate, geometryEngine, Button, NumberTextBox, Query, QueryTask, Grid, Memory,
  array, declare, lang,
  on,
  _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
  gfx,
  template, css,
  require
) {
  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    // description:
    //    Widget to show and interact with items dropped on the map

    templateString: template,
    baseClass: 'esri-DroppedCSV',
    widgetsInTemplate: true,

    label: '',
 //   itemId: '',
 //   url: '',
 //   serviceType: '',
    removeIcon: require.toUrl('./images/remove.png'),
//	bufferIcon: require.toUrl('./images/database.png'),

    serviceIcons: {
      'defaultIcon': require.toUrl('./images/earth.png'),
   /*   'MapServer': require.toUrl('./images/map.png'),
      'FeatureServer': require.toUrl('./images/warning.png'),
      'MapServer Layer': require.toUrl('./images/map.png'),
      'FeatureServer Layer': require.toUrl('./images/database.png'),
      'ImageServer': require.toUrl('./images/images.png'),
      'loading': require.toUrl('./images/loading.gif')*/
    },

    postCreate: function() {
 /*     if (this.hasOwnProperty('serviceType') && this.serviceType === 'FeatureServer') {
        this.setIcon(this.serviceIcons.FeatureServer, 20);
      } else if (this.hasOwnProperty('url') && this.url !== '') {
        this.setIcon(this.serviceIcons.loading, 20);
        this._loadServiceInfo(this.url, null);
      } else {
        this.setIcon(this.serviceIcons.loading, 20);
      }*/
      this.setIcon(this.serviceIcons.defaultIcon, 20);
	  this.queryTask = new QueryTask("https://www.my.af.mil/accgeoprod/geobase/rest/services/Airfield_Planning/MapServer/7");
	  this.query = new Query();
	  this.allPoly = new GraphicsLayer({id:"allpoly"});
	  this.allPolyUnion = [];
	  this.graphic3 = new Graphic();
	 // this.turns = dojo.indexOf(this.map.graphicsLayerIds, "turns");
	 // this.turnsGraphicsLayer = this.map.getLayer(this.map.graphicsLayerIds[this.turns]);

    },
    getLabel: function() {
      return this.label;
    },
    setLabel: function(newLabel) {
      this.label = newLabel;
      this.labelNode.innerHTML = newLabel;
    },
    setIcon: function(icon, size, html) {
      if (html) {
        this.iconNode.outerHTML = html;
        return;
      }
      put(this.iconNode, '[src=' + icon + ']');
      if (size) {
        put(this.iconNode, '[style=width:' + size + 'px;height:' + size + 'px;padding:' + Math.abs(32 - size) / 2 + 'px;]');
      }
    },
    _removeItem: function() {
    this.map.graphics.clear();

   //if flightpath exists so does turns and labels
    if (dojo.indexOf(this.map.graphicsLayerIds, "flightpath"/* || "turns"*/) != -1) {
    //rewrite
		 //   var fp = dojo.indexOf(this.map.graphicsLayerIds, "flightpath");
		 //   var turns = dojo.indexOf(this.map.graphicsLayerIds, "turns");
		 //   var labels = dojo.indexOf(this.map.graphicsLayerIds, "labels");
		 //   var allpoly = dojo.indexOf(this.map.graphicsLayerIds, "allpoly");
		//    var positiveId = dojo.indexOf(this.map.graphicsLayerIds, "positive");
                    var fpGraphicsLayer = this.map.getLayer("flightpath");
                    var turnsGraphicsLayer = this.map.getLayer("turns");
                    var labelsGraphicsLayer = this.map.getLayer("labels");
                    var allpolyGraphicsLayer = this.map.getLayer("allpoly");
                    var positiveGraphicsLayer = this.map.getLayer("positive");
                    //console.log(currentGraphicsLayer);
                    this.map.removeLayer(fpGraphicsLayer);
                    this.map.removeLayer(turnsGraphicsLayer);
                    this.map.removeLayer(labelsGraphicsLayer);
                    this.map.removeLayer(allpolyGraphicsLayer);
                    this.map.removeLayer(positiveGraphicsLayer);
                }
      if (this.removeCallback) {
        this.removeCallback(this.itemId);
        this.destroyRecursive();
      }
    },
	bufferpath: function() {
		var fp = dojo.indexOf(this.map.graphicsLayerIds, "flightpath")
		var fpGraphicsLayer = this.map.getLayer(this.map.graphicsLayerIds[fp]);
		//console.log(fpGraphicsLayer);
			  var params = new BufferParameters();
			  var geom = [];
			  	array.forEach(fpGraphicsLayer.graphics, lang.hitch(this, function(array, i) {
			  	geom.push(fpGraphicsLayer.graphics[i].geometry)
          			}), this);	
          			//console.log(test);
					params.geometries  = geom;
					params.distances = [dojo.byId("distanceInput").value];
					params.unit = GeometryService.UNIT_KILOMETER;
				//	params.bufferSpatialReference = new SpatialReference({wkid: 102100});
					params.outSpatialReference = this.map.spatialReference;
					esriConfig.defaults.geometryService.buffer(params, lang.hitch(this, 'showBuffer'));
		},
	showBuffer: function(bufferedGeometries) {
          var symbol = new SimpleFillSymbol(
            SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(
              SimpleLineSymbol.STYLE_SOLID,
              new Color([255,0,0,0.65]), 1.5
            ),
            new Color([1, 209, 255, 0.60])
          );

          array.forEach(bufferedGeometries, lang.hitch(this, function(geometry) {
          this.allPolyUnion.push(geometry);		  
          }), this);

          var union = geometryEngine.union(this.allPolyUnion);
          console.log(this.map.graphicsLayerIds);
          this.graphic3.setGeometry(union);
          this.graphic3.setSymbol(symbol);
	  this.allPoly.add(this.graphic3);
	  this.map.addLayer(this.allPoly);
	  this.map.reorderLayer(this.allPoly, 1);

		this.query.outSpatialReference = this.map.spatialReference;
		this.query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
                this.query.returnGeometry = true;
                console.log(this.graphic3.geometry);
                this.query.geometry = this.graphic3.geometry;
                //this.query.outFields = ["OBJECTID", "arpt_name"];
		this.query.outFields = ["*"];
		this.queryTask.execute(this.query, lang.hitch(this, 'showResults'));
        },
		showResults: function(featureSet) {
               // var name;
               // var objectid;
		//var values = [];
		var features = featureSet.features;
		var positive = new GraphicsLayer({id:"positive"});	
                if (dojo.indexOf(this.map.graphicsLayerIds, "positive") != -1) {
		    var posIndex = dojo.indexOf(this.map.graphicsLayerIds, "positive")
                    var currentGraphicsLayer = this.map.getLayer(this.map.graphicsLayerIds[posIndex]);
                    this.map.removeLayer(currentGraphicsLayer);
                } else {}

			var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2);
			var white = new Color([255, 255, 255, 1.0]); // hex is #ff4500
            		var marker = new SimpleMarkerSymbol("circle", 10, sls, white);
            		var template = new InfoTemplate("Attributes", "${*}");
			        array.forEach(features, lang.hitch(this, function(feature) {
			        
						//objectid = feature.attributes.OBJECTID;
						//name = feature.attributes.arpt_name;
						//values.push({
                       // objID: objectid,
                       // iName: name,
                   // });
						var graphic4 = feature;
						graphic4.setSymbol(marker);
						positive.add(graphic4);
						positive.setInfoTemplate(template);
						this.map.addLayer(positive);
					}), this);
		/*			
		var store = new Memory({
                    idProperty: "objID",
                    data: values
                });

			 var grid = new Grid({
				    store: store,
                 //   allowTextSelection: false,
                    selectionMode: "none",
				        columns: [{
                                field: 'objID',
                                label: 'Object ID'
                            },{
                                field: 'iName',
                                label: 'Name'
                            }
                        	]				 
			 }, "intResults");
			 grid.renderArray(values);
			 
		grid.on(".field-iName:click", lang.hitch(this, function(evt) {
                    var row = grid.row(evt);
                    var cell = grid.cell(evt);

                    console.log(cell.column.id);
                    //initialize query
                    //query2 = new Query();
                    //query2.returnGeometry = true;
                    //query2.where = "OBJECTID = " + row.id;
                    //query2.outSpatialReference = {
                    //    "wkid": 102100
                    //};
                    //execute query
                    //var queryTask = new QueryTask("https://www.my.af.mil/accgeoprod/geobase/rest/services/Imagery/ACCImagery/ImageServer");
                    //console.log(queryTask);
                    //queryTask.execute(query2, lang.hitch(this, 'showResultsTwo'));
                }));
			 
			 
		*/	 
			 
			 
		},

    _loadServiceInfo: function(url, targetNode) {
      esriRequest({
        url: url,
        content: {
          f: 'json'
        },
        handleAs: 'json',
        callbackParamName: 'callback'
      }).then(lang.hitch(this, '_handleLoadedServiceInfo', url, targetNode), lang.hitch(this, '_handleErrBack', url));
    },
    _handleErrBack: function(url) {
      this.label = 'Unable to add resource from url';
      this.labelNode.innerHTML = '<span title="' + url + '">' + this.label + '</span>';
      this.setIcon(this.serviceIcons.FeatureServer, 20);
    },
    _handleLoadedServiceInfo: function(url, targetNode, info) {
      // set the label on the first item loaded
      if (targetNode === null) {
        if (info.hasOwnProperty('documentInfo') && info.documentInfo.hasOwnProperty('Title')) {
          info.name = (info.documentInfo.Title !== '' ? info.documentInfo.Title : null);
        }
        if (!info.name && info.hasOwnProperty('mapName')) {
          info.name = (info.mapName !== '' ? info.mapName : url);
        }
        if (!info.hasOwnProperty('name') || !info.name) {
          info.name = url;
        }
        this.label = this.serviceType === '' ? info.name : info.name + '&nbsp;<span class="sub-label">(' + this.serviceType + ')</span>';
        this.labelNode.innerHTML = '<span title="' + url + '">' + this.label + '</span>';
        var icon = this.serviceType === '' ? 'defaultIcon' : this.serviceType;
        if (this.serviceIcons.hasOwnProperty(icon)) {
          this.setIcon(this.serviceIcons[icon], 20);
        }
        // check if a MapServer/Feature server root directory (not a layer)
        //  if a root directory, recursively call _loadService info on each of
        //  the layers
        if (info.hasOwnProperty('layers') && info.layers.length >= 1) {
          array.forEach(info.layers, lang.hitch(this, function(layer, i) {
            this._loadServiceInfo(url + '/' + i, this.containerNode);
          }));
        } else if (info.hasOwnProperty('drawingInfo')) {
          var serviceLayerHTML = '<div>';
          serviceLayerHTML += '<div class="layersInfo">' + this._buildLayersInfo(this._getRendererSymbolArray(info.drawingInfo.renderer)) + '</div>';
          serviceLayerHTML += '</div>';
          this.containerNode.innerHTML = serviceLayerHTML;
        }
      } else if (targetNode !== undefined) {
        put(targetNode, 'div.layerTitle', info.name);
        var outHTML = '<div>';
        outHTML += '<div class="layersInfo">' + this._buildLayersInfo(this._getRendererSymbolArray(info.drawingInfo.renderer)) + '</div>';
        outHTML += '</div>';
        targetNode.innerHTML += outHTML;
      }
    },
 /*   _getRendererSymbolArray: function(rendererJson) {
      if (rendererJson.hasOwnProperty('uniqueValueInfos')) {
        return rendererJson.uniqueValueInfos;
      } else if (rendererJson.hasOwnProperty('symbol')) {
        return [rendererJson];
      }
    },*/
    _buildLayersInfo: function(layersInfo) {
      var layersHTML = array.map(layersInfo, lang.hitch(this, '_buildLayerInfo')).join('');
      return layersHTML;
    },
    _buildLayerInfo: function(layerInfo) {
      var layerHTML = '<div class="layerInfo">';
      if (layerInfo.symbol.type === 'esriPMS') {
        layerHTML += '<img class="iconNode iconPatch" src="data:' + layerInfo.symbol.contentType + ';base64,' + layerInfo.symbol.imageData + '">';
      } else {

        layerHTML += this._createPatchHTML(layerInfo);
      }
      layerHTML += '<div class="labelNode">' + (layerInfo.label !== '' ? layerInfo.label : 'No label') + '</div>';
      layerHTML += '</div>';
      layerHTML += '<div class="clearer" style="height:5px;"></div>';
      return layerHTML;
    },
    _createPatchHTML: function(layerInfo, symbol) {
      if (!symbol) {
        // create symbol obj from json
        symbol = this._createSymbol(layerInfo);
      }
      // use gfx to create symbol surface/image
      var docFrag = put('div.iconNode');
      var surface = gfx.createSurface(docFrag, 32, 32);
      var descriptors = symbolJsonUtils.getShapeDescriptors(symbol);
      var shape = surface.createShape(descriptors.defaultShape)
        .setFill(descriptors.fill)
        .setStroke(descriptors.stroke);
      shape.applyTransform({
        dx: 16,
        dy: 16
      });
      return docFrag.outerHTML;
    },
    _createSymbol: function(layerInfo) {
      if (layerInfo.hasOwnProperty('symbol') && layerInfo.symbol.hasOwnProperty('type')) {
        var type = layerInfo.symbol.type;
        if (type === 'esriSFS') {
          return new SimpleFillSymbol(layerInfo.symbol);
        } else if (type === 'esriSLS') {
          return new SimpleLineSymbol(layerInfo.symbol);
        } else if (type === 'esriSMS') {
          return new SimpleMarkerSymbol(layerInfo.symbol);
        }
      }
    }
  });
});