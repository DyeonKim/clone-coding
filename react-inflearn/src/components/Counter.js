import React, { Component } from "react";
import { connect } from "react-redux";
// import { connect, bindActionCreators } from "react-redux"; // --(1)

import * as actions from "../actions";

import Value from "./value";
import Control from "./Control";


class Counter extends Component {

    constructor(props) {
        super(props);

        this.setRandomColor = this.setRandomColor.bind(this);
    }

    setRandomColor() {
        const color =[
            Math.floor((Math.random()*55) + 200),
            Math.floor((Math.random()*55) + 200),
            Math.floor((Math.random()*55) + 200)
        ];

        this.props.handleSetColor(color);
    }
    
    render() {

        const color = this.props.color;
        const style = {
            // ES6의 template literals를 사용하여 문법을 더 간결히 씀.
            background: `rgb(${color[0]},${color[1]},${color[2]})`
        };
        
        return(
            <div style={style}>
                <Value number={this.props.number}/>
                <Control 
                    onPlus={this.props.handleIncrement}
                    onSubtract={this.props.handleDecrement} 
                    onRandomizeColor={this.setRandomColor}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {    // parameter의 이름이 state일 뿐, Component의 state와 다르다.
    return {
        number: state.counter.number,
        color: state.ui.color
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleIncrement: () => { dispatch(actions.increment()) },
        handleDecrement: () => { dispatch(actions.decrement()) },
        handleSetColor: (color) => { dispatch(actions.setColor(color)) }
    };
    // return bindActionCreators(actions, dispatch); // --(1)
}


export default connect(mapStateToProps, mapDispatchToProps)(Counter);
