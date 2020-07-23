import React from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import { Spin } from 'antd';
import dynamic from 'dva/dynamic';
import NotFound from '@pages/NotFound';

export let history = null;

export const saveHistory = (historyInstance) => {
  history = historyInstance;
  // 第一次加载页面的 路由不变的话不会执行路由监听函数
  history.isFirstPage = true;
  const unListen = history.listen(function () {
    delete history.isFirstPage;
    unListen();
  });
};

dynamic.setDefaultLoadingComponent(() => (
  <Spin indicator={<div>Loading...</div>} />
));

function MyRouter(props) {
  const { routes = [], basename = '' } = props;
  return (
    <Switch>
      {routes.map(
        ({ path, redirect, component: Component, pages, ...rest }) => {
          const pathStr = `${basename}${path}`;
          if (pages) {
            return (
              <Route
                path={pathStr}
                key={pathStr}
                render={(routeProps) => (
                  <Component {...routeProps}>
                    <MyRouter routes={pages} basename={pathStr} />
                  </Component>
                )}
              />
            );
          }
          if (redirect) {
            return (
              <Route
                key={pathStr}
                path={pathStr}
                exact
                render={() => <Redirect to={redirect} />}
              />
            );
          }
          return (
            <Route
              key={pathStr}
              path={pathStr}
              {...rest}
              component={Component}
            />
          );
        }
      )}
      <Route key="notfound" path="*" component={NotFound} />
    </Switch>
  );
}

export default MyRouter;
