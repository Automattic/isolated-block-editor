"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ListViewSidebar;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _blockEditor = require("@wordpress/block-editor");
var _components = require("@wordpress/components");
var _compose = require("@wordpress/compose");
var _data = require("@wordpress/data");
var _dom = require("@wordpress/dom");
var _element = require("@wordpress/element");
var _i18n = require("@wordpress/i18n");
var _icons = require("@wordpress/icons");
var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");
var _keycodes = require("@wordpress/keycodes");
var _listViewOutline = _interopRequireDefault(require("./list-view-outline"));
var _unlock2 = require("./unlock");
import { createElement } from "react";
/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

var _unlock = (0, _unlock2.unlock)(_components.privateApis),
  Tabs = _unlock.Tabs;
function ListViewSidebar(_ref) {
  var _ref$canClose = _ref.canClose,
    canClose = _ref$canClose === void 0 ? true : _ref$canClose;
  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
    setIsListViewOpened = _useDispatch.setIsListViewOpened;

  // This hook handles focus when the sidebar first renders.
  var focusOnMountRef = (0, _compose.useFocusOnMount)('firstElement');

  // When closing the list view, focus should return to the toggle button.
  var closeListView = (0, _element.useCallback)(function () {
    setIsListViewOpened(false);
  }, [setIsListViewOpened]);
  var closeOnEscape = (0, _element.useCallback)(function (event) {
    if (event.keyCode === _keycodes.ESCAPE && !event.defaultPrevented) {
      event.preventDefault();
      closeListView();
    }
  }, [closeListView]);

  // Use internal state instead of a ref to make sure that the component
  // re-renders when the dropZoneElement updates.
  var _useState = (0, _element.useState)(null),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    dropZoneElement = _useState2[0],
    setDropZoneElement = _useState2[1];
  // Tracks our current tab.
  var _useState3 = (0, _element.useState)('list-view'),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    tab = _useState4[0],
    setTab = _useState4[1];

  // This ref refers to the sidebar as a whole.
  var sidebarRef = (0, _element.useRef)();
  // This ref refers to the tab panel.
  var tabsRef = (0, _element.useRef)();
  // This ref refers to the list view application area.
  var listViewRef = (0, _element.useRef)();

  // Must merge the refs together so focus can be handled properly in the next function.
  var listViewContainerRef = (0, _compose.useMergeRefs)([focusOnMountRef, listViewRef, setDropZoneElement]);

  /*
   * Callback function to handle list view or outline focus.
   *
   * @param {string} currentTab The current tab. Either list view or outline.
   *
   * @return void
   */
  function handleSidebarFocus(currentTab) {
    // Tab panel focus.
    // @ts-ignore
    var tabPanelFocus = _dom.focus.tabbable.find(tabsRef.current)[0];
    // List view tab is selected.
    if (currentTab === 'list-view') {
      // Either focus the list view or the tab panel. Must have a fallback because the list view does not render when there are no blocks.
      var listViewApplicationFocus = _dom.focus.tabbable.find(
      // @ts-ignore
      listViewRef.current)[0];
      // @ts-ignore
      var listViewFocusArea = sidebarRef.current.contains(listViewApplicationFocus) ? listViewApplicationFocus : tabPanelFocus;
      // @ts-ignore
      listViewFocusArea.focus();
      // Outline tab is selected.
    } else {
      // @ts-ignore
      tabPanelFocus.focus();
    }
  }
  var handleToggleListViewShortcut = (0, _element.useCallback)(function () {
    // If the sidebar has focus, it is safe to close.
    if (
    // @ts-ignore
    sidebarRef.current.contains(
    // @ts-ignore
    sidebarRef.current.ownerDocument.activeElement)) {
      closeListView();
    } else {
      // If the list view or outline does not have focus, focus should be moved to it.
      handleSidebarFocus(tab);
    }
  }, [closeListView, tab]);

  // This only fires when the sidebar is open because of the conditional rendering. It is the same shortcut to open but that is defined as a global shortcut and only fires when the sidebar is closed.
  (0, _keyboardShortcuts.useShortcut)('core/edit-post/toggle-list-view', handleToggleListViewShortcut);
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    createElement("div", {
      className: "editor-list-view-sidebar",
      onKeyDown: closeOnEscape
      // @ts-ignore
      ,
      ref: sidebarRef
    }, createElement(Tabs, {
      onSelect: function onSelect(tabName) {
        return setTab(tabName);
      },
      selectOnMove: false
      // The initial tab value is set explicitly to avoid an initial
      // render where no tab is selected. This ensures that the
      // tabpanel height is correct so the relevant scroll container
      // can be rendered internally.
      ,
      initialTabId: "list-view"
    }, createElement("div", {
      className: "edit-post-editor__document-overview-panel__header"
    }, canClose && createElement(_components.Button, {
      className: "editor-list-view-sidebar__close-button",
      icon: _icons.closeSmall,
      label: (0, _i18n.__)('Close'),
      onClick: closeListView
    }), createElement(Tabs.TabList, {
      className: "editor-list-view-sidebar__tabs-tablist",
      ref: tabsRef
    }, createElement(Tabs.Tab, {
      className: "editor-list-view-sidebar__tabs-tab",
      tabId: "list-view"
    }, (0, _i18n._x)('List View', 'Post overview')), createElement(Tabs.Tab, {
      className: "editor-list-view-sidebar__tabs-tab",
      tabId: "outline"
    }, (0, _i18n._x)('Outline', 'Post overview')))), createElement(Tabs.TabPanel, {
      ref: listViewContainerRef,
      className: "editor-list-view-sidebar__tabs-tabpanel",
      tabId: "list-view",
      focusable: false
    }, createElement("div", {
      className: "editor-list-view-sidebar__list-view-container"
    }, createElement("div", {
      className: "editor-list-view-sidebar__list-view-panel-content"
    }, createElement(_blockEditor.__experimentalListView, {
      dropZoneElement: dropZoneElement
    })))), createElement(Tabs.TabPanel, {
      className: "editor-list-view-sidebar__tabs-tabpanel",
      tabId: "outline",
      focusable: false
    }, createElement("div", {
      className: "editor-list-view-sidebar__list-view-container"
    }, createElement(_listViewOutline["default"], null)))))
  );
}
//# sourceMappingURL=listview-sidebar.js.map