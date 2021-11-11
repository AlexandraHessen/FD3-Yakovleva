import React from "react";
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import "./MobileClient.css"

class MobileClient extends React.Component{
    static propTypes ={
        row: PropTypes.object.isRequired,
        code: PropTypes.number.isRequired,
        selectedProductCode: PropTypes.number,
        cbSelected: PropTypes.func,
        cbShowCard: PropTypes.func,
        cbEdit: PropTypes.func,
        cbDelete: PropTypes.func,
        isChanged: PropTypes.bool,
        isEdit: PropTypes.bool,
    }

    cbShowCard=(EO)=>{
        this.props.cbShowCard(this.props.code);
    }

    cbEdit=(EO)=>{
        EO.stopPropagation();
        this.props.cbEdit(this.props.code)
    }

    cbDelete=(EO)=>{
        EO.stopPropagation();
        this.props.cbDelete(this.props.code)
    }

    render(){
        return <tr className={(this.props.selectedProductCode!==this.props.code)?'ProductRow':'ProductRow ProductRowSelect'} onClick={this.cbShowCard}>
            <td className='InfoGoods'>{this.props.row.surname}</td>
            <td className='InfoGoods'>{this.props.row.name}</td>
            <td className='InfoGoods'>{this.props.row.patronymic}</td>
            <td className='InfoGoods'>{this.props.row.balance}</td>
            <td className='InfoGoods'>{this.props.row.balance}</td>
            <td className='InfoGoods'>
                <input type='button' value='Редактировать' className='EditButton' onClick={this.cbEdit} disabled={this.props.isChanged}/>
            </td>
            <td className='InfoGoods'>
                <input type='button' value='Удалить' className='DelButton' onClick={this.cbDelete} disabled={this.props.isChanged||this.props.isEdit}/>
        </td>
        </tr>
    }
}

export default MobileClient























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
