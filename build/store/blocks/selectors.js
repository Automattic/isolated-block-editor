"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBlocks = getBlocks;
exports.getEditCount = getEditCount;
exports.getEditorSelection = getEditorSelection;
exports.hasEditorRedo = hasEditorRedo;
exports.hasEditorUndo = hasEditorUndo;

var _selectors = require("../editor/selectors");

/**
 * Get blocks from edit history
 * @param {object} state - Current state
 * @returns {object[]}
 */
function getBlocks(state) {
  return state.blocks.present.blocks;
}
/**
 * Get selection
 * @param {object} state - Current state
 * @returns {object}
 */


function getEditorSelection(state) {
  return state.blocks.present.selection;
}
/**
 * Is undo possible?
 * @param {object} state - Current state
 * @returns {boolean}
 */


function hasEditorUndo(state) {
  var _state$collab;

  if ((0, _selectors.getEditorMode)(state) !== 'visual') return false;

  if ((_state$collab = state.collab) !== null && _state$collab !== void 0 && _state$collab.undoManager) {
    return !!state.collab.undoManager.undoStack.length;
  }

  return state.blocks.past.length > 0;
}
/**
 * Is redo possible?
 * @param {object} state - Current state
 * @returns {boolean}
 */


function hasEditorRedo(state) {
  var _state$collab2;

  if ((0, _selectors.getEditorMode)(state) !== 'visual') return false;

  if ((_state$collab2 = state.collab) !== null && _state$collab2 !== void 0 && _state$collab2.undoManager) {
    return !!state.collab.undoManager.redoStack.length;
  }

  return state.blocks.future.length > 0;
}
/**
 * Get current edit count
 * @param {object} state - Current state
 * @returns {number}
 */


function getEditCount(state) {
  return state.blocks.present.editCount;
}
//# sourceMappingURL=selectors.js.map