export default CollaborativeEditing;
/**
 * Real-time collaboration settings
 */
export type CollaborationSettings = {
    enabled: boolean;
    /**
     * Optional channel id to pass to transport.connect().
     */
    channelId?: string | undefined;
    /**
     * Name displayed to peers. Required if collab is enabled.
     */
    username: string;
    /**
     * Color of the caret indicator displayed to peers. If unspecified, a random color will be selected.
     */
    caretColor?: string | undefined;
    /**
     * Url of the avatar image diplayed to peers.
     */
    avatarUrl?: string | undefined;
    /**
     * Required if collab is enabled.
     */
    transport: CollaborationTransport;
};
/**
 * Transport module for real-time collaboration
 */
export type CollaborationTransport = {
    sendMessage: (message: CollaborationTransportMessage) => void;
    connect: (options: CollaborationTransportConnectOpts) => Promise<{
        isFirstInChannel: boolean;
    }>;
    disconnect: () => Promise<void>;
};
export type CollaborationTransportConnectOpts = {
    user: {
        identity: string;
        name: string;
        avatarUrl?: string | undefined;
        color?: string | undefined;
    };
    /**
     * Callback to run when a message is received.
     */
    onReceiveMessage: (message: object) => void;
    /**
     * Callback to run when peers change.
     */
    setAvailablePeers: (peers: AvailablePeer[]) => void;
    channelId?: string | undefined;
};
export type AvailablePeer = {
    id: string;
    name: string;
    color: string;
    avatarUrl?: string | undefined;
};
export type CollaborationTransportDocMessage = {
    identity: string;
    type: 'doc';
    message: any;
};
export type CollaborationTransportSelectionMessage = {
    identity: string;
    type: 'selection';
    selection: EditorSelection;
};
export type CollaborationTransportMessage = CollaborationTransportDocMessage | CollaborationTransportSelectionMessage;
export type EditorSelection = {
    start: any;
    end: any;
};
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
 * @param {Object} props
 * @param {CollaborationSettings} props.settings
 */
declare function CollaborativeEditing({ settings }: {
    settings: CollaborationSettings;
}): JSX.Element;
//# sourceMappingURL=index.d.ts.map