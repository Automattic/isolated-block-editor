/**
 * Create a Yjs document.
 *
 * @param {Object} opts
 * @param {string} opts.identity - Client identifier.
 * @param {function(yjs.Doc, PostObject): void} opts.applyChangesToYDoc - Function to apply changes to the Yjs doc.
 * @param {function(yjs.Doc): PostObject} opts.getPostFromYDoc - Function to get post object data from the Yjs doc.
 * @param {function(any): void} opts.sendMessage
 */
export function createDocument({ identity, applyChangesToYDoc, getPostFromYDoc, sendMessage }: {
    identity: string;
    applyChangesToYDoc: (arg0: yjs.Doc, arg1: PostObject) => void;
    getPostFromYDoc: (arg0: yjs.Doc) => PostObject;
    sendMessage: (arg0: any) => void;
}): {
    applyChangesToYDoc(data: any, { isInitialContent }?: {
        isInitialContent?: boolean | undefined;
    }): void;
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
    getState(): "off" | "connecting" | "on";
    getPostMap(): yjs.Map<any>;
};
export type PostObject = import('./algorithms/yjs').PostObject;
import * as yjs from "yjs";
//# sourceMappingURL=yjs-doc.d.ts.map