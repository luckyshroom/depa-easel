import React, {Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import icons from "../icons";
import ImageButton from "./buttons/ImageButton";
import VideoButton from "./buttons/VideoButton";
import {getSelectedBlockElement} from "../utils";
import "setimmediate";

class BlockStyles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    onChange = (editorState) => this.props.onChange(editorState);

    render() {
        const className = classNames("sidemenu__items", {"sidemenu__items--open": this.props.open});
        return (
            <div>
                <ul className={className}>
                    <li className="sidemenu__item">
                        <ImageButton
                            className="sidemenu__button"
                            editorState={this.props.editorState}
                            i18n={this.props.i18n}
                            onChange={this.onChange}
                            title="image"/>
                    </li>
                    <li className="sidemenu__item">
                        <VideoButton
                            className="sidemenu__button"
                            editorState={this.props.editorState}
                            i18n={this.props.i18n}
                            onChange={this.onChange}
                            title="video"/>
                    </li>
                </ul>
            </div>
        );
    }
}

export class ToggleButton extends Component {
    render() {
        if (this.props.hideSidebarOnBlur && !this.props.hasFocus) {
            return null;
        }

        const Icon = icons.CrossIcon;

        const className = classNames("sidemenu__button", {"sidemenu__button--open": this.props.open});

        return (
            <button
                type="button"
                ref={el => this.button = el}
                className={className}
                onClick={() => {
                    this.button.focus();
                    this.props.toggle();
                }}>
                <Icon className="sidemenu__button__icon"/>
            </button>
        );
    }
}

export class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    onChange = (editorState) => this.props.onChange(editorState);

    toggle = () => this.setState({open: !this.state.open});

    render() {
        const className = classNames("sidemenu", {"sidemenu--open": this.state.open});
        return (
            <li className={className}>
                <ToggleButton
                    toggle={this.toggle}
                    hasFocus={this.props.editorHasFocus || this.state.open}
                    hideSidebarOnBlur={this.props.hideSidebarOnBlur}
                    open={this.state.open}/>
                <BlockStyles
                    i18n={this.props.i18n}
                    editorState={this.props.editorState}
                    open={this.state.open}
                    onChange={this.onChange}/>
            </li>
        );
    }
}

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {top: -4};
    }

    onChange = (editorState) => this.props.onChange(editorState);

    componentDidUpdate() {
        if (this.updatingPosition) {
            clearImmediate(this.updatingPosition);
        }
        this.updatingPosition = null;
        this.updatingPosition = setImmediate(() => this.setBarPosition());
    }

    setBarPosition() {
        const container = ReactDOM.findDOMNode(this.containerEl);
        const editor = container ? container.parentElement : null;

        const selection = window.getSelection();
        if (selection.rangeCount === 0) {
            return null;
        }

        const element = getSelectedBlockElement(selection.getRangeAt(0));

        if (!element || !container || !editor || !editor.contains(element)) {
            return;
        }

        const containerTop = container.getBoundingClientRect().top - document.documentElement.clientTop;
        let top = element.getBoundingClientRect().top - 4 - containerTop;
        top = Math.max(-4, Math.floor(top));

        if (this.state.top !== top) {
            this.setState({top: top});
        }
    }

    render() {
        if (this.props.readOnly) {
            return null;
        }
        return (
            <div
                ref={el => this.containerEl = el}
                className="sidebar">
                <div style={{top: `${this.state.top}px`}} className="sidebar__menu">
                    <ul className="sidebar__sidemenu-wrapper">
                        <SideMenu
                            editorHasFocus={this.props.editorHasFocus}
                            editorState={this.props.editorState}
                            hideSidebarOnBlur={this.props.hideSidebarOnBlur}
                            i18n={this.props.i18n}
                            onChange={this.onChange}/>
                    </ul>
                </div>
            </div>
        );
    }
}
