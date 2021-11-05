import React from "react";
import PropTypes from 'prop-types';


import "./ProductsGrid.css";

import ProductRow from "./ProductRow";
import ProductEdit from "./ProductEdit";
import ProductCard from "./ProductCard";


class ProductsGrid extends React.Component{
    static propTypes={
        goods: PropTypes.array.isRequired,
    }

    state ={
        goods: this.props.goods.slice(),
        selectedProductCode: null,
        cardMode: 0,  // 0 - ничего не выводим, 1 - создание товара, 2 - редактирование товара, 3 - просмотр карточки товара
        isEdit: false,
        isDelete: false,
        isValid: true
    }

    // cbSelected =(code) =>{
    //     this.setState({selectedProductCode: code})
    // }

    cbShowCard =(code)=>{
        this.setState({cardMode: 3, selectedProductCode: code, isEdit: false})
        // (this.state.isEdit==false&&this.state.isDelete==false)
        // ?this.setState({cardMode: 3, selectedProductCode: code, isEdit: false})
        // :null
    }

    cbEdit=(code)=>{
        this.setState({
            cardMode: 2, 
            selectedProductCode: code,
            isEdit: true
        })

        console.log(this.state.cardMode)
        // this.setState()
    }

    cbSave=()=>{

    }

    cbDelete=(code)=>{
        let result=this.state.goods;
        result=result.filter(s=>(s.code!==code));
        this.setState({
            cardMode: 0,
            goods: result,
            isDelete: true
        })
    }

    render(){
        var goodsCode=this.state.goods.map( v=>
            <ProductRow key={v.code} row={v} code={v.code} 
            selectedProductCode={this.state.selectedProductCode}
            // cbSelected={this.cbSelected}
            cbShowCard={this.cbShowCard}
            cbEdit={this.cbEdit}
            cbDelete={this.cbDelete}

            />
        );

        let selectedProductRow=this.state.goods.find((v, i)=>v.code==this.state.selectedProductCode)

        return (
        <div>
            <table className='ProductsGrid'>
                <tbody>
                    <tr> 
                        <th className='Header'>Name</th>
                        <th className='Header'>Price</th>
                        <th className='Header'>URL</th>
                        <th className='Header'>Quantity</th>
                        <th className='Header'>Edit</th>
                        <th className='Header'>Delete</th>
                    </tr>
                    {goodsCode}
                </tbody>
            </table>
            <input type='button' value='New product' />
            {
                (this.state.cardMode=="1") &&
                <ProductAdd key={this.state.selectedProductCode} row={selectedProductRow} 
                />
            }

            {
                (this.state.cardMode=="2"&&this.state.isEdit==true) &&
                <ProductEdit key={this.state.selectedProductCode} row={selectedProductRow} 
                // cbSave={this.cbSave}
                />
                
            }

            {
                (this.state.cardMode=="3")&&
                <ProductCard row={selectedProductRow} 
                // key={this.state.selectedProductCode} 
                />
            }
            </div>
        )
    }
};

export default ProductsGrid;
