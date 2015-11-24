define([
    "dojo/_base/lang",
    "esri/graphic",
    "dojo/_base/connect"
], function (lang, Graphic, connect) {
        lang.extend(Graphic, {
            setEditing: function (editing) {
                editing = editing === false ? false : true;
                if (!editing) {
                    delete this._editing;
                }
                else {
                    this._editing = {
                        saved: false,
                        //isNew: true,
                        modified: false
                    };
                }
            },
            isEditable: function () {
                return typeof this._editing !== "undefined";
            },
            isSaved: function () {
                return this.isEditable() && this._editing.saved;
            },
            save: function () {
                if (this.isEditable()) {
                    this._editing.saved = true;
                    connect.publish("markup/item/modify", { item: this });
                    //this._editing.isNew = false;
                }
            },
            setModified: function () {
                if (this.isEditable()) {
                    this._editing.modified = true;
                }
            },
            isModified: function () {
                return this.isEditable() && this._editing.modified;
            }
        });
    }
);