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
var collabActions = _interopRequireWildcard(require("./collab/actions"));
var collabSelectors = _interopRequireWildcard(require("./collab/selectors"));
var collabPeersActions = _interopRequireWildcard(require("./collab-peers/actions"));
var collabPeersSelectors = _interopRequireWildcard(require("./collab-peers/selectors"));
var _controls = _interopRequireDefault(require("./collab/controls"));
var _reducer5 = _interopRequireDefault(require("./collab/reducer"));
var _reducer6 = _interopRequireDefault(require("./collab-peers/reducer"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function storeConfig(preferencesKey, defaultPreferences) {
  return {
    reducer: (0, _data.combineReducers)({
      blocks: _reducer["default"],
      editor: _reducer2["default"],
      preferences: _reducer3["default"],
      options: _reducer4["default"],
      collab: _reducer5["default"],
      collabPeers: _reducer6["default"]
    }),
    actions: _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _actions["default"]), _actions2["default"]), _actions4["default"]), _actions3["default"]), collabActions), collabPeersActions),
    selectors: _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, blockSelectors), editorSelectors), preferenceSelectors), optionSelectors), collabSelectors), collabPeersSelectors),
    controls: _objectSpread({}, _controls["default"]),
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
var _default = storeConfig;
exports["default"] = _default;
//# sourceMappingURL=index.js.map