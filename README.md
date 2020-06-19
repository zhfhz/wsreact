# wsreact
    Webpack+React+Dva+Antd+Requirejs 架构。

# 缺陷
    目前仅能支持扩展项目，当扩展的项目足够多时，可能导致js文件引入越来越多，页面内存爆表。如何在项目切出时卸载内存中的项目对象还没有好的办法
## 约定
    src/components/PluginLoader: 子项目的加载器
    src/index.html: html模板
    src/index.js: 入口文件
    src/plugins: 预置的子项目
    src/locales: 国际化文件
    src/config/routes.js: 页面路由定义，处理服务端菜单
    src/router: 路由组件
    src/assets: 静态文件
    package.namespace: 默认作为项目挂载点名称，项目入口js文件名
    
    
