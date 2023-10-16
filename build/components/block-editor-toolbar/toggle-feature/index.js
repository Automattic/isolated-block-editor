"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _lodash = require("lodash");
var _data = require("@wordpress/data");
var _compose = require("@wordpress/compose");
var _components = require("@wordpress/components");
var _i18n = require("@wordpress/i18n");
var _icons = require("@wordpress/icons");
import { createElement } from "react";
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

function FeatureToggle(_ref) {
  var onToggle = _ref.onToggle,
    isActive = _ref.isActive,
    label = _ref.label,
    info = _ref.info,
    messageActivated = _ref.messageActivated,
    messageDeactivated = _ref.messageDeactivated,
    speak = _ref.speak;
  var speakMessage = function speakMessage() {
    if (isActive) {
      speak(messageDeactivated || (0, _i18n.__)('Feature deactivated'));
    } else {
      speak(messageActivated || (0, _i18n.__)('Feature activated'));
    }
  };
  return createElement(_components.MenuItem, {
    icon: isActive && _icons.check,
    isSelected: isActive,
    onClick: (0, _lodash.flow)(onToggle, speakMessage),
    role: "menuitemcheckbox",
    info: info
  }, label);
}

// @ts-ignore
var _default = exports["default"] = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref2) {
  var feature = _ref2.feature;
  return {
    isActive: select('isolated/editor').isFeatureActive(feature)
  };
}), (0, _data.withDispatch)(function (dispatch, ownProps) {
  return {
    onToggle: function onToggle() {
      dispatch('isolated/editor').toggleFeature(ownProps.feature);
      ownProps.onClose();
    }
  };
}), _components.withSpokenMessages])(FeatureToggle);
//# sourceMappingURL=index.js.map