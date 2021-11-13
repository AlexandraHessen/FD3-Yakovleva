import React from "react";
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import {mobileEvents} from './events';

import "./MobileClient.css"

class MobileClient extends React.PureComponent{
    static propTypes ={
        row: PropTypes.object.isRequired,
        // code: PropTypes.number.isRequired,
        // selectedClientCode: PropTypes.number,
        // cbSelected: PropTypes.func,
        // cbShowCard: PropTypes.func,
        // cbEdit: PropTypes.func,
        // cbDelete: PropTypes.func,
        // isChanged: PropTypes.bool,
        // isEdit: PropTypes.bool,
    }

    state={
        row: this.props.row,
        activeStatus: (this.props.row.balance>=0)?"active":"blocked"
    }

    // cbShowCard=(EO)=>{
    //     this.props.cbShowCard(this.props.row.code);
    // }

    // cbShowCard=(EO)=>{
    //     mobileEvents.emit('EvShowCard', this.props.row.code)
    // }

    // cbEdit=(EO)=>{
    //     EO.stopPropagation();
    //     this.props.cbEdit(this.props.row.code)
    // }

    cbEdit=(EO)=>{
        EO.stopPropagation();
        mobileEvents.emit('EvEdit', this.props.row.code)
        // this.setBalance(this.props.row.code);
    }

    // cbDelete=(EO)=>{
    //     EO.stopPropagation();
    //     this.props.cbDelete(this.props.row.code)
    // }

    cbDelete=(EO)=>{
        EO.stopPropagation();
        mobileEvents.emit('EvDelete', this.props.row.code)
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({
            activeStatus: (newProps.row.balance>=0)?"active":"blocked",
            row: newProps.row
        });
    };

    // componentDidUpdate = (oldProps, oldState) => {
    //     if ( oldProps.row!==this.props.row )  {
    //         this.setState({row: this.props.row});
    //     }
    //   };

    render(){
        console.log("Client id="+this.state.row.code+" render")
        // console.log(this.props.row==this.state.row)
        // return <tr className={(this.props.selectedClientCode!==this.props.row.code)?'ProductRow':'ProductRow ProductRowSelect'} onClick={this.cbShowCard}></tr>
        return <tr className='ProductRow' >
            <td className='InfoGoods'>{this.state.row.surname}</td>
            <td className='InfoGoods'>{this.state.row.name}</td>
            <td className='InfoGoods'>{this.state.row.patronymic}</td>
            <td className='InfoGoods'>{this.state.row.balance}</td>
            <td className={this.state.activeStatus + " InfoGoods"}>{this.state.activeStatus}</td>
            <td className='InfoGoods'>
                <input type='button' value='Редактировать' className='EditButton' onClick={this.cbEdit} disabled={this.props.isChanged}/>
            </td>
            <td className='InfoGoods'>
                <input type='button' value='Удалить' className='DelButton' onClick={this.cbDelete} disabled={this.props.isChanged||this.props.isEdit}/>
        </td>
        </tr>
    }

    // render(){
    //     return <tr className={(this.props.selectedClientCode!==this.props.row.code)?'ProductRow':'ProductRow ProductRowSelect'} onClick={this.cbShowCard}>
    //         <td className='InfoGoods'>{this.props.row.surname}</td>
    //         <td className='InfoGoods'>{this.props.row.name}</td>
    //         <td className='InfoGoods'>{this.props.row.patronymic}</td>
    //         <td className='InfoGoods'>{this.props.row.balance}</td>
    //         <td className={this.state.activeStatus + " InfoGoods"}>{this.state.activeStatus}</td>
    //         <td className='InfoGoods'>
    //             <input type='button' value='Редактировать' className='EditButton' onClick={this.cbEdit} disabled={this.props.isChanged}/>
    //         </td>
    //         <td className='InfoGoods'>
    //             <input type='button' value='Удалить' className='DelButton' onClick={this.cbDelete} disabled={this.props.isChanged||this.props.isEdit}/>
    //     </td>
    //     </tr>
    // }

}

export default MobileClient
