define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/has',
    'dojo/_base/array',
    'dojo/date/locale',
    'dojo/number',

    'dojo/store/Memory',
    'dgrid/Grid', // http://dojofoundation.org/packages/dgrid/
    'dgrid/Selection',
    'dgrid/selector', //added
    'dgrid/Keyboard',
    'dgrid/extensions/ColumnHider',
    'dgrid/extensions/ColumnReorder',
    'dgrid/extensions/ColumnResizer',
    'dgrid/extensions/Pagination',
    
    'esri/layers/ArcGISImageServiceLayer',
    'esri/layers/MosaicRule',
    'esri/layers/ImageServiceParameters'
], function (
    declare,
    lang,
    has,
    array,
    locale,
    number,

    Memory,
    Grid,
    Selection,
    selector,
    Keyboard,
    ColumnHider,
    ColumnReorder,
    ColumnResizer,
    Pagination,
    
    ArcGISImageServiceLayer,
    MosaicRule,
    ImageServiceParameters
) {

    return declare(null, {

        gridOptions: {},

        defaultGridOptions: {

            minWidth: 70,

            // no columns, use fields from Query's returned features
            columns: [],

            // no sort
            sort: [],

            // Allow the user to use column sets in grid
            columnSet: false,

            // Allow the user to hide columns in grid
            columnHide: true,

            // Allow the user to reorder columns in grid
            columnReorder: true,

            // Allow the user to resize columns in grid
            columnResize: true,

            // Use pagination on the results grid
            pagination: true,

            paginationOptions: {
                rowsPerPage: 100,
                previousNextArrows: true,
                firstLastArrows: true,
                pagingLinks: 2,
                pagingTextBox: true,
                pageSizeOptions: [10, 25, 50, 100, 250, 500, 1000],
                showLoadingMessage: true
            }
        },

        getGridConfiguration: function (options) {
            this.gridOptions = this.mixinDeep(lang.clone(this.defaultGridOptions), options);
        },

        createGrid: function () {
            if (!this.grid) {
                var gridOptions = {
                    cellNavigation: false,
                    showHeader: true,
                    showFooter: true,
                    adjustLastColumn: true,
                    store: new Memory(),
                    columns: [],
                    sort: []
                };

                var options = this.gridOptions || {};

                // grid and mixins
                var req = [Grid, Keyboard];
                if (this.featureOptions.selected !== false) {
                    req.push(Selection);

                    //seperating ImageService custom properties
             //       if (this.grid.columns.hasOwnProperty('Installation')) {
                    req.push(selector);
              //      gridOptions.selectionMode = 'none';
             //       } else {
                   //gridOptions.selectionMode = has('touch') ? 'toggle' : 'extended';
		    gridOptions.selectionMode = has('touch') ? 'toggle' : 'single';
		    //gridOptions.selectionMode = 'none';
		//    }
                    gridOptions.allowFeatureSelectionAll = false;
                }

                if (options.pagination !== false) {
                    req.push(Pagination);
                    lang.mixin(gridOptions, options.paginationOptions);
                }
		//	if (options.selector !== false) {
                //      req.push(selector);
                //      lang.mixin(gridOptions, options.selectorOptions);
                //      }

                // grid extensions
                if (options.columnHide !== false) {
                    req.push(ColumnHider);
                }
                if (options.columnReorder !== false) {
                    req.push(ColumnReorder);
                }
                if (options.columnResize !== false) {
                    req.push(ColumnResizer);
                }

                var AttributeGrid = declare(req);
                this.grid = new AttributeGrid(gridOptions, this.ImageryTableGridDijit.domNode);
                this.grid.startup();

                if (this.featureOptions.selected) {
                console.log(this.featureOptions);
                    this.grid.on('dgrid-select', lang.hitch(this, 'selectFeaturesFromGrid'));
                    this.grid.on('dgrid-deselect', lang.hitch(this, 'selectFeaturesFromGrid'));
                }
            }

        },

        populateGrid: function (options) {
            var results = options;
            if (options.results) {
                results = options.results;
            }

            var delim = '', linkField = this.linkField;
            var filteredFields = array.filter(results.fields, function (field) {
                return (field.name === linkField);
            });
            if (filteredFields.length >0) {
                if (filteredFields[0].type === 'esriFieldTypeString') {
                    delim = '\'';
                }
            }

            var features = this.getFeaturesFromResults();
            var rows = [];
            array.forEach(features, lang.hitch(this, function (feature) {
                // relationship query
                if (feature.relatedRecords) {
                    rows = rows.concat(this.getRelatedRecords(feature));

                // spatial or table query
                } else if (feature.attributes) {
                    rows = rows.concat(this.getRecordFromFeature(feature));
                }
            }));

            if (this.toolbarOptions.zoom.show) {
                this.zoomToFeatureGraphics();
            }

            this.getColumnsAndSort(results, options);

            if (rows && rows.length > 0) {
                this.grid.set('store', new Memory({
                    idProperty: this.idProperty,
                    data: rows
                }));
            }

            this.grid.refresh();
            this.setToolbarButtons();

        },

        getRecordFromFeature: function (feature) {
            var rows = [], delim = '';
            var lq =  null;
            if (this.hasLinkedQuery()) {
                lq = this.linkedQuery;
            }

            var showFeatures = this.featureOptions.features;
            if (!lq || lq.type !== 'table') {
                var row = feature.attributes;
                // add reference to the feature if there is geometry
                if (showFeatures && feature.geometry) {
                    row.feature = lang.clone(feature);
                }
                if (lq && lq.linkIDs) {
                    lq.linkIDs.push(delim + feature.attributes[this.linkField] + delim);
                }
                rows.push(row);

                if (showFeatures && feature.geometry) {
                    this.addFeatureGraphic(feature);
                }
            }
            return rows;
        },

        getRelatedRecords: function (feature) {
            var rows = [], delim = '', objectID = feature.objectId;
            var lq =  null;
            if (this.hasLinkedQuery()) {
                lq = this.linkedQuery;
            }

            var showFeatures = this.featureOptions.features;
            // multiple related records for a feature
            array.forEach(feature.relatedRecords, lang.hitch(this, function (record) {
                if (record.attributes) {
                    var row = record.attributes;
                    row.RelatedObjectID = objectID;
                    rows.push(row);
                }
                if (lq && lq.linkIDs) {
                    lq.linkIDs.push(delim + feature.attributes[this.linkField] + delim);
                }
                if (showFeatures && record.geometry) {
                    this.addFeatureGraphic(feature);
                }
            }));
            return rows;
        },

        getColumnsAndSort: function (results, options) {
            // reset the columns?
            if (options.columns) {
                this.gridOptions.columns = options.columns;
            }

            // reset the sort?
            if (options.sort) {
                this.gridOptions.sort = options.sort;
            }

            // set the columns
            var columns = lang.clone(this.gridOptions.columns) || [];
            // no columns? get them from the fields
            if (!columns || columns.length < 1) {
                columns = this.buildColumns(results);
            }

            if (columns) {
                this.setColumnStyles(columns);
                this.grid.set('columns', columns);
            } else if (this.gridOptions.subRows) {
                this.grid.set('subRows', this.gridOptions.subRows);
            }

            // set the sort
            var sort = this.gridOptions.sort || [];
            // sort === 'inherit'? use query result order
            if (typeof sort === 'string' && sort.toLowerCase() === 'inherit'){
                return;
            }
            // no sort? use the first column
            if (sort.length < 1 && columns && columns.length > 0) {
                sort = [
                    {
                        attribute: columns[0].field,
                        descending: false
                    }
                ];
            }
            this.grid.set('sort', sort);
        },

        buildColumns: function (results) {
        this.gridOptions.selectionMode = 'none';
            function formatDateTime (value) {
                var date = new Date(value);
                return locale.format(date, {
                    formatLength: 'short'
                });
            }
            function formatNumber (value) {
                return number.format(value);
            }
            function formatSingleDouble (value) {
                return number.format(value, {
                    places: 3
                });
            }

            var excludedFields = [/*'objectid',*/'esri_oid', 'shape','shape_area', 'shape.len', 'shape_length', 'shape.area', 'shape.starea()', 'shape.stlength()', 'st_area(shape)', 'st_length(shape)'];
            var columns = [], col, col2, nameLC = null;
            if (results.fields) {
			col2 =	selector({
                        field: 'Select',
                        label: "Select",
                        style: 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;',
                        width: 30,
                        selectorType: "radio"
				}),
			columns.push(col2);
                array.forEach(results.fields, function (field) {
                    nameLC = field.name.toLowerCase();
                    if (array.indexOf(excludedFields, nameLC) < 0) {
                        col = {
                            id: field.name,
                            field: field.name,
                            label: field.alias,
                            style: 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;',
                            width: 100
                        };
                        switch (field.type) {
                            case 'esriFieldTypeString':
                                col.width = 150;
                                break;
                            case 'esriFieldTypeSmallInteger':
                            case 'esriFieldTypeInteger':
                                col.formatter = formatNumber;
                                col.style += 'text-align:right;';
                                break;
                            case 'esriFieldTypeSingle':
                            case 'esriFieldTypeDouble':
                                col.formatter = formatSingleDouble;
                                col.style += 'text-align:right;';
                                break;
                            case 'esriFieldTypeDate':
                                col.width = 150;
                                col.formatter = formatDateTime;
                                break;
                        }
                        columns.push(col);
                    }
                });
            } else if (this.getFeatureCount() > 0) {
                var feature = this.features[0];
                if (feature) {
                    var attributes = feature.attributes;
                    for (var key in attributes) {
                        if (attributes.hasOwnProperty(key)) {
                            columns.push({
                                id: key,
                                field: key,
                                label: key,
                                width: 100
                            });
                        }
                    }
                }
            }
            return columns;
        },

        setColumnStyles: function (columns) {
            //style the grid columns from the config object
            var gr = this.grid;
            array.forEach(columns, function (column) {
                if (column.style) {
                    gr.styleColumn(column.id, column.style);
                }
            });
        },

        selectFeaturesFromGrid: function (event) { 
          //added event
         //console.log(this.grid);
         //console.log(this.grid.columns.Installation.id);


       if (this.grid.columns.hasOwnProperty('Installation')) {
         console.log("true");
         feature = null;
                     this.selectedGraphics.clear();
                     
			var rows = event.rows;
			//console.log(rows);
			//console.log(rows[0]);
                        //console.log(rows[0].data.Installation);
                        var mVal = rows[0].data.Installation;
                        //console.log(rows[0].data.feature.geometry);
                       // console.log(rows[0].data.feature.geometry.getExtent());
                	//var features = featureSet.features;
                	console.log(this.map.getScale());
                	console.log(this.imageServiceLayer.minScale);
                	if (this.map.getScale() > this.imageServiceLayer.minScale) {
				//dojo.forEach(features, lang.hitch(this, function(feature) {
					//if (rows[0].id == rows[0].data.OBJECTID) {
						var selectedLayer = rows[0].data.feature.geometry.getExtent().expand(1.1);
                        			this.map.setExtent(selectedLayer);
					//}					
                		//}), this);
                		}
                    var mr = new MosaicRule();
                    mr.where = "Name" + " = '" + mVal + "'"
                    this.imageServiceLayer.setMosaicRule(mr)
                    this.map.addLayer(this.imageServiceLayer);
                    return this.imageServiceLayer;
         console.log("true2");
         //console.log(this.map.graphicsLayerIds);
         //console.log(this.map.getScale());
         } else {
         
         
            var selection = this.grid.get('selection'),
                feature = null;
		//console.log(selection);
            this.selectedFeatures = [];
            this.selectedGraphics.clear();

            for (var key in selection) {
            
                if (selection.hasOwnProperty(key) && selection[key] === true) {
                    feature = this.getFeatureFromStore(key);
                    if (feature && feature.geometry) {
                        this.addSelectedGraphic(feature);
                    }
                }
            }
            this.doneSelectingFeatures(true);
            }
        },

        getFeatureFromStore: function (key) {
            var store = this.grid.get('store'),
                rec = null,
                feature = null;
            rec = store.get(key);
            if (rec) {
                feature = rec.feature;
            }
            return feature;

        },

        clearGrid: function () {
            if (this.grid) {
                if (this.grid.clearSelection) {
                    this.grid.clearSelection();
                }
                this.grid.set('columns', []);
                this.grid.set('store', new Memory());
                this.grid.refresh();
            }
            this.setToolbarButtons();
        }

    });
});
