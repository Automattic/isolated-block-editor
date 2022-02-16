/**
 * Strips scripts and on* attributes from HTML.
 *
 * Slightly modified version of wp.dom.safeHTML() that only alters the
 * HTML if it actually finds nodes/attributes to remove. This is so we can leave
 * invalid HTML intact, for example if a user is still in the middle of typing the HTML string.
 *
 * @param {string} html HTML to sanitize.
 *
 * @return {string} The sanitized HTML.
 */
export default function sanitizeHTML(html: string): string;
//# sourceMappingURL=sanitize-html.d.ts.map