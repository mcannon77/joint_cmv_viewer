define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/topic',
    'dojo/dom-style'
], function (
    declare,
    lang,
    topic,
    domStyle
) {

    return declare(null, {

        exportWidgetID: 'export',

        toolbarOptions: {},

        defaultToolbarOptions: {
            show: true,

            zoom: {
                show: true,
                features: true,
                selected: true,
                source: true,
                buffer: true

            },

            clear: {
                show: true,
                grid: true,
                features: true,
                selected: true,
                buffer: true
            },

            'export': {
                show: true
            }
        },

        getToolbarConfiguration: function (options) {
            this.toolbarOptions = this.mixinDeep(lang.clone(this.defaultToolbarOptions), options);
        },

        setToolbarButtons: function () {
            this.showMainMenuItems();
            this.enableMenuItems();
        },

        // show/hide items on the main menu
        showMainMenuItems: function () {
            var featOptions = this.featureOptions || {};

            var options = this.toolbarOptions.zoom || {};
            if (!featOptions.features && !featOptions.buffer) {
                options.show = false;
            }

            var display = (options.show) ? 'inline-block' : 'none';
            domStyle.set(this.ImageryTableZoomDropDownButton.domNode, 'display', display);
            if (options.show !== false) {
                this.showZoomMenuItems();
            }

            options = this.toolbarOptions.clear || {};
            display = (options.show) ? 'inline-block' : 'none';
            domStyle.set(this.ImageryTableClearDropDownButton.domNode, 'display', display);
            if (options.show !== false) {
                this.showClearMenuItems();
            }

            options = this.toolbarOptions['export'] || {};
            display = (options.show) ? 'inline-block' : 'none';
            domStyle.set(this.ImageryTableExportButton.domNode, 'display', display);

        },

        // show/hide items on 'Zoom' drop-down menu
        showZoomMenuItems: function () {
            var options = this.toolbarOptions.zoom || {};
            var featOptions = this.featureOptions || {};
            var display = (options.features && featOptions.features) ? 'block' : 'none';
            domStyle.set(this.ImageryTableZoomToFeatures.domNode, 'display', display);

            display = (options.selected && featOptions.selected) ? 'block' : 'none';
            domStyle.set(this.ImageryTableZoomToSelected.domNode, 'display', display);

            display = (options.buffer && featOptions.buffer) ? 'block' : 'none';
            domStyle.set(this.ImageryTableZoomToBuffer.domNode, 'display', display);
        },

        // show/hide items on 'Clear' drop-down menu
        showClearMenuItems: function () {
            var options = this.toolbarOptions.clear || {};
            var featOptions = this.featureOptions || {};
            var itemCount = 0;

            var display = (options.grid) ? 'block' : 'none';
            itemCount += (display === 'none') ? 0 : 1;
            domStyle.set(this.ImageryTableClearGrid.domNode, 'display', display);

            display = (options.features && featOptions.features) ? 'block' : 'none';
            itemCount += (display === 'none') ? 0 : 1;
            domStyle.set(this.ImageryTableClearFeatures.domNode, 'display', display);

            display = (options.selected && featOptions.selected) ? 'block' : 'none';
            itemCount += (display === 'none') ? 0 : 1;
            domStyle.set(this.ImageryTableClearSelected.domNode, 'display', display);

            display = (options.buffer && featOptions.buffer) ? 'block' : 'none';
            itemCount += (display === 'none') ? 0 : 1;
            domStyle.set(this.ImageryTableClearBuffer.domNode, 'display', display);

            //display = (options.show) ? 'block' : 'none';
            display = (itemCount > 1) ? 'block' : 'none';
            domStyle.set(this.ImageryTableClearAll.domNode, 'display', display);
        },

        // enable/disable menu options based on the current result features available
        enableMenuItems: function () {
            var feat = this.features;
            var store = this.grid.get('store');

            disabled = ((feat && feat.length > 0) || (store.data && store.data.length > 0)) ? false : true;
            this.ImageryTableExportButton.set('disabled', disabled);
            this.ImageryTableZoomDropDownButton.set('disabled', disabled);
            this.ImageryTableClearDropDownButton.set('disabled', disabled);

            var disabled = (feat && feat.length > 0) ? false : true;
            this.ImageryTableClearFeatures.set('disabled', disabled);
            this.ImageryTableZoomToFeatures.set('disabled', disabled);

            disabled = (this.selectedGraphics && this.selectedGraphics.graphics && this.selectedGraphics.graphics.length > 0) ? false : true;
            this.ImageryTableClearSelected.set('disabled', disabled);
            this.ImageryTableZoomToSelected.set('disabled', disabled);

            disabled = (this.bufferGraphics && this.bufferGraphics.graphics.length > 0) ? false : true;
            this.ImageryTableClearBuffer.set('disabled', disabled);
            this.ImageryTableZoomToBuffer.set('disabled', disabled);
        },

        openExport: function () {
            topic.publish('exportWidget/openDialog', {
                results: this.results,
                grid: this.grid,
                show: true
            });
        }
    });
});
