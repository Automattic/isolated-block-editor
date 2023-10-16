"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _data = require("@wordpress/data");
/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

var STORE_KEY = 'core/edit-post';

// This is a fake store to prevent errors if anything tries to use `isFeatureActive`
var store = (0, _data.registerStore)(STORE_KEY, {
  reducer: (0, _data.combineReducers)({}),
  actions: {},
  selectors: {
    isFeatureActive: function isFeatureActive() {
      return false;
    }
  }
});
var _default = exports["default"] = store;
//# sourceMappingURL=index.js.map