import React, {Component} from "react";
import icons from "../../icons";
import {replaceData} from "../../i18n";

class NotFoundBlock extends Component {
    constructor(props) {
        super(props);

        this.actions = [
            {
                key: "delete",
                icon: icons.DeleteIcon,
                action: this.props.container.remove
            }
        ];
    }

    render() {
        const {i18n} = this.props;
        const text = replaceData(
            i18n["Can't show plugin, component {{type}} not found."],
            {type: this.props.data.type.toString()}
        );
        return (
            <div className="card">
                <div className="card-content">{text}</div>
            </div>
        );
    }
}

export default NotFoundBlock;
