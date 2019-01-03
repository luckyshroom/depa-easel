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
                        <div style={{margin: "0 12px"}}>-</div>
                        <div>Easel</div>
                    </div>
                </div>
            </div>
        </nav>
        <main className="main">
            <div className="content">
                <div className="column">Hello!</div>
            </div>
        </main>
    </div>,
    document.getElementById('app')
);
