/**
 * webappjs is a single-page application (SPA) framework that emphasizes the separation of template and interaction, based on the features of ECMAScript 5.
 * Copyright (c) 1992-2024, xinghanjiaozhu. (MIT Licensed)
 * email <a@astarhan.net> 
 * qq <1102119280>
 * https://github.com/webappjs
 */
"use strict";webapp.createModule({$include:"@library/marked/marked.min.js",$construct:function $construct(){this.loading=webapp.createSignal(!0),this.data=webapp.createSignal(null),this.error=null},load:function load(){var t=this,e=(this.loading.set(!0),this.data.set(null),this.error=null,webapp.createURL("README.md",window.location.href));webapp.builder&&webapp.builder.version&&(e.query.v=webapp.builder.version),fetch(e.stringify()).then(function(e){if(e.ok)return e.text();throw new Error("Request failed with status ".concat(e.status))}).then(function(e){t.data.set(marked(e)),t.loading.set(!1)})["catch"](function(e){t.loading.set(!1),t.error=e,console.error(e)})}});