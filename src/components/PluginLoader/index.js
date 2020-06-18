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
    const { match: { params: { module } } } = this.props;
    window['require']([`plugins/${module}/index`], () => {
      window['require']([`${module}`], module => {
        if (module.default) {
          this.mountChild = module.default;
          this.setState({
            loaded: true,
            err: false,
          })
        }
      })
    }, () => {
      this.setState({
        err: true,
        loaded: true
      });
    });
  }
  componentDidUpdate() {
    const { match: { url = '' } } = this.props;
    if (this.mountChild) {
      this.mountedParent.appendChild(this.mountedDom);
      this.mountChild(this.mountedDom, url);
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
    ReactDOM.unmountComponentAtNode(this.mountedDom);
    this.mountedDom.parentElement.removeChild(this.mountedDom);
    this.mountedDom = null;
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

export default (props) => {
  return <LazyLoader {...props} />;
}