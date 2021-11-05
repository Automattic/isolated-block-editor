import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { MenuItem, withSpokenMessages } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { check } from '@wordpress/icons';

function OptionToggle(_ref) {
  let {
    onToggle,
    isActive,
    label,
    info
  } = _ref;
  return createElement(MenuItem, {
    icon: isActive && check,
    isSelected: isActive,
    onClick: onToggle,
    role: "menuitemcheckbox",
    info: info
  }, label);
}

export default compose([withSelect((select, _ref2) => {
  let {
    option
  } = _ref2;
  return {
    isActive: select('isolated/editor').isOptionActive(option)
  };
}), withDispatch((dispatch, ownProps) => ({
  onToggle() {
    dispatch('isolated/editor').toggleOption(ownProps.option);
    ownProps.onClose();
  }

})), withSpokenMessages])(OptionToggle);
//# sourceMappingURL=index.js.map