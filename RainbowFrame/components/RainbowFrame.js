import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {
    static propTypes = {
        colors: PropTypes.array.isRequired
    }

    render() {
        let colorArr = this.props.colors;
        function putIn(result, v, i, ) {
            return ( 
                <div className = "RainbowFrame" style = {{border: "solid 8px " + v, padding: "8px"}} > 
                {/* ОБЯЗАТЕЛЬНО СТАВИТЬ ПРОБЕЛ после 8px */}
                    {result} 
                </div>
            )
        }
        let colorFrame = (colorArr.reduce(putIn, this.props.children)) // this.props.children - начальное значение

        return <div> {colorFrame} </div>
    }
}

export default RainbowFrame

