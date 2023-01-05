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
import * as collabPeersActions from './collab-peers/actions';
import * as collabPeersSelectors from './collab-peers/selectors';
import collabControls from './collab/controls'; // will safely noop if collab isn't initialized
import collabReducer from './collab/reducer';
import collabPeersReducer from './collab-peers/reducer';
function storeConfig(preferencesKey, defaultPreferences) {
  return {
    reducer: combineReducers({
      blocks: blocksReducer,
      editor: editorReducer,
      preferences: preferencesReducer,
      options: optionsReducer,
      collab: collabReducer,
      collabPeers: collabPeersReducer
    }),
    actions: {
      ...blockActions,
      ...editorActions,
      ...optionActions,
      ...preferenceActions,
      ...collabActions,
      ...collabPeersActions
    },
    selectors: {
      ...blockSelectors,
      ...editorSelectors,
      ...preferenceSelectors,
      ...optionSelectors,
      ...collabSelectors,
      ...collabPeersSelectors
    },
    controls: {
      ...collabControls
    },
    persist: ['preferences'],
    initialState: {
      preferences: {
        preferencesKey,
        ...(preferencesKey && localStorage.getItem(preferencesKey) ?
        // @ts-ignore
        JSON.parse(localStorage.getItem(preferencesKey)) : defaultPreferences)
      }
    }
  };
}
export default storeConfig;
//# sourceMappingURL=index.js.map