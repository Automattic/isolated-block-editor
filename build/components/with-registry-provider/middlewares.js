"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _refx = _interopRequireDefault(require("refx"));

var _reduxMulti = _interopRequireDefault(require("redux-multi"));

var _lodash = require("lodash");

var _effects = _interopRequireDefault(require("./effects"));

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Applies the custom middlewares used specifically in the editor module.
 *
 * @param {Object} store Store Object.
 *
 * @return {Object} Update Store Object.
 */
function applyMiddlewares(store) {
  var middlewares = [(0, _refx["default"])(_effects["default"]), _reduxMulti["default"]];

  var enhancedDispatch = function enhancedDispatch() {
    throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
  };

  var chain = [];
  var middlewareAPI = {
    getState: store.getState,
    dispatch: function dispatch() {
      return enhancedDispatch.apply(void 0, arguments);
    }
  };
  chain = middlewares.map(function (middleware) {
    return middleware(middlewareAPI);
  });
  enhancedDispatch = _lodash.flowRight.apply(void 0, (0, _toConsumableArray2["default"])(chain))(store.dispatch);
  store.dispatch = enhancedDispatch;
  return store;
}

var _default = applyMiddlewares;
exports["default"] = _default;
//# sourceMappingURL=middlewares.js.map