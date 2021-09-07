/**
 * @param {import('../../components/collaborative-editing').AvailablePeer[]} peers
 */
export function setAvailablePeers(peers: import('../../components/collaborative-editing').AvailablePeer[]): {
    type: string;
    peers: import("../../components/collaborative-editing").AvailablePeer[];
};
/**
 * @param {string} peerId
 * @param {import('../../components/collaborative-editing').EditorSelection} selection
 */
export function setPeerSelection(peerId: string, selection: import('../../components/collaborative-editing').EditorSelection): {
    type: string;
    peerId: string;
    selection: import("../../components/collaborative-editing").EditorSelection;
};
declare namespace _default {
    export { setAvailablePeers };
    export { setPeerSelection };
}
export default _default;
//# sourceMappingURL=actions.d.ts.map