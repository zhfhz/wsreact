import React from 'react'
import { Route, Switch } from 'dva/router';
import { Spin  } from 'antd';
import dynamic from 'dva/dynamic';
import PropTypes from 'prop-types';

dynamic.setDefaultLoadingComponent(() => <Spin indicator={<div>Loading...</div>} />);

const Router = ({ routes, basename = '' }) => {
    console.log(`${basename}`);
  return (
      <Switch>
          {
              routes.map(({ path, component: Component, pages, ...rest }) => {
                  if (pages) {
                      return (
                          <Route
                              key={`${basename}${path}`}
                              {...rest}
                              component={props => {
                                  return (
                                      <Component
                                          {...props}
                                      >
                                          {
                                              Router({ routes: pages, basename: `${basename}${path}` })
                                          }
                                      </Component>
                                  );
                              }}
                              path={`${basename}${path}`}
                          />
                      );
                  } else {
                      return (<Route key={`${basename}${path}`} {...rest} path={`${basename}${path}`} component={Component} />);
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
