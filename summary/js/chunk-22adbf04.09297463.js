(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-22adbf04"],{"8c7a":function(t,n,e){"use strict";e("ff2f")},"8e85":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"animate-page-container"},[e("div",{staticClass:"animate-content"},[e("div",{staticClass:"pre-page"},[e("render-custom-component",{attrs:{"component-name":t.prePageComponent}})],1),e("div",{staticClass:"real-content"},[t._t("default"),e("slide-button",{ref:"child"})],2),e("div",{staticClass:"next-page"},[e("render-custom-component",{attrs:{"component-name":t.nextPageComponent}})],1)])])},o=[],i={data:function(){return{prePageComponent:null,nextPageComponent:null}},created:function(){var t=this.$animationCtr,n=t.activeRouteIdx,e=t.bgComponents;this.prePageComponent=e[n-1],this.nextPageComponent=e[n+1]},mounted:function(){var t=this,n=this.$animationCtr,e=n.activeRouteIdx,a=n.routePathList;e<a.length-1&&setTimeout((function(){t.$refs.child.$emit("in"),t.$nextTick((function(){n.locked=!1}))}),1200)}},c=i,s=(e("8c7a"),e("2877")),r=Object(s["a"])(c,a,o,!1,null,"1193ef5d",null);n["default"]=r.exports},ff2f:function(t,n,e){}}]);