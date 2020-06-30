import dynamic from 'dva/dynamic';

/**
 * 页面路由动态组件造
 * @param app
 * @param models
 * @param component
 */
export const dynamicWrapper = (app, models, component) => {
    return dynamic({
        app,
        models: () => models,
        component: () => component
    })
};

/**
 * 树状结构数据，平铺展开
 * @param treeData 树顶级对象数组
 * @param childField 子节点 字段名
 * @returns {[]}
 */
export const floorTree = (treeData, childField) => {
    // treeData 是数组构建一个根节点
    const data = treeData instanceof Array ? {[childField]: treeData} : treeData;
    const result = [];
    const loop = (arr, parent = null) => {
        arr.forEach(item => {
            result.push({
                ...item,
                parent,
            });
            if (item[childField]) {
                loop(item[childField], item);
            }
        })
    };
    loop(data[childField]);
    return result;
};
