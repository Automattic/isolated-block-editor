import { createElement, Fragment } from "@wordpress/element";
/**
 * External dependencies
 */
import classnames from 'classnames';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as interfaceStore } from '@wordpress/interface';

/**
 * WordPress dependencies
 */
import { closeSmall } from '@wordpress/icons';
function ComplementaryAreaToggle({
  as = Button,
  scope,
  identifier,
  icon,
  selectedIcon,
  name,
  ...props
}) {
  const ComponentToUse = as;
  const isSelected = useSelect(select =>
  // @ts-ignore
  select(interfaceStore).getActiveComplementaryArea(scope) === identifier, [identifier]);
  const {
    enableComplementaryArea,
    disableComplementaryArea
  } = useDispatch(interfaceStore);
  return createElement(ComponentToUse, {
    icon: selectedIcon && isSelected ? selectedIcon : icon,
    onClick: () => {
      if (isSelected) {
        disableComplementaryArea(scope);
      } else {
        enableComplementaryArea(scope, identifier);
      }
    },
    ...props
  });
}
const ComplementaryAreaHeader = ({
  smallScreenTitle,
  children,
  className,
  toggleButtonProps
}) => {
  const toggleButton = createElement(ComplementaryAreaToggle, {
    icon: closeSmall,
    ...toggleButtonProps
  });
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
//# sourceMappingURL=complementary-area-header.js.map