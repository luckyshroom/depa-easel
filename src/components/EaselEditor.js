import React, {Component} from "react";
import Immutable from "immutable";
import {
    Editor,
    RichUtils,
    getDefaultKeyBinding,
    EditorState,
    genKey,
    ContentBlock,
    SelectionState
} from "draft-js";
import DefaultToolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import Media from "./Media";
import i18nConfig from "../i18n";
import notFoundPlugin from "../plugins/not-found/plugin";
import DEFAULT_PLUGINS from "../plugins/default";
import DEFAULT_ACTIONS from "../actions/default";
import DEFAULT_ENTITY_INPUTS from "../entity_inputs/default";

const NO_RESET_STYLE_DEFAULT = ["ordered-list-item", "unordered-list-item"];

export default class EaselEditor extends Component {
    static defaultProps = {
        actions: DEFAULT_ACTIONS,
        blockRendererFn: () => {},
        i18n: i18nConfig,
        language: "ru-RU"
    };

    constructor(props) {
        super(props);
        this.state = {
            readOnly: this.props.readOnly || false,
            hasFocus: false
        };
        this.plugins = this.getValidPlugins();
        this.entityInputs = this.props.entityInputs || DEFAULT_ENTITY_INPUTS;
        this.blocksWithoutStyleReset = this.props.blocksWithoutStyleReset || NO_RESET_STYLE_DEFAULT;
        this.pluginsByType = this.getPluginsByType();
        this.keyBindings = this.props.keyBindings || [];
    }

    getValidPlugins() {
        let plugins = [];
        for (let plugin of this.props.plugins || DEFAULT_PLUGINS) {
            if (!plugin || typeof plugin.type !== "string") {
                console.warn("Plugin: Missing `type` field. Details: ", plugin);
                continue;
            }
            plugins.push(plugin);
        }
        return plugins;
    }

    getPluginsByType() {
        let pluginsByType = {};

        for (let plugin of this.plugins) {
            pluginsByType[plugin.type] = plugin;
        }

        return pluginsByType;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.readOnly !== nextProps.readOnly) {
            this.setState({readOnly: nextProps.readOnly});
        }
    }

    onChange = (editorState) => this.props.onChange(editorState);

    externalKeyBindings = (e) => {
        for (const kb of this.keyBindings) {
            if (kb.isKeyBound(e)) {
                return kb.name;
            }
        }
        return getDefaultKeyBinding(e);
    };

    onTab = (event) => {
        if (this.props.onTab) {
            this.props.onTab(event);
        }
    };

    handleKeyCommand = (command) => {
        // external key bindings
        if (this.keyBindings.length) {
            const extKb = this.keyBindings.find(kb => kb.name === command);
            if (extKb) {
                extKb.action();
                return true;
            }
        }

        const {editorState} = this.props;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.props.onChange(newState);
            return true;
        }
        return false;
    };

    resetBlockStyle(editorState, selection, contentState, currentBlock, blockType) {
        const {List} = Immutable;
        const emptyBlockKey = genKey();

        const emptyBlock = new ContentBlock({
            key: emptyBlockKey,
            text: "",
            type: blockType,
            depth: 0,
            characterList: List(),
            inlineStyleRanges: []
        });
        const blockMap = contentState.getBlockMap();

        const blocksBefore = blockMap.toSeq().takeUntil(function (v) {
            return v === currentBlock;
        });
        const blocksAfter = blockMap
            .toSeq()
            .skipUntil(function (v) {
                return v === currentBlock;
            })
            .rest();

        const augmentedBlocks = [
            [currentBlock.getKey(), currentBlock],
            [emptyBlockKey, emptyBlock]
        ];

        const focusKey = emptyBlockKey;
        const newBlocks = blocksBefore
            .concat(augmentedBlocks, blocksAfter)
            .toOrderedMap();
        const newContentState = contentState.merge({
            blockMap: newBlocks,
            selectionBefore: selection,
            selectionAfter: selection.merge({
                anchorKey: focusKey,
                anchorOffset: 0,
                focusKey: focusKey,
                focusOffset: 0,
                isBackward: false
            })
        });
        const noStyle = Immutable.OrderedSet([]);
        const resetState = EditorState.push(
            editorState,
            newContentState,
            "split-block"
        );
        const emptySelection = SelectionState.createEmpty(emptyBlockKey);
        const editorSelected = EditorState.forceSelection(
            resetState,
            emptySelection
        );
        const noStyleState = EditorState.setInlineStyleOverride(
            editorSelected,
            noStyle
        );
        this.props.onChange(noStyleState);
    }

    handleReturn = (event) => {
        if (this.props.softNewLines === false) {
            return false;
        }

        if (!event.shiftKey) {
            const {editorState} = this.props;
            const selection = editorState.getSelection();
            const contentState = editorState.getCurrentContent();
            const currentBlock = contentState.getBlockForKey(selection.getEndKey());
            const endOffset = selection.getEndOffset();
            const atEndOfBlock = endOffset === currentBlock.getLength();
            const resetStyleNewLine = this.props.resetStyleNewLine;
            const noReset = this.blocksWithoutStyleReset.includes(currentBlock.type);

            if (atEndOfBlock && resetStyleNewLine) {
                const blockType = noReset ? currentBlock.type : "unstyled";
                this.resetBlockStyle(
                    editorState,
                    selection,
                    contentState,
                    currentBlock,
                    blockType
                );
                return true;
            }
            return false;
        }

        const {editorState} = this.props;

        const currentContent = editorState.getCurrentContent();
        const currentSelection = editorState.getSelection();
        const contentBlock = currentContent
            .getBlockMap()
            .get(currentSelection.getFocusKey());
        const contentText = contentBlock.getText();

        if (
            contentText.charAt(currentSelection.focusOffset - 1) === "\n" ||
            contentText.charAt(currentSelection.focusOffset) === "\n"
        ) {
            return false;
        }

        const newState = RichUtils.insertSoftNewline(editorState);
        this.props.onChange(newState);
        return true;
    };

    focus() {
        this.draftEl.focus();
    }

    setReadOnly = (readOnly) => this.setState({readOnly});

    getReadOnly = () => this.state.readOnly;

    getInitialReadOnly = () => this.props.readOnly || false;

    setInitialReadOnly = () => {
        let readOnly = this.props.readOnly || false;
        this.setState({readOnly});
    };

    handleBlockNotFound(block) {
        if (this.props.handleBlockNotFound) {
            return this.props.handleBlockNotFound(block);
        }
        return notFoundPlugin;
    }

    handleFocus = () => {
        clearTimeout(this.blurTimeoutID);

        if (!this.state.hasFocus) {
            this.setState({
                hasFocus: true
            });
        }
    };

    handleBlur = () => {
        this.blurTimeoutID = setTimeout(() => {
            if (this.state.hasFocus) {
                this.setState({
                    hasFocus: false
                });
            }
        }, 200);
    };

    componentWillUnmount() {
        clearTimeout(this.blurTimeoutID);
    }

    mediaBlockRenderer = (block) => {
        const handled = this.props.blockRendererFn(block);
        if (handled) {
            return handled;
        }

        if (block.getType() !== "atomic") {
            return null;
        }

        const type = block.getData().toObject().type;

        let plugin = this.pluginsByType[type] || this.handleBlockNotFound(block);
        if (!plugin) {
            return null;
        }

        return {
            component: Media,
            editable: false,
            props: {
                i18n: this.props.i18n[this.props.language],
                plugin: plugin,
                onChange: this.onChange,
                editorState: this.props.editorState,
                getEditorState: this.getEditorState,
                setReadOnly: this.setReadOnly,
                getReadOnly: this.getReadOnly,
                getInitialReadOnly: this.getInitialReadOnly,
                setInitialReadOnly: this.setInitialReadOnly
            }
        };
    };

    getEditorState = () => {
        return this.props.editorState;
    };

    blockStyleFn(contentBlock) {
        const type = contentBlock.getType();
        if (type === "unstyled") {
            return "paragraph";
        }
    }

    renderSidebar(props) {
        const {sidebarRendererFn} = this.props;
        if (typeof sidebarRendererFn === "function") {
            return sidebarRendererFn(props);
        }
        return <Sidebar {...props} />;
    }

    renderToolbar(props) {
        const {Toolbar = DefaultToolbar} = this.props;
        return <Toolbar {...props} />;
    }

    render() {
        const hideSidebarOnBlur = this.props.hideSidebarOnBlur || false;
        const i18n = this.props.i18n[this.props.language];
        return (
            <div className="easel">
                <div
                    className="easel-editor"
                    id={this.props.id || "easel-editor"}
                    ref={el => this.editorEl = el}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}>
                    {this.renderSidebar({
                        i18n: i18n,
                        plugins: this.plugins,
                        editorState: this.props.editorState,
                        readOnly: this.state.readOnly,
                        onChange: this.onChange,
                        maxSidebarButtons: this.props.maxSidebarButtons,
                        modalOptions: this.props.modalOptions,
                        editorHasFocus: this.state.hasFocus,
                        hideSidebarOnBlur: hideSidebarOnBlur
                    })}
                    <Editor
                        {...this.props}
                        ref={el => this.draftEl = el}
                        readOnly={this.state.readOnly}
                        blockRendererFn={this.mediaBlockRenderer}
                        blockStyleFn={this.props.blockStyleFn || this.blockStyleFn}
                        onTab={this.onTab}
                        handleKeyCommand={this.handleKeyCommand}
                        handleReturn={this.props.handleReturn || this.handleReturn}
                        keyBindingFn={this.externalKeyBindings}
                        onChange={this.onChange}/>
                    {this.renderToolbar({
                        i18n: i18n,
                        editor: this.editorEl,
                        draft: this.draftEl,
                        editorState: this.props.editorState,
                        editorHasFocus: this.state.hasFocus,
                        readOnly: this.state.readOnly,
                        onChange: this.onChange,
                        actions: this.props.actions,
                        entityInputs: this.entityInputs,
                        shouldDisplayToolbarFn: this.props.shouldDisplayToolbarFn
                    })}
                </div>
            </div>
        );
    }
}