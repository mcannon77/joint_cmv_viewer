define({
    map: true,
    mapClickMode: true,

    //Image Service
    imageServiceUrl: 'https://52muhj-ws-g027/geobase/rest/services/Imagery/ACCImagery/ImageServer'
    /*configtitle: 'Imagery',
    
            layers: [
            {
                name: 'Imagery',
                expression: '', // additional where expression applied to all queries
                idProperty: 'OBJECTID',
                queryParameters: {
                    type: 'spatial', // spatial, relationship, table or database
                    layerID: 'Imagery', // from operational layers
                    sublayerID: null,
                    outFields: ['OBJECTID', 'Installation', 'AcquisitionDate', 'AcquisitionYear', 'ImageResolution', 'DaysOld']
                },
                attributeSearches: [
                    {
                        name: 'Search For Imagery',
                        searchFields: [
                            {
                                name: 'Name',
                                label: 'Name',
                                expression: '(Name LIKE \'%[value]%\')',
                                placeholder: 'Name',
                                required: true,
                                minChars: 3
                            }
                        ],
                        title: 'Imagery',
                        topicID: 'ImageryQuery',
                                        
                     //   featureOptions: {
                     //   selected: false
                     //   },
                                     
                        symbolOptions: {
                        	features: { 
                        		polyline: {
                    				type: 'esriSLS',
                    				style: 'esriSLSSolid',
                    				color: [100, 0, 200, 100],
                    				width: 2
                			},
                			polygon: {
                    				type: 'esriSFS',
                    				style: 'esriSFSSolid',
                    				color: [0, 0, 255, 0.0],
                    			outline: {
                        			type: 'esriSLS',
                        			style: 'esriSLSSolid',
                        			color: [200, 200, 200, 0],
                        			width: 2
                    			}
               				}
                      		},
               selected: {

                polyline: {
                    type: 'esriSLS',
                    style: 'esriSLSSolid',
                    color: [0, 255, 0, 0.1],
                    width: 2
                },
                polygon: {
                    type: 'esriSFS',
                    style: 'esriSFSSolid',
                    color: [200, 200, 200, 0],
                    outline: {
                        type: 'esriSLS',
                        style: 'esriSLSSolid',
                        color: [0, 255, 0, 0.1],
                        width: 2
                    }
                }
           	},
                      		highlighted: { 
                        		polyline: {
                    				type: 'esriSLS',
                    				style: 'esriSLSSolid',
                    				color: [100, 0, 200, 0],
                    				width: 2
                			},
                			polygon: {
                    				type: 'esriSFS',
                    				style: 'esriSFSSolid',
                    				color: [0, 50, 255, 0],
                    			outline: {
                        			type: 'esriSLS',
                        			style: 'esriSLSSolid',
                        			color: [50, 200, 200],
                        			width: 1
                    			}
               				}
                      		} 
                      },
                        gridOptions: {
				allowTextSelection: false,
				selectionMode: "none",
                            columns: [
                            ],
                            sort: [
                                {
                                    attribute: 'DaysOld',
                                    descending: false
                                }
                            ]
                        }
                    }
                ]
            }
        ]*/

});