"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sidebars = exports["default"] = void 0;
var _components = require("@wordpress/components");
var _i18n = require("@wordpress/i18n");
var _data = require("@wordpress/data");
var _unlock2 = require("./unlock");
import { createElement } from "react";
/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

var sidebars = exports.sidebars = {
  document: 'edit-post/document',
  block: 'edit-post/block'
};
var _unlock = (0, _unlock2.unlock)(_components.privateApis),
  Tabs = _unlock.Tabs;
var SettingsHeader = function SettingsHeader(_ref) {
  var documentInspector = _ref.documentInspector;
  var _useSelect = (0, _data.useSelect)(function (select) {
      var hasCustomLabel = documentInspector && typeof documentInspector === 'string';
      return {
        // translators: Default label for the Document sidebar tab, not selected.
        documentLabel: hasCustomLabel ? documentInspector : (0, _i18n._x)('Document', 'noun')
      };
    }, []),
    documentLabel = _useSelect.documentLabel;

  /* Use a list so screen readers will announce how many tabs there are. */
  return createElement(Tabs.TabList, null, !!documentInspector && createElement(Tabs.Tab, {
    tabId: sidebars.document
  }, documentLabel), createElement(Tabs.Tab, {
    tabId: sidebars.block
  }, (0, _i18n.__)('Block')));
};
var _default = exports["default"] = SettingsHeader;
//# sourceMappingURL=sidebar-heading.js.map