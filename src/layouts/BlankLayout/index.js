import React from 'react';
import styles from './style.less';

export default class BlankLayout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return <div className={styles.BlankLayout}>{children}</div>;
  }
}
