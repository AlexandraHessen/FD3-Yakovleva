// Описание нового компонента с именем ИмяКомпонента:

// var ИмяКомпонента = React.createClass({
//   displayName: "отображаемое имя компонента",
//   render: function () {
//     return React.createElement(...);
//   },
// })

var Ishop = React.createClass({
// react все делит на стандартные теги и наши компоненты
// все стандартные теги с маленькой буквы наши компоненты всегда с Большой
    displayName: 'Ishop',

// render возвращает всегда только 1 тег, если нужно больше обаращиваем все в div
    render: function(){
        var goodsCode=[];
        function goodsRender(v){
            var good=v;
            var goodCode=
            React.DOM.div({key:good.code, className: "Good"},
            //первый всегда атрибуты
            // все остальные параменты это содержимое ( второй и тд)

            React.DOM.h1({className: "Name"}, good.name),
            React.DOM.img({className: "ImgUrl", src: good.url}),
            React.DOM.h2(null, good.price ),
            React.DOM.span(null, good.info),
            );

            goodsCode.push(goodCode);
        }
        this.props.goods.forEach(goodsRender);

        return React.DOM.div({className: 'Ishop'},
            React.DOM.div({className: 'NameShop'}, this.props.name),
            React.DOM.div({className: 'Goods'}, goodsCode),
        );
    },
});