import React from "react";
import PropTypes from 'prop-types';

import "./ProductEdit.css";

class ProductEdit extends React.Component{

    static propTypes={
        row: PropTypes.object.isRequired,
        cbSave: PropTypes.func.isRequired,
        cbChanged: PropTypes.func.isRequired,
        isChanged: PropTypes.bool.isRequired
    }

    state={
        code: this.props.row.code,
        name: this.props.row.name,
        price: this.props.row.price,
        url: this.props.row.url,
        quant: this.props.row.quant,

        notValidName: false,    // если валидно то false, потому что ошибка <span> отображается при true  (логич выражение) && JSX
        notValidPrice: false,
        notValidUrl: false,
        notValidQuant: false,

        nameError: 'Please, fill the field. Value must be a string',
        priceError: 'Please, fill the field. Value must be a rational number greater than 0',
        urlError: 'Please, fill the field. Value must be a valid URL',
        quantError: 'Please, fill the field. Value must be a positive integer',

        notValidForm: false, // если валидно то false, потому что при ошибке button disabled= true
        // isChanged: this.props.isChanged
    }

    // cbChanged = () =>{

    // }

    cbChanged = (EO) => {
        this.setState({[EO.target.name]: EO.target.value,
            })
            this.props.cbChanged(true) 
            // let cbChanged = () =>{
            //     this.props.cbChanged(true) 
            // }

    }
    // cbChanged = () =>{

    // }

    // changed = (EO) => {
    //     this.setState({[EO.target.name]: EO.target.value,
    //         isChanged: true})
    //         let cbChanged = () =>{
    //             this.props.cbChanged(true) 
    //         }

    // }
                // специально у каждого input добавила name такое же как имя ключа в объекте row, 
                // чтобы через EO.target.name автоматически находить key и изменять объект



    // changePrice = (EO) => {
    //     console.log( EO.target.name)
    //     let keyName=EO.target.name
    //     console.log( this.state)
    //     console.log( this.state)
    //     this.setState({[keyName]: EO.target.value})
    // }
    // changeUrl = (EO) => {
    //     this.setState({url: EO.target.value})
    // }
    // changeQuant = (EO) => {
    //     this.setState({quant: EO.target.value})
    // }

    // validValue=()=>{
    //     if (this.state.name === ""){
    //         this.setState({notValidName: true})
    //     } else{
    //         this.setState({notValidName: false})
    //     }
    // }


    validate = () =>{
        if (this.state.name === ""){
            this.setState({notValidName: true})
        } else{
            this.setState({notValidName: false})
        }

        if (this.state.price === ""){
            this.setState({notValidPrice: true})
        } else{
            this.setState({notValidPrice: false})
        }

        if (this.state.url === ""){
            this.setState({notValidUrl: true})
        } else{
            this.setState({notValidUrl: false})
        }

        if (this.state.quant === ""){
            this.setState({notValidQuant: true})
        } else{
            this.setState({notValidQuant: false})
        }
        
        if (this.state.notValidName||
            this.state.notValidPrice||
            this.state.notValidUrl||
            this.state.notValidQuant)
    {
        this.setState({notValidForm: true})
    } else{
        this.setState({notValidForm: false})
    }
        // console.log(this.state.notValidName||
        //     this.state.notValidPrice||
        //     this.state.notValidUrl||
        //     this.state.notValidQuant)
        //     console.log(this.state.notValidName)
        // if ((this.state.name === "")&&
        //     (this.state.price === "")&&
        //     (this.state.url === "")&&
        //     (this.state.quant === ""))
        // {
        //     this.setState({notValidForm: true})
        // } else{
        //     this.setState({notValidForm: false})
        // }
    }
    
    // validPrice = (EO) => {
    //     if (EO.target.value === ""){
    //         this.setState({notValidPrice: true})
    //     } else{
    //         this.setState({price: EO.target.value})
    //     }
    // }
    
    // validUrl = (EO) => {
    //     if (EO.target.value === ""){
    //         this.setState({notValidUrl: true})
    //     } else{
    //         this.setState({url: EO.target.value})
    //     }
    // }
    
    // validQuant = (EO) => {
    //     if (EO.target.value === ""){
    //         this.setState({notValidQuant: true})
    //     } else{
    //         this.setState({quant: EO.target.value})
    //     }
    // }

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

    render(){
        return(
            <div className="ProductEdit">
                <label>ID{this.state.code}</label>
                <div>
                    <label>Name<input type="text" value={this.state.name} name="name" onChange={this.cbChanged} onBlur={this.validate}/></label>
                    {(this.state.notValidName)&&<span className="Error">{this.state.nameError}</span>} 
                </div>
                <div>
                    <label>Price<input type="text" value={this.state.price} name="price" onChange={this.cbChanged} onBlur={this.validate}/></label>
                    {/* <label>Price<input type="text" value={this.state.price} onChange={this.validPrice}/></label> */}
                    {(this.state.notValidPrice)&&<span className="Error">{this.state.priceError}</span>} 
                </div>
                <div>
                    <label>URL<input type="text" value={this.state.url} name="url" onChange={this.cbChanged} onBlur={this.validate}/></label>
                    {/* <label>URL<input type="text" value={this.state.url} onChange={this.validUrl}/></label> */}
                    {/* <label>URL<input type="text" value={this.state.url} onChange={this.validUrl}/></label> */}
                    {(this.state.notValidUrl)&&<span className="Error">{this.state.urlError}</span>} 
                </div>
                <div>
                    <label>Quantity<input type="text" value={this.state.quant} name="quant" onChange={this.cbChanged} onBlur={this.validate}/></label>
                    {/* <label>Quantity<input type="text" value={this.state.quant} onChange={this.validQuant}/></label> */}
                    {(this.state.notValidQuant)&&<span className="Error">{this.state.quantError}</span>} 
                </div>

                <input type="button" value="Save" onClick={this.cbSave} disabled={this.state.notValidForm}/>
                <input type="button" value="Cancel"/>
            </div>
            
        )
    }
}

export default ProductEdit