/**
 * 版权信息内容
 */
const copyright = `/**
 * webappjs is a single-page application (SPA) framework that emphasizes the separation of template and interaction, based on the features of ECMAScript 5.
 * Copyright (c) 1992-` + (new Date()).getFullYear() + `, xinghanjiaozhu. (MIT Licensed)
 * email <a@astarhan.net> 
 * qq <1102119280>
 * https://github.com/webappjs
 */
`;

module.exports = {
    // index 页面
    index: 'index.html',
    // 入口文件
    main: 'src/main.js',
    // 版本处理
    version: function(v, code) {
        return `webapp.setPrototype("builder", {version:"${v}"});` + code;
    },
    // 版权信息
    copyright: copyright,
    // 源代码的目录名称
    src: 'src',
    // 插件库的目录名称
    library: 'library',
    // 打包的目录名称
    dist: 'docs',
    // 拷贝根文件
    root: [
        'favicon.ico',
        'README.md',
    ],
    // 忽略配置
    ignore: {
        extension: {
            src: [".less"],// 忽略扩展名, 只对源代码的目录代码有效
            library: [".less"],// 忽略扩展名, 只对插件库的目录代码有效
        },
        // path: ["library/less.js"],// 忽略列表
    },
    // 压缩配置: 只对src目录有效
    minify: {
        // exclude: ["test/src/path/"],// 不压缩的目录列表
        htmlminifier: {
            options: {
                keepClosingSlash: true,// 在单例元素上保留尾部斜杠
                caseSensitive: true,// 以区分大小写的方式处理属性（对于自定义 HTML 标记很有用）
                collapseWhitespace: true, // 删除html里的空格 达到html的压缩
                // removeAttributeQuotes: true, // 尽可能删除html标签里的双引号 达到html的压缩
                removeComments: true, // 删除html中的注释
                removeCommentsFromCDATA: true, // 从脚本和样式删除的注释
                minifyCSS: true, // 压缩css
                minifyJS: true, // 压缩js
            },
        },
        uglifyjs: {
            options: {
                warnings: true,
                mangle: true,
                ie: true,
                webkit: true,
            }
        },
    },
};
