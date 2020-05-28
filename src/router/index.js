import React from 'react'
import { HashRouter, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import PropTypes from 'prop-types';
import getRoutes from '@routes';

dynamic.setDefaultLoadingComponent(() => <div>Loading...1</div>);

const routes = getRoutes([{
  path: '/test',
  type: 'plugins',
  component: 'test',
}]);
const router = ({ base = '' }) => {
  return (
      <HashRouter basename={`${base}/`}>
          <Switch>
              {
                  routes.map((route) => (<Route key={route.path} path={route.path} component={route.component} />))
              }
          </Switch>
      </HashRouter>
  );
};
router.propTypes = {
    base: PropTypes.string,
};

export default router;
