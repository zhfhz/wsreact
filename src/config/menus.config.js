export default [
    {
        path: '/app/about', // 路由
        name: 'about', // locale key 找不到国际化字符就展示这个字符
        type: 'page',
        // children:[
        //     // 子菜单 为了配置的灵活性，子菜单不以/开头的视为相对路由，会拼接父目录的path, children存在时，path作为相对路由的前缀
        // ]
    },
    {
        path: '/app/demo',
        name: 'demo',
        type: 'page',
    },
    {
        path: '/app/mount/core',
        name: 'test',
        type: 'plugin',
        module: 'test'
    }
];