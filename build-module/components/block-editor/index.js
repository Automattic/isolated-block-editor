import { createElement, Fragment } from "@wordpress/element";
// @ts-nocheck
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { withDispatch, useSelect } from '@wordpress/data';
import { KeyboardShortcuts } from '@wordpress/components';
import { rawShortcut } from '@wordpress/keycodes';
import { useViewportMatch } from '@wordpress/compose';
import { BlockEditorKeyboardShortcuts } from '@wordpress/block-editor';
import { EditorNotices, EditorSnackbars } from '@wordpress/editor';
import { FullscreenMode, ComplementaryArea, InterfaceSkeleton, store as interfaceStore } from '@wordpress/interface';
import { __ } from '@wordpress/i18n';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SettingsSidebar from './sidebar';
import VisualEditor from './visual-editor';
import TextEditor from './text-editor';
import './style.scss';
import BlockEditorToolbar from '../block-editor-toolbar';
import InserterSidebar from './inserter-sidebar';
import ListViewSidebar from './listview-sidebar';
import Footer from './footer';
import ActionArea from '../action-area';

/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */
/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */
/** @typedef {import('../../index').OnMore} OnMore */

/**
 * Undo/redo
 *
 * @callback OnHistory
 */

const interfaceLabels = {
  secondarySidebar: __('Block library'),
  /* translators: accessibility text for the editor top bar landmark region. */
  header: __('Editor top bar'),
  /* translators: accessibility text for the editor content landmark region. */
  body: __('Editor content'),
  /* translators: accessibility text for the editor settings landmark region. */
  sidebar: __('Editor settings'),
  /* translators: accessibility text for the editor publish landmark region. */
  actions: __('Editor publish'),
  /* translators: accessibility text for the editor footer landmark region. */
  footer: __('Editor footer')
};

/**
 * The editor component. Contains the visual or text editor, along with keyboard handling.
 *
 * Note: the keyboard handling is specific to this editor and *not* global
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isEditing - Are we editing in this editor?
 * @param {EditorMode} props.editorMode - Visual or code?
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {Object} props.children - Child components
 * @param {OnHistory} props.undo
 * @param {OnHistory} props.redo
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 */
function BlockEditor(props) {
  var _settings$iso, _settings$iso$sidebar, _settings$iso2, _settings$iso2$sideba, _settings$iso$header, _settings$iso3, _settings$iso4, _settings$iso$toolbar, _settings$iso5, _settings$iso5$toolba;
  const {
    isEditing,
    editorMode,
    children,
    undo,
    redo,
    settings,
    renderMoreMenu
  } = props;
  const styles = {}; // TODO: do we need hasThemeStyles support here?
  const isMobileViewport = useViewportMatch('medium', '<');
  const inspectorInSidebar = (settings === null || settings === void 0 ? void 0 : (_settings$iso = settings.iso) === null || _settings$iso === void 0 ? void 0 : (_settings$iso$sidebar = _settings$iso.sidebar) === null || _settings$iso$sidebar === void 0 ? void 0 : _settings$iso$sidebar.inspector) || false;
  const inserterInSidebar = (settings === null || settings === void 0 ? void 0 : (_settings$iso2 = settings.iso) === null || _settings$iso2 === void 0 ? void 0 : (_settings$iso2$sideba = _settings$iso2.sidebar) === null || _settings$iso2$sideba === void 0 ? void 0 : _settings$iso2$sideba.inserter) || false;
  const showHeader = (_settings$iso$header = settings === null || settings === void 0 ? void 0 : (_settings$iso3 = settings.iso) === null || _settings$iso3 === void 0 ? void 0 : _settings$iso3.header) !== null && _settings$iso$header !== void 0 ? _settings$iso$header : true;
  const showFooter = (settings === null || settings === void 0 ? void 0 : (_settings$iso4 = settings.iso) === null || _settings$iso4 === void 0 ? void 0 : _settings$iso4.footer) || false;
  const {
    sidebarIsOpened,
    hasFixedToolbar,
    isInserterOpened,
    isListViewOpened,
    showIconLabels,
    isFullscreenActive,
    previousShortcut,
    nextShortcut
  } = useSelect(select => {
    const {
      isFeatureActive,
      isInserterOpened,
      isListViewOpened,
      isOptionActive
    } = select('isolated/editor');
    return {
      sidebarIsOpened: !!select(interfaceStore).getActiveComplementaryArea('isolated/editor'),
      hasFixedToolbar: isFeatureActive('fixedToolbar'),
      isInserterOpened: isInserterOpened(),
      isListViewOpened: isListViewOpened(),
      isFullscreenActive: isOptionActive('fullscreenMode'),
      showIconLabels: isFeatureActive('showIconLabels'),
      previousShortcut: select(keyboardShortcutsStore).getAllShortcutKeyCombinations('core/edit-post/previous-region'),
      nextShortcut: select(keyboardShortcutsStore).getAllShortcutKeyCombinations('core/edit-post/next-region')
    };
  }, []);
  const className = classnames('edit-post-layout', 'is-mode-' + editorMode, {
    'is-sidebar-opened': sidebarIsOpened,
    'has-fixed-toolbar': hasFixedToolbar,
    'show-icon-labels': showIconLabels
  });
  const secondarySidebar = () => {
    if (!inserterInSidebar) {
      return null;
    }
    if (editorMode === 'visual' && isInserterOpened) {
      return createElement(InserterSidebar, null);
    }
    if (editorMode === 'visual' && isListViewOpened) {
      return createElement(ListViewSidebar, null);
    }
    return null;
  };

  // For back-compat with older iso-editor
  useEffect(() => {
    const html = document.querySelector('html');
    if (isFullscreenActive) {
      // @ts-ignore
      html.classList.add('is-fullscreen-mode');
    } else {
      // @ts-ignore
      html.classList.remove('is-fullscreen-mode');
    }
    return () => {
      if (html) {
        html.classList.remove('is-fullscreen-mode');
      }
    };
  }, [isFullscreenActive]);
  const header = showHeader ? createElement(BlockEditorToolbar, {
    editorMode: editorMode,
    settings: settings,
    renderMoreMenu: renderMoreMenu
  }) : null;
  return createElement(Fragment, null, createElement(SettingsSidebar, {
    documentInspector: (_settings$iso$toolbar = settings === null || settings === void 0 ? void 0 : (_settings$iso5 = settings.iso) === null || _settings$iso5 === void 0 ? void 0 : (_settings$iso5$toolba = _settings$iso5.toolbar) === null || _settings$iso5$toolba === void 0 ? void 0 : _settings$iso5$toolba.documentInspector) !== null && _settings$iso$toolbar !== void 0 ? _settings$iso$toolbar : false
  }), createElement(FullscreenMode, {
    isActive: isFullscreenActive
  }), createElement(InterfaceSkeleton, {
    className: className,
    labels: interfaceLabels,
    header: header,
    secondarySidebar: secondarySidebar(),
    sidebar: (!isMobileViewport || sidebarIsOpened) && inspectorInSidebar && createElement(ComplementaryArea.Slot, {
      scope: "isolated/editor"
    }),
    notices: createElement(EditorSnackbars, null),
    content: createElement(Fragment, null, createElement(EditorNotices, null), isEditing && createElement(Fragment, null, createElement(BlockEditorKeyboardShortcuts, null), createElement(BlockEditorKeyboardShortcuts.Register, null)), createElement(KeyboardShortcuts, {
      bindGlobal: false,
      shortcuts: {
        [rawShortcut.primary('z')]: undo,
        [rawShortcut.primaryShift('z')]: redo
      }
    }, editorMode === 'visual' && createElement(VisualEditor, {
      styles: styles
    }), editorMode === 'text' && createElement(TextEditor, null)), children),
    footer: showFooter && createElement(Footer, {
      editorMode: editorMode
    }),
    actions: createElement(ActionArea.Slot, null),
    shortcuts: {
      previous: previousShortcut,
      next: nextShortcut
    }
  }));
}
export default withDispatch(dispatch => {
  const {
    redo,
    undo
  } = dispatch('isolated/editor');
  return {
    redo,
    undo
  };
})(BlockEditor);
//# sourceMappingURL=index.js.map