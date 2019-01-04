import React, {Component} from "react";

export default class BlockData extends Component {
    render = () => <div className="block__data">{this.props.children}</div>
}
