define([
    "dojo/_base/declare"
    , "dojo/_base/lang"
    , "dojo/_base/array"
    , "esri/layers/layer"
    , "esri/layers/GraphicsLayer"
    , "dojo/dom-style"
    , "dojo/store/Memory"
    , "dojo/Evented"
    , "esri/graphic"
    , "dojo/dom-construct"
    , "esri/lang"
    , "../../../common/InfoTemplateManager"
    , "../../../common/Common"
    , "dojo/_base/connect"
    , "dojo/on"
], function (
    declare
    , lang
    , array
    , Layer
    , GraphicsLayer
    , domStyle
    , Memory
    , Evented
    , Graphic
    , domConstruct
    , esriLang
    , InfoTemplateManager
    , Common
    , connect
    , on
) {
    var MarkupLayer = declare([Layer, Evented], {

        declaredClass: "wvs.layers.MarkupLayer",

        title: "",

        _ids: 0,

        constructor: function (options) {
            var fromJson = options && options.json;
            var data = fromJson ? this.fromJson(options.json) : [{ parent: null, id: "root", name: options.title ? options.title : "Markup", type: "folder", show: lang.hitch(this, this.show), hide: lang.hitch(this, this.hide), rename: lang.hitch(this, this.renameFolder, "root") }];
            this.items = new Memory({ data: data });

            this._gc = new GraphicsLayer();
            // signify this is a markup layer
            this._gc._markupLayer = true;

            // if this item is from json, we need to add our graphics
            if (fromJson) {
                var graphics = this.items.query({ type: "graphic" });
                array.forEach(graphics, function (item) {
                    this._gc.add(item.graphic);
                }, this);
            }
            
            this.id = options.id || null;
            // this is a 'special' id for a remote server, not associated with the esri map
            this._id = options._id || null;
            this.title = options.title || "Markup Layer";

            this.operationBuffer = null;

            this.loaded = true;
            this.suspended = false;
            this.emit("load", { layer: this });

            this._subscriptions = [];
            this._initiateSubscriptions();
        },
        _initiateSubscriptions: function () {
            var self = this;

            // markup/item/cut
            var cutSub = connect.subscribe("markup/item/cut", function (obj) {
                self.operationBuffer = { operation: "cut", item: obj.item, layer: obj.layer, node: obj.node };
            });
            this._subscriptions.push(cutSub);

            // markup/item/copy
            var copy = connect.subscribe("markup/item/copy", function (obj) {
                self.operationBuffer = { operation: "copy", item: obj.item, layer: obj.layer, node: obj.node };
            });
            this._subscriptions.push(copy);

            // markup/item/paste
            var paste = connect.subscribe("markup/item/paste", function (obj) {
                // If we have a cut, clear out the buffer on paste
                if (self.operationBuffer && self.operationBuffer.operation === "cut") {
                    self.operationBuffer = { operation: "paste", item: obj.item, layer: obj.layer, node: obj.node };
                }
            });
            this._subscriptions.push(copy);
        },
        _getId: function () {
            // summary:
            //      gets a unique id for a node
            // returns:
            //      an integer id
            return this._ids++; // Integer
        },
        /* Folder actions */
        _getAncestors: function(folderId){
            // summary:
            //      a utility function that gets ancestor items for a given folder
            // folderId: Number
            //      the id of the folder to get ancestors for
            // returns:
            //      an array of ancestor items
            var ancestors = [];
            var children = this.items.query({ parent: folderId });
            array.forEach(children, function (child) {
                if (child.type === "folder") {
                    ancestors = ancestors.concat(this._getAncestors(child.id));
                }
                ancestors.push(child);
            }, this);
            return ancestors;
        },
        addFolder: function (folderName, parentFolderId) {
            // summary:
            //      adds a folder to the markup layer with an optional folder id (default is root)
            // folderName: String
            //      the name of the folder to add
            // parentFolderId: Number?
            //      the id of the parent folder; root if unspecified
            // returns:
            //      the folder item that was created
            var folderName = folderName || "Unnamed folder",
                parentFolderId = typeof parentFolderId === "number" ? parentFolderId : "root",
                id = this._getId();
            var folder = {
                parent: parentFolderId,
                id: id,
                name: folderName,
                type: "folder",
                show: lang.hitch(this, this.showFolder, id),
                hide: lang.hitch(this, this.hideFolder, id),
                rename: lang.hitch(this, this.renameFolder, id),
                remove: lang.hitch(this, this.removeFolder, id)
            };
            this.items.put(folder);
            // Emit event/topics
            connect.publish("markup/item/add", { item: folder });
            this.emit("folder-add", { folder: folder });
            return folder; // Object
        },
        moveFolder: function (folderId, parentFolderId) {
            // summary:
            //      moeves a folder and its contents to another folder (root if unspecified)
            // folderId: Number
            //      the id of the folder to move
            // parentFolderId: Number?
            //      the id of the parent folder to move to; root if unspecified
            var parentFolderId = typeof parentFolderId === "number" ? parentFolderId : "root";

            // same folder, nothing to move
            if (folderId === parentFolderId) {
                Common.errorDialog("Cannot move a folder to itself");
                return false;
            }

            // are we trying to move a folder into its child?
            var isAncestor = false;
            var ancestors = this._getAncestors(folderId);
            array.forEach(ancestors, function (ancestor) {
                if (ancestor.id === parentFolderId) {
                    isAncestor = true;
                }
            });

            if (isAncestor) {
                Common.errorDialog("Cannot move a folder to an ancestor folder");
                return false;
            }



            var srcFolder = this.items.query({ id: folderId })[0];
            srcFolder.parent = parentFolderId;
            // Emit event/topics
            connect.publish("markup/item/move", { item: srcFolder });
            this.emit("folder-move", { folder: srcFolder });
            return srcFolder;
            
        },
        copyFolder: function (folderId, parentFolderId) {
            // summary:
            //      copies a folder and its contents to another folder (root if unspecified)
            // folderId: Number
            //      the id of the folder to copy
            // parentFolderId: Number?
            //      the id of the parent folder to copy to; root if unspecified
            // returns:
            //      the new copied folder
            var parentFolderId = typeof parentFolderId === "number" ? parentFolderId : "root";

            // same folder, nothing to copy
            if (folderId === parentFolderId) {
                Common.errorDialog("Cannot copy a folder to itself");
                return false;
            }

            // are we trying to copy a folder into its child?
            var isAncestor = false;
            var ancestors = this._getAncestors(folderId);
            array.forEach(ancestors, function (ancestor) {
                if (ancestor.id === parentFolderId) {
                    isAncestor = true;
                }
            });

            if (isAncestor) {
                Common.errorDialog("Cannot copy a folder to an ancestor folder");
                return false;
            }

            var srcFolderItem = this.items.query({ id: folderId })[0];
            
            // copy folder to new location
            var id = this._getId();
            var newFolderItem = {
                parent: parentFolderId,
                id: id,
                name: srcFolderItem.name,
                type: "folder",
                show: lang.hitch(this, this.showFolder, id),
                hide: lang.hitch(this, this.hideFolder, id),
                rename: lang.hitch(this, this.renameFolder, id),
                remove: lang.hitch(this, this.removeFolder, id)
            }

            // copy folder items
            var folderItems = this.items.query({ parent: folderId });
            array.forEach(folderItems, function (item) {
                if (item.type === "folder") {
                    this.copyFolder(item.id, parentFolderId);
                }
                else if (item.type === "graphic") {
                    this.copyGraphic(item.id, parentFolderId);
                }
            }, this);

            this.items.put(newFolderItem);
            // Emit event/topics
            connect.publish("markup/item/copy", { item: newFolderItem });
            this.emit("folder-copy", { folder: newFolderItem });
            return newFolderItem; // Object
        },
        removeFolder: function (folderId) {
            // summary:
            //      removes a folder and its content by  folder id
            // folderId: Number
            //      the id of the folder to remove
            var folder = this.items.query({ id: folderId })[0];
            var children = this.items.query({ parent: folderId });
            array.forEach(children, function (child) {
                if (child.type === "folder")
                    this.removeFolder(child.id);
                else
                    this.removeGraphic(child.id);
            }, this);
            this.items.remove(folderId);
            // Emit event/topics
            connect.publish("markup/item/remove", { item: newFolderItem });
            this.emit("folder-remove", { folder: folder });
        },
        renameFolder: function (folderId, name) {
            // summary:
            //      renames a folder based on id
            // folderId: Number
            //      the id of the folder to rename
            var folder = this.items.query({ id: folderId })[0];
            folder.name = name;
            if (folder.id === "root") {
                this.title = name;
            }
            // Emit event/topics
            connect.publish("markup/item/modify", { item: folder });
            this.emit("folder-rename", { folder: folder });
        },
        showFolder: function (folderId) {
            // summary:
            //      shows a folder and its content by  folder id
            // folderId: Number
            //      the id of the folder to show
            var folder = this.items.query({ id: folderId })[0];
            var ancestors = this._getAncestors(folderId);
            array.forEach(ancestors, function (ancestor) {
                if (ancestor.type === "folder")
                    this.showFolder(ancestor.id);
                else
                    ancestor.graphic.show();
            }, this);
            this.emit("folder-show", { folder: folder });
        },
        hideFolder: function (folderId) {
            // summary:
            //      hides a folder and its content by  folder id
            // folderId: Number
            //      the id of the folder to hide
            var folder = this.items.query({ id: folderId })[0];
            var ancestors = this._getAncestors(folderId);
            array.forEach(ancestors, function (ancestor) {
                if (ancestor.type === "folder")
                    this.hideFolder(ancestor.id);
                else
                    ancestor.graphic.hide();
            }, this);
            this.emit("folder-hide", { folder: folder });
        },
        /* Graphic actions */
        addGraphic: function (graphic, parentFolderId) {
            // summary:
            //      adds a graphic to the markup layer with an optional folder id (default is root)
            // graphic: Graphic
            //      adds a graphic to the markup layer
            // parentFolderId: Number?
            //      the id of the parent folder to copy to; root if unspecified
            var parentFolderId = typeof parentFolderId === "number" ? parentFolderId : "root",
                id = this._getId(),
                graphicItem = {
                    id: id,
                    parent: parentFolderId,
                    name: graphic.getTitle(),
                    graphic: graphic,
                    type: "graphic",
                    show: function () { graphic.show(); },
                    hide: function () { graphic.hide(); },
                    remove: lang.hitch(this, this.removeGraphic, id),
                    rename: lang.hitch(this, this.renameGraphic, id)
                };
            this.items.put(graphicItem);
            this._gc.add(graphic);
            graphic._markupLayer = this;
            // Emit event/topics
            connect.publish("markup/item/add", { item: graphic.graphicItem });
            this.emit("graphic-add", { graphic: graphicItem });
        },
        moveGraphic: function (graphicId, parentFolderId) {
            // summary:
            //      moves a graphic to another folder (root if unspecified)
            // graphicId: Number
            //      the id of the graphic to move
            // parentFolderId: Number?
            //      the id of the parent folder to move to; root if unspecified
            var parentFolderId = typeof parentFolderId === "number" ? parentFolderId : "root";
            
            var graphicItem = this.items.query({ id: graphicId })[0];
            graphicItem.parent = parentFolderId;
            // Emit event/topics
            connect.publish("markup/item/move", { item: graphicItem });
            this.emit("graphic-move", { graphic: graphicItem });
        },
        copyGraphic: function (graphicId, parentFolderId) {
            // summary:
            //      copies a graphic to another folder (root if unspecified)
            // folderId: Number
            //      the id of the graphic to copy
            // parentFolderId: Number?
            //      the id of the parent folder to copy to; root if unspecified
            var parentFolderId = typeof parentFolderId === "number" ? parentFolderId : "root";

            var srcGraphicItem = this.items.query({ id: graphicId })[0];
            var newGraphic = new Graphic(srcGraphicItem.graphic.toJson());
            newGraphic.setEditing(true);
            newGraphic.save();
            var id = this._getId();
            newGraphic.setInfoTemplate(InfoTemplateManager.getTabularAttributeTemplate({ title: srcGraphicItem.name, createWidgetsFromGeometry: true }));
            var targetGraphicItem = {
                id: id,
                parent: parentFolderId,
                name: newGraphic.getTitle(),
                graphic: newGraphic,
                type: "graphic",
                show: function () { newGraphic.show(); },
                hide: function () { newGraphic.hide(); },
                remove: lang.hitch(this, this.removeGraphic, id),
                rename: lang.hitch(this, this.renameGraphic, id)
            };

            this.items.put(targetGraphicItem);
            this._gc.add(newGraphic);
            return targetGraphicItem;
            // Emit event/topics
            connect.publish("markup/item/copy", { item: targetGraphicItem });
            this.emit("graphic-copy", { graphic: targetGraphicItem });
        },
        renameGraphic: function(graphicId, name){
            // summary:
            //      renames a graphic based on id
            // graphicId: Number
            //      the id of the graphic to rename
            var graphicItem = this.items.query({ id: graphicId })[0];
            graphicItem.name = name;
            if(graphicItem.graphic.infoTemplate)
                graphicItem.graphic.infoTemplate.setTitle(name);

            // Emit event/topics
            connect.publish("markup/item/modify", { item: graphicItem });
            this.emit("graphic-rename", { item: graphicItem });
        },
        removeGraphic: function (id) {
            // summary:
            //      removes a graphic from the markup layer
            // item: Object
            //      the graphic item to remove from the markup layer
            var item = this.items.query({ id: id })[0];
            this.items.remove(item.id);
            this._gc.remove(item.graphic);
            // Emit event/topics
            connect.publish("markup/item/remove", { item: item });
            this.emit("graphic-remove", { graphic: item });
        },
        // The following two functions imitate a graphics layer (the old style of markup). They are just shortcuts to add/remove[Graphic] functions but keeping this interface enables backward compatibility
        add: function (graphic) {
            // summary:
            //      adds the graphic to the root
            // graphic: Graphic
            //      the graphic to add
            this.addGraphic(graphic, "root");
        },
        remove: function (graphic) {
            // summary:
            //      removes the graphic
            // graphic: Graphic
            //      the graphic to remove
            var gId = -1,
                graphics = this.items.query({ type: "graphic" });
            array.forEach(graphics, function (g) {
                if (g.graphic === graphic) {
                    gId = g.id;
                }
            });
            if (gId != -1)
                this.removeGraphic(gId);
        },
        /* Start Overriden Layer functions */
        _setMap: function (map, container) {
            this._map = map;
            var style = {
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '0px',
                height: '0px'
            };
            var element = domConstruct.create('div', {}, container);
            if (this.id) {
                element.id = this.id;
            }
            domStyle.set(element, style);
            this._element = element;
            map.addLayer(this._gc);

            return element;
        },
        _unsetMap: function (map, layersDiv) {
            map.removeLayer(this._gc);
            this._map = null;
        },
        setVisibility: function(isVisible){
            domStyle.set(this._element, { display: isVisible ? "block" : "none" });
            this._gc.setVisibility(isVisible);
            this.emit("visiblity-change", { visible: isVisible });
        },
        setOpacity: function (opacity) {
            this._gc.setOpacity(opacity);
            this.opacity = opacity;
            this.emit("opacity-change", { opacity: opacity});
        },
        show: function(){
            this._gc.show();
        },
        hide: function(){
            this._gc.hide();
        },
        /* End Overriden Layer functions */
        /* End Overriden functions */
        /* Start Serialize functions */
        fromJson: function (storeItems) {
            // summary:
            //      sets up a serialized json array to initialize the markup layer

            // we need to ensure our ids stay unique so we'll get the max id and increment it by 1
            var maxId = -1;
            array.forEach(storeItems, function (item) {
                maxId = typeof item.id === "number" && item.id > maxId ? item.id : maxId;
                if (item.type === "folder") {
                    lang.mixin(item, { show: lang.hitch(this, this.showFolder, item.id), hide: lang.hitch(this, this.hideFolder, item.id), rename: lang.hitch(this, this.renameFolder, item.id), remove: lang.hitch(this, this.removeFolder, item.id) });
                }
                else if (item.type === "graphic") {
                    var newGraphic = new Graphic(item.graphic);
                    newGraphic.setEditing(true);
                    newGraphic.save();
                    newGraphic.setInfoTemplate(InfoTemplateManager.getTabularAttributeTemplate({ title: item.name, createWidgetsFromGeometry: true }));
                    newGraphic._markupLayer = this;
                    item.graphic = newGraphic;
                    lang.mixin(item, {
                        show: function () { newGraphic.show(); },
                        hide: function () { newGraphic.hide(); },
                        rename: lang.hitch(this, this.renameGraphic, item.id),
                        remove: lang.hitch(this, this.removeGraphic, item.id)
                    });
                }
                else if (item.type === "root") {
                    item.show = lang.hitch(this, this.show);
                    item.hide = lang.hitch(this, this.hide);
                    item.rename = lang.hitch(this, this.renameFolder, "root")
                }
            }, this);

            this._ids = maxId + 1;

            return storeItems;
        },
        toJson: function () {
            // summary:
            //      serializes the markup layer to json. this really is nothing more than serializes the memory store with a little massaging.
            var exportLayer = {
                type: "MarkupLayer",
                _id: this._id ? this._id : null,
                options: {
                    id: this.id,
                    visible: this.visible,
                    opacity: this.opacity
                }
            };
            var storeItems = [];
            array.forEach(this.items.data, function (item) {
                if (item.type === "folder") {
                    //if (item.id === "root")
                    //    exportLayer.title = item.name;
                    // include everything but not show/hide functions
                    storeItems.push(esriLang.filter(item, function (value) { return typeof value !== "function";}));
                }
                else if (item.type === "graphic") {
                    // include everything but serialize the graphic
                    storeItems.push(lang.mixin(esriLang.filter(item, function (value) { return !value.declaredClass }), { graphic: item.graphic.toJson() }));
                }
                else {
                    storeItems.push(item); // this should be the root
                }
            });

            exportLayer.options.json = storeItems;
            return exportLayer;
        }
        /* End Serialize functions */
    });

    return MarkupLayer;
});