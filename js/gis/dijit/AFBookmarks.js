define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/dom-construct',
    'dojo/_base/lang',   
    "dojo/on",
    "dojo/keys",
    "dojo/dom-style",
    "dojo/store/Memory",
    "dgrid/OnDemandGrid",
    "dgrid/Selection",
    "dgrid/Keyboard",
    "dgrid/extensions/ColumnResizer",
    "esri/layers/GraphicsLayer",
    "esri/symbols/jsonUtils",
    "esri/graphicsUtils",
    "esri/tasks/FindTask",
    "esri/tasks/FindParameters",
    "esri/geometry/Extent",
    "esri/geometry/Point",
    "esri/geometry/Polygon",
    'dijit/DropDownMenu',
    'dijit/MenuItem',    
    'dojo/_base/array',
    'dojox/lang/functional',
    'dojo/text!./AFBookmarks/templates/AFBookmarks.html',
    'esri/dijit/BasemapGallery',
    'dijit/Tree',
    'dojo/data/ItemFileReadStore',
    'dojo/data/ItemFileWriteStore',
    'dijit/tree/ForestStoreModel',
    'dojox/grid/DataGrid',
    'dijit/form/DropDownButton',
    'dijit/form/Button',
    'dijit/form/SimpleTextarea',
    'dijit/form/RadioButton',
    'dijit/TitlePane',
    "dijit/form/Form",
    "dijit/TooltipDialog",
    "dijit/form/FilteringSelect",
    "dijit/form/ValidationTextBox",
    "dijit/form/CheckBox",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/tasks/IdentifyTask",
    "esri/tasks/IdentifyParameters",
    "esri/InfoTemplate",   
    'dijit/layout/ContentPane',
    'dojo/i18n!./AFBookmarks/nls/resource',
    'xstyle/css!./AFBookmarks/css/AFBookmarks.css'   

   // '//ajax.googleapis.com/ajax/libs/dojo/1.10.4/dojo/dojo.js'

], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, domConstruct, lang, on, keys, domStyle, Memory, OnDemandGrid, Selection, Keyboard, ColumnResizer, GraphicsLayer, jsonUtils, graphicsUtils, FindTask, FindParameters, Extent, Point, Polygon, DropDownMenu, MenuItem, array, functional, template, BasemapGallery, Tree, ItemFileReadStore, ItemFileWriteStore, ForestStoreModel, DataGrid, DropDownButton, Button, SimpleTextarea, RadioButton, TitlePane, Form, TooltipDialog, FilteringSelect, ValidationTextBox, CheckBox, SimpleFillSymbol, SimpleLineSymbol, IdentifyTask, IdentifyParameters, InfoTemplate, ContentPane, i18n) {
    
    // main basemap widget

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

        templateString: template,
        widgetsInTemplate: !0,
        i18n: i18n,
        mode: 'custom',
        title: i18n.title,       
        baseClass: "gis_AdvancedFindDijit",      
        spatialReference: null,
        showOptionsButton: !1,
        zoomOptions: {
            select: !0,
            deselect: !1
        },
        defaultResultsSymbols: {
            point: {
                type: "esriSMS",
                style: "esriSMSCircle",
                size: 25,
                color: [0, 255, 255, 32],
                angle: 0,
                xoffset: 0,
                yoffset: 0,
                outline: {
                    type: "esriSLS",
                    style: "esriSLSSolid",
                    color: [0, 255, 255, 255],
                    width: 2
                }
            },
            polyline: {
                type: "esriSLS",
                style: "esriSLSSolid",
                color: [0, 255, 255, 255],
                width: 3
            },
            polygon: {
                type: "esriSFS",
                style: "esriSFSSolid",
                color: [0, 255, 255, 32],
                outline: {
                    type: "esriSLS",
                    style: "esriSLSSolid",
                    color: [0, 255, 255, 255],
                    width: 3
                }
            }
        },
        defaultSelectionSymbols: {
            point: {
                type: "esriSMS",
                style: "esriSMSCircle",
                size: 25,
                color: [4, 156, 219, 32],
                angle: 0,
                xoffset: 0,
                yoffset: 0,
                outline: {
                    type: "esriSLS",
                    style: "esriSLSSolid",
                    color: [4, 156, 219, 255],
                    width: 2
                }
            },
            polyline: {
                type: "esriSLS",
                style: "esriSLSSolid",
                color: [4, 156, 219, 255],
                width: 3
            },
            polygon: {
                type: "esriSFS",
                style: "esriSFSSolid",
                color: [4, 156, 219, 32],
                outline: {
                    type: "esriSLS",
                    style: "esriSLSSolid",
                    color: [4, 156, 219, 255],
                    width: 3
                }
            }
        },

        strNumFieldA:'',
        strNameFieldA:'',
        strInstIDFieldA: '',
        strLayerGroupNameA: '',
        arylayerIdsA: '',
        strURLA: '',
        strInfoTitleA: '',
        strInfoContentA: '',
               

      

        buildingSearch: function (strINSTLID, strValue, blnNumber, myMap) {

            var strNumField = this.numberFields;
            var strNameField = this.nameFields;
            var strInstIDField = this.instIDFields;
            var strInstIDFieldLike = this.instIDFieldLike;
            var strLayerGroupName = this.layerGroupName;
            var strInfoTitle = this.infoTitle;
            var strInfoContent = this.infoContent;
            var intMinTextSearch = this.minChars;
            var intZoomScale = this.zoomScale;
            var arylayerIds = this.layerIds;
            var findTask;
            var strNumFieldE = '';
            var strNameFieldE = '';
            var strInstIDFieldE = '';
            var strInstIDFieldLikeE = '';
            var strLayerGroupNameE = '';
            var strInfoTitleE = '';
            var strInfoContentE = '';
            var intArylayerIdsE = 0;
            var aryLayerIdsE = [];
            var strBuildingURL = '';
            
           // this.strURLA = item.url;
            if (this.strURLA.length > 0) {
                findTask = new esri.tasks.FindTask(this.strURLA.toString());
                strBuildingURL = this.strURLA.toString();
                strNumFieldE =  this.strNumFieldA;
                strNameFieldE = this.strNameFieldA;
                strInstIDFieldE = this.strInstIDFieldA;
                strLayerGroupNameE = this.strLayerGroupNameA;
                strInstIDFieldLikeE = strInstIDFieldLike;
                strInfoTitleE = this.strInfoTitleA;
                strInfoContentE = this.strInfoContentA;
            } else {
                findTask = new esri.tasks.FindTask(this.url);
                strBuildingURL = this.url;
                strNumFieldE = strNumField;
                strNameFieldE = strNameField;
                strInstIDFieldE = strInstIDField;
                strInstIDFieldLikeE = strInstIDFieldLike;
                strLayerGroupNameE = strLayerGroupName;
                strInfoTitleE = strInfoTitle;
                strInfoContentE = strInfoContent;
            }
            var findParams = new esri.tasks.FindParameters();
            var blnGood = false;

            var infoTemplate = new InfoTemplate();
         
            infoTemplate.setTitle(strInfoTitleE);
            infoTemplate.setContent(strInfoContentE);
           
            if (typeof (grid) !== 'undefined') {
                if (dijit.byId('grid') !== undefined) {

                    dijit.byId('grid').destroy(true);
                }
            }

            if (typeof (searchText) !== 'undefined') {
                if (dijit.byId('searchText') !== undefined) {
                    dijit.byId('searchText').destroy(true);
                }
            }
            domConstruct.empty("gridDiv");
            
            findParams.returnGeometry = true;
            if (this.strURLA.length > 0) {
              
                intArylayerIdsE = this.arylayerIdsA;
            } else {
                
                intArylayerIdsE = arylayerIds;
            }
            aryLayerIdsE.push(intArylayerIdsE);
            findParams.layerIds = aryLayerIdsE;

          //  findParams.layerDefinitions = new Array();
            //OBJECTID > 971417
           // findParams.layerDefinitions.push(strInstIDField + " = '" + strINSTLID + "'" );
           
           // findParams.layerDefinitions.push('OBJECTID > 971418');
            if (blnNumber == 'true') {
                if (this.strURLA.length > 0) {
                    findParams.searchFields = this.strNumFieldA;
                } else {
                    findParams.searchFields = this.numberFields;
                }
                findParams.contains = false;
                blnGood = true;
            } else {
                if (strValue.length > 0) {
                    if (strValue.length > intMinTextSearch - 1) {
                        blnGood = true;
                        if (this.strURLA.length > 0) {
                            findParams.searchFields = this.strNameFieldA;
                        } else {
                            findParams.searchFields = this.nameFields;
                        }

                        
                        findParams.contains = true;
                    } else {
                        blnGood = false;
                    }
                } else {
                    blnGood = false;
                }
            }
                        
            findParams.outSpatialReference = myMap.spatialReference;
            findParams.searchText = strValue;


            if (blnGood != false) {

                findTask.execute(findParams, function (results) {

                    if (results, results.length > 0) {

                        var myData = new Array();
                        var strX = "";
                        var strY = "";
                        var strFirstX = "";
                        var strLastX = "";
                        var myNewItem = {};
                        var strNumber = "";
                        var strLabel = "";
                        var strInstValue = ""
                        var geom;
                        var pointP = new esri.geometry.Point();
                        var extentP = new esri.geometry.Extent();
                      
                        var blnMatchFound = false;
                        var j = 0;

                       


                        var layout = [[
                          { 'name': 'Number', 'field': 'Number', 'width': '80px' },
                          { 'name': 'Description', 'field': 'label', 'width': '100%' }
                        ]];

                        for (var i = 0; i < results.length; i++) {

                            strX = "";
                            strY = "";
                            strNumber = "";
                            strLabel = "";

                            switch (results[i].feature.geometry.type) {
                                case "point":
                                    strX = results[i].feature.geometry.x.toString();
                                    strY = results[i].feature.geometry.y.toString();

                                    break;
                                case "polygon":
                                    
                                    pointP = results[i].feature.geometry.getExtent().getCenter();

                                    strX = pointP.x.toString();
                                    strY = pointP.y.toString();


                                    break;

                            }                   
                           

                            if (results[i].feature.attributes[strNumFieldE] !== undefined) {

                                strNumber = results[i].feature.attributes[strNumFieldE].toString();
                            }
                            if (results[i].feature.attributes[strNameFieldE] !== undefined) {
                                strLabel = results[i].feature.attributes[strNameFieldE].toString();
                            }
                            j = 0;
                            if (results[i].feature.attributes[strInstIDFieldE] !== undefined) {
                                strInstValue = results[i].feature.attributes[strInstIDFieldE].toString();
                               
                                j = i;
                                myNewItem = { ID2: (j), Number: strNumber, label: strLabel, x: strX, y: strY };
                                if (strInstValue == strINSTLID) {
                                    myData.push(myNewItem);
                                    blnMatchFound = true;
                                }
                            }
                            j = 0;
                            if (blnMatchFound != true) {
                                if (results[i].feature.attributes[strInstIDFieldLikeE] !== undefined) {
                                    strInstValue = results[i].feature.attributes[strInstIDFieldLikeE].toString();
                                    j = i;

                                    myNewItem = { ID2: (j), Number: strNumber, label: strLabel, x: strX, y: strY };
                                    if (strInstValue.indexOf(strINSTLID) > -1) {

                                        myData.push(myNewItem);
                                        blnMatchFound = true;
                                    }
                                }
                            }
                            

                        }

                        if (blnMatchFound === true) {

                            var storedata = {
                                identifier: "id",
                                items: []
                            };

                            var rows = myData.length;

                            

                            for (var i = 0, l = myData.length; i < rows; i++) {
                                storedata.items.push(lang.mixin({ id: i + 1 }, myData[i % l]));
                            }

                            if (myData.length == 1) {
                                var firstItem = myData[0];
                               // alert(firstItem.x);
                                var mapPoint = new Point(parseFloat(firstItem.x), parseFloat(firstItem.y), new esri.SpatialReference({ wkid: 102100 }));
                                //myMap.centerAt(mapPoint);   //.centerAndZoom(mapPoint, 3);
                                myMap.centerAndZoom(mapPoint, intZoomScale);

                                var identifyTask = new IdentifyTask(strBuildingURL);

                                identifyParams = new IdentifyParameters();
                                identifyParams.tolerance = 3;
                                identifyParams.returnGeometry = true;
                                identifyParams.layerIds = aryLayerIdsE;
                                identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
                                identifyParams.width = myMap.width;
                                identifyParams.height = myMap.height;
                                identifyParams.geometry = mapPoint;
                                identifyParams.mapExtent = myMap.extent;


                                var deferred = identifyTask
                                    .execute(identifyParams)
                                    .addCallback(function (response) {
                                        // response is an array of identify result objects
                                        // Let's return an array of features.


                                        return array.map(response, function (result) {

                                            var feature = result.feature;
                                            //   var template = feature.infoTemplate;
                                            var layerName = result.layerName;
                                            feature.attributes.layerName = layerName;
                                            feature.infoTemplate = infoTemplate;
                                            //feature.setInfoTemplate(template);


                                            return feature;
                                        });
                                    });

                                // InfoWindow expects an array of features from each deferred
                                // object that you pass. If the response from the task execution
                                // above is not an array of features, then you need to add a callback
                                // like the one above to post-process the response and return an
                                // array of features.

                                myMap.infoWindow.setFeatures([deferred]);
                                myMap.infoWindow.show(mapPoint);


                            }


                            var gridStore = new ItemFileWriteStore({ data: storedata });
                            gridStore.data = storedata;

                            /*create a new grid*/
                            var grid = new DataGrid({
                                id: 'grid',
                                store: gridStore,
                                style: 'max-width:290px',
                                structure: layout,
                                height: '100px',
                                rowSelector: '0px',
                                onClick: lang.hitch(this, function (item, node) {

                                    // var theitem = item;
                                    // alert("TEST");

                                    var items = grid.selection.getSelected();
                                   

                                    if (items.length) {
                                        /* Iterate through the list of selected items.
                                        The current item is available in the variable
                                        'selectedItem' within the following function: */
                                        array.forEach(items, function (selectedItem) {
                                            if (selectedItem !== null) {
                                                if (selectedItem.x !== undefined) {

                                                    var mapPoint = new Point(parseFloat(selectedItem.x), parseFloat(selectedItem.y), new esri.SpatialReference({ wkid: 102100 }));
                                                    //myMap.centerAt(mapPoint);   //.centerAndZoom(mapPoint, 3);

                                                    myMap.centerAndZoom(mapPoint, intZoomScale);

                                                    var identifyTask = new IdentifyTask(strBuildingURL);

                                                    identifyParams = new IdentifyParameters();
                                                    identifyParams.tolerance = 3;
                                                    identifyParams.returnGeometry = true;
                                                    identifyParams.layerIds = aryLayerIdsE;
                                                    identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
                                                    identifyParams.width = myMap.width;
                                                    identifyParams.height = myMap.height;
                                                    identifyParams.geometry = mapPoint;
                                                    identifyParams.mapExtent = myMap.extent;


                                                    var deferred = identifyTask
                                                        .execute(identifyParams)
                                                        .addCallback(function (response) {
                                                        // response is an array of identify result objects
                                                        // Let's return an array of features.
                                                          

                                                        return array.map(response, function (result) {

                                                            var feature = result.feature;
                                                         //   var template = feature.infoTemplate;
                                                            var layerName = result.layerName;
                                                            feature.attributes.layerName = layerName;
                                                            feature.infoTemplate = infoTemplate;
                                                            //feature.setInfoTemplate(template);
                                                          
                                                         
                                                            return feature;
                                                        });
                                                    });

                                                    // InfoWindow expects an array of features from each deferred
                                                    // object that you pass. If the response from the task execution
                                                    // above is not an array of features, then you need to add a callback
                                                    // like the one above to post-process the response and return an
                                                    // array of features.

                                                    myMap.infoWindow.setFeatures([deferred]);
                                                    myMap.infoWindow.show(mapPoint);



                                                }
                                            } /* end if */
                                        }); /* end forEach */
                                    } /* end if */


                                }),


                            });

                            grid.placeAt("gridDiv");

                            grid.startup();


                            // Turn the Buildings layer on


                            var layerIdsArr = myMap.layerIds;
                            var layerItem;
                            var layer;
                            var blnIdFound = false;

                            for (var h = 0; h < layerIdsArr.length; h++) {
                                layerItem = layerIdsArr[h];
                                if (layerItem == strLayerGroupNameE) {
                                    layer = myMap.getLayer(layerIdsArr[h]);// Say you want layer with an id at first index of layerIdsArr  
                                    if (layer.visible != true) {
                                      //  layer.visible = true;
                                       // layer.setDisableClientCaching = true;
                                        layer.show();
                                        layer.refresh();
                                    }

                                    for (var g = 0; g < layer.visibleLayers.length; g++) {
                                        if (layer.visibleLayers[g].toString() == intArylayerIdsE.toString()) {
                                          
                                            blnIdFound = true;
                                        }
                                    }
   
                                    if (blnIdFound != true) {
                                        layer.visibleLayers.push(intArylayerIdsE);                                   
                                        layer.setVisibleLayers(layer.visibleLayers);
                                    }
                                    
                                }

                            }

                        } else {

                            var notFoundLabel = new SimpleTextarea({
                                id: 'searchText',
                                name: 'searchText',
                                rows: "1",
                                cols: "60",
                                readOnly: "readOnly",

                                style: 'max-width:250px; border-color:white; color:red; background-color:white; overflow:hidden;resize:none;',
                                value: "No Matches Found!"
                            });

                            notFoundLabel.placeAt("gridDiv");

                        }

                    } else {
                        var notFoundLabel = new SimpleTextarea({
                            id: 'searchText',
                            name: 'searchText',
                            rows: "1",
                            cols: "60",
                            readOnly: "readOnly",

                            style: 'max-width:250px; border-color:white; color:red; background-color:white; overflow:hidden;resize:none;',
                            value: "No Matches Found!"
                        });
                                               
                        notFoundLabel.placeAt("gridDiv");

                    }


                }, function (error) {
                    alert("Error: " + error);
                });

            } else {
                var notFoundLabel = new SimpleTextarea({
                    id: 'searchText',
                    name: 'searchText',
                    rows: "1",
                    readOnly: "readOnly",
                    cols: "60",
                    style: 'max-width:250px; border-color:white; color:red; background-color:white; overflow:hidden;resize:none;',
                    value: intMinTextSearch.toString() + " characters required!"
                });
             
                notFoundLabel.placeAt("gridDiv");
            }


        },

        postCreate: function () { 

            this.inherited(arguments);
            var selectedBookmark = 'acc';
            var rawdata = this.bookmarkData;
            var strINSTLID = '';
            var strDataURL = '';

            var contentP = new dijit.layout.ContentPane({

                content: '<p> Select Location  <a id="dataURL" style="font-style:bold; padding-left:120px;"  href="http://www.bing.com/" target="_blank"></a></p>',
                style: "height:100%; min-width:320px; max-height: 690px;overflow:auto;"
            }, "targetID");           

            var radioSwitch
            radioSwitch = '<tr><th align="left" style="border-style:none;"><input id="idNum" type="radio" name="searchOption" disabled="disabled" checked="checked" value="name" /><label id="lblNumber" style="color: lightgrey;"  >Number</label><input id="idName"  type="radio" style="padding-left:20px;" name="searchOption"  disabled="disabled"  value="name" /><label  id="lblName" style="color: lightgrey;"  >Name</label></th></tr>';

            var textBox
            textBox = '<tr><th align="left" style="border-style:none;"><input id="searchTextDijit" type="text" style="padding-top:0px;padding-bottom:0px;height:22px;min-width:280px"  disabled="disabled" name="searchInput"></th></tr></table>';

            var radioP = new dijit.layout.ContentPane({

                content: '<table border="1" frame="above" style="padding-top:0px;padding-bottom:0px;min-width:300px" ><tr><th align="left" style="border-style:none;"><label id="lblSearch" style="color: lightgrey;"  > Buildings Search</label></th></tr>' + radioSwitch + textBox,
                
            }, "targetID3");

            var searchButton = new Button({
             
               // showRoot: false,
                label: "Search",
                disabled: 'disabled',
                style:'padding-left:10px; padding-bottom:0px;',
                onClick: lang.hitch(this, function () {       
                    var testme = dataURL;

                    this.buildingSearch(strINSTLID,  searchTextDijit.value, idNum.checked.toString(), this.map);
                })

            
            }, "searchButton");           
            
           
            var store = new ItemFileReadStore({
                data: { identifier: 'id', label: 'label', items: rawdata }
            });                   

            var treeModel = new ForestStoreModel({ store: store });
            //var mapExtentChange = this.map.on("extent-change", changeHandler);
                      
            function changeHandler(evt) {
                var extent = evt.extent;              
            }

         

            var gridP = new dijit.layout.ContentPane({

                content: '<div id="gridDiv"></div>'

            }, "targetID3");
            
            var treecontrol = new Tree({
                model: treeModel, 
                showRoot: false,
                style: 'height:100%;width:100%;max-height: 370px; min-width: 300px;overflow:auto;',
                onClick: lang.hitch(this, function (item, node) {                           

                    var theitem = item;
                    strDataURL = '';
                    dataURL.innerHTML = "";
                    searchTextDijit.disabled = 'disabled';
                    idNum.disabled = 'disabled';
                    idName.disabled = 'disabled';
                    searchButton.set('disabled', true);
                    lblSearch.style.color = "lightgrey";
                    lblNumber.style.color = "lightgrey";
                    lblName.style.color = "lightgrey";
                    strINSTLID = '';


                    //Alternate Query
                    this.strNumFieldA = '';
                    this.strNameFieldA = '';
                    this.strInstIDFieldA = '';                   
                    this.arylayerIdsA = '';
                    this.strURLA = '';
                    this.strInfoTitleA  = '';
                    this.strInfoContentA = '';
                    
                    if (typeof (grid) !== 'undefined') {
                        if (dijit.byId('grid') !== undefined) {

                            dijit.byId('grid').destroy(true);
                        }
                    }

                    if (typeof (searchText) !== 'undefined') {
                        if (dijit.byId('searchText') !== undefined) {                           
                                dijit.byId('searchText').destroy(true);                          
                        }
                    }

                    if (!node.isExpanded) {
                        treecontrol._expandNode(node);
                    } else {
                        treecontrol._collapseNode(node);
                    }

                    if (item.xmin != undefined) {
                        if (item.dataurl != undefined) {
                            if (item.dataurl != '') {
                                var typ = dataURL.attributes.getNamedItem("href");
                                typ.value = item.dataurl;
                                dataURL.attributes.setNamedItem(typ);
                                dataURL.innerHTML = "Data Download";
                             
                       
                            }
                        }

                        if (item.buildingsearch != undefined) {
                            if (item.buildingsearch == 'true') {
                                if (item.instlid != undefined) {
                                    if (item.instlid != '') {
                                        strINSTLID = item.instlid;

                                        if (item.numberFields != undefined) {
                                            if (item.numberFields != '') {

                                                this.strNumFieldA = item.numberFields;
                                                this.strNameFieldA = item.nameFields;
                                                this.strInstIDFieldA = item.instIDFields;
                                                this.strLayerGroupNameA = item.layerGroupName;
                                                this.arylayerIdsA = item.layerIds;
                                                this.strInfoTitleA = item.infoTitle.toString(),
                                                this.strInfoContentA = item.infoContent.toString(),
                                                this.strURLA = item.url;
                                            }
                                        }
                                        
                                        searchTextDijit.disabled = false;
                                        lblSearch.style.color = "black";
                                        lblNumber.style.color = "black";
                                        lblName.style.color = "black";
                                        idNum.disabled = false;
                                        idName.disabled = false;
                                        searchButton.set('disabled', false);
                                    }
                                   
                                }
                            }
                        }


                        var extent = new esri.geometry.Extent(parseFloat(item.xmin), parseFloat(item.ymin), parseFloat(item.xmax), parseFloat(item.ymax), new esri.SpatialReference({ wkid: 102100 }))
                        this.dropDownButton.containerNode.innerHTML = '<b>' + item.label + '</b>';
                      
                        this.map.setExtent(extent);

                    
                    }
                }),

                _setSelected: lang.hitch(this, function () {    

                }),

                _createTreeNode: function (/*Object*/ args) {

                    var tnode = new dijit._TreeNode(args);  
                    tnode.labelNode.innerHTML = args.label;             

                    return tnode;
                }

            }, "treeOne");
            
            this.menu = new DropDownMenu({
                style: 'display: none; width:100%; min-width:300px; overflow:auto;'
            });
            
           
            contentP.addChild(treecontrol);

            //radioP.addChild(label);
           // radioP.addChild(radioNum );
            //radioP.addChild(radioNameP);
            // radioP.addChild(radioName);
            contentP.addChild(radioP);
           // contentP.addChild(radioNameP);
           
            contentP.addChild(searchButton);
            contentP.addChild(gridP);
           
          //  contentP.addChild(this.buildingSearchForm);

            this.menu.addChild(contentP);
            
        
            this.dropDownButton.set('dropDown', this.menu);
            //dijit.byId("searchButton").setAttribute('disabled', 0);

        },                 

       

    });

});
