"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _data = require("@wordpress/data");

var _reducer = _interopRequireDefault(require("./blocks/reducer"));

var _actions = _interopRequireDefault(require("./blocks/actions"));

var _reducer2 = _interopRequireDefault(require("./editor/reducer"));

var _actions2 = _interopRequireDefault(require("./editor/actions"));

var _reducer3 = _interopRequireDefault(require("./preferences/reducer"));

var _actions3 = _interopRequireDefault(require("./preferences/actions"));

var _reducer4 = _interopRequireDefault(require("./options/reducer"));

var _actions4 = _interopRequireDefault(require("./options/actions"));

var blockSelectors = _interopRequireWildcard(require("./blocks/selectors"));

var editorSelectors = _interopRequireWildcard(require("./editor/selectors"));

var preferenceSelectors = _interopRequireWildcard(require("./preferences/selectors"));

var optionSelectors = _interopRequireWildcard(require("./options/selectors"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function storeConfig(preferencesKey, defaultPreferences) {
  return {
    reducer: (0, _data.combineReducers)({
      blocks: _reducer["default"],
      editor: _reducer2["default"],
      preferences: _reducer3["default"],
      options: _reducer4["default"]
    }),
    actions: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _actions["default"]), _actions2["default"]), _actions4["default"]), _actions3["default"]),
    selectors: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, blockSelectors), editorSelectors), preferenceSelectors), optionSelectors),
    persist: ['preferences'],
    initialState: {
      preferences: preferencesKey && localStorage.getItem(preferencesKey) ? JSON.parse(localStorage.getItem(preferencesKey)) : defaultPreferences
    }
  };
}

var _default = storeConfig;
exports["default"] = _default;
//# sourceMappingURL=index.js.map