"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = applyDefaultSettings;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _i18n = require("@wordpress/i18n");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             */
/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */

function getMenu(current, defaultMenu) {
  if (current === false) {
    return false;
  }
  return defaultMenu;
}

/**
 * Apply default settings to the user supplied settings, ensuring we have a full and valid set of settings
 *
 * @param {BlockEditorSettings} settings - Settings
 * @return {BlockEditorSettings}
 */
function applyDefaultSettings(settings) {
  var _iso$preferencesKey, _iso$persistenceKey, _iso$disallowEmbed, _iso$customStores, _iso$blocks$allowBloc, _iso$blocks, _iso$blocks$disallowB, _iso$blocks2, _iso$toolbar, _iso$header, _iso$sidebar, _iso$footer, _iso$moreMenu, _iso$linkMenu, _iso$defaultPreferenc, _iso$allowApi, _iso$disableCanvasAni, _iso$currentPattern, _iso$patterns, _editor$bodyPlacehold, _editor$fetchLinkSugg, _editor$fetchLinkSugg2;
  var iso = settings.iso,
    editor = settings.editor;
  return {
    iso: {
      // No preferences or persistence
      preferencesKey: (_iso$preferencesKey = iso === null || iso === void 0 ? void 0 : iso.preferencesKey) !== null && _iso$preferencesKey !== void 0 ? _iso$preferencesKey : null,
      persistenceKey: (_iso$persistenceKey = iso === null || iso === void 0 ? void 0 : iso.persistenceKey) !== null && _iso$persistenceKey !== void 0 ? _iso$persistenceKey : null,
      // No disallowed embeds
      disallowEmbed: (_iso$disallowEmbed = iso === null || iso === void 0 ? void 0 : iso.disallowEmbed) !== null && _iso$disallowEmbed !== void 0 ? _iso$disallowEmbed : [],
      customStores: (_iso$customStores = iso === null || iso === void 0 ? void 0 : iso.customStores) !== null && _iso$customStores !== void 0 ? _iso$customStores : [],
      // Default to all blocks
      blocks: {
        allowBlocks: (_iso$blocks$allowBloc = iso === null || iso === void 0 ? void 0 : (_iso$blocks = iso.blocks) === null || _iso$blocks === void 0 ? void 0 : _iso$blocks.allowBlocks) !== null && _iso$blocks$allowBloc !== void 0 ? _iso$blocks$allowBloc : [],
        disallowBlocks: (_iso$blocks$disallowB = iso === null || iso === void 0 ? void 0 : (_iso$blocks2 = iso.blocks) === null || _iso$blocks2 === void 0 ? void 0 : _iso$blocks2.disallowBlocks) !== null && _iso$blocks$disallowB !== void 0 ? _iso$blocks$disallowB : []
      },
      // Inserter, undo, and inspector is on, everything else is off
      toolbar: _objectSpread({
        // @ts-ignore */}
        inserter: true,
        // @ts-ignore */}
        inspector: false,
        // @ts-ignore */}
        navigation: false,
        // @ts-ignore */}
        documentInspector: false,
        // @ts-ignore */}
        undo: true,
        // @ts-ignore */}
        selectorTool: false
      }, (_iso$toolbar = iso === null || iso === void 0 ? void 0 : iso.toolbar) !== null && _iso$toolbar !== void 0 ? _iso$toolbar : {}),
      header: (_iso$header = iso === null || iso === void 0 ? void 0 : iso.header) !== null && _iso$header !== void 0 ? _iso$header : true,
      sidebar: _objectSpread({
        inserter: false,
        inspector: false
      }, (_iso$sidebar = iso === null || iso === void 0 ? void 0 : iso.sidebar) !== null && _iso$sidebar !== void 0 ? _iso$sidebar : {}),
      footer: (_iso$footer = iso === null || iso === void 0 ? void 0 : iso.footer) !== null && _iso$footer !== void 0 ? _iso$footer : false,
      // Nothing appears in the 'more menu'
      moreMenu: getMenu(iso === null || iso === void 0 ? void 0 : iso.moreMenu, _objectSpread({
        editor: false,
        fullscreen: false,
        preview: false,
        topToolbar: false
      }, (_iso$moreMenu = iso === null || iso === void 0 ? void 0 : iso.moreMenu) !== null && _iso$moreMenu !== void 0 ? _iso$moreMenu : {})),
      // No link menu
      linkMenu: (_iso$linkMenu = iso === null || iso === void 0 ? void 0 : iso.linkMenu) !== null && _iso$linkMenu !== void 0 ? _iso$linkMenu : [],
      // Default to top toolbar
      defaultPreferences: _objectSpread({}, (_iso$defaultPreferenc = iso === null || iso === void 0 ? void 0 : iso.defaultPreferences) !== null && _iso$defaultPreferenc !== void 0 ? _iso$defaultPreferenc : {}),
      allowApi: (_iso$allowApi = iso === null || iso === void 0 ? void 0 : iso.allowApi) !== null && _iso$allowApi !== void 0 ? _iso$allowApi : false,
      disableCanvasAnimations: (_iso$disableCanvasAni = iso === null || iso === void 0 ? void 0 : iso.disableCanvasAnimations) !== null && _iso$disableCanvasAni !== void 0 ? _iso$disableCanvasAni : false,
      // No default pattern
      currentPattern: (_iso$currentPattern = iso === null || iso === void 0 ? void 0 : iso.currentPattern) !== null && _iso$currentPattern !== void 0 ? _iso$currentPattern : null,
      // No patterns
      patterns: (_iso$patterns = iso === null || iso === void 0 ? void 0 : iso.patterns) !== null && _iso$patterns !== void 0 ? _iso$patterns : []
    },
    editor: _objectSpread(_objectSpread({
      alignWide: true,
      disableCustomColors: false,
      disableCustomFontSizes: false,
      disablePostFormats: true,
      titlePlaceholder: (0, _i18n.__)('Add title'),
      isRTL: false,
      autosaveInterval: 60,
      maxUploadFileSize: 0,
      // @ts-ignore */}
      allowedMimeTypes: [],
      styles: [{
        baseURL: '',
        __unstableType: 'theme',
        css: "body { font-family: 'Noto Serif' }"
      }],
      imageSizes: [],
      richEditingEnabled: true,
      codeEditingEnabled: false,
      // @ts-ignore */}
      allowedBlockTypes: true,
      __experimentalCanUserUseUnfilteredHTML: false,
      // Default to no patterns, reusable blocks
      __experimentalBlockPatterns: [],
      // @ts-ignore */}
      reusableBlocks: [],
      // Default to fixed top toolbar
      fixedToolbar: true
    }, editor), {}, {
      bodyPlaceholder: (_editor$bodyPlacehold = editor === null || editor === void 0 ? void 0 : editor.bodyPlaceholder) !== null && _editor$bodyPlacehold !== void 0 ? _editor$bodyPlacehold : (0, _i18n.__)('Start writing or type / to choose a block'),
      // @ts-ignore */}
      availableLegacyWidgets: {},
      hasPermissionsToManageWidgets: false,
      // Default to no link suggestions
      // @ts-ignore */}
      fetchLinkSuggestions: ((_editor$fetchLinkSugg = editor === null || editor === void 0 ? void 0 : editor.fetchLinkSuggestions) !== null && _editor$fetchLinkSugg !== void 0 ? _editor$fetchLinkSugg : editor === null || editor === void 0 ? void 0 : editor.__experimentalFetchLinkSuggestions) ? // @ts-ignore */}
      (_editor$fetchLinkSugg2 = editor === null || editor === void 0 ? void 0 : editor.fetchLinkSuggestions) !== null && _editor$fetchLinkSugg2 !== void 0 ? _editor$fetchLinkSugg2 : editor === null || editor === void 0 ? void 0 : editor.__experimentalFetchLinkSuggestions : function () {
        return [];
      }
    })
  };
}
//# sourceMappingURL=index.js.map