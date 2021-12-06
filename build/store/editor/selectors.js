"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentPattern = getCurrentPattern;
exports.getCurrentPatternName = getCurrentPatternName;
exports.getEditorMode = getEditorMode;
exports.getEditorSettings = getEditorSettings;
exports.getIgnoredContent = getIgnoredContent;
exports.getNamedPattern = getNamedPattern;
exports.getPatterns = getPatterns;
exports.getPreviewDeviceType = getPreviewDeviceType;
exports.isEditing = isEditing;
exports.isEditorReady = isEditorReady;
exports.isEditorSidebarOpened = void 0;
exports.isInserterOpened = isInserterOpened;
exports.isListViewOpened = isListViewOpened;

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _interface = require("@wordpress/interface");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/** @typedef {import('../../index').IsoSettings} IsoSettings */

/** @typedef {import('./reducer').EditorMode} EditorMode */

/** @typedef {import('./reducer').Pattern} Pattern */

/** @typedef {import('./reducer').EditorState} EditorState */

/**
 * Get current editor mode
 * @param {{editor: EditorState}} state - Current state
 * @returns {EditorMode}
 */
function getEditorMode(state) {
  return state.editor.editorMode;
}
/**
 * Get current editor settings
 * @param {{editor: EditorState}} state - Current state
 * @returns {IsoSettings}
 */


function getEditorSettings(state) {
  return state.editor.settings;
}
/**
 * Is the editor ready for use?
 * @param {{editor: EditorState}} state - Current state
 * @returns {boolean}
 */


function isEditorReady(state) {
  return state.editor.isReady;
}
/**
 * Get current pattern name
 * @param {{editor: EditorState}} state - Current state
 * @returns {string|null}
 */


function getCurrentPatternName(state) {
  return state.editor.currentPattern;
}
/**
 * Get current pattern
 * @param {{editor: EditorState}} state - Current state
 * @returns {Pattern|null}
 */


function getCurrentPattern(state) {
  var _state$editor = state.editor,
      currentPattern = _state$editor.currentPattern,
      patterns = _state$editor.patterns;

  if (currentPattern && patterns) {
    for (var index = 0; index < patterns.length; index++) {
      if (patterns[index]['name'] === currentPattern) {
        return patterns[index];
      }
    }
  }

  return null;
}
/**
 * Get all ignored content
 * @param {{editor: EditorState}} state - Current state
 * @returns {string[]}
 */


function getIgnoredContent(state) {
  return state.editor.ignoredContent;
}
/**
 * Get the pattern for a given name
 * @param {{editor: EditorState}} state - Current state
 * @returns {Pattern|null}
 */


function getNamedPattern(state, patternName) {
  var _state$editor$pattern = state.editor.patterns,
      patterns = _state$editor$pattern === void 0 ? [] : _state$editor$pattern;
  var pattern = patterns.find(function (item) {
    return item.name === patternName;
  }); // Find the full name

  if (pattern) {
    return pattern;
  } // Find the shortened name


  pattern = patterns.find(function (item) {
    return item.name.replace('p2/', '') === patternName;
  });

  if (pattern) {
    return pattern;
  }

  return null;
}
/**
 * Is the block inserter open?
 * @param {{editor: EditorState}} state - Current state
 * @returns {boolean}
 */


function isInserterOpened(state) {
  return state.editor.isInserterOpened;
}

var isEditorSidebarOpened = (0, _data.createRegistrySelector)(function (select) {
  return function () {
    var activeGeneralSidebar = select(_interface.store).getActiveComplementaryArea('isolated/editor');
    return (0, _lodash.includes)(['edit-post/document', 'edit-post/block'], activeGeneralSidebar);
  };
});
/**
 * Are we editing this editor?
 * @param {{editor: EditorState}} state - Current state
 * @returns {boolean}
 */

exports.isEditorSidebarOpened = isEditorSidebarOpened;

function isEditing(state) {
  return state.editor.isEditing;
}
/**
 * Get all patterns
 * @param {{editor: EditorState}} state - Current state
 * @returns {Pattern[]}
 */


function getPatterns(state) {
  return state.editor.patterns;
}
/**
 * Determine if the list viewer is open
 * @param {{editor: EditorState}} state - Current state
 * @returns {boolean}
 */


function isListViewOpened(state) {
  return state.editor.isListViewOpened;
}
/**
 * Return current device type
 * @param {{editor: EditorState}} state - Current state
 * @returns {string}
 */


function getPreviewDeviceType(state) {
  return state.editor.deviceType;
}
//# sourceMappingURL=selectors.js.map