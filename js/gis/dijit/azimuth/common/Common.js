console.log("wvs/common/Common.js");
define([
    "./Converter", 
    "./Constants", 
    "esri/units", 
    "esri/geometry/Point",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dijit/Dialog",
    "dojo/Deferred",
    "dojo/dom-construct",
    "./SimpleButton",
    "dojo/aspect",
    "../_base/config",
    "dojo/string",
    "dojo/dom-attr"
],
    function (Converter, Constants, Units, Point, lang, array, Dialog, Deferred, domConstruct, SimpleButton, aspect, wvsConfig, string, domAttr) {
        // module:
        //		wvs/common/Common
        var Common = {
            showWidgetInDialog: function (widget, widgetParams, dialogOptions, isLayoutWidget) {
                // summary:
                //      Creates an instance of a dijit and places it within the dialog
                // widget: Constructor
                //      The constructor for a given widget/dijit
                // widgetParams: Object
                //      the constructor params for the widget
                // dialogOptions: Object
                //      parameters for the dialog such as style, class, etc.
                // isLayoutWidget: boolean
                //      determines whether the widget is a layout widget (BorderContainer, TabContainer, etc.). To work in dialogs, layout widgets need to have a size which determines the dialog's contents.
                // returns:
                //      undefined
                var isLayoutWidget = isLayoutWidget || false;
                var instance = new widget(widgetParams);
                if (isLayoutWidget) {
                    instance.startup();
                }
                var defaultDialogOptions = {
                    content: instance,
                    onHide: function () {
                        instance.destroy();
                    },
                    title: instance.title ? instance.title : "Unnamed Widget",
                    style: isLayoutWidget ? "" : "width:500px;",
                    "class": "nonModal"
                };
                var dialogOptions = dialogOptions || {};
                dialogOptions = lang.mixin(defaultDialogOptions, dialogOptions);
                var dialog = new Dialog(dialogOptions);

                // Sometimes, a widget is destroyed by something other than the user, but the destroying object may not know that the widget is in a dialog
                // so we use dojo/aspect to close the dialog when the widget is destroyed.
                var onWidgetDestroy = aspect.after(instance, "destroy", function () {
                    onWidgetDestroy.remove();
                    dialog.hide();
                });
                dialog.show();
                if (isLayoutWidget) {
                    instance.resize();
                }
                lang.setObject("curDialogWidget", instance);
                return dialog;
            },
            errorDialog: function(message, title){
                // summary:
                //      a utility function that creates an error dialog to provide a sexier replacement to Javascript's alert; utilizes deferreds for this purpose
                // message: String
                //      the message to present to the user
                // title: String?
                //      an optional title for this dialog (for non-error cases)

                var deferred = new Deferred(),
                    defaultDialogOptions = { title: title || "An error occurred", style: "width:500px", content: message, onHide: function () { deferred.resolve(true); } },
                    buttons = { "OK": { action: function () { this.hide(); deferred.resolve(true); } } };

                var dialog = new Dialog(defaultDialogOptions);
                var actionBar = domConstruct.create("div", { "class": "dijitDialogPaneActionBar" });
                for (var key in buttons) {
                    var btn = new SimpleButton({ label: key, onClick: lang.hitch(dialog, buttons[key].action) });
                    domConstruct.place(btn.domNode, actionBar);
                }
                domConstruct.place(actionBar, dialog.containerNode);
                dialog.show();
                return deferred.promise;
            },
            confirmDialog: function (message, buttons, dialogOptions) {
                // summary:
                //      a utility function that creates a confirmation dialog to provide a sexier replacement to Javascript's confirm; utilizes deferreds for this purpose
                // message: String
                //      the message to present to the user
                // buttons: Object?
                //      an object representing the buttons for the dialog. This should be overriden with caution.
                // dialogOptions: Object?
                //      an object reprsenting the options for the dialog, such as title, style. This should be overriden with caution.
                var message = typeof message === "string" ? message : "Are you sure you want to perform this action?",
                    deferred = new Deferred(),
                    buttons = typeof buttons === "object" ?
                    buttons : {
                        "Yes": { action: function () { this.hide(); deferred.resolve(true); } },
                        "No": { action: function () { this.hide(); deferred.resolve(false); } }
                    };
                var defaultDialogOptions = { title: "Confirm your Action", style: "width:500px", content: message, onHide: function () { deferred.resolve(false); } };

                lang.mixin(defaultDialogOptions, dialogOptions || {});

                var dialog = new Dialog(defaultDialogOptions);
                var actionBar = domConstruct.create("div", { "class": "dijitDialogPaneActionBar" });
                for (var key in buttons) {
                    var btn = new SimpleButton({ label: key, onClick: lang.hitch(dialog, buttons[key].action) });
                    domConstruct.place(btn.domNode, actionBar);
                }
                domConstruct.place(actionBar, dialog.containerNode);
                dialog.show();
                return deferred.promise;
            },
            getHyperlink: function(key, value, layerId){
                var mappingObj = this.getHyperlinkMappingFromKey(key);

                if (mappingObj == null || value === "" || new String(value).replace(/(^\s*)|(\s*$)/g, "") === "") {
                    return value;
                }

                var replacementObject = { val: value };
                if (typeof layerId !== "undefined" || layerId === null)
                    replacementObject.layerId = layerId;
                var displayName = mappingObj.displayAs ? string.substitute(mappingObj.displayAs, replacementObject) : value;
                var href = '';
                var link = domConstruct.create("a", { innerHTML: displayName });
                switch (mappingObj.type) {
                    case "link":
                        domAttr.set(link, "href", string.substitute(mappingObj.replacement, replacementObject));
                        domAttr.set(link, "target", "_blank");
                        break;
                    case "js":
                        href += 'javascript:';
                        if (typeof mappingObj.formatMethod === "function")
                            href += mappingObj.formatMethod(key, value);
                        else
                            href += string.substitute(mappingObj.replacement, replacementObject);
                        domAttr.set(link, "href", href);
                        break;
                }                

                return link;
            },
            getHyperlinkMappingFromKey: function (key, hyperlinkFieldAliases) {
                // summary:
                //      denotes if a given key is a registered as a hyperlink field
                // key: String
                //      the field alias to check for hyperlink values
                // hyperlinkFieldAliases: Array?
                //      an array of hyperlink field aliases { key: "key", replaceLink: "replaceLink"}.  If this is empty, this will attempt to use the global config
                // returns:
                //      the field alias -> hyperlink mapping object
                var hyperlinkFieldAliases = hyperlinkFieldAliases ? hyperlinkFieldAliases : (wvsConfig.defaults.hyperlinks.enabled && wvsConfig.defaults.hyperlinks.hyperlinkFieldAliases) ? wvsConfig.defaults.hyperlinks.hyperlinkFieldAliases : null;
                if (!hyperlinkFieldAliases) {
                    return null;
                }
                for (var i = 0, il = hyperlinkFieldAliases.length; i < il; i++) {
                    if (key.toLowerCase() === hyperlinkFieldAliases[i].key.toLowerCase()) {
                        return hyperlinkFieldAliases[i]; // Object
                    }
                }
                return null; // null
            },
            buildBufferPointArray: function (map, mapUnitCenterPoint, radius, units, numPoints) {
                // summary:
                //      builds a "buffer" (circle) from a list of parameters
                // map: Map
                //      an instance of an esri map
                // mapUnitCenterPoint: Point
                //      the center point for the buffer
                // radius: Number
                //      the radius for the buffer
                // units: Unit
                //      the units for the buffer (esri's Unit)
                // numPoints: int
                //      the number of points the buffer will contain (higher number = more precision)
                // returns:
                //      a rings array
                var ddCenterPoint = Converter.mapUnitPointToDDPoint(map, mapUnitCenterPoint),
                    outArray = [],
                    increment = 0,
                    counter = 0,
                    kmRadius = Converter.convertUnits(radius, units, Units.KILOMETERS);
    
                while (increment < 360) {
                    var ddBearingEndPoint = this.calcDestinationDDPointByBearingAndDistance_Km(ddCenterPoint, kmRadius, increment);
                    var mapUnitBearingEndPoint = Converter.ddPointToMapUnitPoint(map, ddBearingEndPoint);
        
                    outArray[counter] = mapUnitBearingEndPoint;

                    counter++;
                    increment += (360 / numPoints);
                }

                //create last point to "close" the ring
                outArray[counter] = outArray[0];

                return outArray; // Array
            },
            underscoreToHumanReadableString: function (string) {
                var arr = string.split("_");
                if (arr.length > 1) {
                    return array.map(string.split("_"), function (str) {
                        return str.charAt(0).toUpperCase() + str.slice(1);
                    }).join(" ");
                }
                return arr.charAt(0).toUpperCase() + arr.slice(1);;
            },
            camelCaseToHumanReadableString: function (string) {
                // summary:
                //      converts a camel-cased string to a human-readable string
                // string: String
                //      the string to convert
                // returns:
                //      human-readable string
                var result = string.replace(/([A-Z])/g, " $1");
                var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                return finalResult;
            }, 
            calcDestinationDDPointByBearingAndDistance_Km: function(startPoint, distance, initialBearing) {
                //angular distance (in radians) is the distance travelled divided by the earth’s radius
                initialBearing = Converter.degreesToRadians(initialBearing);
                var angularRadianDistance = distance / Constants.EARTH_RADIUS_IN_KILOMETERS,
                    lat1 = Converter.degreesToRadians(startPoint.y),
                    lon1 = Converter.degreesToRadians(startPoint.x);
    
                var lat2 = Math.asin( Math.sin(lat1)*Math.cos(angularRadianDistance) + Math.cos(lat1)*Math.sin(angularRadianDistance)*Math.cos(initialBearing) );
                var lon2 = lon1 + Math.atan2(Math.sin(initialBearing)*Math.sin(angularRadianDistance)*Math.cos(lat1), Math.cos(angularRadianDistance)-Math.sin(lat1)*Math.sin(lat2));
    
                lat2 = Converter.radiansToDegrees(lat2);
                lon2 = Converter.radiansToDegrees(lon2);
    
                var flippedTheLon = 0;
                if (lon2 > 180) { 
                    var diff=lon2-180;
                    lon2=-180+diff;
                    flippedTheLon = 1;
                }
                if (lon2 < -180) {
                    var diff=180+lon2;
                    lon2=180+diff;
                    flippedTheLon = -1;
                }
                var endPoint = new Point(lon2, lat2);

                return endPoint;
            }
        };

        return Common;
    });