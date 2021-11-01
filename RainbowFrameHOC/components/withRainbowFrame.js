import React from "react";


let withRainbowFrame = colors=> Component => props=>{
    let colorFrame = colors.reduce((startElm, color)=>{
      return  <div className = "RainbowFrame" style = {{border: "solid 8px " + color, padding: "8px", textAlign: "center"}} >   {/* ОБЯЗАТЕЛЬНО СТАВИТЬ ПРОБЕЛ после 8px */}                                                       
                {startElm} 
               </div>
    }, <Component {...props} />) // <Component {...props} /> - startElm - начальное значение "вышел, был сильный"

    return <div> {colorFrame} </div>
}

export {withRainbowFrame}

//--------------------- 2 Способ forEach ---------------------//

// let withRainbowFrame = colors=> Component => props=>{
//     let code=<Component {...props} />

//     colors.forEach((color)=>{
//         code=<div className = "RainbowFrame" style = {{border: "solid 8px " + color, padding: "8px"}}>
//                 {code}
//             </div>
//         });

//     return <div> {code} </div>
// }



