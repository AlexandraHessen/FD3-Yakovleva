import React from "react";
import PropTypes from 'prop-types';

import "./MobileCompany.css";
import {mobileEvents} from './events';


import MobileClient from "./MobileClient";
import ClientEditAdd from "./ClientEditAdd";

class MobileCompany extends React.PureComponent{
    static propTypes = {
        clients:PropTypes.array.isRequired,
    };

    state ={
        clients: this.props.clients,
        filterClients: 0, // фильтрация клиентов 0 - все , 1 - Активные, 2 - Заблокированные
        selectedClientCode: null,
        cardMode: 0,  // 0 - ничего не выводим, 1 - редактирование и создание товара
        lastAddCode: this.props.clients.length
    }

    componentDidMount =()=>{
        mobileEvents.addListener('EvEdit', this.evEdit);
        mobileEvents.addListener('EvDelete', this.evDelete);
        mobileEvents.addListener('EvCancel', this.evCancel);
        mobileEvents.addListener('EvSave', this.evSave);
        mobileEvents.addListener('EvAdd', this.evAdd);
    }

    componentWillUnmount =()=>{
        mobileEvents.removeListener('EvEdit', this.evEdit);
        mobileEvents.removeListener('EvDelete', this.evDelete);
        mobileEvents.removeListener('EvCancel', this.evCancel);
        mobileEvents.removeListener('EvSave', this.evSave);
        mobileEvents.removeListener('EvAdd', this.evAdd);
    }

    evEdit=(code)=>{
        this.setState({
            cardMode: 1, 
            selectedClientCode: code,
        })
    }

    add=()=>{
        let code=this.state.lastAddCode+1
        this.setState({
            selectedClientCode: code,
            cardMode: 1, 
            lastAddCode: code
        })
    }

    evSave=(editRow)=>{
        let newClients=[...this.state.clients]; // копия массива клиентов
        newClients=newClients.map(row=>(row.code==editRow.code)?editRow:row)
        this.setState({
            cardMode: 0, 
            clients: newClients,
        })
    }

    evAdd=(newRow)=>{
        let newClients=[...this.state.clients];
        newClients.push(newRow)
        this.setState({
            cardMode: 0, 
            clients: newClients,
        })
    }

    evDelete=(code)=>{
        if(confirm('Вы действительно хотите удалить товар?')){
            let result= [...this.state.clients]; 
            result=result.filter(s=>(s.code!==code));
            this.setState({
                cardMode: 0,
                clients: result,
            })
        } 
    }

    evCancel=()=>{
        this.setState({ cardMode: 0,})
    }

    allClients=()=>{
        this.setState({filterClients: 0})
    }
    activeClients=()=>{
        this.setState({filterClients: 1})
    }
    blockedClients=()=>{
        this.setState({filterClients: 2})
    }


    render(){
        console.log("Company render")

// ----------------------- ТАБЛИЦА КЛИЕНТОВ -----------------------//  
        let newClients=[...this.state.clients];
        var clientsCode=newClients.filter((client, i)=>{
            if (this.state.filterClients === 0){
                return client
            }
            if(this.state.filterClients === 1&& client.balance >= 0){
                return client
            }
            if(this.state.filterClients === 2&& client.balance < 0){
                return client
            }
        }
        )

        clientsCode=clientsCode.map( client=>{
            return  <MobileClient key={client.code} row={client} />
        }
        );

// СТРОКА ДЛЯ РАБОТЫ
         let selectedClientRow=this.state.clients.find((v, i)=>v.code==this.state.selectedClientCode)

        return (
        <div>
            <input type="button" value="Все" onClick={this.allClients}/>
            <input type="button" value="Активные" onClick={this.activeClients}/> 
            <input type="button" value="Заблокированные" onClick={this.blockedClients}/>
            <hr/>
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
            <input type='button' value='Добавить клиента' id="buttonAdd" onClick={this.add}/>

{/*----------------------- РЕДАКТИРОВАНИЕ И СОЗДАНИЕ -----------------------*/}
            {
                (this.state.cardMode=="1") &&
                <ClientEditAdd  key={this.state.selectedClientCode} 
                                code={this.state.selectedClientCode} 
                                row={selectedClientRow} 
                />
            }
        </div>
        )
    }
};

export default MobileCompany;