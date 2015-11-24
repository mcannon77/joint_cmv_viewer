define([
    "dojo/_base/declare"
    , "dijit/_WidgetBase"
    , "dijit/_TemplatedMixin"
    , "dojo/text!../templates/SimpleButton.html"
    , "dojo/_base/lang"
    , "dojo/_base/array"
    , "dojo/on"
    , "dojo/dom-class"
    , "dojo/dom-attr"
], function (declare, _WidgetBase, _TemplatedMixin, template, lang, array, on, domClass, domAttr) {
    // module:
    //      wvs/dijits/SimpleButton
    return declare([_WidgetBase, _TemplatedMixin], {

        templateString: template,

        declaredClass: "wvs.dijits.SimpleButton",

        // disabled: Boolean
        //      indicates whether the button is disabled
        disabled: false,

        // tooltip: String
        //      text that appears when the button is hovered over
        tooltip: "",

        // disabledClass: String
        //      the class which signifies the simple button is disabled
        disabledClass: "dijitDisabled",

        // leftIconClass: String
        //      the class for the left icon
        leftIconClass: "",

        // rightIconClass: String
        //      the class for the right icon
        rightIconClass: "",

        // toggleable: Boolean
        //      indicates whether or not this button is toggleable
        toggleable: false,

        // checked: Boolean
        //      indicates whether or not this button is checked (must be toggleable!)
        checked: false,

        checkedClass: "jstoolkit-dijit-SimpleButton-checked",

        postCreate: function () {
            var self = this;

            if (this.leftIconClass) {
                domClass.add(this.leftIconNode, this.leftIconClass);
            }
            if (this.rightIconClass) {
                domClass.add(this.leftIconNode, this.rightIconClass);
            }
            this.labelNode.innerHTML = this.label ? this.label : !this.leftIconClass && !this.rightIconClass ? "Button" : "";

            // Attach a target, if present
            if (this.target) {
                domAttr.set(this.labelNode, "target", this.target);
            }

            if (this.tooltip) {
                domAttr.set(this.containerNode, "title", this.tooltip);
            }

            // Attach an onClick handler, if present
            if (this.onClick) {
                this.own(
                    on(this.containerNode, "click", function () {
                        if (self.toggleable) {
                            self.set("checked", !self.checked);
                        }
                        if (!self.get("disabled")) {
                            self.onClick();
                        }
                    })
                );
            }

            this.setWatches();
            this._setDisabled(this.get("disabled"));
        },
        setWatches: function () {
            var self = this;
            // summary:
            //      sets the watches for this widget

            this.watch("disabled", lang.hitch(this, function (name, oldVal, newVal) {
                self._setDisabled(newVal);
            }));

            this.watch("checked", lang.hitch(this, function (name, oldVal, newVal) {
                self._setChecked(newVal);
            }));
        },
        _setChecked: function (checked) {
            if (this.toggleable) {
                if (checked) {
                    domClass.add(this.domNode, this.checkedClass);
                }
                else {
                    domClass.remove(this.domNode, this.checkedClass);
                }
            }
        },
        _setDisabled: function (disabled) {
            //  summary:
            //      disables/enables the button
            //  disabled: Boolean
            //      whether the button should be disabled or not
            var disabled = typeof disabled === "boolean" ? disabled : true;

            if (disabled) {
                domClass.add(this.containerNode, this.disabledClass);
            }
            else {
                domClass.remove(this.containerNode, this.disabledClass);
            }
        }
    });
});