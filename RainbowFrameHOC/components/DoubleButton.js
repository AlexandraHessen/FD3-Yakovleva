import React from 'react';
import PropTypes from 'prop-types';

import "./DoubleButton.css"

class DoubleButton extends React.Component{
    static propTypes={
        caption1: PropTypes.string.isRequired,
        caption2: PropTypes.string.isRequired,
        cbPressed: PropTypes.func.isRequired
    }

    cbPressed = (num) => {
        this.props.cbPressed(num);
    };

    render(){
        return(
            <div>
                <input type="button" value={this.props.caption1} onClick={() => this.cbPressed("1")} className="DoubleButton"/>
                {this.props.children}
                <input type="button" value={this.props.caption2} onClick={() => this.cbPressed("2")} className="DoubleButton"/>
            </div>
        )
    }
}

export default DoubleButton