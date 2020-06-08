import dynamic from 'dva/dynamic';
export const dynamicWrapper = (app, models, component) => {
    return dynamic({
        app,
        models: () => models,
        component: () => component
    })
}

export const floorTree = (treeData, childField) => {
    const data = treeData instanceof Array ? { [childField]: treeData } : treeData;
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
    }
    loop(data[childField]);
    return result;
}