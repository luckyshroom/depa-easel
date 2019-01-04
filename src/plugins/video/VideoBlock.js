import React, {Component} from "react";

export default class VideoBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="embedded">
                    <iframe src={this.props.data.src} allowFullScreen/>
                </div>
                <footer className="card-footer">
                    <a className="card-footer-item" onClick={this.props.container.remove}>Delete</a>
                </footer>
            </div>
        );
    }
}
