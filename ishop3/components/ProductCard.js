import React from "react";
import PropTypes from 'prop-types';

import "./ProductCard.css"

class ProductCard extends React.Component{
    static propTypes={
        // key: PropTypes.string.isRequired,
        row: PropTypes.object.isRequired
    }

    render(){
        return(
            <div className="ProductCard">
                <h2>{this.props.row.name}</h2>
                <img src={this.props.row.url} className="productImg"/>
                <div>Price: {this.props.row.price}</div>
                <div>Quantity: {this.props.row.quant}</div>
            </div>
        )
    }
}

export default ProductCard