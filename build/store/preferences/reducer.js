"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _excluded = ["preferencesKey"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
var _default = exports["default"] = reducer;
//# sourceMappingURL=reducer.js.map