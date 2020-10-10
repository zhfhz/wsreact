import React from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import { Spin } from 'antd';
import NotFound from '@pages/NotFound';

export let history = null;

export const saveHistory = (historyInstance) => {
  history = historyInstance;
  history.records = [history.location];
  const unListen = history.listen(function (e) {
    history.records.push(e);
  });
};

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
