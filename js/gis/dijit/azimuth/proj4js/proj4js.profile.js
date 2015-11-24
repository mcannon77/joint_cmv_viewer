var profile = (function(){

	return {
		resourceTags:{
			copyOnly: function(filename, mid){
				var list = {
                    "proj4js/package.json": true,
                    "proj4js/proj4js.profile.js": true, 
                    "proj4js/main.min.js": true				
                };
                return (mid in list);
            },
			amd: function(filename, mid){
				return /\.js$/.test(filename);
			}
		}
	};
})();



