/**
 * WordPress dependencies
 */

import { controls } from '@wordpress/data';
import { store as interfaceStore } from '@wordpress/interface';

/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */
/** @typedef {import('./reducer').EditorMode} EditorMode */

const actions = {
	/**
	 * Set whether the editor is ready for editing
	 *
	 * @param {boolean} isReady
	 */
	setReady( isReady ) {
		return {
			type: 'SET_EDITOR_READY',
			isReady,
		};
	},
	/**
	 * Set the current editor mode
	 *
	 * @param {EditorMode} editorMode Editor mode
	 */
	setEditorMode( editorMode ) {
		return {
			type: 'SET_EDITOR_MODE',
			editorMode,
		};
	},
	/**
	 * Set up the editor
	 *
	 * @param {BlockEditorSettings} settings
	 */
	setupEditor( settings ) {
		return {
			type: 'SETUP_EDITOR',
			settings,
		};
	},
	/**
	 * Set the current pattern name
	 *
	 * @param {string} pattern Pattern name
	 */
	setCurrentPattern( pattern ) {
		return {
			type: 'SET_CURRENT_PATTERN',
			pattern,
		};
	},
	/**
	 * Mark the block inserter as open or closed
	 *
	 * @param {boolean} isOpen
	 */
	setIsInserterOpened( isOpen ) {
		return {
			type: 'SET_INSERTER_OPEN',
			isOpen,
		};
	},
	/**
	 * Set the current device type
	 *
	 * @param {string} deviceType 'Mobile', 'Desktop', or 'Tablet'
	 */
	setDeviceType( deviceType ) {
		return {
			type: 'SET_DEVICE_TYPE',
			deviceType,
		};
	},
	/**
	 * Set the editor canvas styles
	 *
	 * @param {string} canvasStyles
	 */
	setCanvasStyles( canvasStyles ) {
		return {
			type: 'SET_CANVAS_STYLES',
			canvasStyles,
		};
	},
	/**
	 * Set the editor preview mode
	 *
	 * @param {boolean} isIframePreview
	 */
	setIsIframePreview( isIframePreview ) {
		return {
			type: 'SET_IFRAME_PREVIEW',
			isIframePreview,
		};
	},
	/**
	 * Mark this editor as in-use or not
	 *
	 * @param {boolean} isEditing
	 */
	setEditing( isEditing ) {
		return {
			type: 'SET_EDITING',
			isEditing,
		};
	},
	/**
	 * Open the named sidebar
	 *
	 * @param {string} name Name of sidebar section
	 */
	*openGeneralSidebar( name ) {
		yield controls.dispatch( interfaceStore, 'enableComplementaryArea', 'isolated/editor', name );
	},
	/**
	 * Close the sidebar (or popover)
	 */
	*closeGeneralSidebar() {
		yield controls.dispatch( interfaceStore, 'disableComplementaryArea', 'isolated/editor' );
	},
	/**
	 * Set the status of the listview sidebar section
	 *
	 * @param {boolean} isOpen
	 */
	setIsListViewOpened( isOpen ) {
		return {
			type: 'SET_LISTVIEW_OPEN',
			isOpen,
		};
	},
};

export default actions;
