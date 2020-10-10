import React from 'react';
import createFromIconfontCN from '@ant-design/icons/es/components/IconFont';
import styles from './style.less';

export default ({ width, height = width, type, viewBox = '' }) => {
  if (!type) {
    return null;
  }
  const MyIcon = createFromIconfontCN({
    extraCommonProps: {
      viewBox: `0 0 ${width} ${height}`,
    },
    scriptUrl: ['//at.alicdn.com/t/font_1465484_5gdfkkkr7yw.js'],
  });
  return (
    <MyIcon
      className={styles.myIcon}
      style={{
        width,
        height,
        fontSize: height,
      }}
      type={type}
    />
  );
};
