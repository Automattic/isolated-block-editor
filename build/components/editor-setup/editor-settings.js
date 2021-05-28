"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getEditorSettings;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/** @typedef {import('../../index').EditorSettings} EditorSettings */

/** @typedef {import('../../index').IsoSettings} IsoSettings */

/**
 * Get all the allowed block types, either from the settings, or all available blocks
 *
 * @param {{allowBlocks: string[]}} blockSettings - settings for available blocks
 * @param {object[]} allBlockTypes - All available blocks
 * @returns {string[]}
 */
function getAllowedBlockTypes(blockSettings, allBlockTypes) {
  if (blockSettings && blockSettings.allowBlocks && blockSettings.allowBlocks.length > 0) {
    return blockSettings.allowBlocks;
  } // No allow blocks - return all blocks


  return allBlockTypes.map(function (block) {
    return block.name;
  });
}
/**
 * Get all the disallowed block types, either from the settings, or all available blocks
 *
 * @param {{disallowBlocks: string[]}} blockSettings - settings for disallowed blocks
 * @returns {string[]}
 */


function getDisallowedBlocks(blockSettings) {
  if (blockSettings && blockSettings.disallowBlocks) {
    return blockSettings.disallowBlocks;
  } // No blocks disallowed


  return [];
}
/**
 * Get editor settings
 *
 * @param {EditorSettings} editorSettings - Editor settings
 * @param {IsoSettings} isoSettings
 * @param {object[]} allBlockTypes - All available blocks
 * @param {boolean} hasFixedToolbar - Do we need a fixed toolbar?
 * @returns {EditorSettings}
 */


function getEditorSettings(editorSettings, isoSettings, allBlockTypes, hasFixedToolbar) {
  var disallowBlocks = getDisallowedBlocks(isoSettings.blocks);
  return _objectSpread(_objectSpread({}, editorSettings), {}, {
    hasFixedToolbar: hasFixedToolbar,
    allowedBlockTypes: getAllowedBlockTypes(isoSettings.blocks, allBlockTypes).filter(function (blockName) {
      return disallowBlocks.indexOf(blockName) === -1;
    }),
    // Enable or disable media uploads. We do this here as a logged out user doesn't have a user object, and so the standard Gutenberg `canUser` won't work
    mediaUpload: editorSettings.allowedMimeTypes.length === 0 ? null : editorSettings.mediaUpload
  });
}
//# sourceMappingURL=editor-settings.js.map