"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classnames2 = _interopRequireDefault(require("classnames"));
var _compose = require("@wordpress/compose");
var _editor = require("@wordpress/editor");
var _data = require("@wordpress/data");
var _clickOutside = _interopRequireDefault(require("./click-outside"));
var _blockEditorContents = _interopRequireDefault(require("../block-editor-contents"));
var _hotSwapper = _interopRequireDefault(require("./hot-swapper"));
require("./style.scss");
import { createElement } from "@wordpress/element";
// @ts-nocheck
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */
/** @typedef {import('../../index').OnError} OnError */
/** @typedef {import('../../index').OnMore} OnMore */
/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */
/** @typedef {import('../../index').OnLoad} OnLoad */
/** @typedef {import('../block-editor-contents/index').OnUpdate} OnUpdate */
/**
 * Set editing callback
 *
 * @callback OnSetEditing
 * @param {boolean} isEditing
 */
var SIZE_LARGE = 720;
var SIZE_MEDIUM = 480;

/**
 * Contains the block contents. Handles the hot-swapping of the redux stores, as well as applying the root CSS classes
 *
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @param {boolean} props.isEditorReady - The editor is ready for editing
 * @param {boolean} props.isEditing - This editor is being edited in
 * @param {boolean} props.isPreview - Whether preview mode is enabled
 * @param {boolean} props.hasFixedToolbar - Has fixed toolbar
 * @param {EditorMode} props.editorMode - 'text' or 'visual'
 * @param {string} props.className - additional class names
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnError} props.onError - Error callback
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 * @param {OnSetEditing} props.setEditing - Set the mode to editing
 * @param {OnLoad} props.onLoad - Load initial blocks
 * @param {OnUpdate} [props.onInput] - Gutenberg's onInput callback
 * @param {OnUpdate} [props.onChange] - Gutenberg's onChange callback
 * @param {object[]} [props.blocks] - Gutenberg's blocks
 */
function BlockEditorContainer(props) {
  var _classnames;
  var children = props.children,
    settings = props.settings,
    className = props.className,
    onError = props.onError,
    renderMoreMenu = props.renderMoreMenu,
    onLoad = props.onLoad,
    onInput = props.onInput,
    onChange = props.onChange,
    blocks = props.blocks;
  var isEditorReady = props.isEditorReady,
    editorMode = props.editorMode,
    isEditing = props.isEditing,
    setEditing = props.setEditing,
    hasFixedToolbar = props.hasFixedToolbar,
    isPreview = props.isPreview;
  var _useResizeObserver = (0, _compose.useResizeObserver)(),
    _useResizeObserver2 = (0, _slicedToArray2["default"])(_useResizeObserver, 2),
    resizeListener = _useResizeObserver2[0],
    width = _useResizeObserver2[1].width;
  var classes = (0, _classnames2["default"])(className, (_classnames = {
    'iso-editor': true,
    'is-large': width ? width >= SIZE_LARGE : false,
    'is-medium': width ? width >= SIZE_MEDIUM && width < SIZE_LARGE : true,
    'is-small': width ? width < SIZE_MEDIUM : false,
    'iso-editor__loading': !isEditorReady,
    'iso-editor__selected': isEditing,
    // Match Gutenberg
    'block-editor': true,
    'edit-post-layout': true,
    'has-fixed-toolbar': hasFixedToolbar
  }, (0, _defineProperty2["default"])(_classnames, 'is-mode-' + editorMode, true), (0, _defineProperty2["default"])(_classnames, 'is-preview-mode', isPreview), _classnames));
  return createElement("div", {
    className: classes
  }, createElement(_editor.ErrorBoundary, {
    onError: onError
  }, createElement(_hotSwapper["default"], null), resizeListener, createElement(_clickOutside["default"], {
    onOutside: function onOutside() {
      return setEditing(false);
    },
    onFocus: function onFocus() {
      return !isEditing && setEditing(true);
    }
  }, createElement(_blockEditorContents["default"], {
    blocks: blocks,
    settings: settings,
    renderMoreMenu: renderMoreMenu,
    onLoad: onLoad,
    onInput: onInput,
    onChange: onChange
  }, children))));
}
var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('isolated/editor'),
    isEditorReady = _select.isEditorReady,
    getEditorMode = _select.getEditorMode,
    isEditing = _select.isEditing,
    isFeatureActive = _select.isFeatureActive,
    isOptionActive = _select.isOptionActive;
  return {
    isEditorReady: isEditorReady(),
    editorMode: getEditorMode(),
    isEditing: isEditing(),
    hasFixedToolbar: isFeatureActive('fixedToolbar'),
    isPreview: isOptionActive('preview')
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('isolated/editor'),
    setEditing = _dispatch.setEditing;
  return {
    setEditing: setEditing
  };
})])(BlockEditorContainer);
exports["default"] = _default;
//# sourceMappingURL=index.js.map