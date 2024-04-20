# webappjs

webappjs 是面向模板与交互分离, 基于 ECMAScript 5 特性的单页应用 (SPA) 框架。  
webappjs is a single-page application (SPA) framework that emphasizes the separation of template and interaction, based on the features of ECMAScript 5.


## 特点

> 如今市面上的前端构建工具都在追求构建速度，实质上这是个歧途！在开发环境下构建始终会消耗时间，不构建才是大势所趋！

- **开发环境无需构建：**
  - **追求即时反馈与效率**：提倡在开发环境中直接使用原生 JavaScript 编写代码，避免构建工具带来的等待时间，提高开发过程中的即时反馈速度和工作效率。
  - **简化调试流程**：不依赖 SourceMap，鼓励使用 `debugger` 语句结合浏览器开发工具(F12)进行直接调试，简化调试流程，保持调试体验的直观与高效。

- **生产环境可以构建：**
  - **保持构建价值**：虽然反对开发环境构建，但仍认可生产环境构建的价值，认为在发布前进行构建打包有助于（不限于）实现以下目标：
    - **代码兼容性**：通过转译 JavaScript，确保高版本语法能在老旧浏览器中运行。
    - **代码优化**：压缩 JavaScript，去除注释，减少文件大小，提升加载速度。
    - **资源定制**：支持 UI 组件库的构建 API，按需打包 CSS 样式、添加厂商前缀等，实现资源的精细化管理。

- **模板渲染轻量可控：**
  - **淘汰复杂机制**：不采用 `Proxy` 或 `Object.defineProperty` 实现数据响应式，也不使用 `new Function` 或 `eval` 处理模板引擎，旨在减轻框架的复杂度和潜在性能开销。
  - **追求轻量可控**：使用创新设计的信号模式，充分对响应式机制的简洁性、性能和安全性等方面的考虑，避免引入可能导致性能瓶颈或安全风险的无效特性。

- **模型选择器对标CSS：**
  - **模板与交互分离**：提倡 HTML(模板结构)、CSS(模板样式)、JavaScript(数据交互) 三者职责分明，互不干涉。通过类似 CSS 选择器的方式声明模型绑定，实现非侵入式的模板渲染，有利于代码结构清晰。这样维护方便，修改HTML、CSS代码文件不会影响JavaScript交互代码文件，反之同理。

- **前端开发革命精神：**
  - **返璞归真与聚焦业务**：倡导回归前端开发的本质，摆脱过度复杂的构建工具链，使开发者能够更专注于业务逻辑的实现，而非花费大量精力在工具配置与维护上。




# 起步


## 示例代码


## 构建发布


# API


## configureInclude

configureInclude 是设置包含功能的配置信息。  

```js
configureInclude({
    /**
     * 包含的过滤器 
     * 可以拦截并自定义资源路径信息 
     */
    filter(e) {
        console.log('filter', e);
    },
    /**
     * 包含的准备处理
     * 可以自定义资源的加载方式：除了模块框架已经封装好了，其他的资源包括模板加载，都需要开发者自行定义
     */
    ready(e) {
        console.log('ready', e);
    },
});
```

**代码示例：**  
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


## createPage


## createModule

createModule 是创建模块。  

```js
webapp.createModule(function() {
    return {

        /**
         * 是否为影子模块, 如果是影子模块，那么不会被记录到包含文件中
         * @type {Boolean}
         */
        $shadow: false,

        /**
         * 是否为抽象模块, 抽象模块不能被使用，只能用来被拷贝
         * @type {Boolean}
         */
        $abstract: false,

        /**
         * 是否为非阻塞模块, 非阻塞模块在创建时，不登记到创建列表，也不会去判断创建列表数据
         * @type {Boolean}
         */
        $nonblock: false,

        // ...
    };
});
```


## createSignal


**JSDoc:**
```js
/**
 * @typedef {Object} createSignal 信号
 * @property {any} value 信号的值
 * @property {Function} get 获取信号的值
 * @property {Function} set 设置信号的值
 * @property {Function} publish 发布
 * @property {Function} subscribe 订阅
 * @property {Function} clear 清理订阅
 */
```

## createView

## createModel


## createURL


## useModule

## currentPage

## currentSrc

## isPage

## isModule

## isSignal

## isView

## isModel

## isURL


## setPrototype

## getPrototype

## defineLanguage

## makeLanguage


## HTMLEncode

## HTMLDecode


## URLEncode

## URLDecode


## URLQueryEncode

## URLQueryDecode



