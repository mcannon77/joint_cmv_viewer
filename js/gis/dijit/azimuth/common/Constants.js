console.log("wvs/common/constants.js");
define([],
    function () {
        // module:
        //		wvs/common/Constants
        // description:
        //      Defines constants used throughout the application for conversions and
        var Constants = {
            INCHES_PER_METER: 39.3701,

            INCHES_PER_FOOT: 12,

            FEET_PER_METER: 3.2808,

            METERS_PER_FEET: 0.3048,

            FEET_PER_MILE: 5280,

            METERS_PER_MILE: 1609.344,

            KILOMETERS_PER_MILE: 1.609344,

            MILES_PER_DEGREE_LAT: 69.04,

            EARTH_RADIUS_IN_MILES: 3963.1676,

            PI_DIV180: Math.PI / 180,

            minMaxMercatorLon: 20037508.34
        };

        Constants.FEET_PER_DEGREE_LAT = Constants.MILES_PER_DEGREE_LAT * Constants.FEET_PER_MILE;
        Constants.METERS_PER_DEGREE_LAT = Constants.MILES_PER_DEGREE_LAT * Constants.METERS_PER_MILE;
        Constants.EARTH_RADIUS_IN_KILOMETERS = Constants.EARTH_RADIUS_IN_MILES * Constants.KILOMETERS_PER_MILE; //6371, // earth's mean radius in km

        return Constants;
    });