"use strict";

import React from "react";
import ReactDOM from "react-dom";

import ProductsGrid from "./components/ProductsGrid"

import goodsArr from "./goodsArr.json"


ReactDOM.render(
    <ProductsGrid goods={goodsArr} />
    , document.getElementById('container')
);

// ReactDOM.render(
//     React.createElement(ProductsGrid, {goods: goodsArr}),
//     document.getElementById('container')
// );

// ReactDOM.render(React-элемент, DOM-элемент)
// отрисовать созданный React-элемент внутри указанного DOM-элемента

// React.createElement(имя компонента, хэш с атрибутами, содержимое)
// создать HTML-тег или разработанный нами React-компонент, передав ему указанные атрибуты