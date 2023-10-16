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
 * Internal dependencies
 */

/**
 * Get blocks from edit history
 *
 * @param {Object} state - Current state
 * @return {object[]}
 */
function getBlocks(state) {
  return state.blocks.present.blocks;
}

/**
 * Get selection
 *
 * @param {Object} state - Current state
 * @return {Object}
 */
function getEditorSelection(state) {
  return state.blocks.present.selection;
}

/**
 * Is undo possible?
 *
 * @param {Object} state - Current state
 * @return {boolean}
 */
function hasEditorUndo(state) {
  if ((0, _selectors.getEditorMode)(state) !== 'visual') return false;
  return state.blocks.past.length > 0;
}

/**
 * Is redo possible?
 *
 * @param {Object} state - Current state
 * @return {boolean}
 */
function hasEditorRedo(state) {
  if ((0, _selectors.getEditorMode)(state) !== 'visual') return false;
  return state.blocks.future.length > 0;
}

/**
 * Get current edit count
 *
 * @param {Object} state - Current state
 * @return {number}
 */
function getEditCount(state) {
  return state.blocks.present.editCount;
}
//# sourceMappingURL=selectors.js.map