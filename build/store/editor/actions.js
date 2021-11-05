"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _data = require("@wordpress/data");

var _interface = require("@wordpress/interface");

/**
 * WordPress dependencies
 */

/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */

/** @typedef {import('./reducer').EditorMode} EditorMode */
var actions = {
  /**
   * Set whether the editor is ready for editing
   * @param {boolean} isReady
   */
  setReady: function setReady(isReady) {
    return {
      type: 'SET_EDITOR_READY',
      isReady: isReady
    };
  },

  /**
   * Set the current editor mode
   * @param {EditorMode} editorMode Editor mode
   */
  setEditorMode: function setEditorMode(editorMode) {
    return {
      type: 'SET_EDITOR_MODE',
      editorMode: editorMode
    };
  },

  /**
   * Set up the editor
   * @param {BlockEditorSettings} settings
   */
  setupEditor: function setupEditor(settings) {
    return {
      type: 'SETUP_EDITOR',
      settings: settings
    };
  },

  /**
   * Set the current pattern name
   * @param {string} pattern Pattern name
   */
  setCurrentPattern: function setCurrentPattern(pattern) {
    return {
      type: 'SET_CURRENT_PATTERN',
      pattern: pattern
    };
  },

  /**
   * Mark the block inserter as open or closed
   * @param {boolean} name
   */
  setIsInserterOpened: function setIsInserterOpened(isOpen) {
    return {
      type: 'SET_INSERTER_OPEN',
      isOpen: isOpen
    };
  },

  /**
   * Mark this editor as in-use or not
   * @param {boolean} isEditing
   */
  setEditing: function setEditing(isEditing) {
    return {
      type: 'SET_EDITING',
      isEditing: isEditing
    };
  },

  /**
   * Open the named sidebar
   * @param {string} name Name of sidebar section
   */
  openGeneralSidebar: /*#__PURE__*/_regenerator["default"].mark(function openGeneralSidebar(name) {
    return _regenerator["default"].wrap(function openGeneralSidebar$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _data.controls.dispatch(_interface.store, 'enableComplementaryArea', 'isolated/editor', name);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, openGeneralSidebar);
  }),

  /**
   * Close the sidebar (or popover)
   */
  closeGeneralSidebar: /*#__PURE__*/_regenerator["default"].mark(function closeGeneralSidebar() {
    return _regenerator["default"].wrap(function closeGeneralSidebar$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _data.controls.dispatch(_interface.store, 'disableComplementaryArea', 'isolated/editor');

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, closeGeneralSidebar);
  }),

  /**
   * Set the status of the listview sidebar section
   * @param {boolean} isOpen
   */
  setIsListViewOpened: function setIsListViewOpened(isOpen) {
    return {
      type: 'SET_LISTVIEW_OPEN',
      isOpen: isOpen
    };
  }
};
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map