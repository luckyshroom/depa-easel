import React, {Component} from "react";
import icons from "../../icons";
import ImageBlockStyle from "./ImageBlockStyle";
import {BlockContent, BlockData, BlockInput, CommonBlock} from "../../components/plugin";

export default class ImageBlock extends Component {
    constructor(props) {
        super(props);
        this.actions = [{
                key: "delete",
                icon: icons.DeleteIcon,
                action: this.props.container.remove
        }];
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
            <CommonBlock {...this.props} actions={this.actions}>
                <BlockContent>
                    <img style={ImageBlockStyle.image} src={this.props.data.src} alt=""/>
                </BlockContent>
                <BlockData>
                    <BlockInput
                        placeholder="Caption"
                        value={this.props.data.caption}
                        onChange={this._handleCaptionChange}/>
                    <BlockInput
                        placeholder="Rights Holder"
                        value={this.props.data.rightsHolder}
                        onChange={this._handleRightsHolderChange}/>
                </BlockData>
            </CommonBlock>
        );
    }
}
