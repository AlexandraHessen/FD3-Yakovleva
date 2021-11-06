import React from "react";
import PropTypes from 'prop-types';

import "./ProductEdit.css";

class ProductEdit extends React.Component{

    static propTypes={
        code: PropTypes.number.isRequired,
        row: PropTypes.object,
        cbSave: PropTypes.func.isRequired,
        cbAdd: PropTypes.func.isRequired,
        cbChanged: PropTypes.func.isRequired,
        cbCancel: PropTypes.func.isRequired,
        isAdd: PropTypes.bool
    }

    state={
        code: this.props.code,
        name: (this.props.row)?this.props.row.name:"",
        price: (this.props.row)?this.props.row.price:"",
        url: (this.props.row)?this.props.row.url:"",
        quant: (this.props.row)?this.props.row.quant:"",

        nameNotValid: false,    // когда ошибка = true отображается  <span> с ошибкой  (логич выражение) && JSX
        priceNotValid: false,
        urlNotValid: false,
        quantNotValid: false,

        nameError: 'Please, fill the field. Value must be a string',
        priceError: 'Please, fill the field. Value must be a rational number greater than 0',
        urlError: 'Please, fill the field. Value must be a valid URL',
        quantError: 'Please, fill the field. Value must be a positive integer',

        notValidForm: false, // когда вся форма не валидна = true, т.к. buttonSave должен быть disabled= true
        isAdd: (!this.props.row)?true:null
    }

    cbChanged = (EO) => {
        this.setState({[EO.target.name]: EO.target.value,
            })
            this.props.cbChanged(true)
    }

    validate = (EO) =>{
// ----------------------- ВАЛИДАЦИЯ ВСЕХ ПОЛЕЙ ПРИ УХОДЕ С 1 ПОЛЯ-----------------------//
        if (this.state.name === ""){
            this.setState({nameNotValid: true}, this.validAll)
        } else{
            this.setState({nameNotValid: false}, this.validAll)
        }

        if ((this.state.price === "")|| (!(/^(0|[1-9]\d*)([.,]\d+)?/.test(Number(this.state.price))))){
            this.setState({priceNotValid: true}, this.validAll)
        } else{
            this.setState({priceNotValid: false}, this.validAll)
        }

        if (this.state.url === ""){
            this.setState({urlNotValid: true}, this.validAll)
        } else{
            this.setState({urlNotValid: false}, this.validAll)
        }

        if ((this.state.quant === "") || (!(/(?<![-.,])\b[0-9]+\b(?!\.[0-9])/.test(Number(this.state.quant))))){
            this.setState({quantNotValid: true}, this.validAll)
        } else{
            this.setState({quantNotValid: false}, this.validAll)
        }

// ----------------------- ВАЛИДАЦИЯ ОДНОГО ПОЛЯ ЧЕРЕЗ EO.target.name -----------------------//
                // ----------------------- ОДНА ДЛЯ ВСЕХ -----------------------//
//    if (this.state[EO.target.name] === ""){
//          this.setState({[EO.target.name + "NotValid"]: true}, this.validAll)
//    }else{
//          this.setState({[EO.target.name + "NotValid"]: false}, this.validAll)
//    }
    }

    validAll=()=>{
        if (this.state.nameNotValid||
            this.state.priceNotValid||
            this.state.urlNotValid||
            this.state.quantNotValid)
                {this.setState({notValidForm: true})
                this.props.cbChanged(true)
        } else {
                this.setState({notValidForm: false})
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
        this.props.cbChanged(false) 
    }

    cbAdd=()=>{
        this.props.cbAdd({
            code: this.props.code,
            name: this.state.name,
            price: this.state.price,
            url: this.state.url,
            quant: this.state.quant,
        })
        this.props.cbChanged(false) 
    }

    cbCancel=()=>{
        this.props.cbCancel()
        this.props.cbChanged(false) 
    }

    render(){
        return(
            <div className="ProductEdit">
                {
                    (this.state.isAdd)
                        ?<h2>Add new Product</h2>
                        :<h2>Edit existing Product</h2>
                }

                <label>ID{this.state.code}</label>
                <div>
                    <label>Name<input type="text"  value={this.state.name} name="name" onChange={this.cbChanged} onBlur={this.validate} autoFocus={this.state.isAdd}/></label>
                    {(this.state.nameNotValid)&&<span className="Error">{this.state.nameError}</span>} 
                </div>
                <div>
                    <label>Price<input type="text" value={this.state.price} name="price" onChange={this.cbChanged} onBlur={this.validate}/></label>
                    {(this.state.priceNotValid)&&<span className="Error">{this.state.priceError}</span>} 
                </div>
                <div>
                    <label>URL<input type="text" value={this.state.url} name="url" onChange={this.cbChanged} onBlur={this.validate}/></label>
                    {(this.state.urlNotValid)&&<span className="Error">{this.state.urlError}</span>} 
                </div>
                <div>
                    <label>Quantity<input type="text" value={this.state.quant} name="quant" onChange={this.cbChanged} onBlur={this.validate}/></label>
                    {(this.state.quantNotValid)&&<span className="Error">{this.state.quantError}</span>} 
                </div>

                {
                    (this.state.isAdd)
                        ?<input type="button" value="Add" onClick={this.cbAdd} disabled={this.state.notValidForm}/>
                        :<input type="button" value="Save" onClick={this.cbSave} disabled={this.state.notValidForm}/>
                }

                <input type="button" value="Cancel" onClick={this.cbCancel}/>
            </div>
            
        )
    }
}
export default ProductEdit