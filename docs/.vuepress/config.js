module.exports = {
    title: 'dal-doc',
    description: '记录生活',
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/', // 这是部署到github相关的配置 下面会讲
    markdown: {
        lineNumbers: true // 代码块显示行号
    },

    themeConfig: {
        sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
        nav: [
            { text: '首页', link: '/' },
            { text: 'java', link: '/java/' }, // 内部链接 以docs为根目录
            { text: '数据库', link: '/database/' }, // 外部链接
            { text: '算法', link: '/alg/' },
            { text: '博客', link: 'https://www.jiansys.work/' }, // 外部链接

            // 下拉列表
            {
                text: '语言',
                ariaLabel: 'Language Menu',
                items: [
                    { text: '中文', link: 'http://www.baidu.com' },
                    { text: '英文', link: 'http://www.baidu.com' }
                ]
            }
        ],
        sidebar: {
            '/java/': [{
                title: 'java',
                sidebarDepth: 2,
                collapsable: true, //可折叠
                children: [{
                    title: 'java基础',
                    children: [
                        ['/java/basic/basic', 'Java基础-基础']
                    ]
                }],
            }],
            '/database/': [{
                title: '数据库笔记',
                sidebarDepth: 2,
                collapsable: true, //可折叠
                children: [{
                    title: 'MySql',
                    children: [
                        ['/database/mysql/basis', 'MySql-基本语句'],
                        ['/database/mysql/operator', 'MySql-运算符'],
                        ['/database/mysql/sort-paging', 'MySql-排序与分页'],
                        ['/database/mysql/moretable', 'MySql-多表查询'],
                        ['/database/mysql/single-function', 'MySql-单行函数'],
                        ['/database/mysql/aggregation-function', 'MySql-聚合函数'],
                        ['/database/mysql/subquery', 'MySql-子查询'],
                        ['/database/mysql/statement', 'MySql-语句'],
                        ['/database/mysql/function', 'MySql-函数']
                    ]
                }, {
                    title: 'Redis',
                    children: [
                        ['/database/redis/basis', 'Redis-基本语句'],
                    ]
                }],
            }],
            '/': [''], //不能放在数组第一个，否则会导致右侧栏无法使用 
        }
    }
}