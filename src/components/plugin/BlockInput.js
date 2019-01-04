import React, {Component} from "react";
import classNames from "classnames";

import icons from "../../icons";

export default class BlockInput extends Component {
    static renderError(error) {
        if (!error) {
            return;
        }
        return <div className="block__input__error-text">{error}</div>;
    }

    static _handleDrop(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    render() {
        let {value, error, styles, ...props} = this.props;
        styles = styles || {};

        let className = classNames({
            block__input: true,
            "block__input--empty": !value,
            "block__input--error": error,
            [`block__input--${styles.padding}-padding`]: styles.padding,
            [`block__input--${styles.text}-text`]: styles.text
        });

        return (
            <div className="block__input__row">
                <div className="block__input__wrapper">
                    <input
                        {...props}
                        value={value}
                        type="text"
                        className={className}
                        onDrop={BlockInput._handleDrop}/>
                    <icons.EditIcon className="block__input__icon"/>
                </div>
                {BlockInput.renderError(error)}
            </div>
        );
    }
}
