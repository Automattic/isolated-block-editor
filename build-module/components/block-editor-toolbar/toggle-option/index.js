import { createElement } from "@wordpress/element";
/**
 * WordPress dependencies
 */
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { MenuItem, withSpokenMessages } from '@wordpress/components';
import { check } from '@wordpress/icons';
function OptionToggle({
  onToggle,
  isActive,
  label,
  info
}) {
  return createElement(MenuItem, {
    icon: isActive && check,
    isSelected: isActive,
    onClick: onToggle,
    role: "menuitemcheckbox",
    info: info
  }, label);
}

// @ts-ignore
export default compose([withSelect((select, {
  option
}) => ({
  isActive: select('isolated/editor').isOptionActive(option)
})), withDispatch((dispatch, ownProps) => ({
  onToggle() {
    dispatch('isolated/editor').toggleOption(ownProps.option);
    ownProps.onClose();
  }
})), withSpokenMessages])(OptionToggle);
//# sourceMappingURL=index.js.map