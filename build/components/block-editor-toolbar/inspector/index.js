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

function Inspector(_ref) {
  var button = _ref.button,
    onToggle = _ref.onToggle;
  function onOutside(ev) {
    if (ev.target.closest('.block-editor-block-inspector') === null && !ev.target.classList.contains('iso-inspector')) {
      onToggle(false);
      ev.preventDefault();
      ev.stopPropagation();
    }
  }
  return createElement(_components.Popover, {
    position: "bottom left",
    className: "iso-inspector",
    anchor: button === null || button === void 0 ? void 0 : button.current,
    onFocusOutside: onOutside
  }, createElement(_interface.ComplementaryArea.Slot, {
    scope: "isolated/editor"
  }));
}
var _default = Inspector;
exports["default"] = _default;
//# sourceMappingURL=index.js.map