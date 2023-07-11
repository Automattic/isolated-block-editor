/**
 * Applies given carets to the given record.
 *
 * @param {Object} record The record to apply carets to.
 * @param {MultilineData} multiline
 * @param {Array} carets The carets to apply.
 * @return {Object} A record with the carets applied.
 */
export function applyCarets(record: any, multiline: MultilineData, carets?: any[]): any;
/**
 * @typedef MultilineData
 * @property {boolean} isMultiline - Whether this is a multiline attribute.
 * @property {(offset: number) => {isAtMultilineItemEnd: boolean, multilineItemText?: string}} checkOffset - Determine whether a given caret index is at the end of a multiline segment.
 */
export const FORMAT_NAME: "isolated/collab-caret";
export namespace settings {
    let title: string;
    let tagName: string;
    let className: string;
    namespace attributes {
        export let id: string;
        let className_1: string;
        export { className_1 as className };
    }
    function edit(): null;
    function __experimentalGetPropsForEditableTreePreparation(select: any, { richTextIdentifier, blockClientId }: {
        richTextIdentifier: any;
        blockClientId: any;
    }): {
        carets: {
            id: string;
            label: any;
            start: any;
            end: any;
            color: any;
        }[];
        multilineTag: any;
        blockAttributeSelector: () => any;
    };
    function __experimentalCreatePrepareEditableTree({ carets, multilineTag, blockAttributeSelector }: {
        carets: any;
        multilineTag: any;
        blockAttributeSelector: any;
    }): (formats: any, text: any) => any;
}
export function registerFormatCollabCaret(): void;
export type MultilineData = {
    /**
     * - Whether this is a multiline attribute.
     */
    isMultiline: boolean;
    /**
     * - Determine whether a given caret index is at the end of a multiline segment.
     */
    checkOffset: (offset: number) => {
        isAtMultilineItemEnd: boolean;
        multilineItemText?: string;
    };
};
//# sourceMappingURL=index.d.ts.map