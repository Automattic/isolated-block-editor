import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

function storeConfig(preferencesKey, defaultPreferences) {
  return {
    reducer: combineReducers({
      blocks: blocksReducer,
      editor: editorReducer,
      preferences: preferencesReducer,
      options: optionsReducer
    }),
    actions: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, blockActions), editorActions), optionActions), preferenceActions),
    selectors: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, blockSelectors), editorSelectors), preferenceSelectors), optionSelectors),
    persist: ['preferences'],
    initialState: {
      preferences: preferencesKey && localStorage.getItem(preferencesKey) ? JSON.parse(localStorage.getItem(preferencesKey)) : defaultPreferences
    }
  };
}

export default storeConfig;
//# sourceMappingURL=index.js.map