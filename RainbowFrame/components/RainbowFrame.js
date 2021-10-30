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
        // let code=this.props.children //"Hello"
        // colorArr.forEach((color)=>{
        //     code=<div className = "RainbowFrame" style = {{border: "solid 8px " + color, padding: "8px"}}>
        //             {code}
        //         </div>
        //     }
        // )
        // // ложим в переменную начальный текст, 
        // // затем в эту же перемнную каждую итерацию оборачиваем в div


        // return <div> {code} </div>

//--------------------- 3 Способ Рекурсия ---------------------//
        if (this.props.colors.length == 0) {
            return this.props.children;
        } else {
            return ( 
                <div className = "RainbowFrame" style = {{border: "solid 8px " + this.props.colors[0], padding: "8px"}} >   {/* ОБЯЗАТЕЛЬНО СТАВИТЬ ПРОБЕЛ после 8px */}                                                       
                    <RainbowFrame colors={this.props.colors.slice(1)}>
                        {this.props.children}
                    </RainbowFrame>
               </div>
            )
        }
        // 5. Создаем условие остановы - когда в массиве colors не будет цветов
        //    тогда отрисовываем Hello 
        // 
        // 1. Создаем div с нулевым 0 цветом
        // 2. Потом внутри него заново вызываем RainbowFrame компонент
        // 3. передавая ему в props массив colors без уже отрисованного 0 - colors.slice(1) т.е. возвращается массив с первого
        // и так будет разворачиваться весь массив пока .colors.length == 0 и тогда
        // 4. мы отрисует Hello но для того чтобы пробросить его от первого div до последнего нам надо передавать его {this.props.children}
    }
}

export default RainbowFrame

