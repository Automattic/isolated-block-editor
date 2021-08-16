/**
 * @param {import('../../').AvailablePeer[]} peers
 */
export function setAvailablePeers(peers: import('../../').AvailablePeer[]): {
    type: string;
    peers: import("../../").AvailablePeer[];
};
/**
 * @param {string} peerId
 * @param {import('../..').EditorSelection} selection
 */
export function setPeerSelection(peerId: string, selection: import('../..').EditorSelection): {
    type: string;
    peerId: string;
    selection: import("../../").EditorSelection;
};
declare namespace _default {
    export { setAvailablePeers };
    export { setPeerSelection };
}
export default _default;
//# sourceMappingURL=actions.d.ts.map