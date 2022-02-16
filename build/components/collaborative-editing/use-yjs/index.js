"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useYjs;
exports.defaultColors = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mutex = require("lib0/mutex");

var _uuid = require("uuid");

var _lodash = require("lodash");

var _yjsDoc = require("./yjs-doc");

var _data = require("@wordpress/data");

var _element = require("@wordpress/element");

var _filters = require("./filters");

var _formats = require("./formats");

var _yjsUndo = require("./yjs-undo");

var _relativePosition = require("./algorithms/relative-position");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var debug = require('debug')('iso-editor:collab');
/** @typedef {import('..').CollaborationSettings} CollaborationSettings */


var defaultColors = ['#4676C0', '#6F6EBE', '#9063B6', '#C3498D', '#9E6D14', '#3B4856', '#4A807A'];
/**
 * @param {Object} opts
 * @param {import('..').CollaborationSettings} opts.settings
 * @param {Object} opts.registry - Redux data registry for this context.
 */

exports.defaultColors = defaultColors;

function initYDoc(_x) {
  return _initYDoc.apply(this, arguments);
}
/**
 * @param {Object} opts - Hook options
 * @param {CollaborationSettings} [opts.settings]
 */


function _initYDoc() {
  _initYDoc = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var settings, registry, channelId, transport, dispatch, select, mutex, identity, doc, _yield$transport$conn, isFirstInChannel, _disconnect;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            settings = _ref.settings, registry = _ref.registry;
            channelId = settings.channelId, transport = settings.transport;
            dispatch = registry.dispatch, select = registry.select;
            mutex = (0, _mutex.createMutex)();
            /** @type {string} */

            identity = (0, _uuid.v4)();
            debug("initYDoc (identity: ".concat(identity, ")"));
            doc = (0, _yjsDoc.createDocument)({
              identity: identity,
              relativePositionManager: {
                self: new _relativePosition.RelativePosition(function () {
                  return {
                    start: select('core/block-editor').getSelectionStart(),
                    end: select('core/block-editor').getSelectionEnd()
                  };
                }, dispatch('core/block-editor').selectionChange),
                peers: new _relativePosition.PeerRelativePosition(select('isolated/editor').getCollabPeers, dispatch('isolated/editor').setCollabPeerSelection)
              },

              /** @param {Object} message */
              sendMessage: function sendMessage(message) {
                debug('sendDocMessage', message);
                transport.sendMessage({
                  type: 'doc',
                  identity: identity,
                  message: message
                });
              }
            });
            doc.onConnectionReady((0, _lodash.once)(function () {
              dispatch('isolated/editor').setYDoc(doc);
              (0, _yjsUndo.setupUndoManager)(doc.getPostMap(), identity, registry);
            }));
            doc.onYDocTriggeredChange(function (changes) {
              debug('changes triggered by ydoc, applying to editor state', changes);
              dispatch('isolated/editor').updateBlocksWithUndo(changes.blocks, {
                isTriggeredByYDoc: true
              });
            });
            _context.next = 11;
            return transport.connect({
              user: {
                identity: identity,
                name: settings.username,
                color: settings.caretColor || (0, _lodash.sample)(defaultColors),
                avatarUrl: settings.avatarUrl
              },

              /** @param {import('..').CollaborationTransportMessage} data */
              onReceiveMessage: function onReceiveMessage(data) {
                debug('remote change received by transport', data);

                switch (data.type) {
                  case 'doc':
                    {
                      // The mutex wrapper prevents a remote change from triggering a selection change message
                      mutex(function () {
                        doc.receiveMessage(data.message);
                      });
                      break;
                    }

                  case 'selection':
                    {
                      dispatch('isolated/editor').setCollabPeerSelection(data.identity, data.selection);
                      break;
                    }
                }
              },
              setAvailablePeers: function setAvailablePeers(peers) {
                debug('setAvailablePeers', peers);
                dispatch('isolated/editor').setAvailableCollabPeers(peers);
              },
              channelId: channelId
            });

          case 11:
            _yield$transport$conn = _context.sent;
            isFirstInChannel = _yield$transport$conn.isFirstInChannel;
            debug("connected (channelId: ".concat(channelId, ")"));

            if (isFirstInChannel) {
              debug('first in channel'); // Fetching the blocks from redux now, after the transport has successfully connected,
              // ensures that we don't initialize the Yjs doc with stale blocks.
              // (This can happen if <IsolatedBlockEditor> is given an onLoad handler.)

              doc.startSharing({
                title: '',
                blocks: select('core/block-editor').getBlocks()
              });
            } else {
              doc.connect();
            }

            _disconnect = function disconnect() {
              transport.disconnect();
              doc.disconnect();
            };

            window.addEventListener('beforeunload', function () {
              return _disconnect();
            });
            return _context.abrupt("return", {
              sendSelection: function sendSelection(start, end) {
                // The mutex wrapper prevents a remote change from triggering a selection change message
                mutex(function () {
                  debug('sendSelection', start, end);
                  transport.sendMessage({
                    type: 'selection',
                    identity: identity,
                    selection: {
                      start: start,
                      end: end
                    }
                  });
                });
              },
              disconnect: function disconnect() {
                window.removeEventListener('beforeunload', _disconnect);

                _disconnect();
              }
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _initYDoc.apply(this, arguments);
}

function useYjs(_ref2) {
  var settings = _ref2.settings;
  var onSelectionChange = (0, _element.useRef)(_lodash.noop);
  var registry = (0, _data.useRegistry)();

  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      getFormatType: select('core/rich-text').getFormatType,
      selectionStart: select('core/block-editor').getSelectionStart(),
      selectionEnd: select('core/block-editor').getSelectionEnd()
    };
  }, []),
      getFormatType = _useSelect.getFormatType,
      selectionStart = _useSelect.selectionStart,
      selectionEnd = _useSelect.selectionEnd;

  (0, _element.useEffect)(function () {
    if (!(settings !== null && settings !== void 0 && settings.enabled)) {
      return;
    }

    if (!settings.transport) {
      // eslint-disable-next-line no-console
      console.error("Collaborative editor is disabled because a transport module wasn't provided.");
      return;
    }

    debug('registered collab formats');
    (0, _formats.registerCollabFormats)(getFormatType);
    debug('added collab filters');
    (0, _filters.addCollabFilters)();
    var onUnmount = _lodash.noop;
    initYDoc({
      settings: settings,
      registry: registry
    }).then(function (_ref3) {
      var sendSelection = _ref3.sendSelection,
          disconnect = _ref3.disconnect;

      onUnmount = function onUnmount() {
        debug('unmount');
        disconnect();
      };

      onSelectionChange.current = sendSelection;
    });
    return function () {
      return onUnmount();
    };
  }, []);
  (0, _element.useEffect)(function () {
    onSelectionChange.current(selectionStart, selectionEnd);
  }, [selectionStart, selectionEnd]);
}
//# sourceMappingURL=index.js.map