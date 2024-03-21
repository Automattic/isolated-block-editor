"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ListViewOutline;
var _editor = require("@wordpress/editor");
var _components = require("@wordpress/components");
var _i18n = require("@wordpress/i18n");
import { createElement, Fragment } from "react";
/**
 * WordPress dependencies
 */

function ListViewOutline() {
  return createElement(Fragment, null, createElement("div", {
    className: "editor-list-view-sidebar__outline"
  }, createElement("div", null, createElement(_components.__experimentalText, null, (0, _i18n.__)('Characters:')), createElement(_components.__experimentalText, null, createElement(_editor.CharacterCount, null))), createElement("div", null, createElement(_components.__experimentalText, null, (0, _i18n.__)('Words:')), createElement(_editor.WordCount, null)), createElement("div", null, createElement(_components.__experimentalText, null, (0, _i18n.__)('Time to read:')), createElement(_editor.TimeToRead, null))), createElement(_editor.DocumentOutline, null));
}
//# sourceMappingURL=list-view-outline.js.map