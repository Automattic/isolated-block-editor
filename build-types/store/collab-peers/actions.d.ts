/**
 * @param {import('../../components/collaborative-editing').AvailablePeer[]} peers
 */
export function setAvailableCollabPeers(peers: import('../../components/collaborative-editing').AvailablePeer[]): {
    type: string;
    peers: import("../../components/collaborative-editing").AvailablePeer[];
};
/**
 * @param {string} peerId
 * @param {import('../../components/collaborative-editing').EditorSelection} selection
 */
export function setCollabPeerSelection(peerId: string, selection: import('../../components/collaborative-editing').EditorSelection): {
    type: string;
    peerId: string;
    selection: import("../../components/collaborative-editing").EditorSelection;
};
//# sourceMappingURL=actions.d.ts.map