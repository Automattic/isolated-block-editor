export default getInitialEditorContent;
export type Pattern = import('../../store/editor/reducer').Pattern;
/**
 * Get the pattern to start an editor with.
 *
 * @param {Pattern[]} patterns Array of patterns
 * @param {string} currentPattern Current pattern name
 * @param {object[]} template Current template
 * @param {object[]} initialContent Initial content
 */
declare function getInitialEditorContent(patterns: Pattern[], currentPattern: string, template: object[], initialContent: object[]): any;
//# sourceMappingURL=editor-content.d.ts.map