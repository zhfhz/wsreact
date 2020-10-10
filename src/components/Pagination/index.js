import React from 'react';
import { Pagination } from 'antd';
import intl from 'react-intl-universal';
import styles from './style.less';

export default (props) => {
  const extra = {
    showTotal: (total) => intl.get('PaginationTotal', { num: total }),
    itemRender: (current, type, originalElement) => {
      if (type === 'prev') {
        return <a>{intl.get('PaginationPrev')}</a>;
      }
      if (type === 'next') {
        return <a>{intl.get('PaginationNext')}</a>;
      }
      return originalElement;
    },
  };
  return <Pagination {...props} {...extra} className={styles.pagination} />;
};
