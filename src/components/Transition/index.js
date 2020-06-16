import React from 'react'
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
        this.setState({
            show: true
        });
    }

    render(){
        const { name = "move-down", children, ...rest } = this.props;
        const { show } = this.state;
        return show ? (
            <CSSTransitionGroup
                transitionAppear={true}
                transitionEnter={true}
                transitionLeave={true}
                transitionName={name}
                transitionAppearTimeout={200}
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
                component={({ children }) => children}
                {...rest}
            >
                {children}
            </CSSTransitionGroup>
        ) : null
    }
}
export default Transition;