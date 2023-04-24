import _extends from "@babel/runtime/helpers/extends";
import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { closeSmall } from '@wordpress/icons';

function ComplementaryAreaToggle(_ref) {
  let {
    as = Button,
    scope,
    identifier,
    icon,
    selectedIcon,
    name,
    ...props
  } = _ref;
  const ComponentToUse = as;
  const isSelected = useSelect(select => select(interfaceStore).getActiveComplementaryArea(scope) === identifier, [identifier]);
  const {
    enableComplementaryArea,
    disableComplementaryArea
  } = useDispatch(interfaceStore);
  return createElement(ComponentToUse, _extends({
    icon: selectedIcon && isSelected ? selectedIcon : icon,
    onClick: () => {
      if (isSelected) {
        disableComplementaryArea(scope);
      } else {
        enableComplementaryArea(scope, identifier);
      }
    }
  }, props));
}

const ComplementaryAreaHeader = _ref2 => {
  let {
    smallScreenTitle,
    children,
    className,
    toggleButtonProps
  } = _ref2;
  const toggleButton = createElement(ComplementaryAreaToggle, _extends({
    icon: closeSmall
  }, toggleButtonProps));
  return createElement(Fragment, null, createElement("div", {
    className: "components-panel__header interface-complementary-area-header__small"
  }, smallScreenTitle && createElement("span", {
    className: "interface-complementary-area-header__small-title"
  }, smallScreenTitle), toggleButton), createElement("div", {
    className: classnames('components-panel__header', 'interface-complementary-area-header', className),
    tabIndex: -1
  }, children, toggleButton));
};

export default ComplementaryAreaHeader;
//# sourceMappingURL=complementary-area-button.js.map