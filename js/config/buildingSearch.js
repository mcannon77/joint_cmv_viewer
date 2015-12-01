define({
   map: true,
   zoomExtentFactor: 2,
   queries: [
	   {
		   description: 'Buildings',
		   url: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/DamageAssessment/MapServer',
		   layerIds: [0],
		   searchFields: ['incidentid', 'incidentnm'],
		   minChars: 2,
		   gridColumns: [
			   { field: 'incidentid', label: 'Incident ID', width: 100 },
			   { field: 'incidentnm', label: 'Incident Name',  sortable: false, resizable: false }
		   ],
		   sort: [
			   {
			       attribute: 'incidentid',
				   descending: false
			   }
		   ],
		   prompt: 'building number',
		   selectionMode: 'single'
	   }
   ],
   selectionSymbols: {
	   polygon: {
		   type   : 'esriSFS',
		   style  : 'esriSFSSolid',
		   color  : [255, 0, 0, 62],
		   outline: {
			   type : 'esriSLS',
			   style: 'esriSLSSolid',
			   color: [255, 0, 0, 255],
			   width: 3
		   }
	   },
	   point: {
		   type   : 'esriSMS',
		   style  : 'esriSMSCircle',
		   size   : 25,
		   color  : [255, 0, 0, 62],
		   angle  : 0,
		   xoffset: 0,
		   yoffset: 0,
		   outline: {
			   type : 'esriSLS',
			   style: 'esriSLSSolid',
			   color: [255, 0, 0, 255],
			   width: 2
		   }
	   }
   },
   selectionMode   : 'extended'
});