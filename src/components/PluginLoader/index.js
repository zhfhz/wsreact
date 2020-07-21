import React from 'react';
import ReactDOM from 'react-dom';

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
    const {
      match: {
        params: { module },
      },
    } = this.props;
    window['require'](
      [`plugins/${module}/index`],
      () => {
        window['require']([`${module}`], (module) => {
          if (module.default) {
            this.mountChild = module.default;
            this.setState({
              loaded: true,
              err: false,
            });
          }
        });
      },
      () => {
        this.setState({
          err: true,
          loaded: true,
        });
      }
    );
  }
  componentDidUpdate() {
    const {
      match: { url = '' },
    } = this.props;
    if (this.mountChild) {
      this.mountChild(this.mountedDom, url);
      this.mountChild = null;
    }
  }

  getMountDom = (dom) => {
    const {
      match: {
        params: { module },
      },
    } = this.props;
    if (dom) {
      this.mountedParent = dom;
      const div = document.createElement('div');
      div.id = `${module}_Root`;
      this.mountedDom = div;
      this.mountedParent.appendChild(this.mountedDom);
    }
  };
  componentWillUnmount() {
    const {
      match: {
        params: { module },
      },
    } = this.props;
    if (this.mountedDom.parentElement === this.mountedParent) {
      ReactDOM.unmountComponentAtNode(this.mountedDom);
      this.mountedParent.removeChild(this.mountedDom);
      this.mountedDom = null;
    }
    setTimeout(() => {
      // 删除此插件的依赖包以释放内存
      window[`webpackJson${module}`] = null;
      // 删除require缓存
      window['requirejs'].undef(`plugins/${module}/index`);
      window['requirejs'].undef(module);
      // 删除插件的script标签
      const scripts =
        document.querySelectorAll(`script[src^=\\.\\/plugins\\/${module}\\/`) ||
        [];
      scripts.forEach((item) => {
        item.parentElement.removeChild(item);
      });
      // 删除插件的style标签
      const styles = document.querySelectorAll(`style[data-project=${module}]`);
      styles.forEach((item) => {
        item.parentElement.removeChild(item);
      });
    }, 1000);
  }

  render() {
    const { loaded, err } = this.state;
    return (
      <div ref={this.getMountDom}>
        {loaded ? (
          (err && <div>没有找到插件，请检查配置</div>) || null
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default (props) => {
  return <LazyLoader {...props} />;
};
