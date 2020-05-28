import React from 'react'
import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
class Transition extends React.Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <div>
                <ReactCSSTransitionGroup
                    transitionEnter={true}
                    transitionLeave={true}
                    transitionEnterTimeout={2500}
                    transitionLeaveTimeout={1500}
                    transitionName="animated"
                >
                    {this.props.children}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}
export default Transition;