import React, {Component} from "react";

export default class ImageBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="image">
                    <img src={this.props.data.src} alt=""/>
                </div>
                <footer className="card__footer">
                    <a className="card__footer__item" onClick={this.props.container.remove}>Delete</a>
                </footer>
            </div>
        );
    }
}
