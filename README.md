# wsreact
    Webpack+React+Dva+Antd+Requirejs 架构。
    因为requirejs的缘故支持子项目横向扩展

# 使用说明
    脚手架
    入口文件增加react-pollyfill以兼容ie11，拆解后index文件在300k，还算可以了
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
    
## 用法
    与create react App 使用体验相差不大。
    如果需要使用脚手架的扩展性，可能某些约定需要适当做一些修改。
    
     使用此脚手架配置的项目，应该很方便以插件的形式互相组合在一起。
     多个项目之间的通信目前没有重点考虑。毕竟相同域名下，数据交换途径还是比较多的。 
    
