import React from 'react';
import { connect } from 'dva';
import intl from 'react-intl-universal';

export default
@connect(({ about }) => ({
    ...about,
}))
class About extends React.Component {
  render() {
    const { description } = this.props;
    return (
        <div>
          <h3>{intl.get('ABOUT_DES')}</h3>
          <p>{description}</p>
        </div>
    );
  }
};
