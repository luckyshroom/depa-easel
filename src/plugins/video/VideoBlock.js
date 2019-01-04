import React, {Component} from "react";
import icons from "../../icons";

export default class VideoBlock extends Component {
    constructor(props) {
        super(props);
        this.actions = [{
                key: "delete",
                icon: icons.DeleteIcon,
                action: this.props.container.remove
        }];
    }

    _handleCaptionChange = (event) => this.props.container.updateData({caption: event.target.value});

    render() {
        return (
            <div className="card">
                <div className="embedded">
                    <iframe src={this.props.data.src} allowFullScreen/>
                </div>
                <footer className="card-footer">
                    <a className="card-footer-item">Edit</a>
                    <a className="card-footer-item" onClick={this.props.container.remove}>Delete</a>
                </footer>
            </div>
        );
    }
}
