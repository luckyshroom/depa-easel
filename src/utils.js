import {convertToRaw, convertFromRaw, EditorState, getVisibleSelectionRect} from "draft-js";
import defaultDecorator from "./decorators/defaultDecorator";

export function editorStateToJSON(editorState) {
  if (editorState) {
    const content = editorState.getCurrentContent();
    return JSON.stringify(convertToRaw(content), null, 2);
  }
}

export function editorStateFromRaw(rawContent, decorator = defaultDecorator) {
  if (rawContent) {
    const content = convertFromRaw(rawContent);
    return EditorState.createWithContent(content, decorator);
  } else {
    return EditorState.createEmpty(decorator);
  }
}

export function getSelectedBlockElement(range) {
  let node = range.startContainer;
  do {
    try {
      const nodeIsDataBlock = node.getAttribute
        ? node.getAttribute("data-block")
        : null;
      if (nodeIsDataBlock) {
        return node;
      }
      node = node.parentNode;
    } catch (error) {
      return null;
    }
  } while (node !== null);
  return null;
}

export function getSelectionCoords(editor, toolbar) {
  const editorBounds = editor.getBoundingClientRect();
  const win = editor.ownerDocument.defaultView || window;
  const rangeBounds = getVisibleSelectionRect(win);
  if (!rangeBounds || !toolbar) {
    return null;
  }
  const toolbarHeight = toolbar.offsetHeight;
  const toolbarWidth = toolbar.offsetWidth;

  const minOffsetLeft = 5;
  const minOffsetRight = 5;
  const minOffsetTop = 5;

  const rangeWidth = rangeBounds.right - rangeBounds.left;
  const arrowStyle = {};

  let offsetLeft = rangeBounds.left - editorBounds.left + rangeWidth / 2;
  arrowStyle.left = "50%";
  if (offsetLeft - toolbarWidth / 2 + editorBounds.left < minOffsetLeft) {
    offsetLeft = toolbarWidth / 2 - editorBounds.left + minOffsetLeft;
    arrowStyle.left =
      (rangeBounds.left + rangeBounds.right) / 2 - minOffsetLeft;
  }
  if (
    offsetLeft + toolbarWidth / 2 + editorBounds.left >
    win.innerWidth - minOffsetRight
  ) {
    arrowStyle.left =
      rangeBounds.left -
      (win.innerWidth - minOffsetRight - toolbarWidth) +
      (rangeBounds.right - rangeBounds.left) / 2;
    offsetLeft =
      win.innerWidth - editorBounds.left - toolbarWidth / 2 - minOffsetRight;
  }
  let offsetTop = rangeBounds.top - editorBounds.top - 14;
  arrowStyle.top = "100%";
  if (offsetTop - minOffsetTop - toolbarHeight + editorBounds.top < 0) {
    //Always make sure that, if the range bounds does not fully exists, we keep the current coordinates
    if (rangeBounds.bottom && !Number.isNaN(rangeBounds.bottom)) {
      offsetTop = rangeBounds.bottom - editorBounds.top + toolbarHeight + 14;
      arrowStyle.top = "-14px";
      arrowStyle.transform = "rotate(180deg)";
    }
  }

  return { offsetLeft, offsetTop, arrowStyle };
}

export function createTypeStrategy(type) {
  return (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === type
      );
    }, callback);
  };
}
