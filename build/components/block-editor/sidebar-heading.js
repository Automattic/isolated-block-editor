"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var SettingsHeader = function SettingsHeader(_ref) {
  var sidebarName = _ref.sidebarName,
      documentInspector = _ref.documentInspector;

  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
      openGeneralSidebar = _useDispatch.openGeneralSidebar;

  var openDocumentSettings = function openDocumentSettings() {
    return openGeneralSidebar('edit-post/document');
  };

  var openBlockSettings = function openBlockSettings() {
    return openGeneralSidebar('edit-post/block');
  };

  var _useSelect = (0, _data.useSelect)(function (select) {
    var hasCustomLabel = documentInspector && typeof documentInspector === 'string';
    return {
      // translators: Default label for the Document sidebar tab, not selected.
      documentLabel: hasCustomLabel ? documentInspector : (0, _i18n._x)('Document', 'noun')
    };
  }, []),
      documentLabel = _useSelect.documentLabel;

  var _ref2 = sidebarName === 'edit-post/document' ? // translators: ARIA label for the Document sidebar tab, selected. %s: Document label.
  [(0, _i18n.sprintf)((0, _i18n.__)('%s (selected)'), documentLabel), 'is-active'] : [documentLabel, ''],
      _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
      documentAriaLabel = _ref3[0],
      documentActiveClass = _ref3[1];

  var _ref4 = sidebarName === 'edit-post/block' ? // translators: ARIA label for the Block Settings Sidebar tab, selected.
  [(0, _i18n.__)('Block (selected)'), 'is-active'] : // translators: ARIA label for the Block Settings Sidebar tab, not selected.
  [(0, _i18n.__)('Block'), ''],
      _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
      blockAriaLabel = _ref5[0],
      blockActiveClass = _ref5[1];
  /* Use a list so screen readers will announce how many tabs there are. */


  return createElement("ul", null, !!documentInspector && createElement("li", null, createElement(_components.Button, {
    onClick: openDocumentSettings,
    className: "edit-post-sidebar__panel-tab ".concat(documentActiveClass),
    "aria-label": documentAriaLabel,
    "data-label": documentLabel
  }, documentLabel)), createElement("li", null, createElement(_components.Button, {
    onClick: openBlockSettings,
    className: "edit-post-sidebar__panel-tab ".concat(blockActiveClass),
    "aria-label": blockAriaLabel // translators: Data label for the Block Settings Sidebar tab.
    ,
    "data-label": (0, _i18n.__)('Block')
  }, // translators: Text label for the Block Settings Sidebar tab.
  (0, _i18n.__)('Block'))));
};

var _default = SettingsHeader;
exports["default"] = _default;
//# sourceMappingURL=sidebar-heading.js.map