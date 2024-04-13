# webappjs

webappjs 是面向模板与交互分离, 基于 ECMAScript 5 特性的单页应用 (SPA) 框架。  
webappjs is a single-page application (SPA) framework that emphasizes the separation of template and interaction, based on the features of ECMAScript 5.


## 为什么创造 webappjs - Why was webappjs created?

本质上，webappjs 是一个用于现代 JavaScript 单页应用程序的非构建、不打包开发环境框架。  
In essence, webappjs is a non-build, un-bundled development environment framework designed for modern JavaScript single-page applications.

在浏览器支持 ES 模块之前，JavaScript 并没有提供原生机制让开发者以模块化的方式进行开发。随着前端技术发展与创新，在前端模块化呐喊声之中刮起了一阵风，于是有了 Webpack、Vite、Turbopack 及 Snowpack 等前端构建工具，改变了前端开发者的开发方式，让前端开发进入了模块化时代。  
Before browsers supported ES modules, JavaScript did not inherently provide a mechanism for developers to work in a modular fashion. Amidst the clamor for front-end modularity and innovation in the field, a wave of front-end build tools such as Webpack, Vite, Turbopack, and Snowpack emerged, transforming the way front-end developers work and ushering in the era of modular front-end development.

构建工具打包允许前端开发者使用模块化的方式组织和管理前端代码，将代码拆分成多个独立的模块，使得代码更加结构化、易于维护和扩展。然而，构建的应用越来越大，需要处理的 JavaScript 代码量让构建工具出现了性能瓶颈。如缓慢的服务器启动，以及就算有了模块热替换，照样代码修改迟钝更新等情况，严重影响前端开发者的开发效率和体验。  
These build tools enabled front-end developers to organize and manage their code in a modular manner, breaking it down into multiple independent modules for increased structural clarity, maintainability, and scalability. However, as applications grew larger and the amount of JavaScript code to process became substantial, performance bottlenecks emerged in these build tools. Issues like slow server startups and sluggish code updates—even with module hot-reloading—severely impacted developer efficiency and experience.

时过境迁，如今浏览器已经开始原生支持 ES 模块了，一些新的构建工具也利用了这种浏览器原生支持的生态来解决缓慢的服务器启动、迟钝更新等问题。也就是说，在开发环境下，前端技术又开始向非构建、不打包的原生方向发展了。  
Fast forward to today, browsers now natively support ES modules. Some newer build tools have capitalized on this native browser support to address the issues of slow server startups and sluggish updates. In essence, front-end technology is trending back towards a non-build, un-bundled, native approach in development environments.


## 开发环境无需打包构建 - The development environment does not require packaging or building.

> 现在的前端构建工具都在追求构建速度，实质上这是个歧途，构建始终会消耗时间，不构建才是大势所趋!   
> Current front-end build tools are all striving for faster build speeds, but in essence, this is a misguided pursuit. Building will inevitably consume time; it is the trend to forego building altogether!

为什么开发环境不要打包？比如在打包过程中，代码经过压缩，由于打包前后的代码之间差异性过大，造成无法debug的问题。为了方便调试，无奈使用 SourceMap 信息文件储存代码转换前后的对应位置信息……  
Why avoid bundling in development environments? During bundling, code undergoes compression, which, due to the significant differences between pre- and post-bundled code, can lead to issues that render debugging impossible. To facilitate debugging, one is reluctantly forced to rely on SourceMap files that store mapping information between the transformed and original code positions...


现代 JavaScript 在开发环境下增加一个构建场景，本身就是繁琐的。甚至有些构建工具开发环境是一套，生产环境是另一套，造成开发环境与生产环境的不一致，生产环境下出现莫名其妙的错误。  
Introducing a build scenario in modern JavaScript development environments is inherently cumbersome. In some cases, build tools employ entirely different setups for development and production environments, causing inconsistencies between the two and mysterious errors that manifest only in the production environment.

当然，webappjs 框架认为在生产环境下的 JavaScript 代码仍然需要打包，这样在生产环境中可以获得最佳的加载性能。但打包也仅仅是代码压缩、部分文件目录结构调整、ES6转换ES5等，100%保证不会造成开发环境与生产环境的不一致情况。  
However, the webappjs framework maintains that JavaScript code should still be bundled in production environments to achieve optimal loading performance. Such bundling is limited to code compression, minor adjustments to file directory structure, and ES6-to-ES5 conversion, ensuring that there is absolutely no chance of inconsistencies between the development and production environments.


## 不使用 proxy 和 Object.defineProperty 特性 - Does not utilize the proxy or Object.defineProperty features.

webappjs 不使用 proxy 和 Object.defineProperty 来处理响应式数据，也不使用 Function 或者 eval 来处理模板引擎。  
webappjs does not employ proxy or Object.defineProperty for handling reactive data, nor does it use Function or eval in the processing of template engines.


## 为什么选择 webappjs - Why choose webappjs?

想要理解为什么要使用 webappjs，我们先回顾下历史，我们为什么需要构建工具。  
To understand why webappjs is used, let us first review history and consider why we needed build tools in the first place.

在构建工具出现之前，在浏览器中运行JavaScript，是通过引用一些脚本来分别存放每个功能。某些构建工具说此方案很难扩展，因为加载太多脚本会导致网络瓶颈。这种说法已经过时了，在 HTTP/2 中有了多路复用，代替原来的序列和阻塞机制，所有请求的都是通过一个 TCP 连接并发完成。同个域名只需要占用一个 TCP 连接，消除了因多个 TCP 连接而带来的延时和内存消耗。  
Prior to the advent of build tools, running JavaScript in a browser involved referencing separate scripts for each functionality. Some build tools argued that this approach was difficult to scale because loading too many scripts would result in network bottlenecks. This argument is now outdated, as HTTP/2 introduced multiplexing, replacing the previous sequential and blocking mechanism, allowing all requests to be completed concurrently over a single TCP connection. With only one TCP connection required per domain, delays and memory consumption associated with multiple connections are eliminated.

某些构建工具还说了，原生的 .js 文件，还会导致作用域、文件大小、可读性和可维护性方面的问题。这种说法已经过时了，webappjs 让前端在开发环境中不构建、不打包、不编译，解决原生 JavaScript 模块化开发一切问题。  
Some build tools also claimed that using native .js files would lead to issues with scoping, file size, readability, and maintainability. This claim, too, is now outdated. Webappjs allows frontend developers to work without building, bundling, or compiling in a development environment, addressing all issues related to native JavaScript modular development.

webappjs 将改变前端开发者的开发方式，返璞归真，逃离繁琐的构建工具，让前端开发的重心回归到业务。  
Webappjs will revolutionize the way frontend developers work, returning to simplicity, liberating them from the complexities of build tools, and refocusing frontend development on core business logic.



# 起步 - Start



# API


## configureInclude

configureInclude 是设置包含功能的配置信息。  
configureInclude is the configuration information for setting up the inclusion feature.

```js
configureInclude({
    /**
     * 包含的过滤器 Inclusion Filters
     * 可以拦截并自定义资源路径信息 Can intercept and customize resource path information 
     */
    filter(e) {
        console.log('filter', e);
    },
    /**
     * 包含的准备处理 Preparation for Inclusion
     * 可以自定义资源的加载方式：除了模块框架已经封装好了，其他的资源包括模板加载，都需要开发者自行定义  Allows customization of resource loading methods: apart from module framework's pre-packaged handling, developers must define the loading approach for other resources, including template loading.
     */
    ready(e) {
        console.log('ready', e);
    },
});
```

**代码示例：**  
**example code：**  
```js
webapp.configureInclude({
    filter(e) {
        // console.log('filter', e);
        if (/^\@/i.test(e.src)) {
            e.src = e.src.replace(/^\@/i, '');
        } else {
            // 可以根据基础地址生成资源的绝对路径
            e.src = webapp.createURL(e.src, webapp.currentSrc()).stringify();
        }
    },
    ready(e) {
        // console.log('ready', e);
        var src = e.target.src.stringify();

        // 如果是模板或者text、json，则使用
        if (['template', 'text', 'json'].indexOf(e.target.type) >= 0) {

            fetch(webapp.createURL(src, window.location.href).stringify())
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Request failed with status ${response.status}`);
                    }
                    // return response.json(); // 如果响应内容是JSON，则解析为对象
                    return response.text();
                })
                .then(data => {
                    // 在这里处理接收到的数据
                    e.resolve(data);
                })
                .catch(error => {
                    e.reject(error.message);
                    console.error(error, e.target);
                });

        } else {
            var element = null;
            if ('js' === e.target.type) {
                element = document.createElement("script");
                element.type = "text/javascript";
                element.src = src;
            }
            else if ('css' === e.target.type) {
                element = document.createElement("link");
                element.rel = "stylesheet";
                element.href = src;
            }
            else if ('less' === e.target.type) {
                element = document.createElement("link");
                element.rel = "stylesheet/less";
                element.type = "text/css";
                element.href = src;
            }
            else if ('scss' === e.target.type) {
                element = document.createElement("link");
                element.rel = "stylesheet/scss";
                element.type = "text/css";
                element.href = src;
            }
            else if ('sass' === e.target.type) {
                element = document.createElement("link");
                element.rel = "stylesheet/sass";
                element.type = "text/css";
                element.href = src;
            }
            else {
                throw new Error('configureInclude ready 异常，未知类型' + JSON.stringify(e.target));
            }

            element.onerror = e.reject;
            element.onload = e.resolve;
            document.querySelector('head').appendChild(element);// 向后添加
        }

    }
});
```


## createModule

createModule 是创建模块。  
createModule is to create a module.

```js
webapp.createModule({

    /**
     * 是否为影子模块, 如果是影子模块，那么不会被记录到包含文件中
     * Whether it is a shadow module; if it is a shadow module, it will not be recorded in the inclusion file.
     * @type {Boolean}
     */
    $shadow: false,

    /**
     * 是否为抽象模块, 抽象模块不能被使用，只能用来被拷贝
     * Whether it is an abstract module; abstract modules cannot be used directly, they can only be copied.
     * @type {Boolean}
     */
    $abstract: false,

    /**
     * 是否为非阻塞模块, 非阻塞模块在创建时，不登记到创建列表，也不会去判断创建列表数据
     * Whether it is a non-blocking module; non-blocking modules, upon creation, are not registered in the creation list and do not evaluate data within the creation list.
     * @type {Boolean}
     */
    $nonblock: false,

    /**
     * 构造对象、函数、模型
     * Constructing objects, functions, and models
     * @type {Function|Model|Object}
     */
    $construct: null,

});
```
