/**
 * WordPress dependencies
 */

import { serialize, parse, createBlock, synchronizeBlocksWithTemplate } from '@wordpress/blocks';

const getPattern = ( patterns, currentPattern ) =>
	patterns && patterns.find( ( item ) => item.name === currentPattern );

/** @typedef {import('../../index').IsoSettings} IsoSettings */

/**
 * Pattern type.
 *
 * @typedef Pattern
 * @property {string} name - Name of the pattern.
 * @property {string} content - Content for the pattern.
 */

/**
 * Editor mode
 *
 * @typedef {('visual'|'text')} EditorMode
 */

/**
 * The editor state object
 *
 * @typedef EditorState
 * @property {EditorMode} editorMode - whether in visual or code editing mode.
 * @property {boolean} isInserterOpened - whether the inserter is open.
 * @property {boolean} isListViewOpened - whether the list view is open.
 * @property {Pattern[]} patterns - array of patterns.
 * @property {string|null} currentPattern - current pattern name.
 * @property {string[]} ignoredContent - content to ignore when saving.
 * @property {object|null} gutenbergTemplate - the Gutenberg template
 * @property {boolean} isEditing - is this editor being used?
 * @property {boolean} isReady - is the editor ready?
 * @property {IsoSettings} settings - editor settings
 * @property {string} deviceType - current device type
 * @property {Object} canvasStyles - editor canvas styles
 * @property {boolean} isIframePreview - whether the editor canvas is an iframe
 */

/** @type EditorState */
const DEFAULT_STATE = {
	// Editor state
	editorMode: 'visual',
	isInserterOpened: false,
	isEditing: false,
	isListViewOpened: false,
	isReady: false,

	patterns: [],
	currentPattern: null,
	gutenbergTemplate: null,

	ignoredContent: [],
	deviceType: 'Desktop',
	canvasStyles: null,
	isIframePreview: false,

	settings: {
		preferencesKey: null,
		persistenceKey: null,
		blocks: {
			allowBlocks: [],
			disallowBlocks: [],
		},
		disallowEmbed: [],
		customStores: [],
		toolbar: {
			inserter: true,
			undo: true,
			inspector: true,
			navigation: false,
			documentInspector: false,
			selectorTool: false,
		},
		sidebar: {
			inspector: false,
			inserter: false,
		},
		moreMenu: {
			editor: false,
			fullscreen: false,
			preview: false,
			topToolbar: false,
		},
		linkMenu: [],
		currentPattern: null,
		patterns: [],
		defaultPreferences: {},
		allowApi: false,
		disableCanvasAnimations: false,
	},
};

/**
 * Ignored content are pieces of HTML that we don't need to save. This could be, for example, an empty pattern.
 *
 * @param {Pattern[]} patterns - Array of patterns.
 * @param {string} currentPattern - Selected pattern name.
 * @param {object|null} gutenbergTemplate - Gutenberg template.
 * @return {string[]} Array of ignored HTML strings.
 */
function getIgnoredContent( patterns, currentPattern, gutenbergTemplate ) {
	const ignored = [
		serialize( createBlock( 'core/paragraph' ) ),
		serialize( createBlock( 'core/paragraph', { className: '' } ) ),
	];
	const found = getPattern( patterns, currentPattern );

	// If we're using a starter pattern then add the empty pattern to our ignored content list
	if ( found ) {
		// We parse and then serialize so it will better match the formatting from Gutenberg when saving content
		ignored.push( serialize( parse( found.content ) ) );
	}

	// If we're using a Gutenberg template then add that to the ignored list
	if ( gutenbergTemplate ) {
		ignored.push( serialize( synchronizeBlocksWithTemplate( [], gutenbergTemplate ) ) );
	}

	return ignored;
}

const reducer = ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case 'SETUP_EDITOR': {
			const { currentPattern, patterns } = action.settings.iso;

			return {
				...state,
				patterns,
				currentPattern,
				ignoredContent: getIgnoredContent( patterns, currentPattern, action.settings.editor.template ),
				gutenbergTemplate: action.settings.editor.template,
				settings: {
					...state.settings,
					...action.settings.iso,
				},
			};
		}

		case 'SET_CURRENT_PATTERN':
			return {
				...state,
				currentPattern: action.pattern,
				ignoredContent: getIgnoredContent( state.patterns, action.pattern, state.gutenbergTemplate ),
			};

		case 'SET_EDITOR_MODE':
			return {
				...state,
				editorMode: action.editorMode,
			};

		case 'SET_INSERTER_OPEN':
			return {
				...state,
				isInserterOpened: action.isOpen,
				isInspectorOpened: false,
				isListViewOpened: false,
			};

		case 'SET_INSPECTOR_OPEN':
			return {
				...state,
				isInspectorOpened: action.isOpen,
				isListViewOpened: false,
			};

		case 'SET_LISTVIEW_OPEN':
			return {
				...state,
				isInserterOpened: false,
				isInspectorOpened: false,
				isListViewOpened: action.isOpen,
			};

		case 'SET_EDITING':
			return {
				...state,
				isEditing: action.isEditing,
			};

		case 'SET_EDITOR_READY':
			return {
				...state,
				isReady: action.isReady,
			};

		case 'SET_DEVICE_TYPE':
			return {
				...state,
				deviceType: action.deviceType,
			};

		case 'SET_CANVAS_STYLES':
			return {
				...state,
				canvasStyles: action.canvasStyles,
			};

		case 'SET_IFRAME_PREVIEW':
			return {
				...state,
				isIframePreview: action.isIframePreview,
			};
	}

	return state;
};

export default reducer;
