/**
 * WordPress dependencies
 */
import deprecated from '@wordpress/deprecated';
import { store as preferencesStore } from '@wordpress/preferences';
/**
 * Enable the complementary area.
 *
 * @param {string} scope Complementary area scope.
 * @param {string} area  Area identifier.
 */

export const enableComplementaryArea = (scope, area) => _ref => {
  let {
    registry
  } = _ref;

  // Return early if there's no area.
  if (!area) {
    return;
  }

  registry.dispatch(preferencesStore).set(scope, 'complementaryArea', area);
};
/**
 * Disable the complementary area.
 *
 * @param {string} scope Complementary area scope.
 */

export const disableComplementaryArea = scope => _ref2 => {
  let {
    registry
  } = _ref2;
  registry.dispatch(preferencesStore).set(scope, 'complementaryArea', null);
};
/**
 * Pins an item.
 *
 * @param {string} scope Item scope.
 * @param {string} item  Item identifier.
 *
 * @return {Object} Action object.
 */

export const pinItem = (scope, item) => _ref3 => {
  let {
    registry
  } = _ref3;

  // Return early if there's no item.
  if (!item) {
    return;
  }

  const pinnedItems = registry.select(preferencesStore).get(scope, 'pinnedItems'); // The item is already pinned, there's nothing to do.

  if ((pinnedItems === null || pinnedItems === void 0 ? void 0 : pinnedItems[item]) === true) {
    return;
  }

  registry.dispatch(preferencesStore).set(scope, 'pinnedItems', { ...pinnedItems,
    [item]: true
  });
};
/**
 * Unpins an item.
 *
 * @param {string} scope Item scope.
 * @param {string} item  Item identifier.
 */

export const unpinItem = (scope, item) => _ref4 => {
  let {
    registry
  } = _ref4;

  // Return early if there's no item.
  if (!item) {
    return;
  }

  const pinnedItems = registry.select(preferencesStore).get(scope, 'pinnedItems');
  registry.dispatch(preferencesStore).set(scope, 'pinnedItems', { ...pinnedItems,
    [item]: false
  });
};
/**
 * Returns an action object used in signalling that a feature should be toggled.
 *
 * @param {string} scope       The feature scope (e.g. core/edit-post).
 * @param {string} featureName The feature name.
 */

export function toggleFeature(scope, featureName) {
  return function (_ref5) {
    let {
      registry
    } = _ref5;
    deprecated(`wp.dispatch( 'core/interface' ).toggleFeature`, {
      since: '6.0',
      alternative: `wp.dispatch( 'core/preferences' ).toggle`
    });
    registry.dispatch(preferencesStore).toggle(scope, featureName);
  };
}
/**
 * Returns an action object used in signalling that a feature should be set to
 * a true or false value
 *
 * @param {string}  scope       The feature scope (e.g. core/edit-post).
 * @param {string}  featureName The feature name.
 * @param {boolean} value       The value to set.
 *
 * @return {Object} Action object.
 */

export function setFeatureValue(scope, featureName, value) {
  return function (_ref6) {
    let {
      registry
    } = _ref6;
    deprecated(`wp.dispatch( 'core/interface' ).setFeatureValue`, {
      since: '6.0',
      alternative: `wp.dispatch( 'core/preferences' ).set`
    });
    registry.dispatch(preferencesStore).set(scope, featureName, !!value);
  };
}
/**
 * Returns an action object used in signalling that defaults should be set for features.
 *
 * @param {string}                  scope    The feature scope (e.g. core/edit-post).
 * @param {Object<string, boolean>} defaults A key/value map of feature names to values.
 *
 * @return {Object} Action object.
 */

export function setFeatureDefaults(scope, defaults) {
  return function (_ref7) {
    let {
      registry
    } = _ref7;
    deprecated(`wp.dispatch( 'core/interface' ).setFeatureDefaults`, {
      since: '6.0',
      alternative: `wp.dispatch( 'core/preferences' ).setDefaults`
    });
    registry.dispatch(preferencesStore).setDefaults(scope, defaults);
  };
}
//# sourceMappingURL=actions.js.map