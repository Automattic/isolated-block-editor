"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getEditorSettings;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/** @typedef {import('../../index').EditorSettings} EditorSettings */
/** @typedef {import('../../index').IsoSettings} IsoSettings */

/**
 * Get all the allowed block types, either from the settings, or all available blocks
 *
 * @param {{allowBlocks: string[]}} blockSettings - settings for available blocks
 * @param {object[]} allBlockTypes - All available blocks
 * @return {string[]}
 */
function getAllowedBlockTypes(blockSettings, allBlockTypes) {
  if (blockSettings && blockSettings.allowBlocks && blockSettings.allowBlocks.length > 0) {
    return blockSettings.allowBlocks;
  }

  // No allow blocks - return all blocks
  return allBlockTypes.map(function (block) {
    return block.name;
  });
}

/**
 * Get all the disallowed block types, either from the settings, or all available blocks
 *
 * @param {{disallowBlocks: string[]}} blockSettings - settings for disallowed blocks
 * @return {string[]}
 */
function getDisallowedBlocks(blockSettings) {
  if (blockSettings && blockSettings.disallowBlocks) {
    return blockSettings.disallowBlocks;
  }

  // No blocks disallowed
  return [];
}

/**
 * Get editor settings
 *
 * @param {EditorSettings} editorSettings - Editor settings
 * @param {IsoSettings} isoSettings
 * @param {object[]} allBlockTypes - All available blocks
 * @param {boolean} fixedToolbar - Do we need a fixed toolbar?
 * @return {EditorSettings}
 */
function getEditorSettings(editorSettings, isoSettings, allBlockTypes, fixedToolbar) {
  // @ts-ignore
  var disallowBlocks = getDisallowedBlocks(isoSettings.blocks);
  return _objectSpread(_objectSpread({}, editorSettings), {}, {
    fixedToolbar: fixedToolbar,
    hasFixedToolbar: fixedToolbar,
    // @ts-ignore
    allowedBlockTypes: getAllowedBlockTypes(isoSettings.blocks, allBlockTypes).filter(function (blockName) {
      return disallowBlocks.indexOf(blockName) === -1;
    })
  });
}
//# sourceMappingURL=editor-settings.js.map