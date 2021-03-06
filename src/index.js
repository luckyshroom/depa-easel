import React, {Component} from "react";
import ReactDOM from "react-dom";
import EaselEditor from "./components/EaselEditor";
import {Logo} from "./svg/Logo";
import {editorStateFromRaw, editorStateToJSON} from "./utils";

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: editorStateFromRaw({
                "blocks": [
                    {
                        "key": "bcto0",
                        "text": "Второй сезон сериала \"Американские боги\" по одноимённому роману Нила Геймана начнётся 10 марта 2019 года. Об этом сообщило издание Vulture, которое также опубликовало постер продолжения.",
                        "type": "unstyled",
                        "depth": 0,
                        "inlineStyleRanges": [],
                        "entityRanges": [],
                        "data": {}
                    },
                    {
                        "key": "dmd7b",
                        "text": "В новом сезоне \"Американских богов\" главные герои книги и её сериальной адаптации Тень и скандинавский бог Один прибудут в таинственный Дом на Скале. В этом месте соберутся все старые божества, которые объединятся для войны с новыми богами человечества во главе с загадочным Мистером Миром.",
                        "type": "unstyled",
                        "depth": 0,
                        "inlineStyleRanges": [],
                        "entityRanges": [],
                        "data": {}
                    },
                    {
                        "key": "6t0g",
                        "text": "Ранее телеканал Starz опубликовал дебютный тизер второго сезона \"Американских богов\". Сколько эпизодов получит продолжение, пока неизвестно.",
                        "type": "unstyled",
                        "depth": 0,
                        "inlineStyleRanges": [],
                        "entityRanges": [
                            {
                                "offset": 34,
                                "length": 14,
                                "key": 0
                            }
                        ],
                        "data": {}
                    },
                    {
                        "key": "3tk8j",
                        "text": "",
                        "type": "atomic",
                        "depth": 0,
                        "inlineStyleRanges": [],
                        "entityRanges": [],
                        "data": {
                            "src": "https://cdn.depa.io/images/jpeg/680x1020/305921_eKjl4yeKoo_ag.jpg",
                            "type": "image"
                        }
                    },
                    {
                        "key": "4us17",
                        "text": "",
                        "type": "unstyled",
                        "depth": 0,
                        "inlineStyleRanges": [],
                        "entityRanges": [],
                        "data": {}
                    }
                ],
                "entityMap": {
                    "0": {
                        "type": "LINK",
                        "mutability": "MUTABLE",
                        "data": {
                            "url": "https://shazoo.ru/2018/10/06/71032/pervyj-tizer-vtorogo-sezona-amerikanskih-bogov",
                            "href": "https://shazoo.ru/2018/10/06/71032/pervyj-tizer-vtorogo-sezona-amerikanskih-bogov"
                        }
                    }
                }
            })
        };
    }

    onChange = (editorState) => this.setState({editorState});

    render = () => <EaselEditor editorState={this.state.editorState} onChange={this.onChange}
                                readOnly={this.props.readOnly}/>
}

class Creator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditor: true,
            readOnly: true
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

    toggleReadOnly = () => this.setState({readOnly: !this.state.readOnly});

    render() {
        return (
            <div className="column">
                <section id="toggle" style={{marginBottom: 16}}>
                    <button className="button is-success is-pulled-right" onClick={this.toggleReadOnly}>Toggle</button>
                </section>
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
                    {this.state.isEditor ?
                        <Editor readOnly={this.state.readOnly}/> :
                        <textarea className="textarea" placeholder="Текст..."/>}
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
        <div className="app-container">
            <div className="content">
                <Creator/>
            </div>
        </div>
        <div className="footer-container">
            <div className="is-flex" style={{marginBottom: "1rem"}}>
                <a href="https://github.com/luckyshroom" title="Github">
                    <i className="fab fa-github fa-2x"/>
                </a>
                <a href="https://twitter.com/depa_official" title="Twitter">
                    <i className="fab fa-twitter fa-2x"/>
                </a>
                <a href="mailto:artemletter@gmail.com" title="Сообщить об ошибке">
                    <i className="fas fa-bug fa-2x"/>
                </a>
                <a><i className="fas fa-question-circle fa-2x" title="О сайте"/></a>
            </div>
            <p>Your department of unexpected research</p>
        </div>
    </div>,
    document.getElementById('app')
);
