"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.complementaryAreas = complementaryAreas;
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _data = require("@wordpress/data");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function complementaryAreas() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case 'SET_DEFAULT_COMPLEMENTARY_AREA':
      {
        var scope = action.scope,
          area = action.area;

        // If there's already an area, don't overwrite it.
        if (state[scope]) {
          return state;
        }
        return _objectSpread(_objectSpread({}, state), {}, (0, _defineProperty2["default"])({}, scope, area));
      }
    case 'ENABLE_COMPLEMENTARY_AREA':
      {
        var _scope = action.scope,
          _area = action.area;
        return _objectSpread(_objectSpread({}, state), {}, (0, _defineProperty2["default"])({}, _scope, _area));
      }
  }
  return state;
}
var _default = (0, _data.combineReducers)({
  complementaryAreas: complementaryAreas
});
exports["default"] = _default;
//# sourceMappingURL=reducer.js.map