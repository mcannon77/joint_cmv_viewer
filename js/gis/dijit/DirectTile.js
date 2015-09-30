define([
	'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'gis/dijit/_FloatingWidgetMixin',
    'dojo/dom-construct',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/aspect',
    'dojo/text!./Help/templates/HelpDialog.html',
    'esri/layers/TiledMapServiceLayer',
    'dijit/form/Button',
	'dijit/layout/TabContainer',
	'dijit/layout/ContentPane',
  
	'xstyle/css!./Help/css/Help.css'
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _FloatingWidgetMixin, domConstruct, on, lang, aspect, template, TiledMapServiceLayer) {

	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _FloatingWidgetMixin], {
		widgetsInTemplate: true,
		templateString: template,
		title: 'Help',
		html: '<a href="#">Help</a>',
		domTarget: 'helpDijit',
		map: this.map,
		draggable: false,
		baseClass: 'helpDijit',
		postCreate: function () {


		    dojo.declare("my.ACCTiles", name="TEST", esri.layers.TiledMapServiceLayer, { // create WMTSLayer by extending esri.layers.TiledMapServiceLayer
		        constructor: function () {
		            this.spatialReference = new esri.SpatialReference({
		                wkid: 102100
		            });
                    
		            this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-18502000, -3737000, 19069000, 11780000, this.spatialReference));
		            //this.fullExtent = new esri.geometry.Extent(-18502000, -3737000, 19069000, 11780000, this.spatialReference);
		            //
		            this.tileInfo = new esri.layers.TileInfo({
		                "rows": 256,
		                "cols": 256,
		                "dpi": 96,
		                "format": "JPG",
		                "compressionQuality": 75,
		                "origin": {
		                    "x": -20037508.342787001,
		                    "y": 20037508.342787001
		                },
		                "spatialReference": {
		                    "wkid": 102100
		                },
		                "lods": [
                          { "level": 2, "resolution": 39135.758482000092, "scale": 147914381.89788899 },
                          { "level": 3, "resolution": 19567.879240999919, "scale": 73957190.948944002 },
                          { "level": 4, "resolution": 9783.9396204999593, "scale": 36978595.474472001 },
                          { "level": 5, "resolution": 4891.9698102499797, "scale": 18489297.737236001 },
                          { "level": 6, "resolution": 2445.9849051249898, "scale": 9244648.8686180003 },
                          { "level": 7, "resolution": 1222.9924525624949, "scale": 4622324.4343090001 },
                          { "level": 8, "resolution": 611.49622628137968, "scale": 2311162.2171550002 },

		                ]
		            });
		            this.loaded = true;
		            this.onLoad(this);
		          
		        },

		        getTileUrl: function (level, row, col) {
		            return "http://localhost:41056/acc_cache/layers/_alllayers/" +
                      "L" + dojo.string.pad(level, 2, '0') + "/" +
                      "R" + dojo.string.pad(row.toString(16), 8, '0') + "/" +
                      "C" + dojo.string.pad(col.toString(16), 8, '0') + "." +
                      "jpg";
		        }


		    });
		   // map.fuckup;
		  //  map.addLayer(new my.ACCTiles());
			this.inherited(arguments);
			this.parentWidget.draggable = this.draggable;
			this.map.addLayer(new my.ACCTiles());
			if (this.parentWidget.toggleable) {
				this.own(aspect.after(this.parentWidget, 'toggle', lang.hitch(this, function () {
					this.containerNode.resize();
				})));
			} else {
				var help = domConstruct.place(this.html, this.domTarget);
				on(help, 'click', lang.hitch(this.parentWidget, 'show'));
			}
		},
		onOpen: function () {
			//  Make sure the content is visible when the dialog
			//  is shown/opened. Something like this may be needed
			//  for all floating windows that don't open on startup?
			if (!this.openOnStartup) {
				this.containerNode.resize();
			}
		},
		close: function () {
			if (this.parentWidget.hide) {
				this.parentWidget.hide();
			}
		}

	});
});