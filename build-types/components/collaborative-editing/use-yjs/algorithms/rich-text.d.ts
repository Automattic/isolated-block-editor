/**
 * Convert an array of Gutenberg RichText formats to an array of range-based Y.Text formats.
 *
 * @param {Object[]} formats
 * @return {Object[]} Y.Text formats
 */
export function gutenFormatsToYFormats(formats: any[]): any[];
/**
 * Converts registered formats back to their standard tag/attribute names.
 *
 * For example, `core/bold` will be converted back to `strong`.
 *
 * @param format
 */
export function namedGutenFormatToStandardTags(format: any): {
    [x: number]: any;
};
/**
 * Apply the delta between two HTML strings to a Y.XmlText.
 *
 * @param {string} htmlA
 * @param {string} htmlB
 * @param {import("yjs").Map} richTextMap
 * @param {Object} [richTextOpts] Optional options object to pass @wordpress/rich-text create().
 */
export function applyHTMLDelta(htmlA: string, htmlB: string, richTextMap: import("yjs").Map<any>, richTextOpts?: any): void;
/**
 * Convert the RichText back from our Yjs representation to an HTML string.
 *
 * @param {import("yjs").Map} richTextMap
 * @return {string}
 */
export function richTextMapToHTML(richTextMap: import("yjs").Map<any>): string;
export namespace Y {
    type XmlText = import("yjs").XmlText;
}
//# sourceMappingURL=rich-text.d.ts.map