# wsreact
    Webpack+React+Dva+Antd+Requirejs 架构。

# 挂载引入
    现在支持插件资源的载入和卸载时的内存释放了。
## 约定
    src/components/PluginLoader: 子项目的加载器
    src/index.html: html模板
    src/index.js: 入口文件
    src/plugins: 预置的子项目
    src/locales: 国际化文件
    src/config/routes.js: 页面路由定义，处理服务端菜单
    src/router: 路由组件
    src/assets: 静态文件
    package.name: 默认作为项目挂载点名称，项目入口js文件名
    
    
