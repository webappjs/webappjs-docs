webapp.setPrototype('mainSrc', webapp.currentSrc());
webapp.configureInclude({
    filter(e) {
        if (/^\@/i.test(e.src)) {
            e.src = e.src.replace(/^\@/i, '');
        } else {
            // 可以根据基础地址生成资源的绝对路径
            var url = webapp.createURL(e.src, webapp.currentSrc());
            if (webapp.builder && webapp.builder.version) {
                url.query.v = webapp.builder.version;
            }
            e.src = url.stringify();
        }
        // console.log('filter', e, webapp.currentSrc(), webapp.createURL(e.src, webapp.baseSrc).stringify());
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
                    // console.log('Response:', data);
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


/**
 * 创建一个路由模块并且全局使用
 */
webapp.createModule({
    // $nonblock: true,// 非阻塞
    onready(e) {
        webapp.useModule(this, { global: true });// 准备好了就全局使用
        // 路由模块准备好了就创建页面
        webapp.createPage({
            router: 'browser',// 路由模式: browser(默认)|hash
            historyLogMaximum: 10,
            historyStepMaximum: 10,
        });

        // 如果加载时间长，那么就会渲染加载进度
        // 这里使用超时器，避免影响当前页面其他的模块
        // 使用影子模块加载页面进度模块
        setTimeout(function() {
            webapp.createModule({
                $nonblock: true,// 非阻塞
                $shadow: true,
                $include: {
                    src: webapp.createURL('component/progress.js', webapp.mainSrc).stringify(),
                    type: 'module',
                },
            });
        }, 0);

    },
    onpage(e) {
        // 只有一个页面
        e.module = {
            src: 'page/home.js',
        };
        e.load();
    },
    // 页面不存在时触发
    onpageerror(e) {
        console.log ('onpageerror', e);
        alert('当前页面不存在');
    },
   
});



