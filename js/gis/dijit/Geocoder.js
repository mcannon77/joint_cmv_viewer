/*  ConfigurableMapViewerCMV
 *  version 1.3.4
 *  Project: http://cmv.io/
 */

define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/a11yclick","dojo/_base/lang","dojo/on","dojo/dom-class","dojo/dom-style","esri/dijit/Geocoder","dijit/MenuItem","esri/symbols/SimpleMarkerSymbol","esri/graphic","esri/InfoTemplate","esri/layers/GraphicsLayer","dojo/text!./Geocoder/templates/Geocoder.html","dojo/i18n!./Geocoder/nls/resource","xstyle/css!./Geocoder/css/Geocoder.css"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){return a([b,c],{templateString:o,i18n:p,baseClass:"gis_GeocoderDijit",expanded:!0,collapsible:!1,geocoderOptions:{autoComplete:!0},reverseGeocodeTemplate:['<table class="attrTable">','<tr valign="top">','<td class="attrName">${i18n.labels.address}</td>','<td class="attrValue">${Address}</td>',"</tr>",'<tr valign="top">','<td class="attrName">${i18n.labels.neighborhood}</td>','<td class="attrValue">${Neighborhood}</td>',"</tr>",'<tr valign="top">','<td class="attrName">${i18n.labels.city}</td>','<td class="attrValue">${City}</td>',"</tr>",'<tr valign="top">','<td class="attrName">${i18n.labels.subregion}</td>','<td class="attrValue">${SubRegion}</td>',"</tr>",'<tr valign="top">','<td class="attrName">${i18n.labels.region}</td>','<td class="attrValue">${Region}</td>',"</tr>",'<tr valign="top">','<td class="attrName">${i18n.labels.postalCode}</td>','<td class="attrValue">${Postal}&nbsp;${PostalExt}</td>',"</tr>",'<tr valign="top">','<td class="attrName">${i18n.labels.countryCode}</td>','<td class="attrValue">${CountryCode}</td>',"</tr>",'<tr valign="top">','<td class="attrName">${i18n.labels.locatorName}</td>','<td class="attrValue">${Loc_name}</td>',"</tr>","</table>"].join(""),postCreate:function(){this.inherited(arguments);var a=e.mixin({},this.geocoderOptions,{map:this.map});this.geocoder=new i(a,this.geocoderNode),f(this.geocoder,"select",e.hitch(this,function(a){a.result&&this.show()})),this.collapsible?(f(this.map,"pan-start",e.hitch(this,function(){this.hide()})),this.own(f(this.searchNode,d,e.hitch(this,this.toggle)))):this.expanded=!0,this.geocoder.startup(),this.expanded===!0?this.show():this.hide(),this.mapRightClickMenu&&this.addRightClickMenu(),this.mapExtentSearch&&(this.geocoder.arcgisGeocoder.searchExtent=this.map.extent.getExtent(),this.map.on("extent-change",e.hitch(this,function(a){this.geocoder.arcgisGeocoder.searchExtent=a.extent})))},addRightClickMenu:function(){this.map.on("MouseDown",e.hitch(this,function(a){this.mapRightClickPoint=a.mapPoint})),this.mapRightClickMenu.addChild(new j({label:this.i18n.labels.getAddressHere,onClick:e.hitch(this,"reverseGeocode")})),this.symbol=new k,this.infoTemplate=new m("Location",this.reverseGeocodeTemplate),this.graphics=new n({id:"reverseGeocode"}),this.map.addLayer(this.graphics)},toggle:function(){var a=h.get(this.searchContainerNode,"display");"block"===a?this.hide():this.show()},hide:function(){h.set(this.searchContainerNode,"display","none"),g.remove(this.containerNode,"open"),this.geocoder&&this.geocoder.blur()},show:function(){h.set(this.searchContainerNode,"display","block"),g.add(this.containerNode,"open"),this.geocoder&&!this.expanded&&this.geocoder.focus()},reverseGeocode:function(){this.geocoder._task.locationToAddress(this.mapRightClickPoint,1e3,e.hitch(this,"reverseGeocodeComplete"))},reverseGeocodeComplete:function(a){var b=new l(a.location,this.symbol,a.address,this.infoTemplate);this.graphics.add(b),this.map.infoWindow.clearFeatures(),this.map.infoWindow.setTitle(b.getTitle()),this.map.infoWindow.setContent(b.getContent());var c=this.map.toScreen(a.location);this.map.infoWindow.show(c,this.map.getInfoWindowAnchor(c)),f.once(this.map.infoWindow,"hide",e.hitch(this,function(){this.graphics.clear()}))}})});
