"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _excluded = ["preferencesKey"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * WordPress dependencies
 */
var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FEATURE':
      var preferencesKey = state.preferencesKey,
          preferences = (0, _objectWithoutProperties2["default"])(state, _excluded);

      var updatedPreferences = _objectSpread(_objectSpread({}, preferences), {}, (0, _defineProperty2["default"])({}, action.feature, state[action.feature] ? !state[action.feature] : true));

      if (preferencesKey && window.localStorage) {
        localStorage.setItem(preferencesKey, JSON.stringify(updatedPreferences));
      }

      return _objectSpread({
        preferencesKey: preferencesKey
      }, updatedPreferences);
  }

  return state;
};

var _default = reducer;
exports["default"] = _default;
//# sourceMappingURL=reducer.js.map