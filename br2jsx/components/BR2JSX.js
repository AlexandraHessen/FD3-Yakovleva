import React from 'react';
import PropTypes from 'prop-types';

import './BR2JSX.css';

const BR2JSX = props =>{
    let regExp = /\<[^<>]+\>/;
    let textArr= props.text.split(regExp);
    let text=[];
    textArr.forEach((v, i)=>{ 
        (!(i==textArr.length-1))
        ?(text.push(v, <br key={i}/>))
        :(text.push(v))
    })
    return <div className="BR2JSX">{text}</div>
}

BR2JSX.propTypes ={
    text: PropTypes.string.isRequired,
}

export default BR2JSX;


