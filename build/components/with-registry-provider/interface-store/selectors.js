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
 * @return {string | null | undefined} The complementary area that is active in the given scope.
 */
var getActiveComplementaryArea = exports.getActiveComplementaryArea = (0, _data.createRegistrySelector)(function (select) {
  return function (state, scope) {
    var _state$complementaryA;
    var isComplementaryAreaVisible = select(_preferences.store).get(scope, 'isComplementaryAreaVisible');

    // Return `undefined` to indicate that the user has never toggled
    // visibility, this is the vanilla default. Other code relies on this
    // nuance in the return value.
    if (isComplementaryAreaVisible === undefined) {
      return undefined;
    }

    // Return `null` to indicate the user hid the complementary area.
    if (!isComplementaryAreaVisible) {
      return null;
    }
    return state === null || state === void 0 || (_state$complementaryA = state.complementaryAreas) === null || _state$complementaryA === void 0 ? void 0 : _state$complementaryA[scope];
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
var isItemPinned = exports.isItemPinned = (0, _data.createRegistrySelector)(function (select) {
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
var isFeatureActive = exports.isFeatureActive = (0, _data.createRegistrySelector)(function (select) {
  return function (state, scope, featureName) {
    (0, _deprecated["default"])("select( 'core/interface' ).isFeatureActive( scope, featureName )", {
      since: '6.0',
      alternative: "select( 'core/preferences' ).get( scope, featureName )"
    });
    return !!select(_preferences.store).get(scope, featureName);
  };
});
//# sourceMappingURL=selectors.js.map