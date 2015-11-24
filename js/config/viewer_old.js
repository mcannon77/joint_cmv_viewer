define([
   'esri/units',
   'esri/geometry/Extent',
   'esri/config',
   'esri/tasks/GeometryService',
   'esri/layers/ImageParameters',
   'esri/dijit/Basemap',
   'esri/dijit/BasemapLayer',
   'esri/geometry/Point',
   'esri/urlUtils'
], function (units, Extent, esriConfig, GeometryService, ImageParameters, Basemap, BasemapLayer, Point, urlUtils) {

    // url to your proxy page, must be on same machine hosting you app. See proxy folder for readme.
    esriConfig.defaults.io.proxyUrl = 'https://www.my.af.mil/accgeoprod/DotNet/proxy.ashx';
    esriConfig.defaults.io.alwaysUseProxy = false;
    
    urlUtils.addProxyRule({
    urlPrefix: "52muhj-ws-g027/geobase/rest/services/Imagery/",
    proxyUrl: "https://www.my.af.mil/accgeoprod/DotNet/proxy.ashx"
    });
    // url to your geometry server.
    esriConfig.defaults.geometryService = new GeometryService('https://www.my.af.mil/accgeoprod/geobase/rest/services/Utilities/Geometry/GeometryServer');

    //image parameters for dynamic services, set to png32 for higher quality exports.
    var imageParameters = new ImageParameters();
    imageParameters.format = 'png32';

    return {
        // used for debugging your app
        isDebug: false,

        //default mapClick mode, mapClickMode lets widgets know what mode the map is in to avoid multipult map click actions from taking place (ie identify while drawing).
        defaultMapClickMode: 'identify',

         mapOptions: {
            basemap: '',
            logo: false,
              lods: ([
                        { "level": 0, "resolution": 156543.033928, "scale": 591657527.591555 },
                        { "level": 1, "resolution": 78271.5169639999, "scale": 295828763.795777 },
                        { "level": 2, "resolution": 39135.7584820001, "scale": 147914381.897889 },
                        { "level": 3, "resolution": 19567.8792409999, "scale": 73957190.948944 },
                        { "level": 4, "resolution": 9783.93962049996, "scale": 36978595.474472 },
                        { "level": 5, "resolution": 4891.96981024998, "scale": 18489297.737236 },
                        { "level": 6, "resolution": 2445.98490512499, "scale": 9244648.868618 },
                        { "level": 7, "resolution": 1222.99245256249, "scale": 4622324.434309 },
                        { "level": 8, "resolution": 611.49622628138, "scale": 2311162.217155 },
                        { "level": 9, "resolution": 305.748113140558, "scale": 1155581.108577 },
                        { "level": 10, "resolution": 152.874056570411, "scale": 577790.554289 },
                        { "level": 11, "resolution": 76.4370282850732, "scale": 288895.277144 },
                        { "level": 12, "resolution": 38.2185141425366, "scale": 144447.638572 },
                        { "level": 13, "resolution": 19.1092570712683, "scale": 72223.819286 },
                        { "level": 14, "resolution": 9.55462853563415, "scale": 36111.909643 },
                        { "level": 15, "resolution": 4.77731426794937, "scale": 18055.954822 },
                        { "level": 16, "resolution": 2.38865713397468, "scale": 9027.977411 },
                        { "level": 17, "resolution": 1.19432856685505, "scale": 4513.988705 },
                        { "level": 18, "resolution": 0.597164283559817, "scale": 2256.994353 },
                        { "level": 19, "resolution": 0.29858214164761665, "scale": 1128.4971760000001 },
                        { "level": 20, "resolution": 0.14929107082380833, "scale": 564.24858800000004 },
                        { "level": 21, "resolution": 0.074645535411904163, "scale": 282.12429400000002 }
              ]),

              center: new Point({
                  x: -3700000,
                  y: 3400000,
                  spatialReference: {
                      wkid: 102100
                  }
              }),
   		//center: [-30, 25],
	        zoom: 3,
	        sliderStyle: 'small'
        },
         panes: {
        // 	left: {
        // 		splitter: true
        // 	},
        // 	right: {
        // 		id: 'sidebarRight',
        // 		placeAt: 'outer',
        // 		region: 'right',
        // 		splitter: true,
        // 		collapsible: true
        // 	},
         	bottom: {
         		id: 'sidebarBottom',
         		placeAt: 'outer',
         		splitter: true,
         		collapsible: true,
         		region: 'bottom',
         		open: true,
         		style: 'height:200px;',        		
         		//content: '<div id="headerContainer"><div data-dojo-type="dijit/form/DropDownButton" data-dojo-props="iconClass:\'fa fa-times-circle-o\'" data-dojo-id="clearImage">Clear Selection</div><div data-dojo-type="dijit/form/Button" data-dojo-props="iconClass:\'fa fa-check-square-o\'" data-dojo-id="clearFp">Footprint</div></div><div id="attributesContainer"></div>'
         		content: '<span><div id="testNode"></div></span><div id="attributesContainer"></div>'
         	}
        // 	top: {
        // 		id: 'sidebarTop',
        // 		placeAt: 'outer',
        // 		collapsible: true,
        // 		splitter: true,
        // 		region: 'top'
        // 	}
         },
         collapseButtonsPane: 'center', //center or outer

        // operationalLayers: Array of Layers to load on top of the basemap: valid 'type' options: 'dynamic', 'tiled', 'feature'.
        // The 'options' object is passed as the layers options for constructor. Title will be used in the legend only. id's must be unique and have no spaces.
        // 3 'mode' options: MODE_SNAPSHOT = 0, MODE_ONDEMAND = 1, MODE_SELECTION = 2
        operationalLayers: [
        
{
            type: 'dynamic',
            url: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/CIP/MapServer',
            title: 'Common Installation Picture',
	    slider: false,
	    noLegend: false,
	    collapsed: true,
            options: {
                id: 'CIP',
                opacity: 1.0,
                visible: false,  
                imageParameters: imageParameters
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
  },{
            type: 'dynamic',
	    url: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/Airfield_Planning/MapServer',
	    title: 'Airfield Planning',
	    slider: true,
	    noLegend: false,
	    collapsed: true,
	    options: {
		id: 'AirfieldPlanning',
		opacity: 1.0,
		visible: false,
		imageParameters: imageParameters
	   },
	        layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
},/*{
	    type: 'dynamic',
	    url: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/Annuals/MapServer',
	    title: 'Annual Imagery',
	    slider: true,
	    noLegend: false,
	    collapsed: true,
	    options: {
		id: 'AnnualImagery',
		opacity: 1.0,
		visible: false,
		imageParameters: imageParameters
	   },
	        layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
},*/{
            type: 'dynamic',
	    url: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/Floorplan/MapServer',
	    title: 'Floor Plans',
	    slider: true,
	    noLegend: false,
	    collapsed: true,
	    options: {
		id: 'FP',
		opacity: 1.0,
		visible: false,
		imageParameters: imageParameters
	   },
	        layerControlLayerInfos: {
                swipe: true,
                swipeScope: true,
                noLegend: true,
                metadataUrl: true,
                expanded: false
            }
},
/*{
            type: 'dynamic',
	    url: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/af103_redline_track/MapServer',
	    title: 'AF103 Redline',
	    slider: true,
	    noLegend: false,
	    collapsed: true,
	    options: {
		id: 'RL',
		opacity: 1.0,
		visible: false,
		imageParameters: imageParameters
	   },
	        layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
},*/{
            type: 'dynamic',
	    url: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/Functional/MapServer',
	    title: 'Functional',
	    slider: true,
	    noLegend: false,
	    collapsed: true,
	    options: {
		id: 'funct',
		opacity: 1.0,
		visible: false,
		imageParameters: imageParameters
	   },
	        layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
},
{
            type: 'dynamic',
	    url: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/Utilities/MapServer',
	    title: 'Utilities',
	    slider: true,
	    noLegend: false,
	    collapsed: true,
	    options: {
		id: 'utils',
		opacity: 1.0,
		visible: false,
		imageParameters: imageParameters
	   },
	        layerControlLayerInfos: {
                swipe: true,
                metadataUrl: false,
                expanded: false
            }
},
{
	    type: 'tiled',
	    url: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/basemap/ACCAerials/MapServer',
	  // url: 'https://bab-cs-geocoopw.beale.af.mil/geocoop/rest/services/basemap/coop_basemap/MapServer', //using coop basemap for 10.2
	    title: 'Basemap',
	    slider: false,
	    noLegend: true,
	    collapsed: true,
	    options: {
		id: 'resample',
		opacity: 1.0,
		visible: true,
		minScale: 1128,	  //fires after last scale past
		resampling: true, //available 3.6 and later API and AGS 10.2.x
		imageParameters: imageParameters
	   },
	        layerControlLayerInfos: {
                swipe: false,
                metadataUrl: false,
                expanded: false
            }/*,
            legendLayerInfos: {
                layerInfo: {
                    hideLayers: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
                }}*/
}],
        // set include:true to load. For titlePane type set position the the desired order in the sidebar
        widgets: {
            growler: {
                include: true,
                id: 'growler',
                type: 'domNode',
                path: 'gis/dijit/Growler',
                srcNodeRef: 'growlerDijit',
                options: {}
            },
            geocoder: {
                include: true,
                id: 'geocoder',
                type: 'domNode',
                path: 'gis/dijit/Geocoder',
                srcNodeRef: 'geocodeDijit',
                options: {
                    map: true,
                    mapRightClickMenu: true,
                    geocoderOptions: {
                        autoComplete: true,
                        arcgisGeocoder: {
                            placeholder: 'Enter an address or place'
                        }
                    }
                }
            },
            identify: {
                include: true,
                id: 'identify',
                type: 'titlePane',
                path: 'gis/dijit/Identify',
                title: '<i class="fa fa-search"></i>&nbsp;&nbsp;Identify',
                open: false,
                position: 3,
                options: 'config/identify'
            },
            afbasemaps: {
                include: true,
                id: 'basemaps',
                type: 'domNode',
                path: 'gis/dijit/AFBasemaps',
                srcNodeRef: 'basemapsDijit',
                options: 'config/afbasemaps'
            },
            basemaps: {
                include: false,
                id: 'basemaps',
                type: 'domNode',
                path: 'gis/dijit/Basemaps',
                srcNodeRef: 'basemapsDijit',
                options: 'config/basemaps'
            },
            afbookmarks:{
                include: true,
                title: 'Bookmarks',
                id: 'afbookmarks',
                type: 'domNode',
                path: 'gis/dijit/AFBookmarks',
                srcNodeRef: 'afBookmarksDijit',
                options: 'config/afbookmarks'
            },
            mapInfo: {
                include: false,
                id: 'mapInfo',
                type: 'domNode',
                path: 'gis/dijit/MapInfo',
                srcNodeRef: 'mapInfoDijit',
                options: {
                    map: true,
                    mode: 'dms',
                    firstCoord: 'y',
                    unitScale: 3,
                    showScale: true,
                    xLabel: '',
                    yLabel: '',
                    minWidth: 286
                }
            },
            scalebar: {
                include: true,
                id: 'scalebar',
                type: 'map',
                path: 'esri/dijit/Scalebar',
                options: {
                    map: true,
                    attachTo: 'bottom-left',
                    scalebarStyle: 'ruler',
                    scalebarUnit: 'metric'
                }
            },
            locateButton: {
                include: false,
                id: 'locateButton',
                type: 'domNode',
                path: 'gis/dijit/LocateButton',
                srcNodeRef: 'locateButton',
                options: {
                    map: true,
                    publishGPSPosition: true,
                    highlightLocation: true,
                    useTracking: true,
                    geolocationOptions: {
                        maximumAge: 0,
                        timeout: 15000,
                        enableHighAccuracy: true
                    }
                }
            },
            overviewMap: {
                include: false,
                id: 'overviewMap',
                type: 'map',
                path: 'esri/dijit/OverviewMap',
                options: {
                    map: true,
                    attachTo: 'bottom-right',
                    color: '#0000CC',
                    height: 100,
                    width: 125,
                    opacity: 0.30,
                    visible: false
                }
            },
            homeButton: {
                include: false,
                id: 'homeButton',
                type: 'domNode',
                path: 'esri/dijit/HomeButton',
                srcNodeRef: 'homeButton',
                options: {
                    map: true,
                    extent: new Extent({
                        xmin: -180,
                        ymin: -85,
                        xmax: 180,
                        ymax: 85,
                        spatialReference: {
                            wkid: 4326
                        }
                    })
                }
            },
            legend: {
                include: false,
                id: 'legend',
                type: 'titlePane',
                path: 'esri/dijit/Legend',
                title: 'Legend',
                open: false,
                position: 0,
                options: {
                    map: true,
                    legendLayerInfos: true
                }
            },
            layerControl: {
                include: true,
                id: 'layerControl',
                type: 'titlePane',
                path: 'gis/dijit/LayerControl',
                title: '<i class="fa fa-list"></i>&nbsp;&nbsp;Layers',
                open: false,
                position: 1,
                options: {
                    map: true,
                    layerControlLayerInfos: true,
                    separated: true,
                    vectorReorder: true,
                    overlayReorder: true
                }
            },
             coordinateView: {
                include: true,
                title: 'CoordinateView',
                id: 'coordinateView',
                type: 'domNode',
                path: 'gis/dijit/CoordinateView',
                srcNodeRef: 'coordinateViewDijit',
                options: 'config/coordinateview'
            },
            find: {
                include: true,
                id: 'find',
                type: 'titlePane',
                canFloat: false,
                path: 'gis/dijit/Find',
                title: '<i class="fa fa-binoculars"></i>&nbsp;&nbsp;Find',
                open: false,
                position: 3,
                options: 'config/find'
            },
            draw: {
                include: true,
                id: 'draw',
                type: 'titlePane',
                canFloat: false,
                path: 'gis/dijit/Draw',
                title: '<i class="fa fa-pencil"></i>&nbsp;&nbsp;Draw',
                open: false,
                position: 4,
                options: {
                    map: true,
                    mapClickMode: true
                }
            },
            measure: {
                include: true,
                id: 'measurement',
                type: 'titlePane',
                canFloat: false,
                path: 'gis/dijit/Measurement',
                title: '<img src="images/Ruler16.png"/>&nbsp;&nbsp;Measurement',
                open: false,
                position: 5,
                options: {
                    map: true,
                    mapClickMode: true,
                    advancedLocationUnits: true,
                    defaultAreaUnit: units.SQUARE_MILES,
                    defaultLengthUnit: units.MILES
                }
            },
            azimuth: {
		    include: false,
		    id: 'azimuth',
		    type: 'titlePane',
		    canFloat: false,
		    position: 6,		    
		    path: 'gis/dijit/azimuth',
		    title: '<i class="fa fa-compass"></i>&nbsp;&nbsp;Azimuth',
		    options: {map: true, mapClickMode: true}
		},
            print: {
                include: true,
                id: 'print',
                type: 'titlePane',
                canFloat: false,
                path: 'gis/dijit/Print',
                title: '<i class="fa fa-print"></i>&nbsp;&nbsp;Print',
                open: false,
                position: 14,
                options: {
                    map: true,
                    printTaskURL: 'https://www.my.af.mil/accgeoprod/geobase/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
                    copyrightText: 'Copyright 2015',
                    authorText: 'Me',
                    defaultTitle: 'Viewer Map',
                    defaultFormat: 'PDF',
                    defaultLayout: 'Letter ANSI A Landscape'
                }
            },
            directions: {
                include: false,
                id: 'directions',
                type: 'titlePane',
                path: 'gis/dijit/Directions',
                title: 'Directions',
                open: false,
                position: 8,
                options: {
                    map: true,
                    mapRightClickMenu: true,
                    options: {
                        routeTaskUrl: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Network/USA/NAServer/Route',
                        routeParams: {
                            directionsLanguage: 'en-US',
                            directionsLengthUnits: units.MILES
                        },
                        active: false //for 3.12, starts active by default, which we dont want as it interfears with mapClickMode
                    }
                }
            },
            editor: {
                include: false,
                id: 'editor',
                type: 'titlePane',
                path: 'gis/dijit/Editor',
                title: 'Editor',
                open: false,
                position: 9,
                options: {
                    map: true,
                    mapClickMode: true,
                    editorLayerInfos: true,
                    settings: {
                        toolbarVisible: true,
                        showAttributesOnClick: true,
                        enableUndoRedo: true,
                        createOptions: {
                            polygonDrawTools: ['freehandpolygon', 'autocomplete']
                        },
                        toolbarOptions: {
                            reshapeVisible: true,
                            cutVisible: true,
                            mergeVisible: true
                        }
                    }
                }
            },
	    ertool: {
		    include: true,
		    id: 'ertool',
		    type: 'titlePane',
		    canFloat: false,
		    position: 10
,		    path: 'gis/dijit/ERTool',
		    title: '<i class="fa fa-ambulance"></i>&nbsp;&nbsp;Emergency Response',
		    options: 'config/ertool'
		},
	    imageryManagement: {   
	    	    include: true,
	            id: 'imageryManagement',
	            type: 'titlePane',
	         //   	type: 'domNode',
               	//	path: 'esri/dijit/ImageFilter',
               //         srcNodeRef: 'iControls',
	            canFloat: false,
	            position: 15,
	            path: 'gis/dijit/Imagery',
	            title: '<i class="fa fa-globe"></i>&nbsp;&nbsp;AF Imagery',
	            //options: {map: true}
	            options: 'config/imageryManagement'
	        },
            streetview: {
                include: false,
                id: 'streetview',
                type: 'titlePane',
                canFloat: false,
                position: 12,
                path: 'gis/dijit/StreetView',
                title: 'Google Street View',
                options: {
                    map: true,
                    mapClickMode: true,
                    mapRightClickMenu: true
                }
            },
	    openskies: {
  		    include: true,
  		    id: 'os',
  		    type: 'titlePane',
  		//    placeAt: 'top',
  		    canFloat: false,
  		    position: 13,
  		    path: 'gis/dijit/OpenSkies',
  		    title: '<i class="fa fa-plane"></i>&nbsp;&nbsp;Open Skies',
  		    options: {
    			map: true
  		}
	    },
	  dnd: {
  		    include: false,
  		    id: 'dnd',
  		    type: 'titlePane',
  		//    placeAt: 'top',
  		    canFloat: false,
  		    position: 17,
  		    path: 'gis/dijit/DnD',
  		    title: '<i class="fa fa-plus-circle"></i>&nbsp;&nbsp;Drag and Drop',
  		    options: {
    			map: true
  		}
	    },
            search: {
                include: false,
                id: 'search',
                type: 'titlePane',
                path: 'gis/dijit/Search',
                canFloat: false,
                title: '<i class="fa fa-search"></i>&nbsp;&nbsp;Search',
                open: false,
                position: 22,
                options: 'config/searchWidget'
            },
            imagery: {
                include: false,
                id: 'AFimagery',
                type: 'titlePane',
                path: 'gis/dijit/Imagery',
                canFloat: false,
                title: '<i class="fa fa-globe"></i>&nbsp;&nbsp;AF Imagery',
                open: false,
                position: 23,
                options: 'config/imagery'
            },
            imageryTable: {
                include: false,
                id: 'imageryContainer',
                type: 'domNode',
                srcNodeRef: 'attributesContainer',
                path: 'gis/dijit/ImageryTable',
                options: {
                    map: true,
                    mapClickMode: false,

                    // use a tab container for multiple tables or
                    // show only a single table
                    useTabs: true,

                    // used to open the sidebar after a query has completed
                    sidebarID: 'sidebarBottom'
                }
            },
            attributesTable: {
    		include: false,
    		id: 'attributesContainer',
    		type: 'domNode',
    		//srcNodeRef: 'attributesContainer',
    		srcNodeRef: 'testATT',
    		path: 'gis/dijit/AttributesTable',
                options: {
                    map: true,
                    mapClickMode: false,

                    // use a tab container for multiple tables or
                    // show only a single table
                    useTabs: false//,

                    // used to open the sidebar after a query has completed
                  //  sidebarID: 'sidebarBottom'
                }
	    },
            exportDialog: {
                include: false,
                id: 'export',
                type: 'floating',
                path: 'gis/dijit/Export',
                title: 'Export',
                options: {}
            },
            help: {
                include: true,
                id: 'help',
                type: 'floating',
                path: 'gis/dijit/Help',
                title: 'Help',
                options: {}
            }

        }
    };
});