"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _element = require("@wordpress/element");

import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var InspectorHeader = function InspectorHeader(_ref) {
  var currentTab = _ref.currentTab,
      setTab = _ref.setTab,
      documentTitle = _ref.documentTitle;
  var docRef = (0, _element.createRef)();
  var blockRef = (0, _element.createRef)();
  (0, _element.useEffect)(function () {
    if (currentTab === 'document') {
      docRef.current.focus();
    } else {
      blockRef.current.focus();
    }
  }, []);
  return createElement("div", {
    className: "components-panel__header interface-complementary-area-header edit-post-sidebar__panel-tabs"
  }, createElement("ul", null, createElement("li", null, createElement(_components.Button, {
    onClick: function onClick() {
      return setTab('document');
    },
    ref: docRef,
    className: (0, _classnames["default"])('edit-post-sidebar__panel-tab', currentTab === 'document' && 'is-active')
  }, documentTitle)), createElement("li", null, createElement(_components.Button, {
    onClick: function onClick() {
      return setTab('block');
    },
    ref: blockRef,
    className: (0, _classnames["default"])('edit-post-sidebar__panel-tab', currentTab === 'block' && 'is-active')
  }, // translators: Text label for the Block Settings Sidebar tab.
  (0, _i18n.__)('Block')))));
};

var _default = InspectorHeader;
exports["default"] = _default;
//# sourceMappingURL=header.js.map