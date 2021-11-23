"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ListViewSidebar;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

var _keycodes = require("@wordpress/keycodes");

import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
function ListViewSidebar() {
  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
      setIsListViewOpened = _useDispatch.setIsListViewOpened;

  var _useDispatch2 = (0, _data.useDispatch)(_blockEditor.store),
      clearSelectedBlock = _useDispatch2.clearSelectedBlock,
      selectBlock = _useDispatch2.selectBlock;

  function selectEditorBlock(_x) {
    return _selectEditorBlock.apply(this, arguments);
  }

  function _selectEditorBlock() {
    _selectEditorBlock = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(clientId) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return clearSelectedBlock();

            case 2:
              selectBlock(clientId, -1);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _selectEditorBlock.apply(this, arguments);
  }

  var focusOnMountRef = (0, _compose.useFocusOnMount)('firstElement');
  var focusReturnRef = (0, _compose.useFocusReturn)();

  function closeOnEscape(event) {
    if (event.keyCode === _keycodes.ESCAPE && !event.defaultPrevented) {
      event.preventDefault();
      setIsListViewOpened(false);
    }
  }

  var instanceId = (0, _compose.useInstanceId)(ListViewSidebar);
  var labelId = "edit-post-editor__list-view-panel-label-".concat(instanceId);
  return (// eslint-disable-next-line jsx-a11y/no-static-element-interactions
    createElement("div", {
      "aria-labelledby": labelId,
      className: "edit-post-editor__list-view-panel",
      onKeyDown: closeOnEscape
    }, createElement("div", {
      className: "edit-post-editor__list-view-panel-header"
    }, createElement("strong", {
      id: labelId
    }, (0, _i18n.__)('List view')), createElement(_components.Button, {
      icon: _icons.closeSmall,
      label: (0, _i18n.__)('Close list view sidebar'),
      onClick: function onClick() {
        return setIsListViewOpened(false);
      }
    })), createElement("div", {
      className: "edit-post-editor__list-view-panel-content",
      ref: (0, _compose.useMergeRefs)([focusReturnRef, focusOnMountRef])
    }, createElement(_blockEditor.__experimentalListView, {
      onSelect: selectEditorBlock,
      showNestedBlocks: true,
      __experimentalPersistentListViewFeatures: true
    })))
  );
}
//# sourceMappingURL=listview-sidebar.js.map