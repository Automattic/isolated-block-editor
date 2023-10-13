"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */ /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * Internal dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */
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
      preferences: _objectSpread({
        preferencesKey: preferencesKey
      }, preferencesKey && localStorage.getItem(preferencesKey) ?
      // @ts-ignore
      JSON.parse(localStorage.getItem(preferencesKey)) : defaultPreferences)
    }
  };
}
var _default = exports["default"] = storeConfig;
//# sourceMappingURL=index.js.map