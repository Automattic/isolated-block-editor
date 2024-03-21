"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = InserterSidebar;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _data = require("@wordpress/data");
var _components = require("@wordpress/components");
var _blockEditor = require("@wordpress/block-editor");
var _icons = require("@wordpress/icons");
var _compose = require("@wordpress/compose");
import { createElement } from "react";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
function InserterSidebar() {
  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
    setIsInserterOpened = _useDispatch.setIsInserterOpened;
  var isMobileViewport = (0, _compose.useViewportMatch)('medium', '<');
  var TagName = !isMobileViewport ? _components.VisuallyHidden : 'div';
  // Note: focusOnMount not present in Gutenberg
  // @ts-ignore
  var _useDialog = (0, _compose.__experimentalUseDialog)({
      onClose: function onClose() {
        return setIsInserterOpened(false);
      },
      // @ts-ignore copied from Gutenberg
      focusOnMount: null
    }),
    _useDialog2 = (0, _slicedToArray2["default"])(_useDialog, 2),
    inserterDialogRef = _useDialog2[0],
    inserterDialogProps = _useDialog2[1];
  return createElement("div", _objectSpread(_objectSpread({
    // @ts-ignore
    ref: inserterDialogRef
  }, inserterDialogProps), {}, {
    className: "edit-widgets-layout__inserter-panel"
  }), createElement(TagName, {
    className: "edit-widgets-layout__inserter-panel-header"
  }, createElement(_components.Button, {
    icon: _icons.close,
    onClick: function onClick() {
      return setIsInserterOpened(false);
    }
  })), createElement("div", {
    className: "edit-widgets-layout__inserter-panel-content"
  }, createElement(_blockEditor.__experimentalLibrary, {
    showMostUsedBlocks: false,
    showInserterHelpPanel: true,
    shouldFocusBlock: isMobileViewport
  })));
}
//# sourceMappingURL=inserter-sidebar.js.map