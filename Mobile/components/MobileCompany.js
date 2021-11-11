import React from "react";
import PropTypes from 'prop-types';

import "./MobileCompany.css";

import MobileClient from "./MobileClient";
import ClientEditAdd from "./ClientEditAdd";
import ClientCard from "./ClientCard";

class MobileCompany extends React.PureComponent{
    static propTypes = {
        companyName: PropTypes.string.isRequired,
        clients:PropTypes.array.isRequired,
      };

    state ={
        companyName: this.props.companyName,
        clients: this.props.clients,
        // companyName: this.props.companyName.slice(),
        selectedProductCode: null,
        cardMode: 0,  // 0 - ничего не выводим, 1 - просмотр карточки товара, 2 - редактирование и создание товара
        isEdit: false, // = true когда карточка  в режиме редактирования
        isDelete: false,
        isValid: true, 
        isChanged: false, //проверяем были ли внесены какие-либо изменения в форму, чтобы блокировать действия; когда = true, buttons disabled= true
        isAdd: false, //проверяем когда добавляем товар чтобы рендерить в компоненте соответствующие кнопки и текст для Add
    }

    setName1 = () => {
        this.setState({companyName:'Velcom'});
      };
    
      setName2 = () => {
        this.setState({companyName:'МТС'});
      };

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
        if (!this.state.isChanged && !this.state.isEdit){
            let code=this.state.clients.length
            this.setState({
                selectedProductCode: ++code,
                cardMode: 2, 
                isAdd: true,
            })
        }
    }

    cbSave=(editRow)=>{
        let editGoods=this.state.goods.map(row=>(row.code==editRow.code)?editRow:row)
        this.setState({
            cardMode: 0, 
            goods: editGoods,
            isEdit: false
        })
    }

    cbAdd=(newRow)=>{
        this.state.goods.push(newRow)
        this.setState({
            cardMode: 0, 
        })
    }

    cbDelete=(code)=>{
        if (!this.state.isChanged && !this.state.isEdit){
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
        this.setState({ cardMode: 0,
                        isEdit: false})
    }

    render(){
// ----------------------- ТАБЛИЦА КЛИЕНТОВ -----------------------//   
        var clientsCode=this.state.clients.map( client=>{
            let FIO={surname:client.surname, name:client.name, patronymic:client.patronymic};
            return  <MobileClient key={client.code} 
                        row={client} 
                        code={client.code} 
                        selectedProductCode={this.state.selectedProductCode}
                        cbShowCard={this.cbShowCard}
                        cbEdit={this.cbEdit}
                        cbDelete={this.cbDelete}
                        isChanged={this.state.isChanged}
                        isEdit={this.state.isEdit}
            />
        }

        );

// СТРОКА ДЛЯ РАБОТЫ
        let selectedClientRow=this.state.clients.find((v, i)=>v.code==this.state.selectedProductCode)

        return (
        <div>
            <input type="button" value="Velcom" onClick={this.setName1} />
            <input type="button" value="МТС" onClick={this.setName2} />
            <div >Компания: {this.state.companyName}</div>
            <table className='ProductsGrid'>
                <tbody>
                    <tr> 
                        <th className='Header'>Фамилия</th>
                        <th className='Header'>Имя</th>
                        <th className='Header'>Отчество</th>
                        <th className='Header'>Баланс</th>
                        <th className='Header'>Статус</th>
                        <th className='Header'>Редактировать</th>
                        <th className='Header'>Удалить</th>
                    </tr>
                    {clientsCode}
                </tbody>
            </table>
            <input type='button' value='Добавить клиента' onClick={this.add} disabled={this.state.isChanged||this.state.isEdit}/>

{/*----------------------- ПРОСМОТР КАРТОЧКИ КЛИЕНТА -----------------------*/}            
            {
                (this.state.cardMode=="1") &&
                <ClientCard row={selectedClientRow} 
                />
            }

{/*----------------------- РЕДАКТИРОВАНИЕ И СОЗДАНИЕ -----------------------*/}
            {
                (this.state.cardMode=="2") &&
                <ClientEditAdd key={this.state.selectedProductCode} 
                            code={this.state.selectedProductCode} 
                            row={selectedClientRow} 
                            cbSave={this.cbSave}
                            cbAdd={this.cbAdd}
                            cbChanged={this.cbChanged}
                            cbCancel={this.cbCancel}
                />
            }
        </div>
        )
    }
};

export default MobileCompany;