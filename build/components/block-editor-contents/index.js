"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isPromise = _interopRequireDefault(require("is-promise"));

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _element = require("@wordpress/element");

var _blocks = require("@wordpress/blocks");

var _blockEditor = require("@wordpress/block-editor");

var _blockEditor2 = _interopRequireDefault(require("../block-editor"));

var _editorContent = _interopRequireDefault(require("./editor-content"));

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

/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */

/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */

/** @typedef {import('../../index').OnLoad} OnLoad */

/** @typedef {import('../../index').OnMore} OnMore */

/**
 * Get editor selection
 * @callback OnSelection
 */

/**
 * Update callback
 * @callback OnUpdate
 * @param {object[]} blocks - Editor content to save
 * @param {object} [options]
 */
function getInitialContent(_x, _x2) {
  return _getInitialContent.apply(this, arguments);
}
/**
 * The editor itself, including toolbar
 *
 * @param {object} props - Component props
 * @param {object[]} props.blocks
 * @param {OnUpdate} props.updateBlocksWithoutUndo - Callback to update blocks
 * @param {OnUpdate} props.updateBlocksWithUndo - Callback to update blocks
 * @param {boolean} props.isEditing - Are we editing in this editor?
 * @param {EditorMode} props.editorMode - Visual or code?
 * @param {object} props.children - Child components
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 * @param {OnSelection} props.selection
 * @param {OnLoad} props.onLoad - Load initial blocks
 */


function _getInitialContent() {
  _getInitialContent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(settings, loader) {
    var contentLoader;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            contentLoader = (0, _isPromise["default"])(loader) ? loader : new Promise(function (resolve) {
              resolve(loader ? loader(_blocks.parse, _blocks.rawHandler) : []);
            });
            return _context2.abrupt("return", contentLoader.then(function (content) {
              return (0, _editorContent["default"])(settings.iso.patterns, settings.iso.currentPattern, settings.editor.template, content);
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getInitialContent.apply(this, arguments);
}

function BlockEditorContents(props) {
  var blocks = props.blocks,
      updateBlocksWithoutUndo = props.updateBlocksWithoutUndo,
      updateBlocksWithUndo = props.updateBlocksWithUndo,
      selection = props.selection,
      isEditing = props.isEditing,
      editorMode = props.editorMode;
  var children = props.children,
      settings = props.settings,
      renderMoreMenu = props.renderMoreMenu,
      onLoad = props.onLoad; // Set initial content, if we have any, but only if there is no existing data in the editor (from elsewhere)

  (0, _element.useEffect)(function () {
    var loadData = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var initialContent;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return getInitialContent(settings, onLoad);

              case 2:
                initialContent = _context.sent;

                if (initialContent.length > 0 && (!blocks || blocks.length === 0)) {
                  updateBlocksWithoutUndo(initialContent, {
                    isInitialContent: true
                  });
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function loadData() {
        return _ref.apply(this, arguments);
      };
    }();

    loadData();
  }, []);
  return createElement(_blockEditor.BlockEditorProvider, {
    value: blocks || [],
    onInput: updateBlocksWithoutUndo,
    onChange: updateBlocksWithUndo,
    useSubRegistry: false,
    selection: selection,
    settings: settings.editor
  }, createElement(_blockEditor2["default"], {
    isEditing: isEditing,
    editorMode: editorMode,
    settings: settings,
    renderMoreMenu: renderMoreMenu
  }, children), createElement(_components.Popover.Slot, null));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('isolated/editor'),
      getBlocks = _select.getBlocks,
      getEditorSelection = _select.getEditorSelection,
      getEditorMode = _select.getEditorMode,
      isEditing = _select.isEditing;

  return {
    blocks: getBlocks(),
    selection: getEditorSelection(),
    isEditing: isEditing(),
    editorMode: getEditorMode()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('isolated/editor'),
      updateBlocksWithUndo = _dispatch.updateBlocksWithUndo,
      updateBlocksWithoutUndo = _dispatch.updateBlocksWithoutUndo;

  return {
    updateBlocksWithUndo: updateBlocksWithUndo,
    updateBlocksWithoutUndo: updateBlocksWithoutUndo
  };
})])(BlockEditorContents);

exports["default"] = _default;
//# sourceMappingURL=index.js.map