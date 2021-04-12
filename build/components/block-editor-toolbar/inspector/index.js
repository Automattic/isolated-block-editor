"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _element = require("@wordpress/element");

var _header = _interopRequireDefault(require("./header"));

var _document = _interopRequireDefault(require("../../document"));

require("./style.scss");

import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function Inspector(props) {
  var documentInspector = props.documentInspector,
      blockSelected = props.blockSelected;

  var _useState = (0, _element.useState)(blockSelected || !documentInspector ? 'block' : 'document'),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      currentTab = _useState2[0],
      setCurrentTab = _useState2[1];

  return createElement(_components.Popover, {
    position: "bottom",
    className: "iso-inspector"
  }, documentInspector && createElement(_header["default"], {
    setTab: setCurrentTab,
    currentTab: currentTab,
    documentTitle: documentInspector
  }), currentTab === 'block' && createElement(_blockEditor.BlockInspector, null), currentTab === 'document' && createElement(_document["default"].Slot, null));
}

var _default = Inspector;
exports["default"] = _default;
//# sourceMappingURL=index.js.map