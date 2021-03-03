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
  var onToggle = _ref.onToggle,
      isActive = _ref.isActive,
      label = _ref.label,
      info = _ref.info;
  return createElement(MenuItem, {
    icon: isActive && check,
    isSelected: isActive,
    onClick: onToggle,
    role: "menuitemcheckbox",
    info: info
  }, label);
}

export default compose([withSelect(function (select, _ref2) {
  var option = _ref2.option;
  return {
    isActive: select('isolated/editor').isOptionActive(option)
  };
}), withDispatch(function (dispatch, ownProps) {
  return {
    onToggle: function onToggle() {
      dispatch('isolated/editor').toggleOption(ownProps.option);
      ownProps.onClose();
    }
  };
}), withSpokenMessages])(OptionToggle);
//# sourceMappingURL=index.js.map