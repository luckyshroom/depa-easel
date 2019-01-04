import React, {Component} from "react";
import ReactDOM from "react-dom";
import EaselEditor from "./components/EaselEditor";
import {Logo} from "./svg/Logo";
import {editorStateFromRaw, editorStateToJSON} from "./utils";

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {editorState: editorStateFromRaw({
                "blocks": [
                    {
                        "key": "65pmo",
                        "text": "",
                        "type": "unstyled",
                        "depth": 0,
                        "inlineStyleRanges": [],
                        "entityRanges": [],
                        "data": {}
                    },
                    {
                        "key": "ead4d",
                        "text": "",
                        "type": "atomic",
                        "depth": 0,
                        "inlineStyleRanges": [],
                        "entityRanges": [],
                        "data": {
                            "src": "https://cdn.depa.io/images/jpeg/1430x645/307566_xRPYCXxR1C_28435307396_0c078338d8_k.jpg",
                            "type": "image",
                            "display": "medium"
                        }
                    },
                    {
                        "key": "c53eu",
                        "text": "",
                        "type": "unstyled",
                        "depth": 0,
                        "inlineStyleRanges": [],
                        "entityRanges": [],
                        "data": {}
                    }
                ],
                "entityMap": {}
            })};
    }

    onChange = (editorState) => {
        console.log(editorStateToJSON(editorState));
        this.setState({editorState});
    };

    render() {
        return (
            <div style={{marginLeft: 57, minHeight: 32}}>
                <EaselEditor
                    editorState={this.state.editorState}
                    onChange={this.onChange}/>
            </div>
        )
    }
}

class Creator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditor: true
        };
    }

    handleTab = (e) => {
        switch (e.currentTarget.getAttribute('id')) {
            case 'editor':
                this.setState({isEditor: true});
                break;
            case 'html':
                this.setState({isEditor: false});
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <div className="column">
                <section id="header">
                    <h4>Заголовок</h4>
                    <div className="control">
                        <input className="input" type="text" placeholder="Заголовок"/>
                    </div>
                </section>
                <section id="body">
                    <div className="tabs is-right">
                        <ul>
                            <li className={this.state.isEditor ? 'is-active' : null}>
                                <a id="editor" onClick={this.handleTab}>
                                    <span className="icon"><i className="fas fa-pencil-alt"/></span>
                                    <span>Редактор</span>
                                </a>
                            </li>
                            <li className={!this.state.isEditor ? 'is-active' : null}>
                                <a id="html" onClick={this.handleTab}>
                                    <span className="icon"><i className="fas fa-code"/></span>
                                    <span>HTML</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {this.state.isEditor ? <Editor/> : <textarea className="textarea" placeholder="Текст..."/>}
                </section>
            </div>
        )
    }
}

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
                <div className="column">
                    <Editor/>
                </div>
            </div>
        </main>
    </div>,
    document.getElementById('app')
);
