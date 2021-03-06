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
            <td className='InfoGoods'>{this.props.row.name}</td>
            <td className='InfoGoods'>{this.props.row.price}</td>
            <td className='InfoGoods'>{this.props.row.url}</td>
            <td className='InfoGoods'>{this.props.row.quant}</td>
            <td className='InfoGoods'>
                <input type='button' value='Edit' className='EditButton' onClick={this.cbEdit} disabled={this.props.isChanged}/>
            </td>
            <td className='InfoGoods'>
                <input type='button' value='Delete' className='DelButton' onClick={this.cbDelete} disabled={this.props.isChanged||this.props.isEdit}/>
        </td>
        </tr>
    }
}

export default ProductRow