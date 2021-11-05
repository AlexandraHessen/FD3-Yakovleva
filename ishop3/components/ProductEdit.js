import React from "react";
import PropTypes from 'prop-types';

import "./ProductEdit.css";

class ProductEdit extends React.Component{

    static propTypes={
        row: PropTypes.object.isRequired,
        cbSave: PropTypes.func.isRequired,
        // valid: true,
    }

    state={
        // row: this.props.row
        code: this.props.row.code,
        name: this.props.row.name,
        price: this.props.row.price,
        url: this.props.row.url,
        quant: this.props.row.quant,
    }

    validName = (EO) => {
        this.setState({name: EO.target.value})
        // console.log(this.state.row)
        // console.log(EO.target.name)
        // let quantity = this.state.row;
        //     quantity.name = EO.target.value;  
        //     console.log(quantity)
        // this.setState({row: quantity})

        // this.setState({row: this.state.row})
    }
    
    validPrice = (EO) => {
        this.setState({price: EO.target.value})
    }
    
    validUrl = (EO) => {
        this.setState({url: EO.target.value})
    }
    
    validQuant = (EO) => {
        this.setState({quant: EO.target.value})
    }

    cbSave=()=>{
        this.props.cbSave({
            ...this.props.row,  //взять исходный товара и заменить в нем указанне ниже значения (name, price) 
            // а все остальное если есть что-то еще оставить неизмнным
            // т.к. code уникален и не меняется при edit и есть уже в props его можно отельно не передавать
            name: this.state.name,
            price: this.state.price,
            url: this.state.url,
            quant: this.state.quant,
        })
    }

    render(){
        return(
            <div>
                {/* <label>ID{this.state.row.code}</label>
                <label>Name<input type="text" value={this.state.row.name} onChange={this.validName}/></label>
                <label>Price<input type="text" value={this.state.row.price} onChange={this.validPrice}/></label>
                <label>URL<input type="text" value={this.state.row.url} onChange={this.validUrl}/></label>
                <label>Quantity<input type="text" value={this.state.row.quant} onChange={this.validQuant}/></label> */}
                <label>ID{this.state.code}</label>
                <label>Name<input type="text" value={this.state.name} onChange={this.validName}/></label>
                <label>Price<input type="text" value={this.state.price} onChange={this.validPrice}/></label>
                <label>URL<input type="text" value={this.state.url} onChange={this.validUrl}/></label>
                <label>Quantity<input type="text" value={this.state.quant} onChange={this.validQuant}/></label>

                <input type="button" value="Save" onClick={this.cbSave}/>
                <input type="button" value="Cancel"/>
            </div>

            

        )
    }
}

export default ProductEdit