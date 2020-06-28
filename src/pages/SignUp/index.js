import React from 'react';
import { connect } from 'dva';
import intl from 'react-intl-universal';
import Transition from "@components/Transition";

export default
@connect(({ about }) => ({
    ...about,
}))
class About extends React.PureComponent {
    render() {
        const { description } = this.props;
        return (
            <div>
                <h3>{intl.get('about')}</h3>
                <Transition
                    name="move-right"
                >
                    <p>{description}</p>
                </Transition>
            </div>
        );
    }
}
