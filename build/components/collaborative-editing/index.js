"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = require("../..");

var _useYjs = _interopRequireDefault(require("./use-yjs"));

var _avatars = _interopRequireDefault(require("./components/avatars"));

import { createElement } from "@wordpress/element";

/**
 * Internal dependencies
 */

/**
 * Real-time collaboration settings
 *
 * @typedef CollaborationSettings
 * @property {boolean} enabled
 * @property {string} [channelId] Optional channel id to pass to transport.connect().
 * @property {string} username Name displayed to peers. Required if collab is enabled.
 * @property {string} [caretColor] Color of the caret indicator displayed to peers. If unspecified, a random color will be selected.
 * @property {string} [avatarUrl] Url of the avatar image diplayed to peers.
 * @property {CollaborationTransport} transport Required if collab is enabled.
 */

/**
 * Transport module for real-time collaboration
 *
 * @typedef CollaborationTransport
 * @property {(message: CollaborationTransportDocMessage|CollaborationTransportSelectionMessage) => void} sendMessage
 * @property {(options: CollaborationTransportConnectOpts) => Promise<{isFirstInChannel: boolean}>} connect
 * @property {() => Promise<void>} disconnect
 */

/**
 * @typedef CollaborationTransportConnectOpts
 * @property {Object} user
 * @property {string} user.identity
 * @property {string} user.name
 * @property {string} [user.avatarUrl]
 * @property {string} [user.color] Color of the caret indicator displayed to peers.
 * @property {(message: object) => void} onReceiveMessage Callback to run when a message is received.
 * @property {(peers: AvailablePeer[]) => void} setAvailablePeers Callback to run when peers change.
 * @property {string} [channelId]
 */

/**
 * @typedef AvailablePeer
 * @property {string} id
 * @property {string} name
 * @property {string} color
 * @property {string} [avatarUrl]
 */

/**
 * @typedef CollaborationTransportDocMessage
 * @property {string} identity
 * @property {'doc'} type
 * @property {Object} message
 */

/**
 * @typedef CollaborationTransportSelectionMessage
 * @property {string} identity
 * @property {'selection'} type
 * @property {EditorSelection} selection
 */

/**
 * @typedef EditorSelection
 * @property {Object} start
 * @property {Object} end
 */

/**
 * @param {Object} props
 * @param {CollaborationSettings} props.settings
 */
function CollaborativeEditing(_ref) {
  var settings = _ref.settings;
  (0, _useYjs["default"])({
    settings: settings
  });
  return createElement(_.ToolbarSlot, null, createElement(_avatars["default"], null));
}

var _default = CollaborativeEditing;
exports["default"] = _default;
//# sourceMappingURL=index.js.map