import React from 'react';
import { Dropdown, Button } from 'antd';
import styles from './style.less';

/**
 *
 * @param type "" | "danger" | “success” | "info"
 */
export default function WrapperButton({ theme, className, ...restProps }) {
  return (
    <Button
      {...restProps}
      className={styles[`button${theme ? `-${theme}` : ''}`] + ` ${className}`}
    />
  );
}

WrapperButton.Group = (props) => {
  return <span {...props} className={styles['button-group']} />;
};

WrapperButton.DropdownButton = function (props) {
  return <Dropdown.Button className={styles.operators} {...props} />;
};
