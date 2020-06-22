import React from 'react'
import { Route, Switch, Redirect} from 'dva/router';
import { Spin  } from 'antd';
import dynamic from 'dva/dynamic';
import { createHashHistory } from 'history';
import NotFound from "@pages/NotFound";

export const history = createHashHistory();

dynamic.setDefaultLoadingComponent(() => <Spin indicator={<div>Loading...</div>} />);

function MyRouter(props) {
    const { routes = [], basename = '' } = props;
    return (
        <Switch>
            {
                routes.map(({ path, redirect, component: Component, pages, ...rest }) => {
                    const pathStr = `${basename}${path}`;
                    if (pages) {
                        return (
                            <Route path={pathStr} key={pathStr} render={props => <Component {...props}>
                                <MyRouter routes={pages} basename={pathStr}/>
                            </Component>}></Route>
                        );
                    } else if (redirect) {
                        return (
                            <Route
                                key={pathStr}
                                path={pathStr}
                                exact={true}
                                render={() => <Redirect to={redirect} />}
                            />
                        );
                    } else {
                        return (
                            <Route
                                key={pathStr}
                                path={pathStr}
                                {...rest}
                                component={Component}
                            />
                        );
                    }
                })
            }
            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default MyRouter;
