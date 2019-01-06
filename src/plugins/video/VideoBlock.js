import React, {Component} from "react";

export default class VideoBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="video">
                    <iframe src={this.props.data.src} allowFullScreen/>
                </div>
                <footer className="card__footer">
                    <a className="card__footer__item" onClick={this.props.container.remove}>Delete</a>
                </footer>
            </div>
        );
    }
}
