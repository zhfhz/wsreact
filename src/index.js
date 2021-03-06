import React from 'react';
import dva from '@/dva';
import App from '@/App';
import '@common/css/common.less';

export default (id, base = '') => {
  dva.router(() => <App basename={base} />);
  if (typeof id === 'string') {
    dva.start(document.getElementById(id));
  } else {
    dva.start(id);
  }
};
