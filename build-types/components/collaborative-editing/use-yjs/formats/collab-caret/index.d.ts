/**
 * Applies given carets to the given record.
 *
 * @param {Object} record The record to apply carets to.
 * @param {Array} carets The carets to apply.
 * @return {Object} A record with the carets applied.
 */
export function applyCarets(record: any, carets?: any[]): any;
export const FORMAT_NAME: "isolated/collab-caret";
export namespace settings {
    const title: string;
    const tagName: string;
    const className: string;
    namespace attributes {
        export const id: string;
        const className_1: string;
        export { className_1 as className };
    }
    function edit(): null;
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
    };
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
    };
    function __experimentalCreatePrepareEditableTree({ carets }: {
        carets: any;
    }): (formats: any, text: any) => any;
    function __experimentalCreatePrepareEditableTree({ carets }: {
        carets: any;
    }): (formats: any, text: any) => any;
}
export function registerFormatCollabCaret(): void;
//# sourceMappingURL=index.d.ts.map