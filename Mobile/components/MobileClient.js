import React from "react";
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import {mobileEvents} from './events';

import "./MobileClient.css"

class MobileClient extends React.Component{
    static propTypes ={
        row: PropTypes.object.isRequired,
        code: PropTypes.number.isRequired,
        selectedProductCode: PropTypes.number,
        // cbSelected: PropTypes.func,
        // cbShowCard: PropTypes.func,
        // cbEdit: PropTypes.func,
        // cbDelete: PropTypes.func,
        isChanged: PropTypes.bool,
        isEdit: PropTypes.bool,
    }

    state={
        activeStatus: (this.props.row.balance>=0)?"active":"blocked"
    }

    // cbShowCard=(EO)=>{
    //     this.props.cbShowCard(this.props.code);
    // }

    cbShowCard=(EO)=>{
        mobileEvents.emit('EvShowCard', this.props.code)
    }

    // cbEdit=(EO)=>{
    //     EO.stopPropagation();
    //     this.props.cbEdit(this.props.code)
    // }

    cbEdit=(EO)=>{
        EO.stopPropagation();
        mobileEvents.emit('EvEdit', this.props.code)
    }

    // cbDelete=(EO)=>{
    //     EO.stopPropagation();
    //     this.props.cbDelete(this.props.code)
    // }

    cbDelete=(EO)=>{
        EO.stopPropagation();
        mobileEvents.emit('EvDelete', this.props.code)
    }

    componentWillReceiveProps = (newProps) => {
        //console.log("MobileClient id="+this.props.id+" componentWillReceiveProps");
        this.setState({
          
          activeStatus: (newProps.row.balance>=0)?"active":"blocked"
        });
        console.log(newProps)
        console.log(this.state.activeStatus)
      };

    render(){
        return <tr className={(this.props.selectedProductCode!==this.props.code)?'ProductRow':'ProductRow ProductRowSelect'} onClick={this.cbShowCard}>
            <td className='InfoGoods'>{this.props.row.surname}</td>
            <td className='InfoGoods'>{this.props.row.name}</td>
            <td className='InfoGoods'>{this.props.row.patronymic}</td>
            <td className='InfoGoods'>{this.props.row.balance}</td>
            <td className={this.state.activeStatus + " InfoGoods"}>{this.state.activeStatus}</td>
            <td className='InfoGoods'>
                <input type='button' value='Редактировать' className='EditButton' onClick={this.cbEdit} disabled={this.props.isChanged}/>
            </td>
            <td className='InfoGoods'>
                <input type='button' value='Удалить' className='DelButton' onClick={this.cbDelete} disabled={this.props.isChanged||this.props.isEdit}/>
        </td>
        </tr>
    }
}

export default MobileClient
