import React, {Component} from "react";

export default class ImageBlock extends Component {
    constructor(props) {
        super(props);
    }

    _handleCaptionChange = (event) => {
        event.stopPropagation();
        this.props.container.updateData({caption: event.target.value});
    };

    _handleRightsHolderChange = (event) => {
        event.stopPropagation();
        this.props.container.updateData({rightsHolder: event.target.value});
    };

    render() {
        return (
            <div className="card">
                <div className="card-image">
                    <figure className="image">
                        <img src={this.props.data.src} alt=""/>
                    </figure>
                </div>
                <footer className="card-footer">
                    <a className="card-footer-item">Edit</a>
                    <a className="card-footer-item" onClick={this.props.container.remove}>Delete</a>
                </footer>
            </div>
        );
    }
}
