"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransports = getTransports;
exports.pauseTyping = pauseTyping;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = require("@testing-library/react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Helper to generate mock transport modules for an isolated channel.
 *
 * @param {number} count - Number of transport modules to generate.
 * @return {Object[]} - Array of transport modules.
 */
function getTransports(count) {
  var peers = {};

  var getAvailablePeers = function getAvailablePeers(excludeId) {
    return Object.values(peers).reduce(function (acc, p) {
      if (p.user.id === excludeId) return acc;
      return [].concat((0, _toConsumableArray2["default"])(acc), [p.user]);
    }, []);
  };

  var mockTransport = function mockTransport() {
    var transport = {
      _identity: undefined,
      connect: jest.fn(function (_ref) {
        var onReceiveMessage = _ref.onReceiveMessage,
            setAvailablePeers = _ref.setAvailablePeers,
            user = _ref.user;
        transport._identity = user.identity;
        peers[user.identity] = {
          onReceiveMessage: onReceiveMessage,
          setAvailablePeers: setAvailablePeers,
          user: _objectSpread(_objectSpread({}, user), {}, {
            id: user.identity
          })
        };
        Object.keys(peers).forEach(function (identity) {
          peers[identity].setAvailablePeers(getAvailablePeers(identity));
        });
        return Promise.resolve({
          isFirstInChannel: Object.keys(peers).length === 1
        });
      }),
      sendMessage: jest.fn(function (data) {
        // console.log( data.message.messageType, data.identity.substring( 0, 4 ) );
        Object.keys(peers).forEach(function (identity) {
          if (identity !== data.identity) {
            peers[identity].onReceiveMessage(data);
          }
        });
      }),
      disconnect: jest.fn(function () {
        delete peers[transport._identity];
        Object.keys(peers).forEach(function (identity) {
          peers[identity].setAvailablePeers(getAvailablePeers(identity));
        });
      })
    };
    return transport;
  };

  return Array(count).fill(null).map(function () {
    return mockTransport();
  });
}
/**
 * Emulate a pause between typing events for Yjs to make a new undo stack item.
 *
 * Requires jest.useRealTimers().
 *
 * @param {import('@testing-library/dom').Screen} screen
 */


function pauseTyping(_x) {
  return _pauseTyping.apply(this, arguments);
}

function _pauseTyping() {
  _pauseTyping = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(screen) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            screen.getAllByRole('document').forEach(function (el) {
              return el.blur();
            });
            _context.next = 3;
            return (0, _react.waitFor)(function () {
              return new Promise(function (resolve) {
                return setTimeout(resolve, 550);
              });
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _pauseTyping.apply(this, arguments);
}
//# sourceMappingURL=utils.js.map