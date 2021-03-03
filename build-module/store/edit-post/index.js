/**
 * WordPress dependencies
 */
import { registerStore, combineReducers } from '@wordpress/data';
/**
 * Internal dependencies
 */

var STORE_KEY = 'core/edit-post'; // This is a fake store to prevent errors if anything tries to use `isFeatureActive`

var store = registerStore(STORE_KEY, {
  reducer: combineReducers({}),
  actions: {},
  selectors: {
    isFeatureActive: function isFeatureActive() {
      return false;
    }
  }
});
export default store;
//# sourceMappingURL=index.js.map