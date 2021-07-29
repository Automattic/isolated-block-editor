/**
 * Get blocks from edit history
 * @param {object} state - Current state
 * @returns {object[]}
 */
export function getBlocks(state: object): object[];
/**
 * Get selection
 * @param {object} state - Current state
 * @returns {object}
 */
export function getEditorSelection(state: object): object;
/**
 * Is undo possible?
 * @param {object} state - Current state
 * @returns {boolean}
 */
export function hasEditorUndo(state: object): boolean;
/**
 * Is redo possible?
 * @param {object} state - Current state
 * @returns {boolean}
 */
export function hasEditorRedo(state: object): boolean;
/**
 * Get current edit count
 * @param {object} state - Current state
 * @returns {number}
 */
export function getEditCount(state: object): number;
//# sourceMappingURL=selectors.d.ts.map