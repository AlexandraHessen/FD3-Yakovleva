import React from "react";
import PropTypes from 'prop-types';


class ClientCard extends React.Component{
    static propTypes={
        row: PropTypes.object.isRequired
    }

    render(){
        return(
            <div className="ClientCard">
                <div>Фамилия: {this.props.row.surname}</div>
                <div>Имя: {this.props.row.name}</div>
                <div>Отчество: {this.props.row.patronymic}</div>
                <div>Баланс: {this.props.row.balance}</div>
                <div>Статус: {this.props.row.balance}</div>
            </div>
        )
    }
}

export default ClientCard