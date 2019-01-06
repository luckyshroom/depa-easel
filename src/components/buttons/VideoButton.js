import React, {Component} from "react";
import icons from "../../icons";
import insertDataBlock from "../../insertDataBlock";
import {MEDIA_TYPE_VIDEO} from "../../constants";

export default class VideoButton extends Component {
    constructor(props) {
        super(props);
    }

    onClick = (e) => {
        e.preventDefault();
        const src = window.prompt(this.props.i18n["Enter a URL"]);
        if (!src) {
            return;
        }

        const data = {src: src, type: MEDIA_TYPE_VIDEO};

        this.props.onChange(insertDataBlock(this.props.editorState, data));
    };

    render() {
        return (
            <button
                className={this.props.className}
                type="button"
                onClick={this.onClick}
                title={this.props.title}>
                <icons.VideoIcon className="sidemenu__button__icon"/>
            </button>
        );
    }
}
