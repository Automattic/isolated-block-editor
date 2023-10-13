"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.isEditingReusableBlock = isEditingReusableBlock;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _data = require("@wordpress/data");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
function isEditingReusableBlock() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  if ((action === null || action === void 0 ? void 0 : action.type) === 'SET_EDITING_REUSABLE_BLOCK') {
    return _objectSpread(_objectSpread({}, state), {}, (0, _defineProperty2["default"])({}, action.clientId, action.isEditing));
  }
  return state;
}
var _default = exports["default"] = (0, _data.combineReducers)({
  isEditingReusableBlock: isEditingReusableBlock
});
//# sourceMappingURL=reducer.js.map