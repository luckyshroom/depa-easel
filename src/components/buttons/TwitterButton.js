import React, {Component} from "react";
import icons from "../../icons";
import insertDataBlock from "../../insertDataBlock";
import {MEDIA_TYPE_TWITTER} from "../../constants";

export default class TwitterButton extends Component {

    onClick = (e) => {
        e.preventDefault();
        const tweetId = window.prompt(this.props.i18n["Enter a Tweet ID"]);
        if (!tweetId) {
            return;
        }

        const data = {tweetId: tweetId, type: MEDIA_TYPE_TWITTER};

        this.props.onChange(insertDataBlock(this.props.editorState, data));
    };

    render() {
        return (
            <button
                className={this.props.className}
                type="button"
                onClick={this.onClick}
                title={this.props.title}>
                <icons.TwitterIcon className="sidemenu__button__icon"/>
            </button>
        );
    }
}
