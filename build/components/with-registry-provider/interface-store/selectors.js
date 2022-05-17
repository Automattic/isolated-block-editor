"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isItemPinned = exports.isFeatureActive = exports.getActiveComplementaryArea = void 0;

var _data = require("@wordpress/data");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _preferences = require("@wordpress/preferences");

/**
 * WordPress dependencies
 */

/**
 * Returns the complementary area that is active in a given scope.
 *
 * @param {Object} state Global application state.
 * @param {string} scope Item scope.
 *
 * @return {string} The complementary area that is active in the given scope.
 */
var getActiveComplementaryArea = (0, _data.createRegistrySelector)(function (select) {
  return function (state, scope) {
    return select(_preferences.store).get(scope, 'complementaryArea');
  };
});
/**
 * Returns a boolean indicating if an item is pinned or not.
 *
 * @param {Object} state Global application state.
 * @param {string} scope Scope.
 * @param {string} item  Item to check.
 *
 * @return {boolean} True if the item is pinned and false otherwise.
 */

exports.getActiveComplementaryArea = getActiveComplementaryArea;
var isItemPinned = (0, _data.createRegistrySelector)(function (select) {
  return function (state, scope, item) {
    var _pinnedItems$item;

    var pinnedItems = select(_preferences.store).get(scope, 'pinnedItems');
    return (_pinnedItems$item = pinnedItems === null || pinnedItems === void 0 ? void 0 : pinnedItems[item]) !== null && _pinnedItems$item !== void 0 ? _pinnedItems$item : true;
  };
});
/**
 * Returns a boolean indicating whether a feature is active for a particular
 * scope.
 *
 * @param {Object} state       The store state.
 * @param {string} scope       The scope of the feature (e.g. core/edit-post).
 * @param {string} featureName The name of the feature.
 *
 * @return {boolean} Is the feature enabled?
 */

exports.isItemPinned = isItemPinned;
var isFeatureActive = (0, _data.createRegistrySelector)(function (select) {
  return function (state, scope, featureName) {
    (0, _deprecated["default"])("wp.select( 'core/interface' ).isFeatureActive( scope, featureName )", {
      since: '6.0',
      alternative: "!! wp.select( 'core/preferences' ).isFeatureActive( scope, featureName )"
    });
    return !!select(_preferences.store).get(scope, featureName);
  };
});
exports.isFeatureActive = isFeatureActive;
//# sourceMappingURL=selectors.js.map