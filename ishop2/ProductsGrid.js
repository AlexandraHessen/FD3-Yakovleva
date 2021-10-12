var ProductsGrid =React.createClass({
    displayName: 'ProductsGrid',

    propTypes: {
        goods: React.PropTypes.array.isRequired
    },

    getInitialState: function(){
        return {
            goods: this.props.goods.slice(),
            selectedProductCode: null,
        }
    },

    rowSelected: function(code){
        this.setState({selectedProductCode: code})
    },

    rowDelete: function(code){
        let result=this.state.goods;
        result=result.filter(s=>(s.code!==code));
        this.setState({goods: result})
    },

    render: function (){
        var goodsCode=this.state.goods.map( v=>
            React.createElement(ProductRow, {key:v.code, 
                row: v,
                code: v.code,
                selectedProductCode: this.state.selectedProductCode,
                cbSelected: this.rowSelected,
                cbDelete: this.rowDelete} )
        );
        return React.DOM.table({className: 'ProductsGrid'}, 
            React.DOM.tbody(null, 
                React.DOM.tr(null, 
                React.DOM.th({className: 'Header'}, 'Name'),
                React.DOM.th({className: 'Header'}, 'Price'),
                React.DOM.th({className: 'Header'}, 'URL'),
                React.DOM.th({className: 'Header'}, 'Quantity'),
                React.DOM.th({className: 'Header'}, 'Control')),
                goodsCode),
            );
    },
});




// Описание нового компонента с именем ИмяКомпонента:

// var ИмяКомпонента = React.createClass({
//   displayName: "отображаемое имя компонента",
//   render: function () {
//     return React.createElement(...);
//   },
// })

    // react все делит на стандартные теги и наши компоненты
    // все стандартные теги с маленькой буквы наши компоненты всегда с Большой

        // render возвращает всегда только 1 тег, если нужно больше оборачиваем все в div

        // React.DOM.div({className: 'Goods'}, goodsCode),
        //первый всегда атрибуты
        // все остальные параменты это содержимое ( второй и тд)
