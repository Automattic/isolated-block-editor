"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _blockEditor = require("@wordpress/block-editor");

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

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
  (0, _blockEditor.__unstableUseBlockSelectionClearer)(ref);
  (0, _blockEditor.__unstableUseTypewriter)(ref);
  (0, _blockEditor.__unstableUseClipboardHandler)(ref);
  (0, _blockEditor.__unstableUseTypingObserver)(ref);
  (0, _blockEditor.__unstableUseCanvasClickRedirect)(ref);
  return createElement("div", {
    className: "edit-post-visual-editor"
  }, createElement(_components.Popover.Slot, {
    name: "block-toolbar"
  }), createElement("div", {
    className: "editor-styles-wrapper",
    ref: ref
  }, createElement(_blockEditor.WritingFlow, null, createElement(_blockEditor.BlockList, null))));
};

var _default = VisualEditor;
exports["default"] = _default;
//# sourceMappingURL=visual-editor.js.map