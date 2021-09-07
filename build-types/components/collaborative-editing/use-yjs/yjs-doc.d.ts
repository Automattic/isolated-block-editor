export function createDocument({ identity, applyDataChanges, getData, sendMessage, }: {
    identity: any;
    applyDataChanges: any;
    getData: any;
    sendMessage: any;
}): {
    applyDataChanges(data: any): void;
    connect(): void;
    disconnect(): void;
    startSharing(data: any): void;
    receiveMessage({ protocol, messageType, origin, ...content }: {
        [x: string]: any;
        protocol: any;
        messageType: any;
        origin: any;
    }): void;
    onRemoteDataChange(listener: any): () => void;
    onStateChange(listener: any): () => void;
    getState(): string;
};
//# sourceMappingURL=yjs-doc.d.ts.map