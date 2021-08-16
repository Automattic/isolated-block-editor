/**
 * @param {object} opts - Hook options
 * @param {object[]} opts.blocks
 * @param {OnUpdate} opts.onRemoteDataChange
 * @param {CollaborationSettings} [opts.settings]
 */
export default function useYjs({ blocks, onRemoteDataChange, settings }: {
    blocks: object[];
    onRemoteDataChange: OnUpdate;
    settings?: import("../../..").CollaborationSettings | undefined;
}): void;
export type IsoEditorSelection = {
    selectionStart: object;
    selectionEnd: object;
};
export type CollaborationSettings = import('../../..').CollaborationSettings;
export type CollaborationTransport = import('../../..').CollaborationTransport;
export type CollaborationTransportDocMessage = import('../../..').CollaborationTransportDocMessage;
export type CollaborationTransportSelectionMessage = import('../../..').CollaborationTransportSelectionMessage;
export type EditorSelection = import('../../..').EditorSelection;
export type OnUpdate = import('..').OnUpdate;
//# sourceMappingURL=index.d.ts.map