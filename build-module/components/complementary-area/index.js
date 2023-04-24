import { createElement } from "@wordpress/element";
/**
 * WordPress dependencies
 */
import { store as interfaceStore } from '@wordpress/interface';
import { Panel, Fill } from '@wordpress/components';

/**
 * Internal dependencies
 */

import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import ComplementaryAreaHeader from './complementary-area-header';
function isActiveArea(area) {
  return ['edit-post/document', 'edit-post/block'].includes(area);
}
function ComplementaryAreaFill(_ref) {
  let {
    scope,
    children,
    className
  } = _ref;
  return createElement(Fill, {
    name: `ComplementaryArea/${scope}`
  }, createElement("div", {
    className: className
  }, children));
}
export default function ComplementaryArea(_ref2) {
  let {
    className,
    children,
    header,
    headerClassName,
    toggleShortcut,
    closeLabel,
    title,
    identifier,
    ...props
  } = _ref2;
  const scope = "isolated/editor";
  const {
    postTitle,
    isActive
  } = useSelect(select => {
    // @ts-ignore
    const {
      getActiveComplementaryArea
    } = select(interfaceStore);
    const _activeArea = getActiveComplementaryArea('isolated/editor');
    return {
      postTitle: '',
      // @ts-ignore
      showIconLabels: select('isolated/editor').isFeatureActive('showIconLabels'),
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
    smallScreenTitle: postTitle || __('(no title)'),
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