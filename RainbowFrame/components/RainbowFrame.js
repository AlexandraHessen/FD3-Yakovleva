import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {
    static propTypes = {
        colors: PropTypes.array.isRequired
    }

    render() {
        let colorArr = this.props.colors;

// //--------------------- 1 Способ reduce ---------------------//
//         function putIn(result, v, i, ) {
//             return ( 
//                 <div className = "RainbowFrame" style = {{border: "solid 8px " + v, padding: "8px"}} >   {/* ОБЯЗАТЕЛЬНО СТАВИТЬ ПРОБЕЛ после 8px */}                                                       
//                     {result} 
//                 </div>
//             )
//         }
//         let colorFrame = (colorArr.reduce(putIn, this.props.children)) // this.props.children - начальное значение "Hello"
//                                                                        // в reduce передается 1- массив, 2 - начальное значение
//         return <div> {colorFrame} </div>

//--------------------- 2 Способ forEach ---------------------//
        let code=this.props.children //"Hello"
        colorArr.forEach((color)=>{
            code=<div className = "RainbowFrame" style = {{border: "solid 8px " + color, padding: "8px"}}>
                    {code}
                </div>
            }
        )
        // ложим в переменную начальный текст, 
        // затем в эту же перемнную каждую итерацию оборачиваем в div


        return <div> {code} </div>
    }
}

export default RainbowFrame

