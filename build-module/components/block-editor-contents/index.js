import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Popover } from '@wordpress/components';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { parse, rawHandler } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import BlockEditorProvider from '../block-editor-provider';
import BlockEditorToolbar from '../block-editor-toolbar';
import BlockEditor from '../block-editor';
import getInitialEditorContent from './editor-content';
/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */

/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */

/** @typedef {import('../../index').OnLoad} OnLoad */

/** @typedef {import('../../index').OnMore} OnMore */

/**
 * Get editor selection
 * @callback OnSelection
 */

/**
 * Update callback
 * @callback OnUpdate
 * @param {object[]} blocks - Editor content to save
 */

function getInitialContent(settings, content) {
  return getInitialEditorContent(settings.iso.patterns, settings.iso.currentPattern, settings.editor.template, content);
}
/**
 * The editor itself, including toolbar
 *
 * @param {object} props - Component props
 * @param {object[]} props.blocks
 * @param {OnUpdate} props.updateBlocksWithoutUndo - Callback to update blocks
 * @param {OnUpdate} props.updateBlocksWithUndo - Callback to update blocks
 * @param {boolean} props.isEditing - Are we editing in this editor?
 * @param {EditorMode} props.editorMode - Visual or code?
 * @param {object} props.children - Child components
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 * @param {OnSelection} props.getEditorSelectionStart
 * @param {OnSelection} props.getEditorSelectionEnd
 * @param {OnLoad} props.onLoad - Load initial blocks
 */


function BlockEditorContents(props) {
  var blocks = props.blocks,
      updateBlocksWithoutUndo = props.updateBlocksWithoutUndo,
      updateBlocksWithUndo = props.updateBlocksWithUndo,
      getEditorSelectionStart = props.getEditorSelectionStart,
      getEditorSelectionEnd = props.getEditorSelectionEnd,
      isEditing = props.isEditing,
      editorMode = props.editorMode;
  var children = props.children,
      settings = props.settings,
      renderMoreMenu = props.renderMoreMenu,
      onLoad = props.onLoad; // Set initial content, if we have any, but only if there is no existing data in the editor (from elsewhere)

  useEffect(function () {
    var initialContent = getInitialContent(settings, onLoad ? onLoad(parse, rawHandler) : []);

    if (initialContent.length > 0 && (!blocks || blocks.length === 0)) {
      updateBlocksWithoutUndo(initialContent);
    }
  }, []);
  return createElement(BlockEditorProvider, {
    value: blocks || [],
    onInput: updateBlocksWithoutUndo,
    onChange: updateBlocksWithUndo,
    selectionStart: getEditorSelectionStart(),
    selectionEnd: getEditorSelectionEnd(),
    useSubRegistry: true,
    settings: settings.editor
  }, createElement(BlockEditorToolbar, {
    editorMode: editorMode,
    settings: settings,
    renderMoreMenu: renderMoreMenu
  }), createElement(BlockEditor, {
    isEditing: isEditing,
    editorMode: editorMode
  }, children), createElement(Popover.Slot, null));
}

export default compose([withSelect(function (select) {
  var _select = select('isolated/editor'),
      getBlocks = _select.getBlocks,
      getEditorSelectionStart = _select.getEditorSelectionStart,
      getEditorSelectionEnd = _select.getEditorSelectionEnd,
      getEditorMode = _select.getEditorMode,
      isEditing = _select.isEditing;

  return {
    blocks: getBlocks(),
    getEditorSelectionEnd: getEditorSelectionEnd,
    getEditorSelectionStart: getEditorSelectionStart,
    isEditing: isEditing(),
    editorMode: getEditorMode()
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('isolated/editor'),
      updateBlocksWithUndo = _dispatch.updateBlocksWithUndo,
      updateBlocksWithoutUndo = _dispatch.updateBlocksWithoutUndo;

  return {
    updateBlocksWithUndo: updateBlocksWithUndo,
    updateBlocksWithoutUndo: updateBlocksWithoutUndo
  };
})])(BlockEditorContents);
//# sourceMappingURL=index.js.map