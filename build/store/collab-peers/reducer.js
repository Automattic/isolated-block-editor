"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_COLLAB_PEER_SELECTION':
      {
        if (!state[action.peerId]) {
          return state;
        }

        return _objectSpread(_objectSpread({}, state), {}, (0, _defineProperty2["default"])({}, action.peerId, _objectSpread(_objectSpread({}, state[action.peerId]), action.selection)));
      }

    case 'SET_AVAILABLE_COLLAB_PEERS':
      {
        return action.peers.reduce(function (acc, _ref) {
          var id = _ref.id,
              name = _ref.name,
              color = _ref.color,
              avatarUrl = _ref.avatarUrl;
          acc[id] = state[id] || {
            name: name,
            color: color,
            avatarUrl: avatarUrl
          };
          return acc;
        }, {});
      }
  }

  return state;
};

var _default = reducer;
exports["default"] = _default;
//# sourceMappingURL=reducer.js.map