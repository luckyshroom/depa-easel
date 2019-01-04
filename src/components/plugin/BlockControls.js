import React, {Component} from "react";

export default class BlockControls extends Component {
    render = () => <div className="block__controls">{this.props.children}</div>
}
