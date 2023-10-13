"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDefaultComplementaryArea = exports.pinItem = exports.enableComplementaryArea = exports.disableComplementaryArea = void 0;
exports.setFeatureDefaults = setFeatureDefaults;
exports.setFeatureValue = setFeatureValue;
exports.toggleFeature = toggleFeature;
exports.unpinItem = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));
var _preferences = require("@wordpress/preferences");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
/**
 * Set a default complementary area.
 *
 * @param {string} scope Complementary area scope.
 * @param {string} area  Area identifier.
 *
 * @return {Object} Action object.
 */
var setDefaultComplementaryArea = exports.setDefaultComplementaryArea = function setDefaultComplementaryArea(scope, area) {
  return {
    type: 'SET_DEFAULT_COMPLEMENTARY_AREA',
    scope: scope,
    area: area
  };
};

/**
 * Enable the complementary area.
 *
 * @param {string} scope Complementary area scope.
 * @param {string} area  Area identifier.
 */
var enableComplementaryArea = exports.enableComplementaryArea = function enableComplementaryArea(scope, area) {
  return function (_ref) {
    var registry = _ref.registry,
      dispatch = _ref.dispatch;
    // Return early if there's no area.
    if (!area) {
      return;
    }
    var isComplementaryAreaVisible = registry.select(_preferences.store).get(scope, 'isComplementaryAreaVisible');
    if (!isComplementaryAreaVisible) {
      registry.dispatch(_preferences.store).set(scope, 'isComplementaryAreaVisible', true);
    }
    dispatch({
      type: 'ENABLE_COMPLEMENTARY_AREA',
      scope: scope,
      area: area
    });
  };
};

/**
 * Disable the complementary area.
 *
 * @param {string} scope Complementary area scope.
 */
var disableComplementaryArea = exports.disableComplementaryArea = function disableComplementaryArea(scope) {
  return function (_ref2) {
    var registry = _ref2.registry;
    var isComplementaryAreaVisible = registry.select(_preferences.store).get(scope, 'isComplementaryAreaVisible');
    if (isComplementaryAreaVisible) {
      registry.dispatch(_preferences.store).set(scope, 'isComplementaryAreaVisible', false);
    }
  };
};

/**
 * Pins an item.
 *
 * @param {string} scope Item scope.
 * @param {string} item  Item identifier.
 *
 * @return {Object} Action object.
 */
var pinItem = exports.pinItem = function pinItem(scope, item) {
  return function (_ref3) {
    var registry = _ref3.registry;
    // Return early if there's no item.
    if (!item) {
      return;
    }
    var pinnedItems = registry.select(_preferences.store).get(scope, 'pinnedItems');

    // The item is already pinned, there's nothing to do.
    if ((pinnedItems === null || pinnedItems === void 0 ? void 0 : pinnedItems[item]) === true) {
      return;
    }
    registry.dispatch(_preferences.store).set(scope, 'pinnedItems', _objectSpread(_objectSpread({}, pinnedItems), {}, (0, _defineProperty2["default"])({}, item, true)));
  };
};

/**
 * Unpins an item.
 *
 * @param {string} scope Item scope.
 * @param {string} item  Item identifier.
 */
var unpinItem = exports.unpinItem = function unpinItem(scope, item) {
  return function (_ref4) {
    var registry = _ref4.registry;
    // Return early if there's no item.
    if (!item) {
      return;
    }
    var pinnedItems = registry.select(_preferences.store).get(scope, 'pinnedItems');
    registry.dispatch(_preferences.store).set(scope, 'pinnedItems', _objectSpread(_objectSpread({}, pinnedItems), {}, (0, _defineProperty2["default"])({}, item, false)));
  };
};

/**
 * Returns an action object used in signalling that a feature should be toggled.
 *
 * @param {string} scope       The feature scope (e.g. core/edit-post).
 * @param {string} featureName The feature name.
 */
function toggleFeature(scope, featureName) {
  return function (_ref5) {
    var registry = _ref5.registry;
    (0, _deprecated["default"])("dispatch( 'core/interface' ).toggleFeature", {
      since: '6.0',
      alternative: "dispatch( 'core/preferences' ).toggle"
    });
    registry.dispatch(_preferences.store).toggle(scope, featureName);
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
function setFeatureValue(scope, featureName, value) {
  return function (_ref6) {
    var registry = _ref6.registry;
    (0, _deprecated["default"])("dispatch( 'core/interface' ).setFeatureValue", {
      since: '6.0',
      alternative: "dispatch( 'core/preferences' ).set"
    });
    registry.dispatch(_preferences.store).set(scope, featureName, !!value);
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
function setFeatureDefaults(scope, defaults) {
  return function (_ref7) {
    var registry = _ref7.registry;
    (0, _deprecated["default"])("dispatch( 'core/interface' ).setFeatureDefaults", {
      since: '6.0',
      alternative: "dispatch( 'core/preferences' ).setDefaults"
    });
    registry.dispatch(_preferences.store).setDefaults(scope, defaults);
  };
}
//# sourceMappingURL=actions.js.map