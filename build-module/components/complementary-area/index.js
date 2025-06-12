/**
 * WordPress dependencies
 */
import { store as interfaceStore } from '@wordpress/interface';
import { Panel, Fill } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useSelect } from '@wordpress/data';
import ComplementaryAreaHeader from './complementary-area-header';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function isActiveArea(area) {
  return ['edit-post/document', 'edit-post/block'].includes(area);
}
function ComplementaryAreaFill({
  scope,
  children,
  className
}) {
  return /*#__PURE__*/_jsx(Fill, {
    name: `ComplementaryArea/${scope}`,
    children: /*#__PURE__*/_jsx("div", {
      className: className,
      children: children
    })
  });
}
export default function ComplementaryArea({
  className,
  children,
  header,
  headerClassName,
  toggleShortcut,
  closeLabel,
  title,
  identifier,
  ...props
}) {
  const scope = "isolated/editor";
  const {
    isActive
  } = useSelect(select => {
    // @ts-ignore
    const {
      getActiveComplementaryArea
    } = select(interfaceStore);
    const _activeArea = getActiveComplementaryArea('isolated/editor');
    return {
      isActive: isActiveArea(_activeArea)
    };
  }, []);
  if (!isActive) {
    return null;
  }
  return /*#__PURE__*/_jsxs(ComplementaryAreaFill, {
    className: "interface-complementary-area",
    scope: "isolated/editor",
    children: [/*#__PURE__*/_jsx(ComplementaryAreaHeader, {
      className: headerClassName,
      toggleButtonProps: {
        label: closeLabel,
        shortcut: toggleShortcut,
        scope,
        identifier
      },
      children: header
    }), /*#__PURE__*/_jsx(Panel, {
      className: "edit-post-sidebar",
      children: children
    })]
  });
}
//# sourceMappingURL=index.js.map