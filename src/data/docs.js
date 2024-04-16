webapp.createModule(function () {
    // 加载状态
    this.loading = webapp.createSignal(true);
    // 数据
    this.data = webapp.createSignal(null);
    // 错误信息
    this.error = null;
    
    return {
        $include: '@library/marked/marked.min.js',
        /**
         * 加载数据
         */
        load() {
            this.loading.set(true);
            this.data.set(null);
            this.error = null;
    
            var url = webapp.createURL('README.md', window.location.href);
            if (webapp.builder && webapp.builder.version) {
                url.query.v = webapp.builder.version;
            }
            fetch(url.stringify())
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Request failed with status ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    /**
                     * 在这里处理接收到的数据
                     * 将内容编译成html
                     */
                    this.data.set(marked(data));
                    // 加载状态完成
                    this.loading.set(false);
                })
                .catch(error => {
                    this.loading.set(false);
                    this.error = error;
                    console.error(error);
                });
        },
    
    };
});