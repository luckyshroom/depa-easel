import DraftJS from "draft-js";

import insertDataBlock from "./insertDataBlock";
import EaselEditor from "./components/EaselEditor";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import * as utils from "./utils";

const Easel = {
    DraftJS,
    EaselEditor,
    Sidebar,
    Toolbar,
    editorStateFromRaw: utils.editorStateFromRaw,
    editorStateToJSON: utils.editorStateToJSON,
    createTypeStrategy: utils.createTypeStrategy,
    insertDataBlock
};

module.exports = Easel;