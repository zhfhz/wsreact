import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Transition extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }

    componentDidMount() {
        this.setState({
            show: true
        });
    }

    render() {
        const {children, name = 'move-down', ...rest} = this.props;
        const {show} = this.state;
        return (
            <CSSTransitionGroup
                transitionName={name}
                transitionAppear
                transitionEnter
                transitionLeave
                transitionAppearTimeout={200}
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
                component={({children}) => children}
                {...rest}
            >
                {show ? (children) : null}
            </CSSTransitionGroup>
        )
    }
}
export default Transition;
