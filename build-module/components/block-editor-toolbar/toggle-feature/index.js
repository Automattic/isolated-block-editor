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
import { jsx as _jsx } from "react/jsx-runtime";
function FeatureToggle({
  onToggle,
  isActive,
  label,
  info,
  messageActivated,
  messageDeactivated,
  speak
}) {
  const speakMessage = () => {
    if (isActive) {
      speak(messageDeactivated || __('Feature deactivated'));
    } else {
      speak(messageActivated || __('Feature activated'));
    }
  };
  return /*#__PURE__*/_jsx(MenuItem, {
    icon: isActive && check,
    isSelected: isActive,
    onClick: flow(onToggle, speakMessage),
    role: "menuitemcheckbox",
    info: info,
    children: label
  });
}

// @ts-ignore
export default compose([withSelect((select, {
  feature
}) => ({
  isActive: select('isolated/editor').isFeatureActive(feature)
})), withDispatch((dispatch, ownProps) => ({
  onToggle() {
    dispatch('isolated/editor').toggleFeature(ownProps.feature);
    ownProps.onClose();
  }
})), withSpokenMessages])(FeatureToggle);
//# sourceMappingURL=index.js.map