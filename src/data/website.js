webapp.createModule(() => {
    return {
        name: 'webappjs',
        description: 'webappjs 是面向模板与交互分离, 基于 ECMAScript 5 特性的单页应用 (SPA) 框架。webappjs is a single-page application (SPA) framework that emphasizes the separation of template and interaction, based on the features of ECMAScript 5.',
        githubUrl: 'https://github.com/webappjs',
        getFullYear: function () {
            return (new Date()).getFullYear();
        },
    
    };
});
