/**
 * webappjs is a single-page application (SPA) framework that emphasizes the separation of template and interaction, based on the features of ECMAScript 5.
 * Copyright (c) 1992-2024, xinghanjiaozhu. (MIT Licensed)
 * email <a@astarhan.net> 
 * qq <1102119280>
 * https://github.com/webappjs
 */
webapp.setPrototype("builder", {version:"202441405927472"});"use strict";webapp.setPrototype("mainSrc",webapp.currentSrc()),webapp.configureInclude({filter:function filter(e){/^\@/i.test(e.src)?e.src=e.src.replace(/^\@/i,""):e.src=webapp.createURL(e.src,webapp.currentSrc()).stringify()},ready:function ready(t){var e=t.target.src.stringify();if(0<=["template","text","json"].indexOf(t.target.type))fetch(webapp.createURL(e,window.location.href).stringify()).then(function(e){if(e.ok)return e.text();throw new Error("Request failed with status ".concat(e.status))}).then(function(e){t.resolve(e)})["catch"](function(e){t.reject(e.message),console.error(e,t.target)});else{var r=null;if("js"===t.target.type)(r=document.createElement("script")).type="text/javascript",r.src=e;else{if("css"===t.target.type)(r=document.createElement("link")).rel="stylesheet";else{if("less"===t.target.type)(r=document.createElement("link")).rel="stylesheet/less";else if("scss"===t.target.type)(r=document.createElement("link")).rel="stylesheet/scss";else{if("sass"!==t.target.type)throw new Error("configureInclude ready 异常，未知类型"+JSON.stringify(t.target));(r=document.createElement("link")).rel="stylesheet/sass"}r.type="text/css"}r.href=e}r.onerror=t.reject,r.onload=t.resolve,document.querySelector("head").appendChild(r)}}}),webapp.createModule({onready:function onready(e){webapp.useModule(this,{global:!0}),webapp.createPage({router:"hash",historyLogMaximum:10,historyStepMaximum:10}),setTimeout(function(){webapp.createModule({$nonblock:!0,$shadow:!0,$include:{src:webapp.createURL("component/progress.js",webapp.mainSrc).stringify(),type:"module"}})},0)},onpage:function onpage(e){e.module={src:"page/home.js"},e.load()},onpageerror:function onpageerror(e){console.log("onpageerror",e),alert("当前页面不存在")}});