"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _blockEditor = require("@wordpress/block-editor");

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * This is a copy of packages/edit-post/src/components/visual-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 */
var VisualEditor = function VisualEditor() {
  var ref = (0, _element.useRef)();
  var mergedRefs = (0, _compose.useMergeRefs)([ref, (0, _blockEditor.__unstableUseClipboardHandler)(), (0, _blockEditor.__unstableUseCanvasClickRedirect)(), (0, _blockEditor.__unstableUseTypewriter)(), (0, _blockEditor.__unstableUseBlockSelectionClearer)(), (0, _blockEditor.__unstableUseTypingObserver)()]);
  return createElement(_blockEditor.BlockTools, {
    __unstableContentRef: ref,
    className: "edit-post-visual-editor"
  }, createElement("div", {
    className: "editor-styles-wrapper",
    ref: mergedRefs
  }, createElement(_blockEditor.WritingFlow, null, createElement(_blockEditor.ObserveTyping, null, createElement(_blockEditor.BlockList, null)))));
};

var _default = VisualEditor;
exports["default"] = _default;
//# sourceMappingURL=visual-editor.js.map