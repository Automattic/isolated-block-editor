"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
   * @param {boolean} isOpen
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
   * Mark the block inserter as open or closed
   * @param {boolean} isOpen
   */
  setInspecting: function setInspecting(isOpen) {
    return {
      type: 'SET_INSPECTOR_OPEN',
      isOpen: isOpen
    };
  }
};
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map