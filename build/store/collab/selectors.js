"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUndoManager = getUndoManager;
exports.getYDoc = getYDoc;

function getYDoc(state) {
  return state.collab.yDoc;
}

function getUndoManager(state) {
  return state.collab.undoManager;
}
//# sourceMappingURL=selectors.js.map