var FilterBlock=React.createClass({
    displayName: 'FilterBlock',

    propTypes: {
        text: React.PropTypes.array.isRequired,
    },

    getInitialState: function(){
        return {
            text:this.props.text,
            sorted: false,
            filtered: '',
        }
    },

    processList: function(){
        let result=this.props.text.slice();  // делаем плоскую копию массива props
        let filter=this.state.filtered;
        let sort=this.state.sorted;
        if (filter){
            result=result.filter(s=>s.text.includes(filter));
        } 
            
        if (sort){
            result=result.sort((a, b) => a.text.localeCompare(b.text)) 
            // (function (a,b){
            //     if (a.text<b.text) return -1;
            //     if (a.text>b.text) return 1;
            //     return 0;
            //     })
        } 

        this.setState({text: result})
    },

    checkboxClicked: function(EO){
        this.setState({sorted: EO.target.checked}, this.processList) // {} какие изменения внести в state, после изменения state вызвать функцию БЕЗ () которая будет работать уже с новым state

    },

    editText: function(EO){
        this.setState({filtered: EO.target.value}, this.processList)
        //EO.target-объект у которого произшло событие, т.е. input и value -его значение
    },

    reset: function(){
        this.setState({sorted: false, filtered: ''}, this.processList)
    },
    
    render: function (){
        var wordsCode=this.state.text.map( v=>
            React.DOM.option({key:v.code}, v.text)
        );

        return  React.DOM.div({className: 'FilterBlock'},
        React.DOM.input({type: 'checkbox', onClick: this.checkboxClicked, checked:this.state.sorted}),
        React.DOM.input({type: 'text', onChange: this.editText, value: this.state.filtered}), // onChange срабатывает при любом изменении и кроссбраузерное
        React.DOM.input({type: 'button', value: 'сброс', className: 'ButtonBlock', onClick: this.reset}),
        React.DOM.select({className: 'Words', size: '5'}, wordsCode)
        );
    },


})


// Положение cheked (value)  будет зависеть от state и при любых его изменения нам надо оповещать state и вносить в него изменения, 
// чтобы мы сами могли его изменять  и отслеживать изменения пользователя

// 1.	В render return ставлю checked: в зависимости от стейта this.state.sorted.
// 2.	В стейте getInitialState: добавляем sorted: false
// 3.	Потом при установке галочки пользователем вызывается функция которая у нас прописана в onClick: this.checkboxChecked
// 4.	В функции checkboxChecked меняем в стейте значение cheked  чтобы было всем известно this.setState({sorted: EO.target.checked} и передаем -вызываем функцию на перерисовку с отсортированным массивом


// Стратегия 
// 1.	Что нужно передать в props?
// 2.	Какие элементы будут меняться? Привязать эти элементы из render к state 
// 3.	При изменении элементов вызывать функции, которые будут оповещать об этих изменениях state сохранять эти данные и отрисовывать новый DOM

// Правила
// 1.	Props менять нельзя (1. Можем сохранить в state и его там менять, 2. Передать callback )
// 2.	Если что-то сохраняем то только в state
// 3.	Перерисовываем компонент только по this.setState
