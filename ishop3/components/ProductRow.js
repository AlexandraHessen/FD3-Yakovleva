import React from "react";
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import "./ProductRow.css"

class ProductRow extends React.Component{
    static propTypes ={
        row: PropTypes.object.isRequired,
        code: PropTypes.number.isRequired,
        selectedProductCode: PropTypes.number,
        cbSelected: PropTypes.func,
        cbShowCard: PropTypes.func,
        cbEdit: PropTypes.func,
        cbDelete: PropTypes.func,
    }

    // cbSelected =(EO)=>{
    //     this.props.cbSelected(this.props.code);
    // }

    cbShowCard=(EO)=>{
        // this.props.cbSelected(this.props.code);
        this.props.cbShowCard(this.props.code);
        console.log("dspjd")
    }

    cbEdit=(EO)=>{
        EO.stopPropagation();
        this.props.cbEdit(this.props.code)
        
    }

    cbDelete=(EO)=>{
        EO.stopPropagation();
        confirm('Вы действительно хотите удалить товар?')
        ?this.props.cbDelete(this.props.code)
        :null
    }

    render(){
        return <tr className={(this.props.selectedProductCode!==this.props.code)?'ProductRow':'ProductRow ProductRowSelect'} onClick={this.cbShowCard}>
            <td className='InfoGoods'>{this.props.row.name}</td>
            <td className='InfoGoods'>{this.props.row.price}</td>
            <td className='InfoGoods'>{this.props.row.url}</td>
            <td className='InfoGoods'>{this.props.row.quant}</td>
            <td className='InfoGoods'>
                <input type='button' value='Edit' className='EditButton' onClick={this.cbEdit}/>
            </td>
            <td className='InfoGoods'>
                <input type='button' value='Delete' className='DelButton' onClick={this.cbDelete}/>
            </td>
        </tr>
    }
}

export default ProductRow























// var ProductRow=React.createClass({
//     displayName: 'ProductRow',

//     propTypes: {
//         row: React.PropTypes.object.isRequired,
//         code: React.PropTypes.number.isRequired,
//         selectedProductCode: React.PropTypes.number,
//         cbSelected: React.PropTypes.func,
//         cbDelete: React.PropTypes.func,
//     },

//     rowSelected: function(EO){
//         this.props.cbSelected(this.props.code);
//     },

//     rowDelete: function(){
//         confirm('Вы действительно хотите удалить товар?')
//         ?this.props.cbDelete(this.props.code)
//         :null
//     },

//     render: function(){
//         return DOM.tr({className: ((this.props.selectedProductCode!==this.props.code)?'ProductRow':'ProductRow ProductRowSelect'), onClick: this.rowSelected,},
//         // если строка выделена меняем class с белым фоном на class с цветным
//         DOM.td({className: 'InfoGoods'}, this.props.row.name),
//         DOM.td({className: 'InfoGoods'}, this.props.row.price),
//         DOM.td({className: 'InfoGoods'}, DOM.img ({src: this.props.row.url, className: 'ImgGoods'})),
//         DOM.td({className: 'InfoGoods'}, this.props.row.quant),
//         DOM.td({className: 'InfoGoods'}, 
//             DOM.input({type: 'button', value: 'Delete', className: 'DelButton', onClick: this.rowDelete}))
//         )
//     },
// });

