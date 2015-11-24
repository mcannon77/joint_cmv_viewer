console.log("wvs/_base/debug.js");
/*******************************************/
//Example usage
/*******************************************/
//Just log a message.  Use this for most standard stuff...
//    console.log('text info to display', this);

//Same as log but shows an icon to make it stand out...
//    console.info('text info to display', this);

//Actually logs the object so it can be expanded and debugged...
//    console.debug(object, "optional text info to display", this);

//Throw a warning...
//    console.warn('text info to display', this);

//Throw an error.  The browser will actually register an error so use with caution
//It also will include a stack trace...
//    console.error('text info to display', this);
/*******************************************/

define([],
    function () {

        if (!window.console) {
            window.console = {
                log: function () { },
                info: function () { },
                debug: function () { },
                warn: function () { },
                error: function () { }
            };
        }

        return {

            enabled: true,

            // valid levels are
            // 0 = Error 
            // 1 = Warning
            // 2 = Debug
            // 3 = Everything
            logLevel: 3,

            lastLogTime: null,

            counter: 0,

            objectTypes: [],

            getCallerName: function (caller) {
                var _callerName = "";
                if (caller) {
                    _callerName = typeof caller;
                    if (_callerName == "object") {
                        //dojo declared
                        if (caller.declaredClass) {
                            _callerName = caller.declaredClass;
                        } else {
                            //default
                            //_callerName = "Object";
                        }
                    } else {
                        _callerName = caller; // value
                    }
                }
                return _callerName;
            },

            log: function (text, caller) {

                if (!window.console || !this.enabled)
                    return;

                if (caller == null) {
                    console.log(this.counter + " | " + this.timeFromLast() + " | " + text);
                } else {
                    var _callerName = this.getCallerName(caller);
                    console.log(this.counter + " | " + this.timeFromLast() + " | " + _callerName + " | " + text);
                }

                //                if (!level) {
                //                    level = 3;
                //                }

                //                if (this.logLevel >= level) {
                //                    if (this.objectTypes.length === 0 || Array.indexOf(this.objectTypes, _callerName) > -1) {
                //                        console.log(this.counter + " | " + this.timeFromLast() + " | " + _callerName + " | " + text);
                //                    }
                //                }

                this.counter += 1;
            },

            debug: function (obj, text, caller) {
                if (!window.console || !this.enabled)
                    return;

                var _callerName = this.getCallerName(caller);

                if (typeof text == 'string') {
                    console.log("jsToolkit DEBUG | " + this.counter + " | " + _callerName + "->" + text);
                }
                console.debug(obj);

                this.counter += 1;
            },

            info: function (text, caller) {
                if (!window.console || !this.enabled)
                    return;

                if (caller == null) {
                    console.info(this.counter + " | " + this.timeFromLast() + " | " + text);
                } else {
                    var _callerName = this.getCallerName(caller);
                    console.info(this.counter + " | " + this.timeFromLast() + " | " + _callerName + " | " + text);
                }

                this.counter += 1;
            },

            warn: function (text, caller) {

                if (!window.console || !this.enabled)
                    return;

                if (caller == null) {
                    console.warn(this.counter + " | " + this.timeFromLast() + " | " + text);
                } else {
                    var _callerName = this.getCallerName(caller);
                    console.warn(this.counter + " | " + this.timeFromLast() + " | " + _callerName + " | " + text);
                }

                this.counter += 1;
            },

            error: function (text, caller) {
                if (!window.console || !this.enabled)
                    return;

                var _callerName = this.getCallerName(caller);

                console.error("jsToolkit custom error thrown by " + _callerName + "->" + text);

                this.counter += 1;
            },

            timeFromLast: function () {
                if (this.lastLogTime == null) {
                    this.lastLogTime = new Date();
                }
                var now = new Date();
                var diff = now.getTime() - this.lastLogTime.getTime();
                this.lastLogTime = now;
                return "From Last: " + diff + " ms";
            }

        };
    });