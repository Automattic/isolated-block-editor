export default ContentSaver;
export type OnSaveBlocks = import('../../index').OnSaveBlocks;
export type OnSaveContent = import('../../index').OnSaveContent;
/** @typedef {import('../../index').OnSaveBlocks} OnSaveBlocks */
/** @typedef {import('../../index').OnSaveContent} OnSaveContent */
/**
 * Content saver
 * @param {object} props - Component props
 * @param {OnSaveBlocks} [props.onSaveBlocks] - Save blocks callback
 * @param {OnSaveContent} [props.onSaveContent] - Save content callback
 */
declare function ContentSaver(props: {
    onSaveBlocks?: import("../../index").OnSaveBlocks | undefined;
    onSaveContent?: import("../../index").OnSaveContent | undefined;
}): null;
//# sourceMappingURL=index.d.ts.map