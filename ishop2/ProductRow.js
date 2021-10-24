var ProductRow=React.createClass({
    displayName: 'ProductRow',

    propTypes: {
        row: React.PropTypes.object.isRequired,
        code: React.PropTypes.number.isRequired,
        selectedProductCode: React.PropTypes.number,
        cbSelected: React.PropTypes.func,
        cbDelete: React.PropTypes.func,
    },

    rowSelected: function(EO){
        this.props.cbSelected(this.props.code);
    },

    rowDelete: function(){
        confirm('Вы действительно хотите удалить товар?')
        ?this.props.cbDelete(this.props.code)
        :null
    },

    render: function(){
        return React.DOM.tr({className: ((this.props.selectedProductCode!==this.props.code)?'ProductRow':'ProductRow ProductRowSelect'), onClick: this.rowSelected,},
        // если строка выделена меняем class с белым фоном на class с цветным
        React.DOM.td({className: 'InfoGoods'}, this.props.row.name),
        React.DOM.td({className: 'InfoGoods'}, this.props.row.price),
        React.DOM.td({className: 'InfoGoods'}, React.DOM.img ({src: this.props.row.url, className: 'ImgGoods'})),
        React.DOM.td({className: 'InfoGoods'}, this.props.row.quant),
        React.DOM.td({className: 'InfoGoods'}, 
            React.DOM.input({type: 'button', value: 'Delete', className: 'DelButton', onClick: this.rowDelete}))
        )
    },
});