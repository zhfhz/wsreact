import React, { Fragment } from 'react';

class LazyLoader extends React.Component {
  constructor() {
    super();
    this.state = {
      render: null,
      component: null,
    };
  }
  componentDidMount() {
    const { path } = this.props;
    window['require']([`plugins/${path}/index`], () => {
      window['require']([path], module => {
        const mountedId = path.replace(/\//g, '-');
        this.setState({
          render: module.default ? () => module.default(mountedId) : null,
          component: () => (
            <div id={mountedId}></div>
          ),
        })
      });  
    }, err => {
      this.setState({
        component: () => {
          return (
            <div>没有找到插件</div>
          );
        },
      });
    });
  }
  componentDidUpdate(preProps, preState) {
    if (this.state.render) {
      this.state.render();
    }
  }
  render() {
    const Component = this.state.component;
    const { props } = this;
    return (
      <Fragment>
        {
          Component ? <Component {...props}/> : <div>Loading....</div>
        }
      </Fragment>
    );
  }
}

export default (path) => {
  return () => <LazyLoader path={path} />;
}