import React from 'react';
import ReactDOM from "react-dom";

class LazyLoader extends React.Component {
  constructor(args) {
    super(args);
    this.mountChild = () => null;
    this.state = {
      mount: null,
      loaded: false,
      err: false,
    };
  }
  componentDidMount() {
    const { path } = this.props;
    window['require']([`plugins/${path}/index`], module => {
      if (module.default) {
        this.mountChild = module.default;
        this.setState({
          loaded: true,
          err: true,
        })
      }
    }, () => {
      this.setState({
        err: true,
        loaded: true
      });
    });
  }
  componentDidUpdate() {
    if (this.mountChild) {
      const { hash } = location;
      this.mountChild(this.mountedDom, hash.replace('#', ''));
      this.mountedParent.appendChild(this.mountedDom);
      this.mountChild = null;
    }
  }

  getMountDom = dom => {
    if (dom) {
      this.mountedParent = dom;
      const div = document.createElement('div');
      div.id="d123";
      this.mountedDom = div;
    }
  }
  componentWillUnmount() {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(this.mountedDom);
      this.mountedDom.parentElement.removeChild(this.mountedDom);
      this.mountedDom = null;
    });
  }

  render() {
    const { loaded, err } = this.state;
    return (
      <div ref={this.getMountDom}>
        {
          loaded ? (err && <div>没有找到插件，请检查配置</div> || null) : <div>Loading...</div>
        }
      </div>
    );
  }
}

export default (path, baseUrl) => {
  return () => <LazyLoader path={path} baseUrl={baseUrl} />;
}