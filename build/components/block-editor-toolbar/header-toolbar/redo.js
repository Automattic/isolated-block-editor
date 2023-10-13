"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _i18n = require("@wordpress/i18n");
var _components = require("@wordpress/components");
var _data = require("@wordpress/data");
var _keycodes = require("@wordpress/keycodes");
var _icons = require("@wordpress/icons");
var _element = require("@wordpress/element");
import { createElement } from "react";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
function EditorHistoryRedo(props, ref) {
  // @ts-ignore
  var hasRedo = (0, _data.useSelect)(function (select) {
    return select('isolated/editor').hasEditorRedo();
  }, []);
  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
    redo = _useDispatch.redo;
  return createElement(_components.Button, _objectSpread(_objectSpread({}, props), {}, {
    ref: ref,
    icon: _icons.redo,
    label: (0, _i18n.__)('Redo'),
    shortcut: _keycodes.displayShortcut.primaryShift('z')
    // If there are no redo levels we don't want to actually disable this
    // button, because it will remove focus for keyboard users.
    // See: https://github.com/WordPress/gutenberg/issues/3486
    ,
    "aria-disabled": !hasRedo,
    onClick: hasRedo ? redo : undefined,
    className: "editor-history__redo"
  }));
}
var _default = exports["default"] = (0, _element.forwardRef)(EditorHistoryRedo);
//# sourceMappingURL=redo.js.map