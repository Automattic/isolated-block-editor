"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ListViewSidebar;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classnames = _interopRequireDefault(require("classnames"));
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
import { createElement } from "@wordpress/element";
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

function ListViewSidebar(_ref) {
  var _ref$canClose = _ref.canClose,
    canClose = _ref$canClose === void 0 ? true : _ref$canClose;
  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
    setIsListViewOpened = _useDispatch.setIsListViewOpened;
  var focusOnMountRef = (0, _compose.useFocusOnMount)('firstElement');
  var headerFocusReturnRef = (0, _compose.useFocusReturn)();
  var contentFocusReturnRef = (0, _compose.useFocusReturn)();
  function closeOnEscape(event) {
    if (event.keyCode === _keycodes.ESCAPE && !event.defaultPrevented) {
      event.preventDefault();
      setIsListViewOpened(false);
    }
  }
  var _useState = (0, _element.useState)('list-view'),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    tab = _useState2[0],
    setTab = _useState2[1];

  // This ref refers to the sidebar as a whole.
  var sidebarRef = (0, _element.useRef)();
  // This ref refers to the list view tab button.
  var listViewTabRef = (0, _element.useRef)();
  // This ref refers to the outline tab button.
  var outlineTabRef = (0, _element.useRef)();
  // This ref refers to the list view application area.
  var listViewRef = (0, _element.useRef)();

  /*
   * Callback function to handle list view or outline focus.
   *
   * @param {string} currentTab The current tab. Either list view or outline.
   *
   * @return void
   */
  function handleSidebarFocus(currentTab) {
    // List view tab is selected.
    if (currentTab === 'list-view') {
      // Either focus the list view or the list view tab button. Must have a fallback because the list view does not render when there are no blocks.
      // @ts-ignore
      var listViewApplicationFocus = _dom.focus.tabbable.find(listViewRef.current)[0];
      // @ts-ignore
      var listViewFocusArea = sidebarRef.current.contains(listViewApplicationFocus) ? listViewApplicationFocus : listViewTabRef.current;
      // @ts-ignore
      listViewFocusArea.focus();
      // Outline tab is selected.
    } else {
      // @ts-ignore
      outlineTabRef.current.focus();
    }
  }

  // This only fires when the sidebar is open because of the conditional rendering. It is the same shortcut to open but that is defined as a global shortcut and only fires when the sidebar is closed.
  (0, _keyboardShortcuts.useShortcut)('core/edit-post/toggle-list-view', function () {
    // If the sidebar has focus, it is safe to close.
    // @ts-ignore
    if (sidebarRef.current.contains(sidebarRef.current.ownerDocument.activeElement)) {
      setIsListViewOpened(false);
      // If the list view or outline does not have focus, focus should be moved to it.
    } else {
      handleSidebarFocus(tab);
    }
  });
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    createElement("div", {
      "aria-label": (0, _i18n.__)('Document Overview'),
      className: "edit-post-editor__document-overview-panel",
      onKeyDown: closeOnEscape
      // @ts-ignore
      ,
      ref: sidebarRef
    }, createElement("div", {
      className: "edit-post-editor__document-overview-panel-header components-panel__header edit-post-sidebar__panel-tabs",
      ref: headerFocusReturnRef
    }, canClose && createElement(_components.Button, {
      icon: _icons.closeSmall,
      label: (0, _i18n.__)('Close Document Overview Sidebar'),
      onClick: function onClick() {
        return setIsListViewOpened(false);
      }
    }), createElement("ul", null, createElement("li", null, createElement(_components.Button, {
      ref: listViewTabRef,
      onClick: function onClick() {
        setTab('list-view');
      },
      className: (0, _classnames["default"])('edit-post-sidebar__panel-tab', {
        'is-active': tab === 'list-view'
      }),
      "aria-current": tab === 'list-view'
    }, (0, _i18n.__)('List View'))), createElement("li", null, createElement(_components.Button, {
      ref: outlineTabRef,
      onClick: function onClick() {
        setTab('outline');
      },
      className: (0, _classnames["default"])('edit-post-sidebar__panel-tab', {
        'is-active': tab === 'outline'
      }),
      "aria-current": tab === 'outline'
    }, (0, _i18n.__)('Outline'))))), createElement("div", {
      ref: (0, _compose.useMergeRefs)([contentFocusReturnRef, focusOnMountRef, listViewRef]),
      className: "edit-post-editor__list-view-container"
    }, tab === 'list-view' && createElement("div", {
      className: "edit-post-editor__list-view-panel-content"
    }, createElement(_blockEditor.__experimentalListView, null)), tab === 'outline' && createElement(_listViewOutline["default"], null)))
  );
}
//# sourceMappingURL=listview-sidebar.js.map