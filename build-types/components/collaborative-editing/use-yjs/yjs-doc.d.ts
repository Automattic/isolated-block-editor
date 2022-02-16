/**
 * Create a Yjs document.
 *
 * @param {Object} opts
 * @param {RelativePositionManager} opts.relativePositionManager - Module to coordinate conversions between the block editor selection and Y.RelativePosition.
 * @param {string} opts.identity - Client identifier.
 * @param {function(Record<string, unknown>): void} opts.sendMessage
 */
export function createDocument({ identity, relativePositionManager, sendMessage }: {
    relativePositionManager: RelativePositionManager;
    identity: string;
    sendMessage: (arg0: Record<string, unknown>) => void;
}): {
    /**
     * @param {PostObject} data
     * @param {Object} [opts]
     * @param {boolean} [opts.isInitialContent] Whether this is the initial content loaded from the editor onLoad.
     * @param {RichTextHint} [opts.richTextHint] Indication that a certain block attribute is a RichText, inferred from the current editor selection.
     */
    applyLocalChangesToYDoc(data: PostObject, { isInitialContent, richTextHint }?: {
        isInitialContent?: boolean | undefined;
        richTextHint?: import("..").RichTextHint | undefined;
    } | undefined): void;
    connect(): void;
    disconnect(): void;
    startSharing(data: any): void;
    receiveMessage({ protocol, messageType, origin, ...content }: {
        [x: string]: any;
        protocol: any;
        messageType: any;
        origin: any;
    }): void;
    onYDocTriggeredChange(listener: any): () => void;
    onConnectionReady(listener: any): () => void;
    getState(): "off" | "on" | "connecting";
    getDoc(): yjs.Doc;
    getPostMap(): yjs.Map<any>;
};
export type PostObject = import('./algorithms/yjs').PostObject;
export type RelativePositionManager = import('./algorithms/relative-position').RelativePositionManager;
export type RichTextHint = import('..').RichTextHint;
import * as yjs from "yjs";
//# sourceMappingURL=yjs-doc.d.ts.map