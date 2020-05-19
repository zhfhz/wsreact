# wsreact
    react项目嵌套，做了react依赖抽离,支持服务端配置子项目。暂未整合redux,后续计划整合dva;

# 使用说明

## 约定
    dist/plugyins：子项目路径（如果有的话,存放在此路径）
    src/components/PluginLoader: 子项目的加载器
    src/index.html: html模板
    src/index.js: 入口文件
    src/plugins: 预置的子项目
    src/config/routes.js: 页面路由定义，处理服务端菜单
    src/router: 路由组件
    src/assets: 静态文件
    scripts/index: build脚本入口
    scripts/webpack.server.js: 开发脚本入口
    package.namespace: 默认作为项目挂载点名称，项目入口js文件名
    
## 用法
    
    core作为基础脚手架，父子项目使用方法一致。是否是子项目取决于：
      1. 项目构建后的dist目录是否会被复制到另一个项目的plugins目录下
      2. 父项目的菜单配置项中是否配置了挂载此项目文件
