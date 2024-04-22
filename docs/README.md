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

- **面向模块化编程：**
  - **模块多元动态互联**：使用创新设计的模块模式，打破了传统模块间的固定交互边界，赋予项目前所未有的组织灵活性与扩展性，实现一对一、一对多、多对多的灵活模块关联，同时支持单列模块、影子模块、抽象模块等多种形态，构建出层次丰富、适应性强的模块生态系统。
  - **模块无需命名**：消除模块命名的困扰，提升开发效率。采用创新无名模块化技术，彻底摒弃传统的模块命名过程，从根本上解决了模块命名可能导致的命名冲突、命名规则不统一、命名难寻等问题，极大地减轻了开发人员在命名上的认知负担与决策压力。
  - **模块驱动页面构建与交互**：页面以模块为基本构建单元，模块可以把控整个页面的生命周期，并且整合管理模型、视图，驱动整个页面高效渲染与高效交互。
  - **提升代码品质与可维护性**：面向模块化的编程方式显著提高了代码的可读性与模块间的低耦合度，使得项目结构清晰、逻辑易于理解，方便开发团队进行协作，大大提升了项目的长期可维护性与迭代效率。

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


**.d.ts:**
```ts
export interface Signal {
    
    /**
     * 信号的值：直接使用不会被订阅
     */
    value: any;

    /**
     * 获取信号的值：调用时会自适应订阅
     */
    get(): this['value'];

    /**
     * 设置信号的值
     * @param {any} newValue - 设置更新的值，信号值变化时才会发布订阅
     */
    set(newValue: any): void;

    /**
     * 发布
     * 无论信号值是否变化，都会发布订阅
     */
    publish(): void;

    /**
     * 订阅
     * @param {(signal: Signal, unsubscribe: () => void) => void} callback - 当信号发布时会被调用的回调函数。接受两个参数：信号对象（signal）触发当前信号实例；取消订阅函数（unsubscribe）用于移除当前订阅。
     * @param {boolean} [immediate = false] - 可选参数，指示是否在订阅后立即执行回调函数。如果为 `true`，则会立即调用 `callback` 一次，传入当前的 `value`。默认为 `false`，即仅当 `value` 后续发布（值有可能未变动）时才调用。
     * @returns {() => void} - 返回一个取消订阅函数，用于移除当前订阅。
     */
    subscribe(callback: (signal: Signal, unsubscribe: () => void) => void, immediate?: boolean): () => void;

    /**
     * 清理订阅
     */
    clear(): void;

}
```




## createView

创建视图的时候，可以指定一个模型构造数据或者模型对象。模型构造数据详见 [API: createModel](#createModel)


## createModel



**隐藏属性：**

在模板的HTML标签上，使用属性名称使用双减号（`--`）前缀，用来表示隐藏或私有属性，它们不会被渲染出来，而模型声明可以对其进行当作属性选择器使用。

```html
<div id="my-element" --framework-id --framework-state>
    This is a content div.
</div>
<script>
webapp.createModel({
    '#my-element': {
        // ......
    },
    '#my-element[--framework-id]': {
        // ......
    },
    '[--framework-state]': {
        // ......
    },
});
</script>
```

在HTML中，属性名称通常遵循W3C标准所定义的命名规则，使用英文单词、短语或缩写，且不包含特殊字符（如双减号 `--`）。所以在框架中支持的隐藏属性不会跟标准属性名称冲突。

在HTML标签上使用双减号（`--`）前缀的隐藏属性有以下优势：
1. **数据封装与隔离**：避免与标准HTML属性冲突，不影响页面渲染与外部工具解析。
2. **框架内数据传递与管理**：便于框架在运行时读取并响应私有属性，不增加渲染负担，保持源码整洁。
3. **框架扩展与维护便利**：防止命名冲突，便于添加、修改或移除私有属性，利于代码审查、调试与优化。
4. **兼容性和可移植性**：非标准属性通常被浏览器忽略，无渲染副作用，易于与其他前端技术集成或迁移。




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



