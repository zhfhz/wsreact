import app from '@/dva';
import { dynamicWrapper } from '@utils';

export default [
  {
    path: '/about',
    component: dynamicWrapper(app, [import('@pages/About/model')], import('@pages/About')),
  },
  {
    path: '',
    component: dynamicWrapper(app, [], import('@pages/NotFound')),
  }
];