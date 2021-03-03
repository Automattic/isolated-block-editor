"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

require("./style.scss");

import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function Inspector() {
  return createElement(_components.Popover, {
    position: "bottom",
    className: "iso-inspector"
  }, createElement(_blockEditor.BlockInspector, null));
}

var _default = Inspector;
exports["default"] = _default;
//# sourceMappingURL=index.js.map