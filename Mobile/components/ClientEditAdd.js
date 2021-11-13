import React from "react";
import PropTypes from 'prop-types';

import "./ClientEditAdd.css";
import {mobileEvents} from './events';

class ClientEditAdd extends React.PureComponent{

    static propTypes={
        code: PropTypes.number.isRequired,
        row: PropTypes.object,
    }

    state={
        code: this.props.code,
        surname: (this.props.row)?this.props.row.surname:"",
        name: (this.props.row)?this.props.row.name:"",
        patronymic: (this.props.row)?this.props.row.patronymic:"",
        balance: (this.props.row)?this.props.row.balance:"",

        isAdd: (!this.props.row)?true:null
    }

    cbChanged = (EO) => {
        this.setState({[EO.target.name]: EO.target.value,
            })
    }

    evCancel=()=>{
        mobileEvents.emit('EvCancel', false)
    }

    newSurnameRef = null;
    newNameRef = null;
    newPatronymicRef = null;
    newBalanceRef = null;

    setSurnameRef=(ref)=>{
        this.newSurnameRef=ref
    }
    setNameRef=(ref)=>{
        this.newNameRef=ref
    }
    setPatronymicRef=(ref)=>{
        this.newPatronymicRef=ref
    }
    setBalanceRef=(ref)=>{
        this.newBalanceRef=ref
    }

    evSave=()=>{
        mobileEvents.emit('EvSave', {
            ...this.props.row,  //взять исходный товара и заменить в нем указанные ниже значения (name, patronymic) 
                                // а все остальное, если есть что-то еще оставить неизменным
                                // т.к. code уникален и не меняется при edit и есть уже в props его можно отдельно не передавать
            surname: (this.newSurnameRef)?this.newSurnameRef.value:'',
            name: (this.newNameRef)?this.newNameRef.value:'',
            patronymic: (this.newPatronymicRef)?this.newPatronymicRef.value:'',
            balance: (this.newBalanceRef)?this.newBalanceRef.value:'',
        })
    }

    evAdd=()=>{
        mobileEvents.emit('EvAdd', {
            code: this.props.code,
            surname: (this.newSurnameRef)?this.newSurnameRef.value:'',
            name: (this.newNameRef)?this.newNameRef.value:'',
            patronymic: (this.newPatronymicRef)?this.newPatronymicRef.value:'',
            balance: (this.newBalanceRef)?this.newBalanceRef.value:'',
        })
    }


    render(){
        console.log("Client Edit or Add render")
        return(
            <div className="ClientEditAdd">
                {
                    (this.state.isAdd)
                        ?<h2>Add new Client</h2>
                        :<h2>Edit existing Client</h2>
                }

                <label>ID{this.state.code}</label>
                <div>
                    <label>Фамилия:<input type="text"  defaultValue={this.state.surname} ref={this.setSurnameRef} name="surname" autoFocus={this.state.isAdd}/></label>
                </div>
                <div>
                    <label>Имя:<input type="text" defaultValue={this.state.name} ref={this.setNameRef} name="name"/></label>
                </div>
                <div>
                    <label>Отчество:<input type="text" defaultValue={this.state.patronymic} ref={this.setPatronymicRef} name="patronymic"/></label>
                </div>
                <div>
                    <label>Баланс:<input type="text" defaultValue={this.state.balance} ref={this.setBalanceRef} name="balance"/></label>
                </div>

                {
                    (this.state.isAdd)
                        ?<input type="button" value="Add" onClick={this.evAdd}/>
                        :<input type="button" value="Save" onClick={this.evSave}/>
                }

                <input type="button" value="Cancel" onClick={this.evCancel}/>
            </div>
            
        )
    }
}
export default ClientEditAdd