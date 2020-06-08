import React, { Fragment } from 'react'
import { CSSTransitionGroup } from "react-transition-group";
import styles from './style.less';

class Transition extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }

    componentDidMount() {
        const { delay = 0 } = this.props;
        this.timer = setTimeout(() => this.setState({
            show: true
        }), delay)
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render(){
        const { name = "move-down", useAnimate = true, ...rest } = this.props;
        const { show } = this.state;
        return(
            <CSSTransitionGroup
                transitionAppear={false}
                transitionEnter={true}
                transitionLeave={true}
                transitionName={name}
                transitionAppearTimeout={200}
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
                component={({children}) => children}
                {...rest}
            >
                {show && this.props.children}
            </CSSTransitionGroup>
        )
    }
}
export default Transition;