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
        cardMode: 0,  // 0 - ничего не выводим, 1 - просмотр карточки товара, 2 - редактирование и создание товара
        isEdit: false,
        isDelete: false,
        isValid: true,
        isChanged: false,
        isAdd: false, //проверяем когда добавляем товар чтобы рендарить в компоненте соответствущие кнопеи и тест под Add
    }

    // cbSelected =(code) =>{
    //     this.setState({selectedProductCode: code})
    // }

    cbChanged=(changed)=>{
        this.setState({isChanged: changed})

    }

    cbShowCard =(code)=>{
        if (!this.state.isChanged){
            this.setState({
                cardMode: 1, 
                selectedProductCode: code, 
                isEdit: false
            })
        }
    }

    cbEdit=(code)=>{
        if (!this.state.isChanged){
            this.setState({
                cardMode: 2, 
                selectedProductCode: code,
                isEdit: true
            })
        }
    }

    add=()=>{
        if (!this.state.isChanged){
            let code=this.state.goods.length
            this.setState({
                selectedProductCode: ++code,
                cardMode: 2, 
                isAdd: true
                // isEdit: true
            })
        }
    }

    cbSave=(editRow)=>{
        let editGoods=this.state.goods.map(row=>(row.code==editRow.code)?editRow:row)
        this.setState({
            cardMode: 0, 
            goods: editGoods
        })
    }

    cbAdd=(newRow)=>{
        console.log(this.state.goods)
        console.log(newRow)
        
        this.state.goods.push(newRow)
        this.setState({
            cardMode: 0, 
    
        })
        // console.log(addNewRow)
        console.log(this.state.goods)
    }

    cbDelete=(code)=>{
        if (!this.state.isChanged){
            if(confirm('Вы действительно хотите удалить товар?')){
                let result=this.state.goods;
                result=result.filter(s=>(s.code!==code));
                this.setState({
                    cardMode: 0,
                    goods: result,
                    isDelete: true
                })
            } 
        }
    }

    cbCancel=()=>{
        this.setState({cardMode: 0})
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

// СТРОКА ДЛЯ РАБОТЫ

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
            <input type='button' value='New product' onClick={this.add}/>

{/*----------------------- ПРОСМОТР КАРТОЧКИ -----------------------*/}            
            {
                (this.state.cardMode=="1") &&
                <ProductCard row={selectedProductRow} 
                />
            }

{/*----------------------- РЕДАКТИРОВАНИЕ И СОЗДАНИЕ -----------------------*/}
            {
                // (this.state.cardMode=="2"&&this.state.isEdit==true) &&
                (this.state.cardMode=="2") &&
                <ProductEdit key={this.state.selectedProductCode} 
                            code={this.state.selectedProductCode} 
                            row={selectedProductRow} 
                            cbSave={this.cbSave}
                            cbAdd={this.cbAdd}
                            cbChanged={this.cbChanged}
                            cbCancel={this.cbCancel}
                            // isChanged={this.state.isChanged}
                            isAdd={this.isAdd}

                />
                
            }
            </div>
        )
    }
};

export default ProductsGrid;