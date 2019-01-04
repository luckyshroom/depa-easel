import React, {Component} from "react";

export default class MediaWrapper extends Component {
    constructor(props) {
        super(props);
    }

    _handleFocus = () => {
        // temporarily set the editor to readonly
        this.props.setReadOnly(true);
    };

    _handleBlur = () => {
        // restore readonly to its original state
        this.props.setInitialReadOnly();
    };

    render = () => <div onBlur={this._handleBlur} onFocus={this._handleFocus}>{this.props.children}</div>
}
