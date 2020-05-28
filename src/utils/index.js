import dynamic from 'dva/dynamic';
export const dynamicWrapper = (app, models, component) => {
    return dynamic({
        app,
        models: () => models,
        component: () => component
    })
}