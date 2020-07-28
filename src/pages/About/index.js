import React from 'react';
import { connect } from 'dva';
import intl from 'react-intl-universal';
import Transition from '@components/Transition';
import { needLogin } from '@components/Permission';

export default
@connect(({ about }) => ({
  ...about,
}))
@needLogin
class About extends React.PureComponent {
  render() {
    const { description } = this.props;
    return (
      <div>
        <h3>{intl.get('about')}</h3>
        <Transition name="move-right">
          <p>{description}</p>
          <p>热更新测试！！</p>
        </Transition>
      </div>
    );
  }
}
