"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _keycodes = require("@wordpress/keycodes");

var _icons = require("@wordpress/icons");

var _element = require("@wordpress/element");

import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
function EditorHistoryRedo(props, ref) {
  var hasRedo = (0, _data.useSelect)(function (select) {
    return select('core/editor').hasEditorRedo();
  }, []);

  var _useDispatch = (0, _data.useDispatch)('core/editor'),
      redo = _useDispatch.redo;

  return createElement(_components.Button, (0, _extends2["default"])({}, props, {
    ref: ref,
    icon: _icons.redo,
    label: (0, _i18n.__)('Redo'),
    shortcut: _keycodes.displayShortcut.primaryShift('z') // If there are no redo levels we don't want to actually disable this
    // button, because it will remove focus for keyboard users.
    // See: https://github.com/WordPress/gutenberg/issues/3486
    ,
    "aria-disabled": !hasRedo,
    onClick: hasRedo ? redo : undefined,
    className: "editor-history__redo"
  }));
}

var _default = (0, _element.forwardRef)(EditorHistoryRedo);

exports["default"] = _default;
//# sourceMappingURL=redo.js.map