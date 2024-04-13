/**
 * webappjs is a single-page application (SPA) framework that emphasizes the separation of template and interaction, based on the features of ECMAScript 5.
 * Copyright (c) 1992-2024, xinghanjiaozhu. (MIT Licensed)
 * email <a@astarhan.net> 
 * qq <1102119280>
 * https://github.com/webappjs
 */
"use strict";webapp.createModule({$construct:function $construct(){this.loading=webapp.createSignal(!0),this.data=webapp.createSignal(null),this.error=null}});