"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = InserterSidebar;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _icons = require("@wordpress/icons");

var _compose = require("@wordpress/compose");

import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
function InserterSidebar() {
  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
      setIsInserterOpened = _useDispatch.setIsInserterOpened;

  var isMobileViewport = (0, _compose.useViewportMatch)('medium', '<');
  var TagName = !isMobileViewport ? _components.VisuallyHidden : 'div'; // Note: focusOnMount not present in Gutenberg
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

  return createElement("div", (0, _extends2["default"])({
    // @ts-ignore
    ref: inserterDialogRef
  }, inserterDialogProps, {
    className: "edit-post-editor__inserter-panel"
  }), createElement(TagName, {
    className: "edit-post-editor__inserter-panel-header"
  }, createElement(_components.Button, {
    icon: _icons.close,
    onClick: function onClick() {
      return setIsInserterOpened(false);
    }
  })), createElement("div", {
    className: "edit-post-editor__inserter-panel-content"
  }, createElement(_blockEditor.__experimentalLibrary, {
    showMostUsedBlocks: false,
    showInserterHelpPanel: true,
    shouldFocusBlock: isMobileViewport
  })));
}
//# sourceMappingURL=inserter-sidebar.js.map