/**
 * @param {object} opts - Hook options
 * @param {CollaborationSettings} [opts.settings]
 */
export default function useYjs({ settings }: {
    settings?: import("..").CollaborationSettings | undefined;
}): void;
/** @typedef {import('..').CollaborationSettings} CollaborationSettings */
/** @typedef {import('..').CollaborationTransport} CollaborationTransport */
/** @typedef {import('..').CollaborationTransportDocMessage} CollaborationTransportDocMessage */
/** @typedef {import('..').CollaborationTransportSelectionMessage} CollaborationTransportSelectionMessage */
/** @typedef {import('..').EditorSelection} EditorSelection */
/** @typedef {import('../../block-editor-contents').OnUpdate} OnUpdate */
export const defaultColors: string[];
export type IsoEditorSelection = {
    selectionStart: object;
    selectionEnd: object;
};
export type CollaborationSettings = import('..').CollaborationSettings;
export type CollaborationTransport = import('..').CollaborationTransport;
export type CollaborationTransportDocMessage = import('..').CollaborationTransportDocMessage;
export type CollaborationTransportSelectionMessage = import('..').CollaborationTransportSelectionMessage;
export type EditorSelection = import('..').EditorSelection;
export type OnUpdate = import('../../block-editor-contents').OnUpdate;
//# sourceMappingURL=index.d.ts.map