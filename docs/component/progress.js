/**
 * webappjs is a single-page application (SPA) framework that emphasizes the separation of template and interaction, based on the features of ECMAScript 5.
 * Copyright (c) 1992-2024, xinghanjiaozhu. (MIT Licensed)
 * email <a@astarhan.net> 
 * qq <1102119280>
 * https://github.com/webappjs
 */
"use strict";webapp.createModule(function(){var e=this;return this.show=webapp.createSignal(!1),this.percent=webapp.createSignal(0),this.first=webapp.createSignal(!0),{$nonblock:!0,$include:{src:"progress.html",type:"template"},$selector:"body",$model:{show:{$fragment:!0,$if:function(){return e.show.get()}},circle:{style:function(){return{stroke:"#2d8cf0"}}},".header":{style:function(){return{transform:"translate3d(-".concat(100-e.percent.get(),"%, 0px, 0px)"),background:"#2d8cf0"}}},".body":{$is:function(){return e.first.get()},style:function(){return{top:"".concat(document.documentElement.clientHeight/3,"px"),color:"#2d8cf0"}}},"svg+div":{$innerText:function(){return"页面加载中......".concat(e.percent.get(),"%")}}},onready:function(e){webapp.useModule(this,{global:!0}).render()},onpageprogress:function(e){this.percent.set(e.percent),100==e.percent?(this.first.set(!1),this.show.set(!1)):this.show.set(!0)}}});