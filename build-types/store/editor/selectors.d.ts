/** @typedef {import('../../index').IsoSettings} IsoSettings */
/** @typedef {import('./reducer').EditorMode} EditorMode */
/** @typedef {import('./reducer').Pattern} Pattern */
/** @typedef {import('./reducer').EditorState} EditorState */
/**
 * Get current editor mode
 * @param {{editor: EditorState}} state - Current state
 * @returns {EditorMode}
 */
export function getEditorMode(state: {
    editor: EditorState;
}): EditorMode;
/**
 * Get current editor settings
 * @param {{editor: EditorState}} state - Current state
 * @returns {IsoSettings}
 */
export function getEditorSettings(state: {
    editor: EditorState;
}): IsoSettings;
/**
 * Is the editor ready for use?
 * @param {{editor: EditorState}} state - Current state
 * @returns {boolean}
 */
export function isEditorReady(state: {
    editor: EditorState;
}): boolean;
/**
 * Get current pattern name
 * @param {{editor: EditorState}} state - Current state
 * @returns {string|null}
 */
export function getCurrentPatternName(state: {
    editor: EditorState;
}): string | null;
/**
 * Get current pattern
 * @param {{editor: EditorState}} state - Current state
 * @returns {Pattern|null}
 */
export function getCurrentPattern(state: {
    editor: EditorState;
}): Pattern | null;
/**
 * Get all ignored content
 * @param {{editor: EditorState}} state - Current state
 * @returns {string[]}
 */
export function getIgnoredContent(state: {
    editor: EditorState;
}): string[];
/**
 * Get the pattern for a given name
 * @param {{editor: EditorState}} state - Current state
 * @returns {Pattern|null}
 */
export function getNamedPattern(state: {
    editor: EditorState;
}, patternName: any): Pattern | null;
/**
 * Is the block inserter open?
 * @param {{editor: EditorState}} state - Current state
 * @returns {boolean}
 */
export function isInserterOpened(state: {
    editor: EditorState;
}): boolean;
/**
 * Are we editing this editor?
 * @param {{editor: EditorState}} state - Current state
 * @returns {boolean}
 */
export function isEditing(state: {
    editor: EditorState;
}): boolean;
/**
 * Get all patterns
 * @param {{editor: EditorState}} state - Current state
 * @returns {Pattern[]}
 */
export function getPatterns(state: {
    editor: EditorState;
}): Pattern[];
export function isListViewOpened(state: any): any;
export const isEditorSidebarOpened: any;
export type IsoSettings = import('../../index').IsoSettings;
export type EditorMode = import('./reducer').EditorMode;
export type Pattern = import('./reducer').Pattern;
export type EditorState = import('./reducer').EditorState;
//# sourceMappingURL=selectors.d.ts.map