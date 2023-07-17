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
import { createElement } from "@wordpress/element";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             */
function EditorHistoryUndo(props, ref) {
  // @ts-ignore
  var hasUndo = (0, _data.useSelect)(function (select) {
    return select('isolated/editor').hasEditorUndo();
  }, []);
  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
    undo = _useDispatch.undo;
  return createElement(_components.Button, _objectSpread(_objectSpread({}, props), {}, {
    ref: ref,
    icon: _icons.undo,
    label: (0, _i18n.__)('Undo'),
    shortcut: _keycodes.displayShortcut.primary('z')
    // If there are no undo levels we don't want to actually disable this
    // button, because it will remove focus for keyboard users.
    // See: https://github.com/WordPress/gutenberg/issues/3486
    ,
    "aria-disabled": !hasUndo,
    onClick: hasUndo ? undo : undefined,
    className: "editor-history__undo"
  }));
}
var _default = (0, _element.forwardRef)(EditorHistoryUndo);
exports["default"] = _default;
//# sourceMappingURL=undo.js.map