(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e2e8dcac"],{5273:function(t,e,n){},"8e85":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"animate-page-container"},[n("div",{staticClass:"animate-content"},[n("div",{staticClass:"pre-page"},[n("render-custom-component",{attrs:{"component-name":t.prePageComponent}})],1),n("div",{staticClass:"real-content"},[t._t("default"),n("slide-button",{ref:"child"})],2),n("div",{staticClass:"next-page"},[n("render-custom-component",{attrs:{"component-name":t.nextPageComponent}})],1),n("div",{staticClass:"modal",class:{hidden:!t.modalVisible}})])])},i=[],o={data:function(){return{prePageComponent:null,nextPageComponent:null,modalVisible:!1}},created:function(){var t=this.$animationCtr,e=t.activeRouteIdx,n=t.bgComponents;t.routePathList;this.prePageComponent=n[e-1],this.nextPageComponent=n[e+1],this.modalVisible=!1},mounted:function(){var t=this,e=this.$animationCtr,n=e.activeRouteIdx,a=e.routePathList;n<a.length-1&&setTimeout((function(){t.$refs.child.$emit("in"),t.$nextTick((function(){e.locked=!1}))}),1200)}},s=o,c=(n("bac2"),n("2877")),l=Object(c["a"])(s,a,i,!1,null,"29e5b33b",null);e["default"]=l.exports},bac2:function(t,e,n){"use strict";n("5273")}}]);