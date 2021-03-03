import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { withDispatch } from '@wordpress/data';
import { KeyboardShortcuts } from '@wordpress/components';
import { rawShortcut } from '@wordpress/keycodes';
import { BlockEditorKeyboardShortcuts } from '@wordpress/block-editor';
import { EditorNotices } from '@wordpress/editor';
import { ReusableBlocksMenuItems } from '@wordpress/reusable-blocks';
/**
 * Internal dependencies
 */

import VisualEditor from './visual-editor';
import TextEditor from './text-editor';
import ConvertToGroupButtons from './convert-to-group-buttons';
import FullscreenMode from './fullscreen-mode';
import './style.scss';
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
  return createElement(Fragment, null, createElement(FullscreenMode, null), createElement(ConvertToGroupButtons, null), createElement(EditorNotices, null), isEditing && createElement(Fragment, null, createElement(BlockEditorKeyboardShortcuts, null), createElement(BlockEditorKeyboardShortcuts.Register, null)), createElement(KeyboardShortcuts, {
    bindGlobal: false,
    shortcuts: (_ref = {}, _defineProperty(_ref, rawShortcut.primary('z'), undo), _defineProperty(_ref, rawShortcut.primaryShift('z'), redo), _ref)
  }, editorMode === 'visual' && createElement(VisualEditor, null), editorMode === 'text' && createElement(TextEditor, null)), children);
}

export default withDispatch(function (dispatch) {
  var _dispatch = dispatch('isolated/editor'),
      redo = _dispatch.redo,
      undo = _dispatch.undo;

  return {
    redo: redo,
    undo: undo
  };
})(BlockEditor);
//# sourceMappingURL=index.js.map