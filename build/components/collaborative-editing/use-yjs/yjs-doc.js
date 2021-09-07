"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDocument = createDocument;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var yjs = _interopRequireWildcard(require("yjs"));

var _excluded = ["protocol", "messageType", "origin"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var encodeArray = function encodeArray(array) {
  return array.toString();
};

var decodeArray = function decodeArray(string) {
  return new Uint8Array(string.split(','));
};

function createDocument(_ref) {
  var identity = _ref.identity,
      _applyDataChanges = _ref.applyDataChanges,
      getData = _ref.getData,
      sendMessage = _ref.sendMessage;
  var doc = new yjs.Doc();
  var state = 'off';
  var listeners = [];
  var stateListeners = [];
  doc.on('update', function (update, origin) {
    if (origin === identity && state === 'on') {
      sendMessage({
        protocol: 'yjs1',
        messageType: 'syncUpdate',
        update: encodeArray(update)
      });
    }

    if (origin !== identity) {
      var newData = getData(doc);
      listeners.forEach(function (listener) {
        return listener(newData);
      });
    }
  });

  var setState = function setState(newState) {
    state = newState;
    stateListeners.forEach(function (listener) {
      return listener(newState);
    });
  };

  var sync = function sync(destination, isReply) {
    var stateVector = yjs.encodeStateVector(doc);
    sendMessage({
      protocol: 'yjs1',
      messageType: 'sync1',
      stateVector: encodeArray(stateVector),
      origin: identity,
      destination: destination,
      isReply: isReply
    });
  };

  return {
    applyDataChanges: function applyDataChanges(data) {
      if (state !== 'on') {
        throw 'wrong state';
      }

      doc.transact(function () {
        _applyDataChanges(doc, data);
      }, identity);
    },
    connect: function connect() {
      if (state === 'on') {
        throw 'wrong state';
      }

      setState('connecting');
      sync();
    },
    disconnect: function disconnect() {
      setState('off');
    },
    startSharing: function startSharing(data) {
      if (state === 'on') {
        throw 'wrong state';
      }

      setState('on');
      this.applyDataChanges(data);
    },
    receiveMessage: function receiveMessage(_ref2) {
      var protocol = _ref2.protocol,
          messageType = _ref2.messageType,
          origin = _ref2.origin,
          content = (0, _objectWithoutProperties2["default"])(_ref2, _excluded);

      if (protocol !== 'yjs1') {
        throw 'wrong protocol';
      }

      switch (messageType) {
        case 'sync1':
          if (content.destination && content.destination !== identity) {
            return;
          }

          sendMessage({
            protocol: 'yjs1',
            messageType: 'sync2',
            update: encodeArray(yjs.encodeStateAsUpdate(doc, decodeArray(content.stateVector))),
            destination: origin
          });

          if (!content.isReply) {
            sync(origin, true);
          }

          break;

        case 'sync2':
          if (content.destination !== identity) {
            return;
          }

          yjs.applyUpdate(doc, decodeArray(content.update), origin);
          setState('on');
          break;

        case 'syncUpdate':
          yjs.applyUpdate(doc, decodeArray(content.update), origin);
          break;
      }
    },
    onRemoteDataChange: function onRemoteDataChange(listener) {
      listeners.push(listener);
      return function () {
        listeners = listeners.filter(function (l) {
          return l !== listener;
        });
      };
    },
    onStateChange: function onStateChange(listener) {
      stateListeners.push(listener);
      return function () {
        stateListeners = stateListeners.filter(function (l) {
          return l !== listener;
        });
      };
    },
    getState: function getState() {
      return state;
    }
  };
}
//# sourceMappingURL=yjs-doc.js.map