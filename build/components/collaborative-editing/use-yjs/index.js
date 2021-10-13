"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useYjs;
exports.defaultColors = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _uuid = require("uuid");

var _lodash = require("lodash");

var _yjsDoc = require("./yjs-doc");

var _yjs = require("./algorithms/yjs");

var _data = require("@wordpress/data");

var _element = require("@wordpress/element");

var _filters = require("./filters");

var _formats = require("./formats");

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

/** @typedef {import('..').CollaborationTransport} CollaborationTransport */

/** @typedef {import('..').CollaborationTransportDocMessage} CollaborationTransportDocMessage */

/** @typedef {import('..').CollaborationTransportSelectionMessage} CollaborationTransportSelectionMessage */

/** @typedef {import('..').EditorSelection} EditorSelection */

/** @typedef {import('../../block-editor-contents').OnUpdate} OnUpdate */


var defaultColors = ['#4676C0', '#6F6EBE', '#9063B6', '#C3498D', '#9E6D14', '#3B4856', '#4A807A'];
/**
 * @param {Object} opts - Hook options
 * @param {() => object[]} opts.getBlocks - Content to initialize the Yjs doc with.
 * @param {OnUpdate} opts.onRemoteDataChange - Function to update editor blocks in redux state.
 * @param {CollaborationSettings} opts.settings
 * @param {import('../../../store/peers/actions').setAvailablePeers} opts.setAvailablePeers
 * @param {import('../../../store/peers/actions').setPeerSelection} opts.setPeerSelection
 * @typedef IsoEditorSelection
 * @property {Object} selectionStart
 * @property {Object} selectionEnd
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
    var getBlocks, onRemoteDataChange, settings, setPeerSelection, _setAvailablePeers, channelId, transport, identity, doc, onReceiveMessage;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getBlocks = _ref.getBlocks, onRemoteDataChange = _ref.onRemoteDataChange, settings = _ref.settings, setPeerSelection = _ref.setPeerSelection, _setAvailablePeers = _ref.setAvailablePeers;
            channelId = settings.channelId, transport = settings.transport;
            /** @type {string} */

            identity = (0, _uuid.v4)();
            debug("initYDoc (identity: ".concat(identity, ")"));
            doc = (0, _yjsDoc.createDocument)({
              identity: identity,
              applyDataChanges: _yjs.updatePostDoc,
              getData: _yjs.postDocToObject,

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
                color: settings.caretColor || (0, _lodash.sample)(defaultColors),
                avatarUrl: settings.avatarUrl
              },
              onReceiveMessage: onReceiveMessage,
              setAvailablePeers: function setAvailablePeers(peers) {
                debug('setAvailablePeers', peers);

                _setAvailablePeers(peers);
              },
              channelId: channelId
            }).then(function (_ref4) {
              var isFirstInChannel = _ref4.isFirstInChannel;
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

              var applyChangesToYjs = function applyChangesToYjs(blocks) {
                if (doc.getState() !== 'on') {
                  return;
                }

                debug('local changes applied to ydoc');
                doc.applyDataChanges({
                  blocks: blocks
                });
              };

              var sendSelection = function sendSelection(start, end) {
                debug('sendSelection', start, end);
                transport.sendMessage({
                  type: 'selection',
                  identity: identity,
                  selection: {
                    start: start,
                    end: end
                  }
                });
              };

              var disconnect = function disconnect() {
                transport.disconnect();
                doc.disconnect();
              };

              window.addEventListener('beforeunload', function () {
                return disconnect();
              });
              return {
                applyChangesToYjs: applyChangesToYjs,
                sendSelection: sendSelection,
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
  var settings = _ref2.settings;
  var onBlocksChange = (0, _element.useRef)(_lodash.noop);
  var onSelectionChange = (0, _element.useRef)(_lodash.noop);

  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      blocks: select('isolated/editor').getBlocks(),
      getBlocks: select('isolated/editor').getBlocks,
      getFormatType: select('core/rich-text').getFormatType,
      selectionStart: select('core/block-editor').getSelectionStart(),
      selectionEnd: select('core/block-editor').getSelectionEnd()
    };
  }, []),
      blocks = _useSelect.blocks,
      getBlocks = _useSelect.getBlocks,
      getFormatType = _useSelect.getFormatType,
      selectionStart = _useSelect.selectionStart,
      selectionEnd = _useSelect.selectionEnd;

  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
      setAvailablePeers = _useDispatch.setAvailablePeers,
      setPeerSelection = _useDispatch.setPeerSelection,
      updateBlocksWithUndo = _useDispatch.updateBlocksWithUndo;

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
      onRemoteDataChange: updateBlocksWithUndo,
      settings: settings,
      getBlocks: getBlocks,
      setPeerSelection: setPeerSelection,
      setAvailablePeers: setAvailablePeers
    }).then(function (_ref3) {
      var applyChangesToYjs = _ref3.applyChangesToYjs,
          sendSelection = _ref3.sendSelection,
          disconnect = _ref3.disconnect;

      onUnmount = function onUnmount() {
        debug('unmount');
        disconnect();
      };

      onBlocksChange.current = applyChangesToYjs;
      onSelectionChange.current = sendSelection;
    });
    return function () {
      return onUnmount();
    };
  }, []);
  (0, _element.useEffect)(function () {
    onBlocksChange.current(blocks);
  }, [blocks]);
  (0, _element.useEffect)(function () {
    onSelectionChange.current(selectionStart, selectionEnd);
  }, [selectionStart, selectionEnd]);
}
//# sourceMappingURL=index.js.map