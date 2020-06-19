import React from 'react'
// import { CSSTransition } from "react-transition-group";

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
        const { children } = this.props;
        const { show } = this.state;
        return show ? (children) : null
    }
}
export default Transition;