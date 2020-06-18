import React from 'react'
import {Route, Switch} from 'dva/router';
import { Spin  } from 'antd';
import dynamic from 'dva/dynamic';

dynamic.setDefaultLoadingComponent(() => <Spin indicator={<div>Loading...</div>} />);

function MyRouter(props) {
    const { routes = [], basename = '' } = props;
    return (
        <Switch>
            {
                routes.map(({ path, component: Component, pages, ...rest }) => {
                    const pathStr = `${basename}${path}`;
                    if (pages) {
                        return (
                            <Route path={pathStr} key={pathStr} render={props => <Component {...props}>
                                <MyRouter routes={pages} basename={`${basename}${path}/`}/>
                            </Component>}></Route>
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
        </Switch>
    )
}

export default MyRouter;
