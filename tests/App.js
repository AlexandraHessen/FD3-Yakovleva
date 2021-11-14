"use strict";

import React from "react";
import ReactDOM from "react-dom";

import MobileCompany from "./components/MobileCompany"

import clientsArr from "./clientsArr.json"

ReactDOM.render(
    <MobileCompany
        clients={clientsArr}
    />
    , document.getElementById('container')
);
