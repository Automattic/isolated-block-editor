/**
 * External dependencies
 */
import { includes } from 'lodash';

/**
 * WordPress dependencies
 */
import { createRegistrySelector } from '@wordpress/data';
import { store as interfaceStore } from '@wordpress/interface';

/** @typedef {import('../../index').IsoSettings} IsoSettings */
/** @typedef {import('./reducer').EditorMode} EditorMode */
/** @typedef {import('./reducer').Pattern} Pattern */
/** @typedef {import('./reducer').EditorState} EditorState */

/**
 * Get current editor mode
 *
 * @param {{editor: EditorState}} state - Current state
 * @return {EditorMode}
 */
export function getEditorMode( state ) {
	return state.editor.editorMode;
}

/**
 * Get current editor settings
 *
 * @param {{editor: EditorState}} state - Current state
 * @return {IsoSettings}
 */
export function getEditorSettings( state ) {
	return state.editor.settings;
}

/**
 * Is the editor ready for use?
 *
 * @param {{editor: EditorState}} state - Current state
 * @return {boolean}
 */
export function isEditorReady( state ) {
	return state.editor.isReady;
}

/**
 * Get current pattern name
 *
 * @param {{editor: EditorState}} state - Current state
 * @return {string|null}
 */
export function getCurrentPatternName( state ) {
	return state.editor.currentPattern;
}

/**
 * Get current pattern
 *
 * @param {{editor: EditorState}} state - Current state
 * @return {Pattern|null}
 */
export function getCurrentPattern( state ) {
	const { currentPattern, patterns } = state.editor;

	if ( currentPattern && patterns ) {
		for ( let index = 0; index < patterns.length; index++ ) {
			if ( patterns[ index ].name === currentPattern ) {
				return patterns[ index ];
			}
		}
	}

	return null;
}

/**
 * Get all ignored content
 *
 * @param {{editor: EditorState}} state - Current state
 * @return {string[]}
 */
export function getIgnoredContent( state ) {
	return state.editor.ignoredContent;
}

/**
 * Get the pattern for a given name
 *
 * @param {{editor: EditorState}} state - Current state
 * @param patternName
 * @return {Pattern|null}
 */
export function getNamedPattern( state, patternName ) {
	const { patterns = [] } = state.editor;
	let pattern = patterns.find( ( item ) => item.name === patternName );

	// Find the full name
	if ( pattern ) {
		return pattern;
	}

	// Find the shortened name
	pattern = patterns.find( ( item ) => item.name.replace( 'p2/', '' ) === patternName );
	if ( pattern ) {
		return pattern;
	}

	return null;
}

/**
 * Is the block inserter open?
 *
 * @param {{editor: EditorState}} state - Current state
 * @return {boolean}
 */
export function isInserterOpened( state ) {
	return state.editor.isInserterOpened;
}

export const isEditorSidebarOpened = createRegistrySelector( ( select ) => () => {
	const activeGeneralSidebar = select( interfaceStore ).getActiveComplementaryArea( 'isolated/editor' );

	return includes( [ 'edit-post/document', 'edit-post/block' ], activeGeneralSidebar );
} );

/**
 * Are we editing this editor?
 *
 * @param {{editor: EditorState}} state - Current state
 * @return {boolean}
 */
export function isEditing( state ) {
	return state.editor.isEditing;
}

/**
 * Get all patterns
 *
 * @param {{editor: EditorState}} state - Current state
 * @return {Pattern[]}
 */
export function getPatterns( state ) {
	return state.editor.patterns;
}

/**
 * Determine if the list viewer is open
 *
 * @param {{editor: EditorState}} state - Current state
 * @return {boolean}
 */
export function isListViewOpened( state ) {
	return state.editor.isListViewOpened;
}

/**
 * Return current device type
 *
 * @param {{editor: EditorState}} state - Current state
 * @return {string}
 */
export function getPreviewDeviceType( state ) {
	return state.editor.deviceType;
}

/**
 * Return editor canvas styles
 *
 * @param {{editor: EditorState}} state - Current state
 * @return {Object} editor canvas styles
 */
export function getCanvasStyles( state ) {
	return state.editor.canvasStyles;
}

/**
 * Whether the editor canvas is an iframe
 *
 * @param {{editor: EditorState}} state - Current state
 * @return {boolean} whether the editor canvas is an iframe
 */
export function isIframePreview( state ) {
	return state.editor.isIframePreview || [ 'Tablet', 'Mobile' ].includes( state.editor.deviceType );
}