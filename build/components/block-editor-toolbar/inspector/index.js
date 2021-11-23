"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _interface = require("@wordpress/interface");

var _components = require("@wordpress/components");

require("./style.scss");

import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function Inspector(props) {
  return createElement(_components.Popover, {
    position: "bottom",
    className: "iso-inspector"
  }, createElement(_interface.ComplementaryArea.Slot, {
    scope: "isolated/editor"
  }));
}

var _default = Inspector;
exports["default"] = _default;
//# sourceMappingURL=index.js.map