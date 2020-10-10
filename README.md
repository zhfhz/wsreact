# wsreact
    Webpack+React+Dva+Antd+Requirejs 架构。
    已删除敏感页面，所以无法直接运行

# 使用说明
## 约定
    src/components/PluginLoader: 子项目的加载器
    src/index.html: html模板
    src/index.js: 入口文件
    src/plugins: 预置的子项目
    src/locales: 国际化文件
    src/config/routes.js: 页面路由定义，处理服务端菜单
    src/router: 生成路由
    src/routes: 路由配置文件
    src/assets: 静态文件
    package.name: 默认作为项目挂载点名称，项目入口js文件名
    
    
#更新

    @components/Table
        resizable               支持 动态调整表头宽度
        columns:[{
            editable: true,     // 支持单元格编辑,支持行内校验
            rules:[]            // 字段校验规则 ，参见Antd Form,
            ...                 // 更多参见 Antd Table Columns配置
        }]
        ...                     更多参见 Antd Table 配置
    
    scripts/webpack.base.js     // 页面拆分 后打包体积优化
