define([
   'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/lang',
    'dijit/DropDownMenu',
    'dijit/MenuItem',
    'dojo/_base/array',
    'dojox/lang/functional',
    'dojo/text!./AFBookmarks/templates/AFBookmarks.html',
    'esri/dijit/BasemapGallery',
    'dijit/Tree',
    'dojo/data/ItemFileReadStore',
    'dijit/tree/ForestStoreModel',
    'dijit/form/DropDownButton',
    'dijit/layout/ContentPane',
    'dojo/i18n!./AFBookmarks/nls/resource',    
    'xstyle/css!./AFBookmarks/css/AFBookmarks.css'
   
   // '//ajax.googleapis.com/ajax/libs/dojo/1.10.4/dojo/dojo.js'
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, lang, DropDownMenu, MenuItem, array, functional, template, BasemapGallery, Tree, ItemFileReadStore, ForestStoreModel, DropDownButton, ContentPane, i18n) {

    // main basemap widget
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        widgetsInTemplate: true,
        i18n: i18n,
        mode: 'custom',
        title: i18n.title, 
    

        postCreate: function () {

            this.inherited(arguments);     
            var selectedBookmark = 'acc';             

            var rawdata = this.bookmarkData;        
            
            var contentP = new dijit.layout.ContentPane({
                content: "<p> Select Location </p>",
                style:"height:425px"
            }, "targetID");
            

            var store = new ItemFileReadStore({
                data: { identifier: 'id', label: 'label', items: rawdata }
            });                   
         
            var treeModel = new ForestStoreModel({ store: store });
           
            var mapExtentChange = this.map.on("extent-change", changeHandler);

            function changeHandler(evt) {
                var extent = evt.extent;
               // alert("TEST");
            }

            var treecontrol = new Tree({
                model: treeModel,
                showRoot: false,              
                onClick: lang.hitch(this, function (item) {                           
                    var theitem = item;

                    if (item.xmin != undefined) {
                        var extent = new esri.geometry.Extent(parseFloat(item.xmin), parseFloat(item.ymin), parseFloat(item.xmax), parseFloat(item.ymax), new esri.SpatialReference({ wkid: 102100 }))

                        this.dropDownButton.containerNode.innerHTML = '<b>' +  item.label + '</b>';

                        this.map.setExtent(extent);
                    } else {
                        var children = item.children;
                        var extent2 = new esri.geometry.Extent();
                        var wingLayer = new esri.layers.GraphicsLayer();
                        var newGeo = new esri.geometry.Multipoint();
                        var newPoint = new esri.geometry.Point();
                        if (item.children.length > 0) {
                            extent2 = new esri.geometry.Extent(parseFloat(children[0].xmin), parseFloat(children[0].ymin), parseFloat(children[0].xmax), parseFloat(children[0].ymax), new esri.SpatialReference({ wkid: 102100 }))
                        }

                        for (count = 0; count < item.children.length; count++) {

                            var lxmin = parseFloat(children[count].xmin);
                            var lymin = parseFloat(children[count].ymin);
                            var lxmax = parseFloat(children[count].xmax);
                            var lymax = parseFloat(children[count].ymax);
                           
                            
                            extent2 = new esri.geometry.Extent(lxmin, lymin, lxmax, lymax, new esri.SpatialReference({ wkid: 102100 }))
                            var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255,0,0]), 1), new dojo.Color([0,255,0,0.25]));
                                              
                                                    
                          
                            newPoint = new esri.geometry.Point();

                            newPoint.x = extent2.xmax;
                            newPoint.y = extent2.ymax;
                          
                            newGeo.addPoint(newPoint);

                            newPoint = new esri.geometry.Point();
                        
                            newPoint.x = extent2.xmin;
                            newPoint.y = extent2.ymin;
                            newGeo.addPoint(newPoint);
                           
                        }

                        var extent4 = newGeo.getExtent();
                        var extent3 = new esri.geometry.Extent(extent4.xmin , extent4.ymin , extent4.xmax , extent4.ymax, new esri.SpatialReference({ wkid: 102100 }))
                        this.map.setExtent(extent3.getExtent());

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
                style: 'display: none;' 

            });
           
            contentP.addChild(treecontrol)
         
            this.menu.addChild(contentP);

           this.dropDownButton.set('dropDown', this.menu);

        
         
        },                 

        buildParentExtents: function () {




        }

    });
});