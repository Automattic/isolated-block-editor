// @ts-nocheck
/**
 * Internal dependencies
 */
import { ToolbarSlot } from '../..';
import useYjs from './use-yjs';
import CollaborativeEditingAvatars from './components/avatars';

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
 * @property {(message: CollaborationTransportMessage) => void} sendMessage
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
 * @typedef {CollaborationTransportDocMessage|CollaborationTransportSelectionMessage} CollaborationTransportMessage
 */

/**
 * @typedef EditorSelection
 * @property {Object} start
 * @property {Object} end
 */

/**
 * @typedef RichTextHint
 * @property {string} clientId
 * @property {string} attributeKey
 */

/**
 * @param {Object} props
 * @param {CollaborationSettings} props.settings
 */
function CollaborativeEditing( { settings } ) {
	useYjs( {
		settings,
	} );

	return (
		<ToolbarSlot>
			<CollaborativeEditingAvatars />
		</ToolbarSlot>
	);
}

export default CollaborativeEditing;
