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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  return /*#__PURE__*/_jsx(ComponentToUse, {
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
  children,
  className,
  toggleButtonProps
}) => {
  return /*#__PURE__*/_jsxs("div", {
    className: classnames('components-panel__header', 'interface-complementary-area-header', className),
    tabIndex: -1,
    children: [children, /*#__PURE__*/_jsx(ComplementaryAreaToggle, {
      icon: closeSmall,
      ...toggleButtonProps
    })]
  });
};
export default ComplementaryAreaHeader;
//# sourceMappingURL=complementary-area-header.js.map