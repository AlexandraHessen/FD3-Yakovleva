import React from "react";
import PropTypes from 'prop-types';

import "./ClientEditAdd.css";
import {mobileEvents} from './events';

class ClientEditAdd extends React.PureComponent{

    static propTypes={
        code: PropTypes.number.isRequired,
        row: PropTypes.object,
        // cbSave: PropTypes.func.isRequired,
        // cbAdd: PropTypes.func.isRequired,
        // cbChanged: PropTypes.func.isRequired,
        // cbCancel: PropTypes.func.isRequired,
    }

    state={
        code: this.props.code,
        surname: (this.props.row)?this.props.row.surname:"",
        name: (this.props.row)?this.props.row.name:"",
        patronymic: (this.props.row)?this.props.row.patronymic:"",
        balance: (this.props.row)?this.props.row.balance:"",

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

    // cbChanged = (EO) => {
    //     this.setState({[EO.target.name]: EO.target.value,
    //         })
    //         this.props.cbChanged(true)
    // }

    cbChanged = (EO) => {
        this.setState({[EO.target.name]: EO.target.value,
            })
            mobileEvents.emit('EvcbChanged', true)
    }
// -------------------------------------VALID
//     validate = (EO) =>{
// // ----------------------- ВАЛИДАЦИЯ ВСЕХ ПОЛЕЙ ПРИ УХОДЕ С 1 ПОЛЯ-----------------------//
//         if (this.newSurnameRef.value === ""){
//             this.setState({nameNotValid: true}, this.validAll)
//         } else{
//             this.setState({nameNotValid: false}, this.validAll)
//         }

//         if ((this.newNameRef.value === "")){
//             this.setState({priceNotValid: true}, this.validAll)
//         } else{
//             this.setState({priceNotValid: false}, this.validAll)
//         }

//         if (this.newPatronymicRef.value === ""){
//             this.setState({urlNotValid: true}, this.validAll)
//         } else{
//             this.setState({urlNotValid: false}, this.validAll)
//         }

//         if ((this.newBalanceRef.value === "")){
//             this.setState({quantNotValid: true}, this.validAll)
//         } else{
//             this.setState({quantNotValid: false}, this.validAll)
//         }

// // ----------------------- ВАЛИДАЦИЯ ОДНОГО ПОЛЯ ЧЕРЕЗ EO.target.name -----------------------//
//                 // ----------------------- ОДНА ДЛЯ ВСЕХ -----------------------//
// //    if (this.state[EO.target.name] === ""){
// //          this.setState({[EO.target.name + "NotValid"]: true}, this.validAll)
// //    }else{
// //          this.setState({[EO.target.name + "NotValid"]: false}, this.validAll)
// //    }
//     }

//     validAll=()=>{
//         if (this.state.nameNotValid||
//             this.state.priceNotValid||
//             this.state.urlNotValid||
//             this.state.quantNotValid)
//                 {this.setState({notValidForm: true})
//                 this.props.cbChanged(true)
//         } else {
//                 this.setState({notValidForm: false})
//         }
//     }
// -------------------------------------VALID


    // validAll=()=>{
    //     if (this.newSurnameRef.value||
    //         this.newNameRef.value||
    //         this.newPatronymicRef.value||
    //         this.newBalanceRef.value)
    //             {this.setState({notValidForm: true})
    //             this.props.cbChanged(true)
    //     } else {
    //             this.setState({notValidForm: false})
    //     }
    // }

    // cbSave=()=>{
    //     this.props.cbSave({
    //         ...this.props.row,  //взять исходный товара и заменить в нем указанные ниже значения (name, patronymic) 
    //                             // а все остальное, если есть что-то еще оставить неизменным
    //                             // т.к. code уникален и не меняется при edit и есть уже в props его можно отдельно не передавать
    //         surname: this.state.surname,
    //         name: this.state.name,
    //         patronymic: this.state.patronymic,
    //         balance: this.state.balance,
    //     })
    //     this.props.cbChanged(false) 
    // }

    // cbAdd=()=>{
    //     this.props.cbAdd({
    //         code: this.props.code,
    //         surname: this.state.surname,
    //         name: this.state.name,
    //         patronymic: this.state.patronymic,
    //         balance: this.state.balance,
    //     })
    //     this.props.cbChanged(false) 
    // }

    

    // cbCancel=()=>{
    //     this.props.cbCancel()
    //     this.props.cbChanged(false) 
    // }

    cbCancel=()=>{
        mobileEvents.emit('EvcbCancel', false)
        // this.props.cbCancel()
        // this.props.cbChanged(false) 
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


    // setNewText=()=>{
    //     if(newSurnameRef){
    //         let newText=this.newSurnameRef.value;
    //         this.setState({question:newText});
    //     }
    //     this.props.cbSave({
    //         ...this.props.row,  //взять исходный товара и заменить в нем указанные ниже значения (name, patronymic) 
    //                             // а все остальное, если есть что-то еще оставить неизменным
    //                             // т.к. code уникален и не меняется при edit и есть уже в props его можно отдельно не передавать
    //         surname: this.state.this.newSurnameRef.value,
    //         name: this.state.name,
    //         patronymic: this.state.patronymic,
    //         balance: this.state.balance,
    //     })

    // }

    // cbSave=()=>{
    //     this.props.cbSave({
    //         ...this.props.row,  //взять исходный товара и заменить в нем указанные ниже значения (name, patronymic) 
    //                             // а все остальное, если есть что-то еще оставить неизменным
    //                             // т.к. code уникален и не меняется при edit и есть уже в props его можно отдельно не передавать
    //         surname: (this.newSurnameRef)?this.newSurnameRef.value:'',
    //         name: (this.newNameRef)?this.newNameRef.value:'',
    //         patronymic: (this.newPatronymicRef)?this.newPatronymicRef.value:'',
    //         balance: (this.newBalanceRef)?this.newBalanceRef.value:'',
    //     })
    //     this.props.cbChanged(false) 
    // }

    cbSave=()=>{
        mobileEvents.emit('EvcbSave', {
            ...this.props.row,  //взять исходный товара и заменить в нем указанные ниже значения (name, patronymic) 
                                // а все остальное, если есть что-то еще оставить неизменным
                                // т.к. code уникален и не меняется при edit и есть уже в props его можно отдельно не передавать
            surname: (this.newSurnameRef)?this.newSurnameRef.value:'',
            name: (this.newNameRef)?this.newNameRef.value:'',
            patronymic: (this.newPatronymicRef)?this.newPatronymicRef.value:'',
            balance: (this.newBalanceRef)?this.newBalanceRef.value:'',
        })
        mobileEvents.emit('EvcbChanged', false)
        // this.props.cbChanged(false) 
    }

    // cbAdd=()=>{
        
    //     this.props.cbAdd({
    //         code: this.props.code,
    //         surname: (this.newSurnameRef)?this.newSurnameRef.value:'',
    //         name: (this.newNameRef)?this.newNameRef.value:'',
    //         patronymic: (this.newPatronymicRef)?this.newPatronymicRef.value:'',
    //         balance: (this.newBalanceRef)?this.newBalanceRef.value:'',
    //     })
    //     mobileEvents.emit('EvcbChanged', false)
    //     // this.props.cbChanged(false) 
    // }
    cbAdd=()=>{
        mobileEvents.emit('EvcbAdd', {
            code: this.props.code,
            surname: (this.newSurnameRef)?this.newSurnameRef.value:'',
            name: (this.newNameRef)?this.newNameRef.value:'',
            patronymic: (this.newPatronymicRef)?this.newPatronymicRef.value:'',
            balance: (this.newBalanceRef)?this.newBalanceRef.value:'',
        })
        mobileEvents.emit('EvcbChanged', false)
        // this.props.cbChanged(false) 
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
                    <label>Фамилия:<input type="text"  defaultValue={this.state.surname} ref={this.setSurnameRef} name="surname"  onBlur={this.validate} autoFocus={this.state.isAdd}/></label>
                    {(this.state.nameNotValid)&&<span className="Error">{this.state.nameError}</span>} 
                </div>
                <div>
                    <label>Имя:<input type="text" defaultValue={this.state.name} ref={this.setNameRef} name="name" onBlur={this.validate}/></label>
                    {(this.state.priceNotValid)&&<span className="Error">{this.state.priceError}</span>} 
                </div>
                <div>
                    <label>Отчество:<input type="text" defaultValue={this.state.patronymic} ref={this.setPatronymicRef} name="patronymic" onBlur={this.validate}/></label>
                    {(this.state.urlNotValid)&&<span className="Error">{this.state.urlError}</span>} 
                </div>
                <div>
                    <label>Баланс:<input type="text" defaultValue={this.state.balance} ref={this.setBalanceRef} name="balance" onBlur={this.validate}/></label>
                    {(this.state.quantNotValid)&&<span className="Error">{this.state.quantError}</span>} 
                </div>

                {
                    (this.state.isAdd)
                    // onClick={this.cbAdd}
                    // onClick={this.cbSave}
                        ?<input type="button" value="Add" onClick={this.cbAdd} disabled={this.state.notValidForm}/>
                        :<input type="button" value="Save" onClick={this.cbSave} disabled={this.state.notValidForm}/>
                }

{/* <label>ID{this.state.code}</label>
                <div>
                    <label>Фамилия:<input type="text"  value={this.state.surname} name="surname" onChange={this.cbChanged} onBlur={this.validate} autoFocus={this.state.isAdd}/></label>
                    {(this.state.nameNotValid)&&<span className="Error">{this.state.nameError}</span>} 
                </div>
                <div>
                    <label>Имя:<input type="text" value={this.state.name} name="name" onChange={this.cbChanged} onBlur={this.validate}/></label>
                    {(this.state.priceNotValid)&&<span className="Error">{this.state.priceError}</span>} 
                </div>
                <div>
                    <label>Отчество:<input type="text" value={this.state.patronymic} name="patronymic" onChange={this.cbChanged} onBlur={this.validate}/></label>
                    {(this.state.urlNotValid)&&<span className="Error">{this.state.urlError}</span>} 
                </div>
                <div>
                    <label>Баланс:<input type="text" value={this.state.balance} name="balance" onChange={this.cbChanged} onBlur={this.validate}/></label>
                    {(this.state.quantNotValid)&&<span className="Error">{this.state.quantError}</span>} 
                </div>

                {
                    (this.state.isAdd)
                        ?<input type="button" value="Add" onClick={this.cbAdd} disabled={this.state.notValidForm}/>
                        :<input type="button" value="Save" onClick={this.cbSave} disabled={this.state.notValidForm}/>
                } */}

                <input type="button" value="Cancel" onClick={this.cbCancel}/>
            </div>
            
        )
    }
}
export default ClientEditAdd