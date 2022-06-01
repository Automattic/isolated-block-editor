/**
 * Override the default `core/editor` store with functions that return data from `core/block-editor` instead of the post in `core/editor`
 *
 * @param existingSelectors
 * @param newSelect
 */
export default function _default(existingSelectors: any, newSelect: any): {
    getEditedPostAttribute: (state: any, attributeName: any) => any;
    getEditedPostContent: () => any;
};
//# sourceMappingURL=index.d.ts.map