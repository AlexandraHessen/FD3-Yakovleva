import React from "react";
import PropTypes from 'prop-types';

import "./ProductEdit.css";

class ProductEdit extends React.Component{

    static propTypes={
        row: PropTypes.object.isRequired,
        cbSave: PropTypes.func,
        // valid: true,
    }

    state={
        code: this.props.row.code,
        name: this.props.row.name,
        price: this.props.row.price,
        url: this.props.row.url,
        quant: this.props.row.quant,
    }

    validName = (EO) => {
        console.log(EO.target.value)
        this.setState({name: EO.target.value})
        
    }
    
    validPrice = (EO) => {
        console.log(EO.target.value)
    }
    
    validUrl = (EO) => {
        console.log(EO.target.value)
    }
    
    validQuant = (EO) => {
        console.log(EO.target.value)
    }

    render(){
        return(
            <div>
                <label>ID{this.state.code}</label>
                <label>Name<input type="text" value={this.state.name} onChange={this.validName}/></label>
                <label>Price<input type="text" value={this.state.price} onChange={this.validPrice}/></label>
                <label>URL<input type="text" value={this.state.url} onChange={this.validUrl}/></label>
                <label>Quantity<input type="text" value={this.state.quant} onChange={this.validQuant}/></label>

                <input type="button" value="Save"/>
                <input type="button" value="Cancel"/>
            </div>

            

        )
    }
}

export default ProductEdit