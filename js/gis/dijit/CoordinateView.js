define([
   'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/lang',
    'dijit/DropDownMenu',
    'dijit/MenuItem',
    'dijit/form/DropDownButton',
    'dojo/_base/array',
    'dojox/lang/functional',
    'dojo/text!./CoordinateView/templates/CoordinateView.html',   
    'dijit/layout/ContentPane',
    'require',
    'dojo/i18n!./CoordinateView/nls/resource',
    
    'xstyle/css!./CoordinateView/css/CoordinateView.css'

   // '//ajax.googleapis.com/ajax/libs/dojo/1.10.4/dojo/dojo.js'
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, lang, DropDownMenu, MenuItem, DropDownButton, array, functional, template, ContentPane, require,  i18n) {

    // main basemap widget
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        widgetsInTemplate: true,
        i18n: i18n,
        mode: 'custom',
        title: i18n.title,
        CoordInfoId: null,
        strSelectedCoord:'',
        coordItems: null,
        strURLtoMGRSCode: '',

        updateCoords: function (evt) {

            this.inherited(arguments);

            var beforex = '';
            var beforey = '';
            var afterx = '';
            var aftery = '';
            var mp = null;
            var x = '';
            var y = '';
            var strxDir = '';
            var stryDir = '';
         

            function degtodms (dd) {
                var deg = dd | 0; // truncate dd to get degrees
                var frac = Math.abs(dd - deg); // get fractional part
                var min = (frac * 60) | 0; // multiply fraction by 60 and truncate
                var sec = frac * 3600 - min * 60;
                sec = Math.round(sec, 2);
                return deg + "d " + min + "' " + sec + "\"";
            };

            function convertDDM(dd) {

                var deg = dd | 0; // truncate dd to get degrees
                var frac = Math.abs(dd - deg); // get fractional part
                var min = (frac * 60) | 0; // multiply fraction by 60 and truncate
                var sec = frac * 3600 - min * 60;
                sec = Math.round(sec, 4);
                min = min + (sec / 60);
               // min = Math.round(min, 5);

                return deg.toString() + "d " + min.toString();
            }

            if (coordItems[strSelectedCoord].beforex != undefined) {
                beforex = coordItems[strSelectedCoord].beforex;
            }
            if (coordItems[strSelectedCoord].beforey != undefined) {
                beforey = coordItems[strSelectedCoord].beforey;
            }

            if (coordItems[strSelectedCoord].afterx != undefined) {
                afterx = coordItems[strSelectedCoord].afterx;
            }
            if (coordItems[strSelectedCoord].aftery != undefined) {
                aftery = coordItems[strSelectedCoord].aftery;
            }
           
            switch(strSelectedCoord) {
                case 'coordMC':
                    x = evt.mapPoint.x.toString();
                    y = evt.mapPoint.y.toString();
                    CoordInfoId.innerText = beforex + x.toString() + afterx + ", " + beforey + y.toString() + aftery;
                    break;
                case 'coordDMS':
                    mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);
                    stryDir = evt.mapPoint.y < 0 ? 'S' : 'N';
                    strxDir = evt.mapPoint.x < 0 ? 'W' : 'E';

                    x = degtodms(mp.x) + strxDir;
                    y = degtodms(mp.y) + stryDir;
                    CoordInfoId.innerText = beforex + x.toString() + afterx + ", " + beforey + y.toString() + aftery;
                    break;
                case 'coordDD':
                    mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);
                    x = mp.x.toString();
                    y = mp.y.toString();
                    CoordInfoId.innerText = beforex + x.toString() + afterx + ", " + beforey + y.toString() + aftery;
                    break;
                case 'coordDM':
                    mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);

                    stryDir = evt.mapPoint.y < 0 ? 'S' : 'N';
                    strxDir = evt.mapPoint.x < 0 ? 'W' : 'E';

                    x = convertDDM(mp.x) + strxDir;
                    y = convertDDM(mp.y) + stryDir;
                    CoordInfoId.innerText = beforex + x.toString() + afterx + ", " + beforey + y.toString() + aftery;
                    break;
                case 'coordMGRS':

                    mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);


                    require([strURLtoMGRSCode], function () {

                       
                        var strMGRS = LLtoMGRS(mp.y, mp.x, 5);

                        CoordInfoId.innerText = strMGRS;



                    });

                    break;

                case 'coordUSNG':

                    mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);


                    require([strURLtoMGRSCode], function () {


                        var strUSNG = LLtoUSNG(mp.y, mp.x, 5);

                        CoordInfoId.innerText = strUSNG;



                    });

                    break;
                
                case 'coordUTM':

                    mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);


                    require([strURLtoMGRSCode], function () {

                        var utmcoords = [];
                        var utmzone = '';

                        var strUTM = LLtoUTM(mp.y, mp.x, utmcoords, utmzone);
                        CoordInfoId.innerText = "Zone " + utmcoords[2] + ' ' + beforex + utmcoords[0].toString() + afterx + ", " + beforey + utmcoords[1].toString() + aftery;
                       



                    });

                    break;

                default:
                    mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);
                    x = mp.x.toString();
                    y = mp.y.toString();
                    CoordInfoId.innerText = beforex + x.toString() + afterx + ", " + beforey + y.toString() + aftery;
                
            }          
          

                    
                        
           
        },


        postCreate: function () {

            this.inherited(arguments);
            var selectedCoord = '';      
            this.menu = new DropDownMenu({
                style: 'display: none;' //,
                //baseClass: this.menuClass
            });
            strURLtoMGRSCode = require.toUrl(this.urltoCode).toString();        
        
            var handle = require.on('error', function (error) {
              
                alert('Unable to load MGRS code')
            });               
          

            array.forEach(this.optionsToShow, function (coordItem) {
                if (this.coordinate.hasOwnProperty(coordItem)) {
                    if (coordItem == this.defaultCoord) {
                        strSelectedCoord = coordItem;
                        coordItems = this.coordinate;
                        this.selectedCoord = this.coordinate[coordItem].title;
                    };
                    var menuItem = new MenuItem({
                        id: coordItem,
                        label: this.coordinate[coordItem].title,
                        iconClass: (coordItem == this.defaultCoord) ? 'selectedIcon'   : 'emptyIcon',
                        onClick: lang.hitch(this, function () {
                           // this.strSelectedBasemap = basemap;
                            //  this.getBaseLayer();
                            this.selectedCoord = this.coordinate[coordItem].title;
                            strSelectedCoord = coordItem;
                            coordItems = this.coordinate;
                            this.dropDownButton.containerNode.innerHTML = this.selectedCoord;
                            
                            var ch = this.menu.getChildren();
                            array.forEach(ch, function (c) {
                                if (c.id == coordItem) {
                                    c.set('iconClass', 'selectedIcon');
                                } else {
                                    c.set('iconClass', 'emptyIcon');
                                }
                            });

                        })
                    });
                    this.menu.addChild(menuItem);
                }
            }, this);
            

          //  var dasdad = this.lblCoordInfo;
            CoordInfoId = this.lblCoordInfo;
           // var lblElement = this.lblCoordInfo;
            var mapExtentChange = this.map.on("mouse-move", this.updateCoords);

            function changeHandler(evt) {
                var asddasdas = this;
                

                // alert("TEST");
            }

            this.dropDownButton.set('dropDown', this.menu);

            this.dropDownButton.containerNode.innerHTML = this.selectedCoord
           // this.dropDownButton.titleNode.innerHTML = '<span class="dijitReset dijitInline dijitIcon dijitNoIcon" unselectable="on" data-dojo-attach-point="iconNode"></span><span class="dijitReset dijitInline dijitButtonText" id="dijit_form_DropDownButton_4_label" unselectable="on" data-dojo-attach-point="containerNode">' + this.selectedCoord + '</span><span class="dijitReset dijitInline dijitArrowButtonInner" unselectable="on"></span><span class="dijitReset dijitInline dijitArrowButtonChar" unselectable="on">▼</span>';

           // CoordInfoId.innerText = this.dropDownButton.titleNode.innerHTML;
          //  alert(this.dropDownButton.titleNode.innerHTML);
        }

     
    });
});