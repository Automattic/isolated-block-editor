/**
 * Internal dependencies
 */
import * as actions from './actions';
import controls from './controls';
import reducer from './reducer';
import * as selectors from './selectors';
/**
 * Data store configuration.
 *
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/data/README.md#registerStore
 *
 * @type {Object}
 */

export default {
  actions: actions,
  controls: controls,
  reducer: reducer,
  selectors: selectors
};
//# sourceMappingURL=index.js.map