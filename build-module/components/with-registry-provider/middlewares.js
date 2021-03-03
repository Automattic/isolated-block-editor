import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";

/**
 * External dependencies
 */
import refx from 'refx';
import multi from 'redux-multi';
import { flowRight } from 'lodash';
/**
 * Internal dependencies
 */

import effects from './effects';
/**
 * Applies the custom middlewares used specifically in the editor module.
 *
 * @param {Object} store Store Object.
 *
 * @return {Object} Update Store Object.
 */

function applyMiddlewares(store) {
  var middlewares = [refx(effects), multi];

  var enhancedDispatch = function enhancedDispatch() {
    throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
  };

  var chain = [];
  var middlewareAPI = {
    getState: store.getState,
    dispatch: function dispatch() {
      return enhancedDispatch.apply(void 0, arguments);
    }
  };
  chain = middlewares.map(function (middleware) {
    return middleware(middlewareAPI);
  });
  enhancedDispatch = flowRight.apply(void 0, _toConsumableArray(chain))(store.dispatch);
  store.dispatch = enhancedDispatch;
  return store;
}

export default applyMiddlewares;
//# sourceMappingURL=middlewares.js.map