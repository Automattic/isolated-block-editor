"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _keycodes = require("@wordpress/keycodes");

var _blockEditor = require("@wordpress/block-editor");

var _editor = require("@wordpress/editor");

var _reusableBlocks = require("@wordpress/reusable-blocks");

var _visualEditor = _interopRequireDefault(require("./visual-editor"));

var _textEditor = _interopRequireDefault(require("./text-editor"));

var _convertToGroupButtons = _interopRequireDefault(require("./convert-to-group-buttons"));

var _fullscreenMode = _interopRequireDefault(require("./fullscreen-mode"));

require("./style.scss");

import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */

/**
 * Undo/redo
 * @callback OnHistory
 */

/**
 * The editor component. Contains the visual or text editor, along with keyboard handling.
 *
 * Note: the keyboard handling is specific to this editor and *not* global
 *
 * @param {object} props - Component props
 * @param {boolean} props.isEditing - Are we editing in this editor?
 * @param {EditorMode} props.editorMode - Visual or code?
 * @param {object} props.children - Child components
 * @param {OnHistory} props.undo
 * @param {OnHistory} props.redo
 */
function BlockEditor(props) {
  var _ref;

  var isEditing = props.isEditing,
      editorMode = props.editorMode,
      children = props.children,
      undo = props.undo,
      redo = props.redo;
  return createElement(Fragment, null, createElement(_fullscreenMode["default"], null), createElement(_convertToGroupButtons["default"], null), createElement(_editor.EditorNotices, null), isEditing && createElement(Fragment, null, createElement(_blockEditor.BlockEditorKeyboardShortcuts, null), createElement(_blockEditor.BlockEditorKeyboardShortcuts.Register, null)), createElement(_components.KeyboardShortcuts, {
    bindGlobal: false,
    shortcuts: (_ref = {}, (0, _defineProperty2["default"])(_ref, _keycodes.rawShortcut.primary('z'), undo), (0, _defineProperty2["default"])(_ref, _keycodes.rawShortcut.primaryShift('z'), redo), _ref)
  }, editorMode === 'visual' && createElement(_visualEditor["default"], null), editorMode === 'text' && createElement(_textEditor["default"], null)), children);
}

var _default = (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('isolated/editor'),
      redo = _dispatch.redo,
      undo = _dispatch.undo;

  return {
    redo: redo,
    undo: undo
  };
})(BlockEditor);

exports["default"] = _default;
//# sourceMappingURL=index.js.map