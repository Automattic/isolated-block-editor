"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _useBlockSync = _interopRequireDefault(require("./use-block-sync"));

/**
 * Internal dependencies
 */
function BlockEditorProvider(props) {
  var children = props.children; // Syncs the entity provider with changes in the block-editor store.

  (0, _useBlockSync["default"])(props);
  return children;
}

var _default = BlockEditorProvider;
exports["default"] = _default;
//# sourceMappingURL=index.js.map