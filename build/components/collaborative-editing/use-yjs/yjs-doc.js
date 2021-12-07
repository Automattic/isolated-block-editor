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

/** @typedef {import('./algorithms/yjs').PostObject} PostObject */
var encodeArray = function encodeArray(array) {
  return array.toString();
};

var decodeArray = function decodeArray(string) {
  return new Uint8Array(string.split(','));
};
/**
 * Create a Yjs document.
 *
 * @param {Object} opts
 * @param {string} opts.identity - Client identifier.
 * @param {function(yjs.Doc, PostObject): void} opts.applyChangesToYDoc - Function to apply changes to the Yjs doc.
 * @param {function(yjs.Doc): PostObject} opts.getPostFromYDoc - Function to get post object data from the Yjs doc.
 * @param {function(any): void} opts.sendMessage
 */


function createDocument(_ref) {
  var identity = _ref.identity,
      _applyChangesToYDoc = _ref.applyChangesToYDoc,
      getPostFromYDoc = _ref.getPostFromYDoc,
      sendMessage = _ref.sendMessage;
  var doc = new yjs.Doc();
  /** @type {'off'|'connecting'|'on'} */

  var state = 'off';
  var yDocTriggeredChangeListeners = [];
  var connectionReadyListeners = [];
  doc.on('update', function (update, origin) {
    // Change received from peer, or triggered by self undo/redo
    if (origin !== identity) {
      var newData = getPostFromYDoc(doc);
      yDocTriggeredChangeListeners.forEach(function (listener) {
        return listener(newData);
      });
    }

    var isLocalOrigin = origin === identity || origin === "no-undo--".concat(identity) || origin instanceof yjs.UndoManager; // Change should be broadcast to peers

    if (isLocalOrigin && state === 'on') {
      sendMessage({
        protocol: 'yjs1',
        messageType: 'syncUpdate',
        update: encodeArray(update)
      });
    }
  });

  var setState = function setState(newState) {
    state = newState;

    if (newState === 'on') {
      connectionReadyListeners.forEach(function (listener) {
        return listener();
      });
    }
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
    applyChangesToYDoc: function applyChangesToYDoc(data) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$isInitialConten = _ref2.isInitialContent,
          isInitialContent = _ref2$isInitialConten === void 0 ? false : _ref2$isInitialConten;

      if (state !== 'on') {
        throw 'wrong state';
      }

      var transactionOrigin = isInitialContent ? "no-undo--".concat(identity) : identity;
      doc.transact(function () {
        _applyChangesToYDoc(doc, data);
      }, transactionOrigin);
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
      this.applyChangesToYDoc(data, {
        isInitialContent: true
      });
    },
    receiveMessage: function receiveMessage(_ref3) {
      var protocol = _ref3.protocol,
          messageType = _ref3.messageType,
          origin = _ref3.origin,
          content = (0, _objectWithoutProperties2["default"])(_ref3, _excluded);

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
    onYDocTriggeredChange: function onYDocTriggeredChange(listener) {
      yDocTriggeredChangeListeners.push(listener);
      return function () {
        yDocTriggeredChangeListeners = yDocTriggeredChangeListeners.filter(function (l) {
          return l !== listener;
        });
      };
    },
    onConnectionReady: function onConnectionReady(listener) {
      connectionReadyListeners.push(listener);
      return function () {
        connectionReadyListeners = connectionReadyListeners.filter(function (l) {
          return l !== listener;
        });
      };
    },
    getState: function getState() {
      return state;
    },
    getPostMap: function getPostMap() {
      return doc.getMap('post');
    }
  };
}
//# sourceMappingURL=yjs-doc.js.map