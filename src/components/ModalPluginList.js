import React, {Component} from "react";
import ModalPluginItem from "./ModalPluginItem";
import {ModalBody} from "backstage-modal";

export default class ModalPluginList extends Component {
    constructor(props) {
        super(props);
    }

    modalClose = () => this.props.toggleModalVisibility();

    onChange = () => {
        this.props.toggleModalVisibility();
        this.props.onChange();
    };

    render() {
        return (
            <ModalBody>
                <ModalPluginItem
                    toggleModalVisibility={this.modalClose}
                    plugins={this.props.plugins}
                    onChange={this.onChange}
                    editorState={this.props.editorState}/>
            </ModalBody>
        );
    }
}
