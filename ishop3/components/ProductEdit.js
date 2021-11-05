import React from "react";
import PropTypes from 'prop-types';

import "./ProductEdit.css";

class ProductEdit extends React.Component{

    static propTypes={
        row: PropTypes.object.isRequired,
        cbSave: PropTypes.func.isRequired,
    }

    state={
        code: this.props.row.code,
        name: this.props.row.name,
        price: this.props.row.price,
        url: this.props.row.url,
        quant: this.props.row.quant,

        isValidName: false,    // если валидно то false, потому что ошибка <span> отображается при true  (логич выражение) && JSX
        isValidPrice: false,
        isValidUrl: false,
        isValidQuant: false,

        nameError: 'Please, fill the field. Value must be a string',
        priceError: 'Please, fill the field. Value must be a rational number greater than 0',
        urlError: 'Please, fill the field. Value must be a valid URL',
        quantError: 'Please, fill the field. Value must be a positive integer',

        isValidForm: false, // если валидно то false, потому что при ошибке button disabled= true
        isChangedForm: true
    }

    validName = (EO) => {
        if (EO.target.value === ""){
            this.setState({isValidName: true})
        } else{
            this.setState({name: EO.target.value})
        }
    }
    
    validPrice = (EO) => {
        if (EO.target.value === ""){
            this.setState({isValidPrice: true})
        } else{
            this.setState({price: EO.target.value})
        }
    }
    
    validUrl = (EO) => {
        if (EO.target.value === ""){
            this.setState({isValidUrl: true})
        } else{
            this.setState({url: EO.target.value})
        }
    }
    
    validQuant = (EO) => {
        if (EO.target.value === ""){
            this.setState({isValidQuant: true})
        } else{
            this.setState({quant: EO.target.value})
        }
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
            <div className="ProductEdit">
                <label>ID{this.state.code}</label>
                <div>
                    <label>Name<input type="text" value={this.state.name} onChange={this.validName}/></label>
                    {(this.state.isValidName)&&<span className="Error">{this.state.nameError}</span>} 
                </div>
                <div>
                    <label>Price<input type="text" value={this.state.price} onChange={this.validPrice}/></label>
                    {(this.state.isValidPrice)&&<span className="Error">{this.state.priceError}</span>} 
                </div>
                <div>
                    <label>URL<input type="text" value={this.state.url} onChange={this.validUrl}/></label>
                    {(this.state.isValidUrl)&&<span className="Error">{this.state.urlError}</span>} 
                </div>
                <div>
                    <label>Quantity<input type="text" value={this.state.quant} onChange={this.validQuant}/></label>
                    {(this.state.isValidQuant)&&<span className="Error">{this.state.quantError}</span>} 
                </div>

                <input type="button" value="Save" onClick={this.cbSave} disabled={this.state.isValidForm}/>
                <input type="button" value="Cancel"/>
            </div>
            
        )
    }
}

export default ProductEdit