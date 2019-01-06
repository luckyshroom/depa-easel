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
                        "text": "Universal Pictures и Illumination Entertainment опубликовали второй трейлер мультфильма \"Гринч\" (The Grinch). Режиссерами выступили Скотт Моcье (Индюки: Назад в будущее) и Ярроу Чейни (Тайная жизнь домашних животных). Главную роль в мультфильме исполнит Бенедикт Камбербетч. ",
                        "type": "unstyled",
                        "depth": 0,
                        "inlineStyleRanges": [],
                        "entityRanges": [],
                        "data": {}
                    },
                    {
                        "key": "et9ld",
                        "text": "",
                        "type": "atomic",
                        "depth": 0,
                        "inlineStyleRanges": [],
                        "entityRanges": [],
                        "data": {
                            "src": "https://www.youtube.com/embed/L8LWUyUy7jM",
                            "type": "video",
                            "display": "small"
                        }
                    },
                    {
                        "key": "d7q4k",
                        "text": "История мультфильма расскажет о Гринче и его попытках помешать жителям отметить Рождество. Однако его желанию есть причина, о которой зрителям ещё предстоит узнать.",
                        "type": "unstyled",
                        "depth": 0,
                        "inlineStyleRanges": [],
                        "entityRanges": [],
                        "data": {}
                    },
                    {
                        "key": "kki8",
                        "text": "Премьера мультфильма состоится 27 декабря.",
                        "type": "unstyled",
                        "depth": 0,
                        "inlineStyleRanges": [],
                        "entityRanges": [],
                        "data": {}
                    }
                ],
                "entityMap": {}
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
            readOnly: false
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
        <main className="main">
            <div className="content">
                <Creator/>
            </div>
        </main>
        <footer className="footer">
            <div className="links">
                <a href="https://github.com/luckyshroom"><span className="icon"><i className="fab fa-github fa-2x"/></span></a>
                <a><span className="icon"><i className="fab fa-twitter fa-2x"/></span></a>
                <a><span className="icon"><i className="fas fa-question-circle fa-2x"/></span></a>
            </div>
            <p>Your department of unexpected research</p>
        </footer>
    </div>,
    document.getElementById('app')
);
