webapp.createModule({
    $include: [
        /**
         * 模板样式:
         * https://www.bootmb.com/themes/boomerang/
         */
        '../assets/css/theme.css',
        '../assets/css/demo.css',

        /**
         * prism 代码高亮
         * https://prismjs.com/
         */
        '@library/prism/prism.css',
        {
            src: '@library/prism/prism.js',
            wait: true,
        },

        '../assets/css/index.css',
        
        {
            src: 'home.html',
            type: 'template',
        },
        {
            src: '../data/website.js',
            type: 'module',
            use: 'Website'
        },
        {
            src: '../data/docs.js',
            type: 'module',
            use: 'Docs'
        },
    ],
    $selector: 'body',
    onrender() {
        // 加载文档
        this.Docs.load();
    },
    $construct() {
        this.navigation = webapp.createSignal();
        this.sidebarToggled = webapp.createSignal(false);
        return {
            fragment: {
                $fragment: true,
            },
            '.website-name': {
                $innerText: this.Website.name
            },
            '.webapp-version': {
                $innerText: webapp.version
            },
            'a.website-githuburl': {
                href: this.Website.githubUrl
            },
            '.navigation': {
                $if: () => this.navigation.get() && this.navigation.get().length,
            },
            '.navigation>fragment': {
                $for: [() => this.navigation.get(), (props) => {
                    var v = props.value;
                    return {
                        '.navigation-title': {
                            $if: v.level==1,
                            $innerText: v.title,
                            level: v.level
                        },
                        '.navigation-item': {
                            $else: true,
                            style: { paddingLeft: `${(v.level-2)*12}px` },
                            level: v.level
                        },
                        '.navigation-link': {
                            $innerText: v.title,
                            href: `#${v.anchor}`,
                        }
                    };
                },(props) => props.value.id],
            },
            '.sidebar': {
                class: () => ({ toggled: this.sidebarToggled.get() }),
            },
            '.sidebar-brand': {
                onclick: () => this.sidebarToggled.set(false) && false
            },
            '.sidebar a>img': {
                src: webapp.createURL('assets/img/logo-master.png', webapp.mainSrc).stringify(),
            },
            '.navigation-trigger': {
                onclick: () => this.sidebarToggled.set(true) && false
            },
            '.body-backdrop': {
                $is: () => this.sidebarToggled.get(),
                onclick: () => this.sidebarToggled.set(false) && false
            },
            '.docs-loading': {
                $if: () => this.Docs.loading.get()
            },
            '.docs-loading+div': {
                $else: true,
                $innerHTML: () => this.Docs.data.get(),
                $after: (props) => {
                    this.Docs.data.subscribe();
                    this.plugin(props.target.node);
                    this.createNavigation(props.target.node);
                },
            },
        };
    },

    /**
     * 插件处理
     * @param {HTMLElement} currentNode
     */
    plugin(currentNode) {
        // 代码高亮
        var nodeList = currentNode.querySelectorAll('pre>code');
        for (var i = 0; i < nodeList.length; i++) {
            nodeList[i].highlightStatus = true;
            Prism.highlightElement (nodeList[i]);
        }

        // 设置a标签的跳转属性
        var targets = currentNode.querySelectorAll('a');
        for (var i = 0; i < targets.length; i ++) {
            var target = targets[i].getAttribute('target');
            if (!target) {
                targets[i].setAttribute('target', '_blank');
            }
        }
    },
    /**
     * 创建导航
     * @param {HTMLElement} currentNode
     */
    createNavigation(currentNode) {
        var navigation = new Array ();
        // 先获取子节点
        var nodeList = currentNode.querySelectorAll('h1,h2,h3,h4,h5,h6');
        if (nodeList && nodeList.length) {
            for (var i = 0; i < nodeList.length; i++) {
                var node = nodeList[i];
                var obj = {
                    id: node.nodeName + '-' + i,
                    anchor: node.nodeName + '-' + i + '-' + node.innerHTML,
                    title: node.innerHTML,
                    serial: node.nodeName,
                    level: parseInt(node.nodeName.toLowerCase().replace('h','')),
                    node: node,
                };

                // 设置ID锚点
                node.setAttribute('id', obj.anchor);
                navigation.push(obj);
            }
        }
        this.navigation.set(navigation);
    },

});