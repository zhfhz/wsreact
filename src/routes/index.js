import PluginLoader from '@components/PluginLoader';
import configs from '@routes/routes';

// 项目自有的页面路由
const routes = configs;

// 服务端配置获取可插拔的子项目,前提是项目代码已经放在此项目的dist/plugins目录下
// 根据服务端传入的菜单为插件生成动态路由
export default (menus = []) => {
    const plugins = menus.filter(menu => menu.type === 'plugin');
    return [
        ...plugins.map(plugin => ({
            ...plugin,
            component: PluginLoader(plugin.component),
        })),
        ...routes,
    ];
}

