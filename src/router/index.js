import React, { Fragment, Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';
import getRoutes from '../config/routes';

const routes = getRoutes([{
  path: '/test',
  type: 'plugins',
  component: 'test',
}]);
export default ({ basename = '' }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HashRouter basename={basename}>
        <Switch>
          {
            routes.map((route) => (<Route key={route.path} path={route.path} component={route.component} />))
          }
        </Switch>
      </HashRouter>
    </Suspense>
  );
}