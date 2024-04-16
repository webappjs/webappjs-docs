webapp.createModule(function() {
    this.show = webapp.createSignal(false);
    this.percent = webapp.createSignal(0);
    // 如果是第一次渲染，那么显示中间动画
    this.first = webapp.createSignal(true);

    return {
        $nonblock: true,// 非阻塞，进度模块不能影响页面模块
        $include: {
            src: 'progress.html',
            type: 'template',
        },
        $selector: 'body',
        $model: {
            show: {
                $fragment: true,
                $if: () => this.show.get(),
            },
            circle: {
                style: () => ({stroke: '#2d8cf0'}),
            },
            '.header': {
                style: () => ({
                    transform: `translate3d(-${(100-this.percent.get())}%, 0px, 0px)`, 
                    background: '#2d8cf0',
                }),
            },
            '.body': {
                $is: () => this.first.get(),
                style: () => {
                    return {
                        top: `${(document.documentElement.clientHeight/3)}px`,
                        color: '#2d8cf0',
                    };
                },
            },
            'svg+div': {
                $innerText: () => `页面加载中......${this.percent.get()}%`,
            },
        },
        onready(e) {
            // console.log('onready 页面进度准备好了', this);
            webapp.useModule(this, { global: true }).render();// 准备好了就全局使用并且渲染
        },
        onpageprogress(e) {
            // console.log('onpageprogress', "已经加载了：" + e.percent + "%", e.step, this);
            this.percent.set(e.percent);
            if (100 == e.percent) {
                this.first.set(false);
                this.show.set(false);
            } else {
                this.show.set(true);
            }
        },
    };
});
