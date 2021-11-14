import React from "react";
import PropTypes from 'prop-types';


import {mobileEvents} from './events';

import "./MobileClient.css"

class MobileClient extends React.PureComponent{
    static propTypes ={
        row: PropTypes.object.isRequired,
    }

    state={
        row: this.props.row,
        activeStatus: (this.props.row.balance>=0)?"active":"blocked"
    }

    evEdit=(EO)=>{
        EO.stopPropagation();
        mobileEvents.emit('EvEdit', this.props.row.code)
    }

    evDelete=(EO)=>{
        EO.stopPropagation();
        mobileEvents.emit('EvDelete', this.props.row.code)
    }

    // componentWillReceiveProps = (newProps) => {
    //     this.setState({
    //         activeStatus: (newProps.row.balance>=0)?"active":"blocked",
    //         row: newProps.row
    //     });
    // };

    componentDidUpdate = (newProps) => {
        this.setState({
            activeStatus: (newProps.row.balance>=0)?"active":"blocked",
            row: newProps.row
        });
    };


    render(){
        console.log("Client id="+this.state.row.code+" render")

        return <tr className='ProductRow' >
            <td className='InfoGoods'>{this.state.row.surname}</td>
            <td className='InfoGoods'>{this.state.row.name}</td>
            <td className='InfoGoods'>{this.state.row.patronymic}</td>
            <td className='InfoGoods'>{this.state.row.balance}</td>
            <td className={this.state.activeStatus + " InfoGoods"}>{this.state.activeStatus}</td>
            <td className='InfoGoods'>
                <input type='button' value='Редактировать' className='EditButton' onClick={this.evEdit} disabled={this.props.isChanged}/>
            </td>
            <td className='InfoGoods'>
                <input type='button' value='Удалить' className='DelButton' onClick={this.evDelete} disabled={this.props.isChanged||this.props.isEdit}/>
        </td>
        </tr>
    }
}

export default MobileClient
