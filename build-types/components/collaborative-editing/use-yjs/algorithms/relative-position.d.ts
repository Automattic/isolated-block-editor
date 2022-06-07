/**
 * @typedef WPBlockSelection
 * @property {string} [clientId]
 * @property {string} [attributeKey]
 * @property {number} [offset]
 */
/**
 * @typedef SelectionRange
 * @property {WPBlockSelection} start
 * @property {WPBlockSelection} end
 */
/**
 * @typedef RelativePositionManager
 * @property {RelativePosition} self
 * @property {PeerRelativePosition} peers
 */
/**
 * Handle the conversion between a Yjs relative position and a Gutenberg absolute position.
 *
 * This is used to maintain a user's caret position so it doesn't look like it's pushed around by remote changes.
 * For example, if my caret is at `ab|c` and a remote user changes the text to `aabc`, I want my
 * caret to "stay" relative to the `b` (`aab|c`) instead of staying at the same absolute index (`aa|bc`).
 */
export class RelativePosition {
    /**
     * @param {() => SelectionRange} getSelection - Function to get block editor selection.
     * @param {(clientId: string, attributeKey: string, startOffset: number, endOffset: number) => void} selectionChange - Function to set block editor selection.
     */
    constructor(getSelection: () => SelectionRange, selectionChange: (clientId: string, attributeKey: string, startOffset: number, endOffset: number) => void);
    getSelection: () => SelectionRange;
    selectionChange: (clientId: string, attributeKey: string, startOffset: number, endOffset: number) => void;
    /**
     * Get the current block editor selection, convert it to a Y.RelativePosition, and remember it.
     *
     * Call this method _before_ the Y.Doc is mutated.
     *
     * @param {yjs.Doc} doc
     */
    saveRelativePosition(doc: yjs.Doc): void;
    relPos: {
        clientId: string | undefined;
        attributeKey: string | undefined;
        startOffset: yjs.RelativePosition;
        endOffset: yjs.RelativePosition;
    } | undefined;
    /**
     * If a saved Y.RelativePosition exists, convert it to an absolute position and
     * dispatch it as a selection change to the block editor.
     *
     * Call this method _after_ the Y.Doc is mutated.
     *
     * @param {yjs.Doc} doc
     */
    setAbsolutePosition(doc: yjs.Doc): void;
}
export class PeerRelativePosition {
    /**
     * @param {() => Record<string, Partial<SelectionRange>>} getPeers
     * @param {(peerId: string, selection: SelectionRange) => void} setPeerSelection
     */
    constructor(getPeers: () => Record<string, Partial<SelectionRange>>, setPeerSelection: (peerId: string, selection: SelectionRange) => void);
    /**
     * @private
     * @type {RelativePosition[]}
     */
    private _peerRelativePositions;
    /** @private */
    private _getPeers;
    /** @private */
    private _setPeerSelection;
    /**
     * @private
     * @param {string} peerId
     * @param {Partial<SelectionRange>} peer
     * @return {RelativePosition}
     */
    private _initRelativePositionForPeer;
    /**
     * @param {yjs.Doc} doc
     */
    saveRelativePositions(doc: yjs.Doc): void;
    /**
     * @param {yjs.Doc} doc
     */
    setAbsolutePositions(doc: yjs.Doc): void;
}
export type WPBlockSelection = {
    clientId?: string | undefined;
    attributeKey?: string | undefined;
    offset?: number | undefined;
};
export type SelectionRange = {
    start: WPBlockSelection;
    end: WPBlockSelection;
};
export type RelativePositionManager = {
    self: RelativePosition;
    peers: PeerRelativePosition;
};
import * as yjs from "yjs";
//# sourceMappingURL=relative-position.d.ts.map