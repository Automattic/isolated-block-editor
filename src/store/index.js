/**
 * WordPress dependencies
 */

import { combineReducers } from '@wordpress/data';

/**
 * Internal dependencies
 */

import blocksReducer from './blocks/reducer';
import blockActions from './blocks/actions';
import editorReducer from './editor/reducer';
import editorActions from './editor/actions';
import preferencesReducer from './preferences/reducer';
import preferenceActions from './preferences/actions';
import optionsReducer from './options/reducer';
import optionActions from './options/actions';
import * as blockSelectors from './blocks/selectors';
import * as editorSelectors from './editor/selectors';
import * as preferenceSelectors from './preferences/selectors';
import * as optionSelectors from './options/selectors';

// Collaborative Editing
import * as collabActions from './collab/actions';
import * as collabSelectors from './collab/selectors';
import * as peersSelectors from './peers/selectors';
import collabControls from './collab/controls'; // will safely noop if collab isn't initialized
import collabReducer from './collab/reducer';
import peersActions from './peers/actions';
import peersReducer from './peers/reducer';

function storeConfig( preferencesKey, defaultPreferences ) {
	return {
		reducer: combineReducers( {
			blocks: blocksReducer,
			editor: editorReducer,
			preferences: preferencesReducer,
			options: optionsReducer,
			peers: peersReducer,
			collab: collabReducer,
		} ),

		actions: {
			...blockActions,
			...editorActions,
			...optionActions,
			...preferenceActions,
			...peersActions,
			...collabActions,
		},

		selectors: {
			...blockSelectors,
			...editorSelectors,
			...preferenceSelectors,
			...optionSelectors,
			...peersSelectors,
			...collabSelectors,
		},

		controls: {
			...collabControls,
		},

		persist: [ 'preferences' ],

		initialState: {
			preferences:
				preferencesKey && localStorage.getItem( preferencesKey )
					? // @ts-ignore
					  JSON.parse( localStorage.getItem( preferencesKey ) )
					: defaultPreferences,
		},
	};
}

export default storeConfig;
