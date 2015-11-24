define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/form/Form',
    'dijit/form/Button',
    'dijit/form/Select',
    'dijit/form/ValidationTextBox',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/Deferred',
    'dojo/dom-construct',
    'dojo/sniff',
    'dojox/uuid/generateRandomUuid',
    'esri/config',
    'esri/layers/FeatureLayer',
    'esri/dijit/AttributeInspector',
    'esri/Color',
    'esri/graphic',
    'esri/request',
    'esri/SpatialReference',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/SimpleFillSymbol',
    'esri/tasks/query',
	'esri/tasks/GeometryService',
	'esri/tasks/BufferParameters',
    'esri/tasks/QueryTask',
    'esri/toolbars/draw',
    'esri/geometry/Circle',
    'esri/geometry/Point',
    'esri/geometry/scaleUtils',
    'dojo/text!./ERTool/templates/ERTool.html',
    'xstyle/css!./ERTool/css/ERTool.css'
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Form, Button, Select, ValidationTextBox, on, lang, arrayUtils, Deferred, domConstruct, sniff, generateRandomUuid, esriConfig, FeatureLayer, AttributeInspector, Color, Graphic, request, SpatialReference, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Query, GeometryService, BufferParameters, QueryTask, Draw, Circle, Point, scaleUtils, template, css) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        widgetsInTemplate: true,
        templateString: template,
        baseClass: 'gis_ERToolDigit',
        incidentPointFeature: null,
        incidentPointFeatureSelect: null,
        blockadesFeature: null,
        blockadesFeatureSelect: null,
        alohaFootprintFeature: null,
        alohaFootprintFeatureSelect: null,
        safeRouteFeature: null,
        facilityStatusFeature: null,
        cordonPolyFeature: null,
        cordonPolyFeatureSelect: null,
        incidentPointClickHandle: null,
        blockadesClickHandle: null,
        safeRouteClickHandle: null,
        facilityStatusClickHandle: null,
        cordonPolyClickHandle: null,
        alohaFootprintClickHandle: null,
        featureLayerOptions: {
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ["*"]
        },
        featureLayerOptionsSelect: {
            mode: FeatureLayer.MODE_SELECTION,
            outFields: ["*"]
        },
        updateFeature: null,
        activeIncident: null,
        drawToolbar: null,
        currentAction: null,
        cordonEdit: null,
        
        postCreate: function () {
            //this.titleNode.innerHTML = this.title;
            this.connect(this.parentWidget, 'toggle', 'onWidgetToggle');
            this.drawToolbar = new Draw(this.map);

            //define the ER Tool FeatureLayers
            this.incidentPointFeature = new FeatureLayer(this.incidentPointUrl, this.featureLayerOptions);
            this.incidentPointFeatureSelect = new FeatureLayer(this.incidentPointUrl, this.featureLayerOptionsSelect);
            this.blockadesFeature = new FeatureLayer(this.blockadesUrl, this.featureLayerOptions);
            this.blockadesFeatureSelect = new FeatureLayer(this.blockadesUrl, this.featureLayerOptionsSelect);
            this.alohaFootprintFeature = new FeatureLayer(this.alohaFootprintUrl, this.featureLayerOptions);
            this.alohaFootprintFeatureSelect = new FeatureLayer(this.alohaFootprintUrl, this.featureLayerOptionsSelect);
            this.safeRouteFeature = new FeatureLayer(this.safeRouteUrl, this.featureLayerOptions);
            this.safeRouteFeatureSelect = new FeatureLayer(this.safeRouteUrl, this.featureLayerOptionsSelect);
            this.facilityStatusFeature = new FeatureLayer(this.facilityStatusUrl, this.featureLayerOptions);
            this.facilityStatusFeature.opacity = 0.6;
            this.facilityStatusFeatureSelect = new FeatureLayer(this.facilityStatusUrl, this.featureLayerOptionsSelect);
            this.cordonPolyFeature = new FeatureLayer(this.cordonPolyUrl, this.featureLayerOptions);
            this.cordonPolyFeatureSelect = new FeatureLayer(this.cordonPolyUrl, this.featureLayerOptionsSelect);
            
            //set up selection symbols for selection layers
            var pointSelectSymbol = new SimpleMarkerSymbol(
                SimpleMarkerSymbol.STYLE_CIRCLE,
                8,
                new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color("yellow")
                ),
                null
            );
            
            var lineSelectSymbol = new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color("yellow"),
                10
            );

            var polySelectSymbol = new SimpleFillSymbol(
              SimpleFillSymbol.STYLE_NULL,
              new SimpleLineSymbol(
                "solid",
                new Color("yellow"),
                8
              ),
              null
            );

            this.incidentPointFeatureSelect.setSelectionSymbol(pointSelectSymbol);
            this.blockadesFeatureSelect.setSelectionSymbol(pointSelectSymbol);
            this.safeRouteFeatureSelect.setSelectionSymbol(lineSelectSymbol);
            this.facilityStatusFeatureSelect.setSelectionSymbol(polySelectSymbol);
            this.cordonPolyFeatureSelect.setSelectionSymbol(polySelectSymbol);
            this.alohaFootprintFeatureSelect.setSelectionSymbol(polySelectSymbol);
            
            //set up click events for attribute editing
            this.setFeatureClickEvents(true);
            
            //set up events for refreshing feature layers after edit
            this.incidentPointFeatureSelect.on('edits-complete', lang.hitch(this, function (evt) {
                this.incidentPointFeature.refresh();
            }));
            this.blockadesFeatureSelect.on('edits-complete', lang.hitch(this, function (evt) {
                this.blockadesFeature.refresh();
            }));
            this.facilityStatusFeatureSelect.on('edits-complete', lang.hitch(this, function (evt) {
                this.facilityStatusFeature.refresh();
            }));
            this.cordonPolyFeatureSelect.on('edits-complete', lang.hitch(this, function (evt) {
                this.cordonPolyFeature.refresh();
            }));
            this.safeRouteFeatureSelect.on('edits-complete', lang.hitch(this, function (evt) {
                this.safeRouteFeature.refresh();
            }));
            this.alohaFootprintFeatureSelect.on('edits-complete', lang.hitch(this, function (evt) {
                this.alohaFootprintFeature.refresh();
            }));
            
            //set up events for firing after adding new features
            this.incidentPointFeature.on('edits-complete', lang.hitch(this, function (evt) {
                this.featureEditsComplete(evt);
            }));
            
            //set up events for redrawing incident layer to set active incident after edit
            this.incidentPointFeature.on('update-end', lang.hitch(this, function (evt) {
                this.featureUpdateComplete(evt);
            }));

            this.drawToolbar.on('draw-end', lang.hitch(this, 'onDrawToolbarDrawEnd'));
            
            //esriConfig.defaults.io.proxyUrl = "/proxy";
        },
        
        setFeatureClickEvents: function (on) {
            if (on) {
                this.incidentPointClickHandle = this.incidentPointFeature.on('click', lang.hitch(this, function (evt) {
                    this.featureClick(evt);
                }));
                this.blockadesClickHandle = this.blockadesFeature.on('click', lang.hitch(this, function (evt) {
                    this.featureClick(evt);
                }));
                this.safeRouteClickHandle = this.safeRouteFeature.on('click', lang.hitch(this, function (evt) {
                    this.featureClick(evt);
                }));
                this.facilityStatusClickHandle = this.facilityStatusFeature.on('click', lang.hitch(this, function (evt) {
                    this.featureClick(evt);
                }));
                this.cordonPolyClickHandle = this.cordonPolyFeature.on('click', lang.hitch(this, function (evt) {
                    this.featureClick(evt);
                }));
                this.alohaFootprintClickHandle = this.alohaFootprintFeature.on('click', lang.hitch(this, function (evt) {
                    this.featureClick(evt);
                }));
            } else {
                this.incidentPointClickHandle.remove();
                this.blockadesClickHandle.remove();
                this.safeRouteClickHandle.remove();
                this.facilityStatusClickHandle.remove();
                this.cordonPolyClickHandle.remove();
                this.alohaFootprintClickHandle.remove();
            }
        },
        
        onWidgetToggle: function (evt) {
            
            if (this.parentWidget.open) {
                //widget is openend
                //console.log(generateRandomUuid());
                this.map.addLayers([
                    this.cordonPolyFeatureSelect,
                    this.cordonPolyFeature,
                    this.alohaFootprintFeatureSelect,
                    this.alohaFootprintFeature,
                    this.facilityStatusFeatureSelect,
                    this.facilityStatusFeature,
                    this.safeRouteFeatureSelect,
                    this.safeRouteFeature,
                    this.blockadesFeatureSelect,
                    this.blockadesFeature,
                    this.incidentPointFeatureSelect,
                    this.incidentPointFeature]);

            } else {
                //widget is closed
                this.map.removeLayer(this.incidentPointFeature);
                this.map.removeLayer(this.incidentPointFeatureSelect);
                this.map.removeLayer(this.blockadesFeature);
                this.map.removeLayer(this.blockadesFeatureSelect);
                this.map.removeLayer(this.alohaFootprintFeature);
                this.map.removeLayer(this.alohaFootprintFeatureSelect);
                this.map.removeLayer(this.safeRouteFeature);
                this.map.removeLayer(this.facilityStatusFeature);
                this.map.removeLayer(this.facilityStatusFeatureSelect);
                this.map.removeLayer(this.cordonPolyFeature);
                this.map.removeLayer(this.cordonPolyFeatureSelect);
            }

        },
        
        addIncidentPoint: function(evt) {
            this.disconnectMapClick();
            this.currentAction = "addIncidentPoint";
            this.drawToolbar.activate(Draw.POINT);
        },
        
        addBlockade: function (evt) {
            if (this.activeIncident) {
                this.disconnectMapClick();
                this.currentAction = "addBlockade";
                this.drawToolbar.activate(Draw.POINT);
            } else {
                alert("You must have an active incident!");
            }
        },
        
        addSafeRoute: function(evt) {
          if (this.activeIncident) {
              this.disconnectMapClick();
              this.currentAction = "addSafeRoute";
              this.drawToolbar.activate(Draw.POLYLINE);
          } else {
              alert("You must have an active incident!");
          }
        },
        
        addCordonedBuildings:function(evt) {
            if (this.activeIncident) {
                this.disconnectMapClick();
                this.currentAction = "addCordonedBuildings";
                this.drawToolbar.activate(Draw.EXTENT);
            } else {
                alert("You must have an active incident!");
            }
        },
        
        addIncidentByBuilding:function(evt) {
            this.disconnectMapClick();
            this.currentAction = "addIncidentByBuilding";
            this.drawToolbar.activate(Draw.POINT);
        },
        
        addCordon:function(evt) {
            if (this.activeIncident) {
                var size = this.txtCordonSize;
                if (size.isValid()) {
                    this.createCordon(size.value);
                }
            } else {
                alert("You must have an active incident!");
            }
        },
        
        changeMultipleFacilStatus: function(evt) {
            this.disconnectMapClick();
            this.currentAction = "changeMultipleFacilStatus";
            this.drawToolbar.activate(Draw.EXTENT);
        },
        
        addPlumeShpFile: function (evt) {
            if (this.activeIncident) {
                var fileName = event.target.value.toLowerCase();

                if (sniff("ie")) { //filename is full path in IE so extract the file name
                    var arr = fileName.split("\\");
                    fileName = arr[arr.length - 1];
                }
                if (fileName.indexOf(".zip") !== -1) {//is file a zip - if not notify user
                    this.generateFeatureCollection(fileName);
                }
                else {
                    this.uploadStatus.innerHTML = '<p style="color:red">Add shapefile as .zip file</p>';
                }
            } else {
                alert("You must have an active incident!");
            }
        },
        
        disconnectMapClick: function () {
            this.mapClickMode.current = 'draw';
            this.setFeatureClickEvents(false);
        },
        
        connectMapClick: function () {
            this.mapClickMode.current = this.mapClickMode.defaultMode;
            this.setFeatureClickEvents(true);
        },
        
        onDrawToolbarDrawEnd: function (evt) {
            this.drawToolbar.deactivate();
            this.connectMapClick();
            if (this.currentAction) {
                switch (this.currentAction) {
                    case 'addIncidentPoint':
                        this.createIncident(evt.geometry, null);
                        break;
                    case 'addBlockade':
                        this.createBlockade(evt.geometry);
                        break;
                    case 'addSafeRoute':
                        this.createSafeRoute(evt.geometry);
                        break;
                    case 'addCordonedBuildings':
                        this.addCordonedFacilities(evt.geometry);
                        break;
                    case 'addIncidentByBuilding':
                        var queryTask = new QueryTask(this.buildingsLayerUrl);
                        var query = new Query();
                        query.geometry = evt.geometry;
                        query.outFields = [this.buildingNumberField];
                        query.returnGeometry = true;
                        queryTask.execute(query, lang.hitch(this, function (featureSet) {
                            this.createIncident(null, featureSet.features[0]);
                        }));
                        break;
                    case 'changeMultipleFacilStatus':
                        this.changeFacilStatus(evt.geometry);
                    default:
                }
            }
            this.currentAction = null;
        },
        
        setActiveIncident: function (incidentId) {
            //var query = new Query();
            //query.where = "1=1"; //get all features
            //query.outFields = ["*"];
            //query.returnGeometry = true;
            //if (incidentId) {
            //    this.incidentPointFeature.queryFeatures(query, lang.hitch(this, function (featureSet) {
            //        arrayUtils.forEach(featureSet.features, lang.hitch(this, function (incidentGraphic) {
            //            if (incidentGraphic.attributes.INCIDNT_ID == incidentId) {
            //                this.activeIncident = incidentGraphic;
            //                var activeSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 1), new Color([0, 255, 0, 1.0]));
            //                this.activeIncident.setSymbol(activeSymbol);
            //                this.lblActiveEvent.innerHTML = "<b>Active Incident: </b><br/>" + this.activeIncident.attributes.INCIDNT_NAME;
            //            } else {
            //                incidentGraphic.setSymbol(null);
            //            }
            //        }));
            //    }));

            //} else {
            //    this.activeIncident = null;
            //    this.lblActiveEvent.innerHTML = "";
            //    this.incidentPointFeature.queryFeatures(query, lang.hitch(this, function (featureSet) {
            //        arrayUtils.forEach(featureSet.features, lang.hitch(this, function (incidentGraphic) {
            //            incidentGraphic.setSymbol(null);
            //        }));
            //    }));
            //}
            if (incidentId) {
                arrayUtils.forEach(this.incidentPointFeature.graphics, lang.hitch(this, function (incidentGraphic) {
                    if (incidentGraphic.attributes.INCIDNT_ID == incidentId) {
                        this.activeIncident = incidentGraphic;
                        var activeSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 1), new Color([0, 255, 0, 1.0]));
                        this.activeIncident.setSymbol(activeSymbol);
                        this.lblActiveEvent.innerHTML = "<b>Active Incident: </b><br/>" + this.activeIncident.attributes.INCIDNT_NAME;
                    } else {
                        incidentGraphic.setSymbol(null);
                    }
                }));
            } else {
                this.activeIncident = null;
                this.lblActiveEvent.innerHTML = "";
                arrayUtils.forEach(this.incidentPointFeature.graphics, lang.hitch(this, function (incidentGraphic) {
                    incidentGraphic.setSymbol(null);
                }));
            }
        },
        
        createIncident: function (geom, facilityFeature) {
            
            var newIncidentId = generateRandomUuid();
            var newFeature;
            
            var currentDate = new Date();
            //this adjusts the time -- I think based on how Oracle handles UTC time...
            //if this adjustment isn't made, time is off by 5 hours.
            //currentDate.setTime(currentDate.getTime() - currentDate.getTimezoneOffset() * 60 * 1000);
            
            var attrs = {
                INCIDNT_ID: newIncidentId,
                CREATE_DATE: Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds(), 0),
                INCIDNT_NAME: "New Event (" + newIncidentId.substr(newIncidentId.length - 5) + ")",
                USER_FLAG: "PENDING"
            };
            
            //passing in from add point tool
            if (geom) {
                newFeature = new Graphic(geom, null, attrs);
                attrs.COORD_X = geom.x;
                attrs.COORD_Y = geom.y;
                this.incidentPointFeature.applyEdits([newFeature], null, null);
            }
            //passing in from add incident by facility tool
            if (facilityFeature) {
                var facilExtent = facilityFeature.geometry.getExtent();
                var facilCenter = facilExtent.getCenter();
                var facilityCentroid = new Point(facilCenter.x, facilCenter.y, this.map.spatialReference);
                attrs.COORD_X = facilityCentroid.x;
                attrs.COORD_Y = facilityCentroid.y;
                attrs.FACIL_ID = facilityFeature.attributes[this.buildingNumberField];
                newFeature = new Graphic(facilityCentroid, null, attrs);
                this.incidentPointFeature.applyEdits([newFeature], null, null);
            }
        },
        
        createBlockade: function(geom) {
            if (this.activeIncident) {
                
                //first query for intersecting roads
                var queryCircle = new Circle({
                    center: geom,
                    geodesic: true,
                    radius: 100,
                    radiusUnit: "esriFeet"
                });
                var queryTask = new QueryTask(this.roadsLayerUrl);
                var query = new Query();
                query.returnGeometry = false;
                query.geometry = geom;
                query.outFields = [this.roadNameField];
                queryTask.execute(query, lang.hitch(this, function (results) {
                    var roadsArry = [];
                    arrayUtils.forEach(results.features, lang.hitch(this, function (feature) {
                        console.log(feature);
                        roadsArry.push(feature.attributes[this.roadNameField]);
                    }));
                    
                    //now add the feature
                    var newFeature;

                    var currentDate = new Date();
                    var attrs = {
                        INCIDNT_ID: this.activeIncident.attributes.INCIDNT_ID,
                        STATUS: "TCP_PENDING",
                        ROADS: roadsArry.join(", "),
                        CREATE_DATE: Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds(), 0),
                        USER_FLAG: "PENDING"
                    };

                    if (geom) {
                        newFeature = new Graphic(geom, null, attrs);
                        this.blockadesFeature.applyEdits([newFeature], null, null);
                    }
                    
                }), lang.hitch(this, this.queryError));
            }
        },
        
        createSafeRoute: function(geom) {
            var newFeature;
            var currentDate = new Date();
            var attrs = {
                INCIDNT_ID: this.activeIncident.attributes.INCIDNT_ID,
                CREATE_DATE: Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds(), 0),
                USER_FLAG: "PENDING"
            };
            if (geom) {
                newFeature = new Graphic(geom, null, attrs);
                this.safeRouteFeature.applyEdits([newFeature], null, null);
            }
        },
        
        createCordon: function (size) {
            
            if (this.activeIncident) {
                //var bufferGeom = [];
                var bufferDefer = new Deferred();
                if (this.activeIncident.attributes.FACIL_ID == null) {
                    bufferDefer.resolve({ geom: this.activeIncident.geometry, size: size });
                } else {
                    //otherwise get the facility via spatial query using
                    //active incident point + offset
                    var querySelectCircle = new Circle({
                        center: this.activeIncident.geometry,
                        geodesic: true,
                        radius: 100,
                        radiusUnit: "esriFeet"
                    });
                    var queryTask = new QueryTask(this.buildingsLayerUrl);
                    var query = new Query();
                    query.geometry = querySelectCircle;
                    query.outFields = [this.buildingNumberField];
                    query.returnGeometry = true;
                    var result = { size: size };
                    queryTask.execute(query, lang.hitch(this, function (featureSet) {
                        if (featureSet.features.length > 0)
                            result.geom = featureSet.features[0].geometry;
                        bufferDefer.resolve(result);
                    }));
                }

                //setup the buffer parameters
                bufferDefer.then(lang.hitch(this, function (data) {
                    if (data.geom) {
                        //get the buffer spatial reference
                        var bufferSr;
                        if (this.bufferSpatialReference != null)
                            bufferSr = new SpatialReference(this.bufferSpatialReference);
                        else
                            bufferSr = this.map.spatialReference;
                        var params = new BufferParameters();
                        params.distances = [data.size];
                        params.bufferSpatialReference = bufferSr;
                        params.outSpatialReference = this.map.spatialReference;
                        params.unit = GeometryService.UNIT_FOOT;
                        params.geometries = [data.geom];
                        
                        esriConfig.defaults.geometryService.buffer(params, lang.hitch(this, function (results) {

                            if (this.cordonEdit) {
                                //we are udating a cordon geometry only
                                this.cordonEdit.geometry = results[0];
                                this.cordonPolyFeature.applyEdits(null, [this.cordonEdit], null);
                                this.addCordonedFacilities(this.cordonEdit.geometry);
                                this.cordonEdit = null;
                            } else {
                                //we are adding a new cordon
                                var currentDate = new Date();
                                var attrs = {
                                    INCIDNT_ID: this.activeIncident.attributes.INCIDNT_ID,
                                    CORDON_SIZE: size,
                                    PRIMARY: "FALSE",
                                    CREATE_DATE: Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds(), 0),
                                    USER_FLAG: "PENDING"
                                };
                                var newFeature = new Graphic(results[0], null, attrs);
                                this.cordonPolyFeature.applyEdits([newFeature], null, null);
                                //now we can add cordoned facilities based on the new cordons
                                this.addCordonedFacilities(newFeature.geometry);
                            }
                        }), lang.hitch(this, this.bufferError));
                    }
                    
                }));
            }
        },
        
        addCordonedFacilities: function(geom) {
            var queryTask = new QueryTask(this.buildingsLayerUrl);
            var query = new Query();
            query.returnGeometry = true;
            query.geometry = geom;
            query.outFields = [this.buildingNumberField];
            queryTask.execute(query, lang.hitch(this, function (results) {
                arrayUtils.forEach(results.features, lang.hitch(this, function(feature) {
                    var facilId = feature.attributes[this.buildingNumberField];
                    if ((facilId != null) && (facilId.replace(" ", "") != "")) {
                        //check to make sure the builging is not already
                        //in this event's cordoned features
                        var isCordoned = false;
                        arrayUtils.forEach(this.facilityStatusFeature.graphics, lang.hitch(this, function(graphic) {
                            if ((graphic.attributes.FACIL_ID == facilId) && (this.activeIncident.attributes.INCIDNT_ID == graphic.attributes.INCIDNT_ID))
                                isCordoned = true;
                        }));
                        //console.log("isCordoned=" + isCordoned.toString());
                        if (!isCordoned) {
                            var currentDate = new Date();
                            var attrs = {
                                INCIDNT_ID: this.activeIncident.attributes.INCIDNT_ID,
                                FACIL_ID: feature.attributes[this.buildingNumberField],
                                EVENT_STATUS: "CORDONED",
                                CREATE_DATE: Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds(), 0),
                                USER_FLAG: "PENDING"
                            };
                            var newFeature = new Graphic(feature.geometry, null, attrs);
                            this.facilityStatusFeature.applyEdits([newFeature], null, null);
                        }
                    }
                }));
            }), lang.hitch(this, this.queryError));
        },
        
        changeFacilStatus: function(geom) {
            var query = new Query();
            query.geometry = geom;
            query.outFields = ["*"];
            query.returnGeometry = true;
            this.facilityStatusFeature.queryFeatures(query, lang.hitch(this, function (featureSet) {
                arrayUtils.forEach(featureSet.features, lang.hitch(this, function(feature) {
                    feature.attributes.EVENT_STATUS = this.selectFacilStatus.value;
                    this.facilityStatusFeature.applyEdits(null, [feature], null);
                }));
            }));
        },
        
        bufferError: function (err) {
            console.log('Failed to buffer. ' + err);
        },
        
        queryError: function (err) {
            console.log('Failed to query. ' + err);
        },
        
        getFeatureByObjectId: function (featureLayer, objectId) {
            var returnValue = null;
            arrayUtils.forEach(featureLayer.graphics, function(graphic) {
                if (graphic.attributes.OBJECTID == objectId) {
                    returnValue = graphic;
                }
            });
            return returnValue;
        },
        
        featureEditsComplete: function (evt) {
            if (evt.adds.length > 0) {
                //var addedFeature = lang.hitch(this, this.formatCodedDomainGridValue, evt.target, evt.adds.objectId);
                var addedFeature = this.getFeatureByObjectId(evt.target, evt.adds[0].objectId);
                if (addedFeature) {
                    //new incident was added
                    if (evt.target == this.incidentPointFeature) {
                        //first set the new incident as the active incident
                        this.setActiveIncident(addedFeature.attributes.INCIDNT_ID);

                        //now we can do the buffer and add the cordon
                        this.createCordon(this.defaultCordonSize);
                    }
                }
            }
        },
        
        featureUpdateComplete: function (evt) {
            //we have to reset the active incident
            //to keep the symbol and get new attributes
            //when incident point is updated
            if (this.activeIncident) {
                this.setActiveIncident(this.activeIncident.attributes.INCIDNT_ID);
            }
        },
        
        //for attribute editing
        featureClick: function (evt) {

            var lyr = evt.graphic.getLayer();
            var map = lyr.getMap();
            
            var selectQuery = new Query();
            
            //define a circle geometry for point features
            var querySelectCircle = new Circle({
                center: evt.mapPoint,
                geodesic: true,
                radius: 200,
                radiusUnit: "esriFeet"
            });

            var selectFeature, layerInfos;
            
            //determine which layer was clicked and define
            //query and info window parameters
            switch(lyr) {
                case this.incidentPointFeature:
                    selectQuery.geometry = querySelectCircle.getExtent();
                    layerInfos = [{
                        'featureLayer': this.incidentPointFeatureSelect,
                        'showAttachments': false,
                        'showDeleteButton': true,
                        'isEditable': true,
                        'fieldInfos': [
                          { 'fieldName': 'INCIDNT_NAME', 'isEditable': true, 'tooltip': 'Incident Name', 'label': 'Name:' },
                          { 'fieldName': 'NARRATIVE', 'isEditable': true, 'tooltip': 'Description', 'label': 'Description:' },
                          { 'fieldName': 'INCIDNT_ID', 'isEditable': false, 'label': 'Incident ID:' }
                        ]
                    }];
                    selectFeature = this.incidentPointFeatureSelect;
                    break;
                case this.blockadesFeature:
                    selectQuery.geometry = querySelectCircle.getExtent();
                    layerInfos = [{
                        'featureLayer': this.blockadesFeatureSelect,
                        'showAttachments': false,
                        'showDeleteButton': true,
                        'isEditable': true,
                        'fieldInfos': [
                          { 'fieldName': 'STATUS', 'isEditable': true, 'tooltip': 'Type', 'label': 'Type:' },
                          { 'fieldName': 'COMMENTS', 'isEditable': true, 'tooltip': 'Comments', 'label': 'Comments:' },
                          { 'fieldName': 'ROADS', 'isEditable': false, 'label': 'Roads:' },
                          { 'fieldName': 'INCIDNT_ID', 'isEditable': false, 'label': 'Incident ID:' }
                        ]
                    }];
                    selectFeature = this.blockadesFeatureSelect;
                    break;
                case this.safeRouteFeature:
                    selectQuery.geometry = querySelectCircle.getExtent();
                    layerInfos = [{
                        'featureLayer': this.safeRouteFeatureSelect,
                        'showAttachments': false,
                        'showDeleteButton': true,
                        'isEditable': true,
                        'fieldInfos': [
                          { 'fieldName': 'USER_FLAG', 'isEditable': false, 'tooltip': 'Type', 'label': 'Type:' },
                          { 'fieldName': 'INCIDNT_ID', 'isEditable': false, 'label': 'Incident ID:' }
                        ]
                    }];
                    selectFeature = this.safeRouteFeatureSelect;
                    break;
                case this.facilityStatusFeature:
                    selectQuery.geometry = evt.mapPoint;
                    layerInfos = [{
                        'featureLayer': this.facilityStatusFeatureSelect,
                        'showAttachments': false,
                        'showDeleteButton': true,
                        'isEditable': true,
                        'fieldInfos': [
                          { 'fieldName': 'EVENT_STATUS', 'isEditable': true, 'tooltip': 'Facility Status', 'label': 'Status:' },
                          { 'fieldName': 'FACIL_ID', 'isEditable': false, 'tooltip': 'Building No', 'label': 'Building:' },
                          { 'fieldName': 'INCIDNT_ID', 'isEditable': false, 'label': 'Incident ID:' }
                        ]
                    }];
                    selectFeature = this.facilityStatusFeatureSelect;
                    break;
                case this.cordonPolyFeature:
                    selectQuery.geometry = evt.mapPoint;
                    layerInfos = [{
                        'featureLayer': this.cordonPolyFeatureSelect,
                        'showAttachments': false,
                        'showDeleteButton': true,
                        'isEditable': true,
                        'fieldInfos': [
                          { 'fieldName': 'CORDON_NAME', 'isEditable': true, 'tooltip': 'Name', 'label': 'Name:' },
                          { 'fieldName': 'CORDON_SIZE', 'isEditable': true, 'tooltip': 'Size', 'label': 'Size:' },
                          { 'fieldName': 'INCIDNT_ID', 'isEditable': false, 'label': 'Incident ID:' }
                        ]
                    }];
                    selectFeature = this.cordonPolyFeatureSelect;
                    break;
                case this.alohaFootprintFeature:
                    selectQuery.geometry = querySelectCircle.getExtent();
                    layerInfos = [{
                        'featureLayer': this.alohaFootprintFeatureSelect,
                        'showAttachments': false,
                        'showDeleteButton': true,
                        'isEditable': true,
                        'fieldInfos': [
                          { 'fieldName': 'USER_FLAG', 'isEditable': false, 'tooltip': 'Type', 'label': 'Type:' },
                          { 'fieldName': 'INCIDNT_ID', 'isEditable': false, 'label': 'Incident ID:' }
                        ]
                    }];
                    selectFeature = this.alohaFootprintFeatureSelect;
                    break;
            }
            
            selectFeature.selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW, lang.hitch(this, function (features) {
                if (features.length > 0) {
                    //store the current feature
                    this.updateFeature = features[0];
                    this.setActiveIncident(this.updateFeature.attributes.INCIDNT_ID);
                    map.infoWindow.setTitle(selectFeature.name);
                    map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
                } else {
                    map.infoWindow.hide();
                }
            }));

            var attInspector = new AttributeInspector({
                layerInfos: layerInfos
            }, domConstruct.create("div"));

            //add a save button next to the delete button
            var saveButton = new Button({ label: "Save", "class": "saveButton" });
            domConstruct.place(saveButton.domNode, attInspector.deleteBtn.domNode, "after");

            saveButton.on("click", lang.hitch(this, function () {
                this.updateFeature.getLayer().applyEdits(null, [this.updateFeature], null);
                
                //if the cordon size changed, then cordonEdit gets set
                //so we need to go create a new cordon geometry
                if (this.cordonEdit) {
                    this.createCordon(this.cordonEdit.attributes.CORDON_SIZE);
                }
            }));
            
            //if this is the incident point layer, we want to add additional buttons
            //set active incident after the save button
            //if (lyr == this.incidentPointFeature) {
            //    var setActiveButton = new Button({ label: "Set as Active", "class": "saveButton" });
            //    domConstruct.place(setActiveButton.domNode, saveButton.domNode, "after");

            //    setActiveButton.on("click", lang.hitch(this, function (evt) {
            //        this.setActiveIncident(updateFeature.attributes.INCIDNT_ID);
            //    }));
            //}

            attInspector.on("attribute-change", lang.hitch(this, function (evt) {
                var oldValue = this.updateFeature.attributes[evt.fieldName];
                //collect values for saving
                this.updateFeature.attributes[evt.fieldName] = evt.fieldValue;
                //check for cordon size change
                if ((lyr == this.cordonPolyFeature) && (evt.fieldName == "CORDON_SIZE")) {
                    if (oldValue != evt.fieldValue) {
                        this.cordonEdit = this.updateFeature;
                    }
                }
            }));

            map.infoWindow.on("hide", lang.hitch(this, function () {
                selectFeature.clearSelection();
                this.updateFeature = null;
            }));
            
            //fix for partially hidden delete button weirdness
            attInspector.deleteBtn.domNode.classList.remove("atiButton");
            
            attInspector.on("delete", lang.hitch(this, function (evt) {
                if (selectFeature == this.incidentPointFeatureSelect) {
                    //delete all er features with the same incident id
                    
                    var query = new Query();
                    query.where = "INCIDNT_ID='" + evt.feature.attributes.INCIDNT_ID + "'"; 
                    query.outFields = ["*"];
                    query.returnGeometry = true;
                    
                    //facility status
                    this.facilityStatusFeature.queryFeatures(query, lang.hitch(this, function (featureSet) {
                        arrayUtils.forEach(featureSet.features, lang.hitch(this, function (feature) {
                            this.facilityStatusFeature.applyEdits(null, null, [feature]);
                        }));
                    }));
                    
                    //cordon
                    this.cordonPolyFeature.queryFeatures(query, lang.hitch(this, function (featureSet) {
                        arrayUtils.forEach(featureSet.features, lang.hitch(this, function (feature) {
                            this.cordonPolyFeature.applyEdits(null, null, [feature]);
                        }));
                    }));

                    //blockades
                    this.blockadesFeature.queryFeatures(query, lang.hitch(this, function (featureSet) {
                        arrayUtils.forEach(featureSet.features, lang.hitch(this, function (feature) {
                            this.blockadesFeature.applyEdits(null, null, [feature]);
                        }));
                    }));
                    
                    //saferoutes
                    this.safeRouteFeature.queryFeatures(query, lang.hitch(this, function (featureSet) {
                        arrayUtils.forEach(featureSet.features, lang.hitch(this, function (feature) {
                            this.safeRouteFeature.applyEdits(null, null, [feature]);
                        }));
                    }));
                    
                    //aloha footprints
                    this.alohaFootprintFeature.queryFeatures(query, lang.hitch(this, function (featureSet) {
                        arrayUtils.forEach(featureSet.features, lang.hitch(this, function (feature) {
                            this.alohaFootprintFeature.applyEdits(null, null, [feature]);
                        }));
                    }));
                    
                    //incident_point
                    this.incidentPointFeature.queryFeatures(query, lang.hitch(this, function (featureSet) {
                        arrayUtils.forEach(featureSet.features, lang.hitch(this, function (feature) {
                            this.incidentPointFeature.applyEdits(null, null, [feature]);
                        }));
                    }));
                    
                    this.setActiveIncident(null);
                }
                
                evt.feature.getLayer().applyEdits(null, null, [evt.feature]);
            }));

            map.infoWindow.setContent(attInspector.domNode);
            map.infoWindow.resize(350, 240);

        },
        
        generateFeatureCollection: function(fileName) {
            var name = fileName.split(".");
            //Chrome and IE add c:\fakepath to the value - we need to remove it
            //See this link for more info: http://davidwalsh.name/fakepath
            name = name[0].replace("c:\\fakepath\\", "");

            this.uploadStatus.innerHTML = '<b>Loading...</b> ' + name;

            //Define the input params for generate see the rest doc for details
            //http://www.arcgis.com/apidocs/rest/index.html?generate.html
            var params = {
                'name': name,
                'targetSR': this.map.spatialReference,
                'maxRecordCount': 1000,
                'enforceInputFileSizeLimit': true,
                'enforceOutputJsonSizeLimit': true
            };

            //generalize features for display Here we generalize at 1:40,000 which is approx 10 meters
            //This should work well when using web mercator.
            var extent = scaleUtils.getExtentForScale(this.map, 40000);
            var resolution = extent.getWidth() / this.map.width;
            params.generalize = true;
            params.maxAllowableOffset = resolution;
            params.reducePrecision = true;
            params.numberOfDigitsAfterDecimal = 0;

            var myContent = {
                'filetype': 'shapefile',
                'publishParameters': JSON.stringify(params),
                'f': 'json',
                'callback.html': 'textarea'
            };

            //use the rest generate operation to generate a feature collection from the zipped shapefile
            request({
                url: this.portalUrl + '/sharing/rest/content/features/generate',
                content: myContent,
                form: this.uploadForm,
                handleAs: 'json',
                load: lang.hitch(this, function (response) {
                    if (response.error) {
                        this.errorHandler(response.error);
                        return;
                    }
                    var layerName = response.featureCollection.layers[0].layerDefinition.name;
                    this.uploadStatus.innerHTML = '<b>Loaded: </b>' + layerName;
                    //addShapefileToMap(response.featureCollection);
                    //console.log(response.featureCollection);
                    //record features in plume layer
                    arrayUtils.forEach(response.featureCollection.layers[0].featureSet.features, lang.hitch(this, function (feature) {
                        //console.log(feature);
                        var currentDate = new Date();
                        var attrs = {
                            INCIDNT_ID: this.activeIncident.attributes.INCIDNT_ID,
                            CREATE_DATE: Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds(), 0),
                            USER_FLAG: "PENDING"
                        };
                        feature.attributes = attrs;
                        var newFeature = new Graphic(feature, null, attrs);
                        //console.log(feature.geometry);
                        //console.log(newFeature);
                        this.alohaFootprintFeature.applyEdits([newFeature], null, null);
                    }));
                }),
                error: lang.hitch(this, this.errorHandler)
            });
        },
        
        errorHandler: function (error) {
            this.uploadStatus.innerHTML = "<p style='color:red'>" + error.message + "</p>";
        }
        
    });
});