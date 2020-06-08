import React from 'react'
import { Route, Switch } from 'dva/router';
import { Spin  } from 'antd';
import dynamic from 'dva/dynamic';
import PropTypes from 'prop-types';

dynamic.setDefaultLoadingComponent(() => <Spin indicator={<div>Loading...</div>} />);

const Router = ({ routes, basename = '' }) => {
    console.log(routes);
  return (
      <Switch>
          {
              routes.map(({ path, component: Component, pages, ...rest }) => {
                  if (pages) {
                      console.log(`${basename}${path}`);
                      return (
                          <Route
                              key={`${basename}${path}`}
                              {...rest}
                              component={props => {
                                  return (
                                      <Component
                                          {...props}
                                      >
                                          <Router routes={pages} basename={`${basename}${path}/`} />
                                      </Component>
                                  );
                              }}
                              path={`${basename}${path}`}
                              exact={false}
                          />
                      );
                  } else {
                      console.log(`${basename}${path}`);
                      // 处理404
                      const pathStr = path ? `${basename}${path}` : '';
                      return (
                          <Route
                              exact={true}
                              key={pathStr}
                              {...rest}
                              path={pathStr}
                              component={Component}
                          />
                      );
                  }
              })
          }
      </Switch>
  );
};
Router.propTypes = {
    base: PropTypes.string,
};

export default Router;
