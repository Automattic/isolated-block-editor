import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { flow } from 'lodash';
/**
 * WordPress dependencies
 */

import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { MenuItem, withSpokenMessages } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { check } from '@wordpress/icons';

function FeatureToggle(_ref) {
  let {
    onToggle,
    isActive,
    label,
    info,
    messageActivated,
    messageDeactivated,
    speak
  } = _ref;

  const speakMessage = () => {
    if (isActive) {
      speak(messageDeactivated || __('Feature deactivated'));
    } else {
      speak(messageActivated || __('Feature activated'));
    }
  };

  return createElement(MenuItem, {
    icon: isActive && check,
    isSelected: isActive,
    onClick: flow(onToggle, speakMessage),
    role: "menuitemcheckbox",
    info: info
  }, label);
}

export default compose([withSelect((select, _ref2) => {
  let {
    feature
  } = _ref2;
  return {
    isActive: select('isolated/editor').isFeatureActive(feature)
  };
}), withDispatch((dispatch, ownProps) => ({
  onToggle() {
    dispatch('isolated/editor').toggleFeature(ownProps.feature);
    ownProps.onClose();
  }

})), withSpokenMessages])(FeatureToggle);
//# sourceMappingURL=index.js.map