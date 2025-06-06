import { createElement } from "react";
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
function isActiveArea(area) {
  return ['edit-post/document', 'edit-post/block'].includes(area);
}
function ComplementaryAreaFill({
  scope,
  children,
  className
}) {
  return createElement(Fill, {
    name: `ComplementaryArea/${scope}`
  }, createElement("div", {
    className: className
  }, children));
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
  return createElement(ComplementaryAreaFill, {
    className: "interface-complementary-area",
    scope: "isolated/editor"
  }, createElement(ComplementaryAreaHeader, {
    className: headerClassName,
    toggleButtonProps: {
      label: closeLabel,
      shortcut: toggleShortcut,
      scope,
      identifier
    }
  }, header), createElement(Panel, {
    className: "edit-post-sidebar"
  }, children));
}
//# sourceMappingURL=index.js.map