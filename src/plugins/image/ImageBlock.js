import React, {Component} from "react";

export default class ImageBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.container)
        return (
            <div className="card">
                <div className="card-image">
                    <figure className="image">
                        <img src={this.props.data.src} alt=""/>
                    </figure>
                </div>
                <footer className="card-footer">
                    <a className="card-footer-item" onClick={this.props.container.remove}>Delete</a>
                </footer>
            </div>
        );
    }
}
