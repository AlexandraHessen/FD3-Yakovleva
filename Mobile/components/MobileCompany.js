import React from "react";
import PropTypes from 'prop-types';
import memoize from 'memoizee';

import "./MobileCompany.css";
import {mobileEvents} from './events';


import MobileClient from "./MobileClient";
import ClientEditAdd from "./ClientEditAdd";
// import ClientCard from "./ClientCard";

class MobileCompany extends React.PureComponent{
    static propTypes = {
        companyName: PropTypes.string.isRequired,
        clients:PropTypes.array.isRequired,
      };

    state ={
        companyName: this.props.companyName,
        clients: this.props.clients,
        filterClients: 0, // фильтрация клиентов 0 - все , 1 - Активные, 2 - Заблокированные
        // companyName: this.props.companyName.slice(),
        selectedClientCode: null,
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

    componentDidMount =()=>{
        mobileEvents.addListener('EvShowCard', this.cbShowCard);
        mobileEvents.addListener('EvEdit', this.cbEdit);
        mobileEvents.addListener('EvDelete', this.cbDelete);
        mobileEvents.addListener('EvcbChanged', this.cbChanged);
        mobileEvents.addListener('EvcbCancel', this.cbCancel);
        mobileEvents.addListener('EvcbCancel', this.cbChanged);
        mobileEvents.addListener('EvcbSave', this.cbSave);
        mobileEvents.addListener('EvcbAdd', this.cbAdd);
    }

    componentWillUnmount =()=>{
        mobileEvents.removeListener('EvShowCard', this.cbShowCard);
        mobileEvents.removeListener('EvEdit', this.cbEdit);
        mobileEvents.removeListener('EvDelete', this.cbDelete);
        mobileEvents.removeListener('EvcbChanged', this.cbChanged);
        mobileEvents.removeListener('EvcbCancel', this.cbCancel);
        mobileEvents.removeListener('EvcbCancel', this.cbChanged);
        mobileEvents.removeListener('EvcbSave', this.cbSave);
        mobileEvents.removeListener('EvcbAdd', this.cbAdd);

    }

    cbShowCard =(code)=>{
        if (!this.state.isChanged){
            this.setState({
                cardMode: 1, 
                selectedClientCode: code, 
                isEdit: false
            })
        }
    }

    cbEdit=(code)=>{
       
            this.setState({
                cardMode: 2, 
                selectedClientCode: code,
          
        })
        // if (!this.state.isChanged){
        //     this.setState({
        //         cardMode: 2, 
        //         selectedClientCode: code,
        //         // isEdit: true
        //     })
        // }
    }

    // cbEdit=(code)=>{
    //     if (!this.state.isChanged){
    //         let changed=false;
    //         let newClients=[...this.state.clients]; // копия массива клиентов // ...  поверхностная копия (только массив элементов(ссылки на хэши)сами хэши не копировались)
    //         newClients.forEach( (c,i) => {
    //             // if ( c.code==code && c.balance!=newBalance ) { // 1. находим изменненного клиенты 
    //           if ( c.code==code) { // 1. находим изменненного клиенты 
    //             let newClient={...c}; // 2. копируем объект изменненного клиенты 
    //             // newClient.balance=newBalance;// 3. заменяем баланс копии изменненного клиента на измененный баланс
    //             newClients[i]=newClient;// 4. заменяем в массиве копии клиентов, клиента на нового такого клиента с измененным балансом
    //             changed=true;
    //         }
    //         } );
    //         if ( changed ){this.setState({clients:newClients,
    //             cardMode: 2, 
    //             selectedClientCode: code,
    //             isEdit: true
    //         });}
       
    //     }
    // }
    
    // setBalance = (code) => {
    //     let changed=false;
    //     let newClients=[...this.state.clients]; // копия массива клиентов // ...  поверхностная копия (только массив элементов(ссылки на хэши)сами хэши не копировались)
    //     newClients.forEach( (c,i) => {
    //         // if ( c.code==code && c.balance!=newBalance ) { // 1. находим изменненного клиенты 
    //       if ( c.code==code) { // 1. находим изменненного клиенты 
    //         let newClient={...c}; // 2. копируем объект изменненного клиенты 
    //         // newClient.balance=newBalance;// 3. заменяем баланс копии изменненного клиента на измененный баланс
    //         newClients[i]=newClient;// 4. заменяем в массиве копии клиентов, клиента на нового такого клиента с измененным балансом
    //         changed=true;
    //       }
    //     } );
    //     if ( changed )
    //       this.setState({clients:newClients});
    //   };


    // add=()=>{
    //     if (!this.state.isChanged && !this.state.isEdit){
    //         let code=this.state.clients.length
    //         this.setState({
    //             selectedClientCode: ++code,
    //             cardMode: 2, 
    //             isAdd: true,
    //         })
    //     }
    // }

    add=()=>{
    
            let code=this.state.clients.length
            this.setState({
                selectedClientCode: ++code,
                cardMode: 2, 
                // isAdd: true,
            })
        
        // if (!this.state.isChanged && !this.state.isEdit){
        //     let code=this.state.clients.length
        //     this.setState({
        //         selectedClientCode: ++code,
        //         cardMode: 2, 
        //         isAdd: true,
        //     })
        // }
    }



    // cbSave=(editRow)=>{
    //     let editGoods=this.state.clients.map(row=>(row.code==editRow.code)?editRow:row)
    //     this.setState({
    //         cardMode: 0, 
    //         clients: editGoods,
    //         isEdit: false
    //     })
    // }

    cbSave=(editRow)=>{
        let newClients=[...this.state.clients];
        newClients=newClients.map(row=>(row.code==editRow.code)?editRow:row)
        this.setState({
            cardMode: 0, 
            clients: newClients,
            //  isEdit: false
        })
    }


    cbAdd=(newRow)=>{
        let newClients=[...this.state.clients];
        newClients.push(newRow)
        this.setState({
            cardMode: 0, 
            clients: newClients,
        })
    }

    // cbAdd=(newRow)=>{
    //     this.state.clients.push(newRow)
    //     this.setState({
    //         cardMode: 0, 
    //     })
    // }

    cbDelete=(code)=>{
        if (!this.state.isChanged && !this.state.isEdit){
            if(confirm('Вы действительно хотите удалить товар?')){
                // let result=this.state.clients;
                let result= [...this.state.clients]; // копия массива клиентов
                result=result.filter(s=>(s.code!==code));
                this.setState({
                    cardMode: 0,
                    clients: result,
                    isDelete: true
                })
            } 
        }
    }

    cbCancel=()=>{
        this.setState({ cardMode: 0,
                        isEdit: false})
    }

    filterClients=(how)=>{
        // let changed=false;
        let newClients=[...this.state.clients]; // копия массива клиентов // ...  поверхностная копия (только массив элементов(ссылки на хэши)сами хэши не копировались)
        newClients=newClients.filter((client, i)=>{
           return client.balance<0
        })
        // newClients.filter( (client,i) => {
        //     if(client.balance<0){

        //     }
        //   if ( c.id==clientId && c.balance!=newBalance ) { // 1. находим изменненного клиенты 
        //     let newClient={...c}; // 2. копируем объект изменненного клиенты 
        //     newClient.balance=newBalance;// 3. заменяем баланс копии изменненного клиента на измененный баланс
        //     newClients[i]=newClient;// 4. заменяем в массиве копии клиентов, клиента на нового такого клиента с измененным балансом
        //     changed=true;
        //   }
        // } );
        this.setState({clients: newClients});
        // if ( changed )
        //   this.setState({clients:newClients});
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
        // console.log(this.state.filterClients)
        // console.log(this.state.clients)
// ----------------------- ТАБЛИЦА КЛИЕНТОВ -----------------------//  
        let newClients=[...this.state.clients];
        var clientsCode=newClients.filter((client, i)=>{
        if (this.state.filterClients === 0){
        return client
        }
        if(this.state.filterClients === 1&& client.balance >= 0){
            // this.setState({clients[i].active="active"})
            return client
        }
        if(this.state.filterClients === 2&& client.balance < 0){
            // this.setState({clients[i].active="blocked"})
            return client
        }
        }
        )

        clientsCode=clientsCode.map( client=>{
            return  <MobileClient key={client.code} 
                        row={client} 
                        // code={client.code} 
                        // selectedClientCode={this.state.selectedClientCode}
                        // cbShowCard={this.cbShowCard}
                        // cbEdit={this.cbEdit}
                        // cbDelete={this.cbDelete}
                        // isChanged={this.state.isChanged}
                        // isEdit={this.state.isEdit}
            />
        }
        );


        //         let clientsCode=this.state.clients.map( client=>{
        //     return  <MobileClient key={client.code} 
        //                 row={client} 
        //                 code={client.code} 
        //                 selectedClientCode={this.state.selectedClientCode}
        //                 cbShowCard={this.cbShowCard}
        //                 cbEdit={this.cbEdit}
        //                 cbDelete={this.cbDelete}
        //                 isChanged={this.state.isChanged}
        //                 isEdit={this.state.isEdit}
        //     />
        // }
        // );






        // let newClients=[...this.state.clients];

        // let sort = (newClients) =>{
        //     return newClients.filter((client, i)=>{
        //         if (this.state.filterClients === 0){
        //         return client
        //         }
        //         if(this.state.filterClients === 1&& client.balance >= 0){
        //             // this.setState({clients[i].active="active"})
        //             return client
        //         }
        //         if(this.state.filterClients === 2&& client.balance < 0){
        //             // this.setState({clients[i].active="blocked"})
        //             return client
        //         }
        //         }
        //         )
        //         .map( client=>{
        //             return  <MobileClient key={client.code} 
        //                         row={client} 
        //                         code={client.code} 
        //                         selectedClientCode={this.state.selectedClientCode}
        //                         cbShowCard={this.cbShowCard}
        //                         cbEdit={this.cbEdit}
        //                         cbDelete={this.cbDelete}
        //                         isChanged={this.state.isChanged}
        //                         isEdit={this.state.isEdit}
        //             />
        //         }
        //         );
        // }

        
        // var clientsCode=newClients.filter((client, i)=>{
        // if (this.state.filterClients === 0){
        // return client
        // }
        // if(this.state.filterClients === 1&& client.balance >= 0){
        //     // this.setState({clients[i].active="active"})
        //     return client
        // }
        // if(this.state.filterClients === 2&& client.balance < 0){
        //     // this.setState({clients[i].active="blocked"})
        //     return client
        // }
        // }
        // )


        // function clientsCodeFunc(){
        //     clientsCode=clientsCode.map( client=>{
        //         return  <MobileClient key={client.code} 
        //                     row={client} 
        //                     code={client.code} 
        //                     selectedClientCode={this.state.selectedClientCode}
        //                     cbShowCard={this.cbShowCard}
        //                     cbEdit={this.cbEdit}
        //                     cbDelete={this.cbDelete}
        //                     isChanged={this.state.isChanged}
        //                     isEdit={this.state.isEdit}
        //         />
        //     }
        //     );
            
        // }







        


// let clientsCodeFunc=()=>{
//     clientsCode=clientsCode.map( client=>{
//         return  <MobileClient key={client.code} 
//                     row={client} 
//                     code={client.code} 
//                     selectedClientCode={this.state.selectedClientCode}
//                     cbShowCard={this.cbShowCard}
//                     cbEdit={this.cbEdit}
//                     cbDelete={this.cbDelete}
//                     isChanged={this.state.isChanged}
//                     isEdit={this.state.isEdit}
//         />
//     }
//     );
    
// }

// let clientsCodeMemoizeed=memoize(clientsCodeFunc);





            // var clientsCode=this.state.clients.map( client=>{
            //     return  <MobileClient key={client.code} 
            //                 row={client} 
            //                 code={client.code} 
            //                 selectedClientCode={this.state.selectedClientCode}
            //                 cbShowCard={this.cbShowCard}
            //                 cbEdit={this.cbEdit}
            //                 cbDelete={this.cbDelete}
            //                 isChanged={this.state.isChanged}
            //                 isEdit={this.state.isEdit}
            //     />
            // }
            // );
// РАБОТАЕТ НО ЛОХОВСКОЙ
    //         var clientsCode=this.state.clients.map( client=>{
    //             if(this.state.filterClients === 0){
    //                 return  <MobileClient key={client.code} 
    //                 row={client} 
    //                 code={client.code} 
    //                 selectedClientCode={this.state.selectedClientCode}
    //                 cbShowCard={this.cbShowCard}
    //                 cbEdit={this.cbEdit}
    //                 cbDelete={this.cbDelete}
    //                 isChanged={this.state.isChanged}
    //                 isEdit={this.state.isEdit}
    //     />
    //             } 
    //                 else if(this.state.filterClients === 1&& client.balance >= 0){
    //     return  (<MobileClient key={client.code} 
    //         row={client} 
    //         code={client.code} 
    //         selectedClientCode={this.state.selectedClientCode}
    //         cbShowCard={this.cbShowCard}
    //         cbEdit={this.cbEdit}
    //         cbDelete={this.cbDelete}
    //         isChanged={this.state.isChanged}
    //         isEdit={this.state.isEdit} />)
    //   }
    //   else if(this.state.filterClients === 2&& client.balance < 0){
    //     return  (<MobileClient key={client.code} 
    //         row={client} 
    //         code={client.code} 
    //         selectedClientCode={this.state.selectedClientCode}
    //         cbShowCard={this.cbShowCard}
    //         cbEdit={this.cbEdit}
    //         cbDelete={this.cbDelete}
    //         isChanged={this.state.isChanged}
    //         isEdit={this.state.isEdit} />)
    //   }

    //         }
    //         );


// let clientsCode=this.state.clients.map( client => {
//     // если выбраны все клиенты
//     if(this.state.filterClients === '0'){
//         return  (<MobileClient key={client.code} 
//                             row={client} 
//                             code={client.code} 
//                             selectedClientCode={this.state.selectedClientCode}
//                             cbShowCard={this.cbShowCard}
//                             cbEdit={this.cbEdit}
//                             cbDelete={this.cbDelete}
//                             isChanged={this.state.isChanged}
//                             isEdit={this.state.isEdit} />)
//                             }
    
//     //если выбраны только активные клиенты
//     else if(this.state.filterClients === '1'&& client.balance > 0){
//         return  (<MobileClient key={client.code} 
//             row={client} 
//             code={client.code} 
//             selectedClientCode={this.state.selectedClientCode}
//             cbShowCard={this.cbShowCard}
//             cbEdit={this.cbEdit}
//             cbDelete={this.cbDelete}
//             isChanged={this.state.isChanged}
//             isEdit={this.state.isEdit} />)
//       }
//     //если выбраны только заблокированные клиенты
//     else if(this.state.filterClients === '2'&&client.balance <= 0){
//         return  (<MobileClient key={client.code} 
//             row={client} 
//             code={client.code} 
//             selectedClientCode={this.state.selectedClientCode}
//             cbShowCard={this.cbShowCard}
//             cbEdit={this.cbEdit}
//             cbDelete={this.cbDelete}
//             isChanged={this.state.isChanged}
//             isEdit={this.state.isEdit} />)
//     }
//   });
// var clientsCode=this.state.clients.map( client=>{
//             // если выбраны все клиенты
//             if(this.state.filterClients === '0'){
//                 return  (<MobileClient key={client.code} 
//                 row={client} 
//                 code={client.code} 
//                 selectedClientCode={this.state.selectedClientCode}
//                 cbShowCard={this.cbShowCard}
//                 cbEdit={this.cbEdit}
//                 cbDelete={this.cbDelete}
//                 isChanged={this.state.isChanged}
//                 isEdit={this.state.isEdit})} else if(this.state.filterClients === '1'&& client.balance > 0){
//                 return  (<MobileClient key={client.code} 
//                 row={client} 
//                 code={client.code} 
//                 selectedClientCode={this.state.selectedClientCode}
//                 cbShowCard={this.cbShowCard}
//                 cbEdit={this.cbEdit}
//                 cbDelete={this.cbDelete}
//                 isChanged={this.state.isChanged}
//                 isEdit={this.state.isEdit})
//                 }
//               //если выбраны только заблокированные клиенты
//               else if(this.state.clientsFilter === 'blocked'&&client.balance <= 0){
//                    return <MobClient key={client.id} client={client} balance={client.balance} />
//               }

//     />
// })
//         var clientsCode=this.state.clients.filter((client, i)=>{
//             if (this.state.filterClients="blocked"){
//                 return console.log(this.state.filterClients)
//             } else if (this.state.filterClients="all"){
//                 return console.log(this.state.filterClients)
//             }
//             console.log(this.state.filterClients)

  
//            return client.balance<0
//         }) 
        
//         console.log(clientsCode)       
//         clientsCode=clientsCode.map( client=>{
//             return  <MobileClient key={client.code} 
//                         row={client} 
//                         code={client.code} 
//                         selectedClientCode={this.state.selectedClientCode}
//                         cbShowCard={this.cbShowCard}
//                         cbEdit={this.cbEdit}
//                         cbDelete={this.cbDelete}
//                         isChanged={this.state.isChanged}
//                         isEdit={this.state.isEdit}
//             />
//         }
//         );
// console.log(clientsCode)


// СТРОКА ДЛЯ РАБОТЫ
         let selectedClientRow=this.state.clients.find((v, i)=>v.code==this.state.selectedClientCode)

        return (
        <div>
            <input type="button" value="Velcom" onClick={this.setName1} />
            <input type="button" value="MTS" onClick={this.setName2} />
            <div >Компания: {this.state.companyName}</div>
            <input type="button" value="Все" onClick={this.allClients}/>
            <input type="button" value="Активные" onClick={this.activeClients}/> 
            <input type="button" value="Заблокированные" onClick={this.blockedClients}/>
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
                    {/* {clientsCodeMemoizeed} */}
                </tbody>
            </table>
            <input type='button' value='Добавить клиента' onClick={this.add} disabled={this.state.isChanged||this.state.isEdit}/>

{/* ----------------------- ПРОСМОТР КАРТОЧКИ КЛИЕНТА -----------------------            
            {
                (this.state.cardMode=="1") &&
                <ClientCard row={selectedClientRow} 
                />
            } */}

{/*----------------------- РЕДАКТИРОВАНИЕ И СОЗДАНИЕ -----------------------*/}
            {
                (this.state.cardMode=="2") &&
                <ClientEditAdd key={this.state.selectedClientCode} 
                            code={this.state.selectedClientCode} 
                            row={selectedClientRow} 
                            // cbSave={this.cbSave}
                            // cbAdd={this.cbAdd}
                            // cbChanged={this.cbChanged}
                            // cbCancel={this.cbCancel}
                />
            }
        </div>
        )
    }
};

export default MobileCompany;