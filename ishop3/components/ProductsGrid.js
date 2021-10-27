import React from "react";
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import "./ProductsGrid.css";

import ProductRow from "./ProductRow";

class ProductsGrid extends React.Component{
    static propTypes={
        goods: PropTypes.array.isRequired
    }

    state ={
        goods: this.props.goods.slice(),
        selectedProductCode: null,
    }

    rowSelected =(code) =>{
        this.setState({selectedProductCode: code})
    }

    rowDelete=(code)=>{
        let result=this.state.goods;
        result=result.filter(s=>(s.code!==code));
        this.setState({goods: result})
    }

    render(){
        var goodsCode=this.state.goods.map( v=>
            <ProductRow key={v.code} row={v} code={v.code} 
            selectedProductCode={this.state.selectedProductCode}
            cbSelected={this.rowSelected}
            cbDelete={this.rowDelete}
            />
        );
        return (
            <table className='ProductsGrid'>
                <tbody>
                    <tr> 
                        <th className='Header'>Name</th>
                        <th className='Header'>Price</th>
                        <th className='Header'>URL</th>
                        <th className='Header'>Quantity</th>
                        <th className='Header'>Control</th>
                    </tr>
                    {goodsCode}
                </tbody>
            </table>


        )
        
        // DOM.table({className: 'ProductsGrid'}, 
        //     DOM.tbody(null, 
        //         DOM.tr(null, 
        //         DOM.th({className: 'Header'}, 'Name'),
        //         DOM.th({className: 'Header'}, 'Price'),
        //         DOM.th({className: 'Header'}, 'URL'),
        //         DOM.th({className: 'Header'}, 'Quantity'),
        //         DOM.th({className: 'Header'}, 'Control')),
        //         goodsCode),
        //     );
    }
};

export default ProductsGrid;

// var ProductsGrid =React.createClass({
//     displayName: 'ProductsGrid',

//     propTypes: {
//         goods: React.PropTypes.array.isRequired
//     },

//     getInitialState: function(){
//         return {
//             goods: this.props.goods.slice(),
//             selectedProductCode: null,
//         }
//     },

//     rowSelected: function(code){
//         this.setState({selectedProductCode: code})
//     },

//     rowDelete: function(code){
//         let result=this.state.goods;
//         result=result.filter(s=>(s.code!==code));
//         this.setState({goods: result})
//     },

//     render: function (){
//         var goodsCode=this.state.goods.map( v=>
//             React.createElement(ProductRow, {key:v.code, 
//                 row: v,
//                 code: v.code,
//                 selectedProductCode: this.state.selectedProductCode,
//                 cbSelected: this.rowSelected,
//                 cbDelete: this.rowDelete} )
//         );
//         return DOM.table({className: 'ProductsGrid'}, 
//             DOM.tbody(null, 
//                 DOM.tr(null, 
//                 DOM.th({className: 'Header'}, 'Name'),
//                 DOM.th({className: 'Header'}, 'Price'),
//                 DOM.th({className: 'Header'}, 'URL'),
//                 DOM.th({className: 'Header'}, 'Quantity'),
//                 DOM.th({className: 'Header'}, 'Control')),
//                 goodsCode),
//             );
//     },
// });





// Описание нового компонента с именем ИмяКомпонента:

// var ИмяКомпонента = React.createClass({
//   displayName: "отображаемое имя компонента",
//   render: function () {
//     return React.createElement(...);
//   },
// })

    // react все делит на стандартные теги и наши компоненты
    // все стандартные теги с маленькой буквы наши компоненты всегда с Большой

        // render возвращает всегда только 1 тег, если нужно больше оборачиваем все в div

        // DOM.div({className: 'Goods'}, goodsCode),
        //первый всегда атрибуты
        // все остальные параменты это содержимое ( второй и тд)
