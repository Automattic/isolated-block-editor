"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useYjs;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _uuid = require("uuid");

var _lodash = require("lodash");

var _yjsDoc = require("./yjs-doc");

var _yjs = require("./algorithms/yjs");

var _data = require("@wordpress/data");

var _element = require("@wordpress/element");

var _collabCaret = require("../../formats/collab-caret");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var debug = require('debug')('iso-editor:collab');
/** @typedef {import('../../..').CollaborationSettings} CollaborationSettings */

/** @typedef {import('../../..').CollaborationTransport} CollaborationTransport */

/** @typedef {import('../../..').CollaborationTransportDocMessage} CollaborationTransportDocMessage */

/** @typedef {import('../../..').CollaborationTransportSelectionMessage} CollaborationTransportSelectionMessage */

/** @typedef {import('../../..').EditorSelection} EditorSelection */

/** @typedef {import('..').OnUpdate} OnUpdate */


var defaultColors = ['#4676C0', '#6F6EBE', '#9063B6', '#C3498D', '#9E6D14', '#3B4856', '#4A807A'];
/**
 * @param {object} opts - Hook options
 * @param {() => object[]} opts.getBlocks - Content to initialize the Yjs doc with.
 * @param {OnUpdate} opts.onRemoteDataChange - Function to update editor blocks in redux state.
 * @param {CollaborationSettings} opts.settings
 * @param {() => IsoEditorSelection} opts.getSelection
 * @param {import('../../../store/peers/actions').setAvailablePeers} opts.setAvailablePeers
 * @param {import('../../../store/peers/actions').setPeerSelection} opts.setPeerSelection
 *
 * @typedef IsoEditorSelection
 * @property {object} selectionStart
 * @property {object} selectionEnd
 */

function initYDoc(_x) {
  return _initYDoc.apply(this, arguments);
}
/**
 * @param {object} opts - Hook options
 * @param {object[]} opts.blocks
 * @param {OnUpdate} opts.onRemoteDataChange
 * @param {CollaborationSettings} [opts.settings]
 */


function _initYDoc() {
  _initYDoc = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var getBlocks, onRemoteDataChange, settings, getSelection, setPeerSelection, _setAvailablePeers, channelId, transport, identity, doc, onReceiveMessage;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getBlocks = _ref.getBlocks, onRemoteDataChange = _ref.onRemoteDataChange, settings = _ref.settings, getSelection = _ref.getSelection, setPeerSelection = _ref.setPeerSelection, _setAvailablePeers = _ref.setAvailablePeers;
            channelId = settings.channelId, transport = settings.transport;
            /** @type string */

            identity = (0, _uuid.v4)();
            debug("initYDoc (identity: ".concat(identity, ")"));
            doc = (0, _yjsDoc.createDocument)({
              identity: identity,
              applyDataChanges: _yjs.updatePostDoc,
              getData: _yjs.postDocToObject,

              /** @param {object} message */
              sendMessage: function sendMessage(message) {
                debug('sendDocMessage', message);
                transport.sendMessage({
                  type: 'doc',
                  identity: identity,
                  message: message
                });

                var _ref4 = getSelection() || {},
                    selectionStart = _ref4.selectionStart,
                    selectionEnd = _ref4.selectionEnd;

                debug('sendSelection', selectionStart, selectionEnd);
                transport.sendMessage({
                  type: 'selection',
                  identity: identity,
                  selection: {
                    start: selectionStart,
                    end: selectionEnd
                  }
                });
              }
            });
            /** @param {CollaborationTransportDocMessage|CollaborationTransportSelectionMessage} data */

            onReceiveMessage = function onReceiveMessage(data) {
              debug('remote change received by transport', data);

              switch (data.type) {
                case 'doc':
                  {
                    doc.receiveMessage(data.message);
                    break;
                  }

                case 'selection':
                  {
                    setPeerSelection(data.identity, data.selection);
                    break;
                  }
              }
            };

            doc.onRemoteDataChange(function (changes) {
              debug('remote change received by ydoc', changes);
              onRemoteDataChange(changes.blocks);
            });
            return _context.abrupt("return", transport.connect({
              user: {
                identity: identity,
                name: settings.username,
                color: settings.caretColor || (0, _lodash.sample)(defaultColors)
              },
              onReceiveMessage: onReceiveMessage,
              setAvailablePeers: function setAvailablePeers(peers) {
                debug('setAvailablePeers', peers);

                _setAvailablePeers(peers);
              },
              channelId: channelId
            }).then(function (_ref5) {
              var isFirstInChannel = _ref5.isFirstInChannel;
              debug("connected (channelId: ".concat(channelId, ")"));

              if (isFirstInChannel) {
                debug('first in channel'); // Fetching the blocks from redux now, after the transport has successfully connected,
                // ensures that we don't initialize the Yjs doc with stale blocks.
                // (This can happen if <IsolatedBlockEditor> is given an onLoad handler.)

                // Fetching the blocks from redux now, after the transport has successfully connected,
                // ensures that we don't initialize the Yjs doc with stale blocks.
                // (This can happen if <IsolatedBlockEditor> is given an onLoad handler.)
                doc.startSharing({
                  title: '',
                  blocks: getBlocks()
                });
              } else {
                doc.connect();
              }

              var disconnect = function disconnect() {
                transport.disconnect();
                doc.disconnect();
              };

              window.addEventListener('beforeunload', function () {
                return disconnect();
              });
              return {
                doc: doc,
                disconnect: disconnect
              };
            }));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _initYDoc.apply(this, arguments);
}

function useYjs(_ref2) {
  var blocks = _ref2.blocks,
      onRemoteDataChange = _ref2.onRemoteDataChange,
      settings = _ref2.settings;
  var applyChangesToYjs = (0, _element.useRef)(_lodash.noop);

  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      getSelection: select('isolated/editor').getEditorSelection,
      getBlocks: select('isolated/editor').getBlocks
    };
  }, []),
      getBlocks = _useSelect.getBlocks,
      getSelection = _useSelect.getSelection;

  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
      setAvailablePeers = _useDispatch.setAvailablePeers,
      setPeerSelection = _useDispatch.setPeerSelection;

  (0, _element.useEffect)(function () {
    if (!(settings !== null && settings !== void 0 && settings.enabled)) {
      return;
    }

    if (!settings.transport) {
      console.error("Collaborative editor is disabled because a transport module wasn't provided.");
      return;
    }

    debug('registered collab caret format');
    (0, _collabCaret.registerFormatCollabCaret)();
    var onUnmount = _lodash.noop;
    initYDoc({
      onRemoteDataChange: onRemoteDataChange,
      settings: settings,
      getBlocks: getBlocks,
      getSelection: getSelection,
      setPeerSelection: setPeerSelection,
      setAvailablePeers: setAvailablePeers
    }).then(function (_ref3) {
      var doc = _ref3.doc,
          disconnect = _ref3.disconnect;

      onUnmount = function onUnmount() {
        debug('unmount');
        disconnect();
      };

      applyChangesToYjs.current = function (blocks) {
        if (doc.getState() !== 'on') {
          return;
        }

        debug('local changes applied to ydoc');
        doc.applyDataChanges({
          blocks: blocks
        });
      };
    });
    return function () {
      return onUnmount();
    };
  }, []);
  (0, _element.useEffect)(function () {
    applyChangesToYjs.current(blocks);
  }, [blocks]);
}
//# sourceMappingURL=index.js.map