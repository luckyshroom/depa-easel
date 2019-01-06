import React, {Component, Fragment} from "react";
import {EditorState, SelectionState, Modifier} from "draft-js";
import {ImageBlock} from "./blocks/ImageBlock";
import {VideoBlock} from "./blocks/VideoBlock";
import {MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO} from "../constants";

export default class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readOnly: this.props.blockProps.readOnly
        };
        this.onChange = this.props.blockProps.onChange;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {readOnly: nextProps.readOnly}
    }

    remove = () => {
        const editorState = this.props.blockProps.getEditorState();
        const selection = editorState.getSelection();
        const content = editorState.getCurrentContent();
        const keyAfter = content.getKeyAfter(this.props.block.key);
        const blockMap = content.getBlockMap().delete(this.props.block.key);
        const withoutAtomicBlock = content.merge({
            blockMap,
            selectionAfter: selection
        });

        const newState = EditorState.push(
            editorState,
            withoutAtomicBlock,
            "remove-range"
        );

        if (keyAfter) {
            const newSelection = new SelectionState({
                anchorKey: keyAfter,
                anchorOffset: 0,
                focusKey: keyAfter,
                focusOffset: this.props.block.getLength()
            });
            const newEditorState = EditorState.forceSelection(newState, newSelection);
            this.onChange(newEditorState);
        } else {
            this.onChange(newState);
        }
    };

    updateData = (data) => {
        const editorState = this.props.blockProps.getEditorState();
        const content = editorState.getCurrentContent();
        const selection = new SelectionState({
            anchorKey: this.props.block.key,
            anchorOffset: 0,
            focusKey: this.props.block.key,
            focusOffset: this.props.block.getLength()
        });

        const newContentState = Modifier.mergeBlockData(content, selection, data);
        const newEditorState = EditorState.push(
            editorState,
            newContentState,
            "change-block-data"
        );

        this.onChange(newEditorState);
    };

    render() {
        const data = this.props.block.getData().toJS();
        const type = this.props.blockProps.type;
        return (
            <Fragment>
                {type === MEDIA_TYPE_IMAGE ? <ImageBlock data={data}/> : null}
                {type === MEDIA_TYPE_VIDEO ? <VideoBlock data={data}/> : null}
            </Fragment>
        );
    }
}
