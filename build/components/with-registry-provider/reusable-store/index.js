"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var actions = _interopRequireWildcard(require("./actions"));

var _controls = _interopRequireDefault(require("./controls"));

var _reducer = _interopRequireDefault(require("./reducer"));

var selectors = _interopRequireWildcard(require("./selectors"));

/**
 * Internal dependencies
 */

/**
 * Data store configuration.
 *
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/data/README.md#registerStore
 *
 * @type {Object}
 */
var _default = {
  actions: actions,
  controls: _controls["default"],
  reducer: _reducer["default"],
  selectors: selectors
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map