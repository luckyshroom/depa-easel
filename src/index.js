import React from "react";
import ReactDOM from "react-dom";
import {Logo} from "./svg/Logo";

ReactDOM.render(
    <div className="wrapper">
        <nav className="navbar has-shadow is-fixed-top-desktop">
            <div className="container">
                <div className="navbar-brand">
                    <div className="navbar-item">
                        <a href="https://depa.io"><Logo width="80" height="40"/></a>
                        <text style={{margin: "0 12px"}}>-</text>
                        <text>Easel</text>
                    </div>
                </div>
            </div>
        </nav>
        <main className="main">
            <div className="content">
                <div className="column"><text>Hello!</text></div>
            </div>
        </main>
    </div>,
    document.getElementById('app')
);
