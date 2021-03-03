import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { compose, useResizeObserver } from '@wordpress/compose';
import { ErrorBoundary } from '@wordpress/editor';
import { withDispatch, withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import ClickOutsideWrapper from './click-outside';
import BlockEditorContents from '../block-editor-contents';
import HotSwapper from './hot-swapper';
import './style.scss';
/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */

/** @typedef {import('../../index').OnSave} OnSave */

/** @typedef {import('../../index').OnError} OnError */

/** @typedef {import('../../index').OnMore} OnMore */

/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */

/** @typedef {import('../../index').OnLoad} OnLoad */

/**
 * Set editing callback
 * @callback OnSetEditing
 * @param {boolean} isEditing
 */

var SIZE_LARGE = 720;
var SIZE_MEDIUM = 480;
/**
 * Contains the block contents. Handles the hot-swapping of the redux stores, as well as applying the root CSS classes
 *
 * @param {object} props - Component props
 * @param {object} props.children - Child components
 * @param {boolean} props.isEditorReady - The editor is ready for editing
 * @param {boolean} props.isEditing - This editor is being edited in
 * @param {boolean} props.hasFixedToolbar - Has fixed toolbar
 * @param {EditorMode} props.editorMode - 'text' or 'visual'
 * @param {string} props.className - additional class names
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnSave} props.onSave - Save callback
 * @param {OnError} props.onError - Error callback
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 * @param {OnSetEditing} props.setEditing - Set the mode to editing
 * @param {OnLoad} props.onLoad - Load initial blocks
 */

function BlockEditorContainer(props) {
  var children = props.children,
      settings = props.settings,
      onSave = props.onSave,
      className = props.className,
      onError = props.onError,
      renderMoreMenu = props.renderMoreMenu,
      onLoad = props.onLoad;
  var isEditorReady = props.isEditorReady,
      editorMode = props.editorMode,
      isEditing = props.isEditing,
      setEditing = props.setEditing,
      hasFixedToolbar = props.hasFixedToolbar;

  var _useResizeObserver = useResizeObserver(),
      _useResizeObserver2 = _slicedToArray(_useResizeObserver, 2),
      resizeListener = _useResizeObserver2[0],
      width = _useResizeObserver2[1].width;

  var classes = classnames(className, _defineProperty({
    'iso-editor': true,
    'is-large': width >= SIZE_LARGE,
    'is-medium': width >= SIZE_MEDIUM && width < SIZE_LARGE,
    'is-small': width < SIZE_MEDIUM,
    'iso-editor__loading': !isEditorReady,
    'iso-editor__selected': isEditing,
    // Match Gutenberg
    'block-editor': true,
    'edit-post-layout': true,
    'has-fixed-toolbar': hasFixedToolbar
  }, 'is-mode-' + editorMode, true));
  return createElement("div", {
    className: classes
  }, createElement(ErrorBoundary, {
    onError: onError
  }, createElement(HotSwapper, null), resizeListener, createElement(ClickOutsideWrapper, {
    onOutside: function onOutside() {
      return setEditing(false);
    },
    onFocus: function onFocus() {
      return !isEditing && setEditing(true);
    }
  }, createElement(BlockEditorContents, {
    onSave: onSave,
    settings: settings,
    renderMoreMenu: renderMoreMenu,
    onLoad: onLoad
  }, children))));
}

export default compose([withSelect(function (select) {
  var _select = select('isolated/editor'),
      isEditorReady = _select.isEditorReady,
      getEditorMode = _select.getEditorMode,
      isEditing = _select.isEditing,
      isFeatureActive = _select.isFeatureActive;

  return {
    isEditorReady: isEditorReady(),
    editorMode: getEditorMode(),
    isEditing: isEditing(),
    hasFixedToolbar: isFeatureActive('fixedToolbar')
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('isolated/editor'),
      setEditing = _dispatch.setEditing;

  return {
    setEditing: setEditing
  };
})])(BlockEditorContainer);
//# sourceMappingURL=index.js.map