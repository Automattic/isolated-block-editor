"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUndoManager = setUndoManager;
exports.setYDoc = setYDoc;

function setYDoc(doc) {
  return {
    type: 'SET_COLLAB_YJS_DOC',
    doc: doc
  };
}

function setUndoManager(undoManager) {
  return {
    type: 'SET_COLLAB_UNDO_MANAGER',
    undoManager: undoManager
  };
}
//# sourceMappingURL=actions.js.map