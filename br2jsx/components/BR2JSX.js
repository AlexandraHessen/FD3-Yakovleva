import React from 'react';
import PropTypes from 'prop-types';

import './BR2JSX.css';

const BR2JSX = props =>{
    let regExp = /\<[^<>]+\>/; //regExp для любых тегов
    // let regExp = /<br *\/?>/;
    let textArr= props.text.split(regExp);
    let text=[];

//--------------------- УДАЛЕНИЕ ЛИШНЕГО (ПЕРВОГО-ПОСЛЕДНЕГО) ЭЛ В МАССИВЕ---------------------//
    textArr.forEach((word, i)=>{ 
        if(i){ 
            text.push(<br key={i}/>)
        };         
        text.push(word)
    })

    // добавляем br вперед (не после а перед ) => получается лишний 0
    // и ставить условие что при  i true с первого индекса т.е. не равно 0(false)

    // textArr.forEach((word, i)=>{ 
    //     (!(i==textArr.length-1))
    //     ?(text.push(word, <br key={i}/>))
    //     :(text.push(word))
    // })

    return <div className="BR2JSX">{text}</div>
}

BR2JSX.propTypes ={
    text: PropTypes.string.isRequired,
}

export default BR2JSX;


