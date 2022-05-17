/**
 * Get blocks from edit history
 *
 * @param {Object} state - Current state
 * @return {object[]}
 */
export function getBlocks(state: any): object[];
/**
 * Get selection
 *
 * @param {Object} state - Current state
 * @return {Object}
 */
export function getEditorSelection(state: any): any;
/**
 * Is undo possible?
 *
 * @param {Object} state - Current state
 * @return {boolean}
 */
export function hasEditorUndo(state: any): boolean;
/**
 * Is redo possible?
 *
 * @param {Object} state - Current state
 * @return {boolean}
 */
export function hasEditorRedo(state: any): boolean;
/**
 * Get current edit count
 *
 * @param {Object} state - Current state
 * @return {number}
 */
export function getEditCount(state: any): number;
//# sourceMappingURL=selectors.d.ts.map