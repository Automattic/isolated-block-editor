/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
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
 * @returns {BlockEditorSettings}
 **/


export default function applyDefaultSettings(settings) {
  var _iso$preferencesKey, _iso$persistenceKey, _iso$disallowEmbed, _iso$customStores, _iso$blocks$allowBloc, _iso$blocks, _iso$blocks$disallowB, _iso$blocks2, _iso$toolbar, _iso$moreMenu, _iso$linkMenu, _iso$defaultPreferenc, _iso$allowApi, _iso$currentPattern, _iso$patterns;

  const {
    iso,
    editor,
    collab
  } = settings;
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
      toolbar: {
        // @ts-ignore */}
        inserter: true,
        // @ts-ignore */}
        inspector: false,
        // @ts-ignore */}
        navigation: false,
        // @ts-ignore */}
        documentInspector: false,
        // @ts-ignore */}
        toc: false,
        // @ts-ignore */}
        undo: true,
        ...((_iso$toolbar = iso === null || iso === void 0 ? void 0 : iso.toolbar) !== null && _iso$toolbar !== void 0 ? _iso$toolbar : {})
      },
      // Nothing appears in the 'more menu'
      moreMenu: getMenu(iso === null || iso === void 0 ? void 0 : iso.moreMenu, {
        editor: false,
        fullscreen: false,
        preview: false,
        topToolbar: false,
        ...((_iso$moreMenu = iso === null || iso === void 0 ? void 0 : iso.moreMenu) !== null && _iso$moreMenu !== void 0 ? _iso$moreMenu : {})
      }),
      // No link menu
      linkMenu: (_iso$linkMenu = iso === null || iso === void 0 ? void 0 : iso.linkMenu) !== null && _iso$linkMenu !== void 0 ? _iso$linkMenu : [],
      // Default to top toolbar
      defaultPreferences: {
        fixedToolbar: true,
        ...((_iso$defaultPreferenc = iso === null || iso === void 0 ? void 0 : iso.defaultPreferences) !== null && _iso$defaultPreferenc !== void 0 ? _iso$defaultPreferenc : {})
      },
      allowApi: (_iso$allowApi = iso === null || iso === void 0 ? void 0 : iso.allowApi) !== null && _iso$allowApi !== void 0 ? _iso$allowApi : false,
      // No default pattern
      currentPattern: (_iso$currentPattern = iso === null || iso === void 0 ? void 0 : iso.currentPattern) !== null && _iso$currentPattern !== void 0 ? _iso$currentPattern : null,
      // No patterns
      patterns: (_iso$patterns = iso === null || iso === void 0 ? void 0 : iso.patterns) !== null && _iso$patterns !== void 0 ? _iso$patterns : []
    },
    editor: {
      alignWide: true,
      disableCustomColors: false,
      disableCustomFontSizes: false,
      disablePostFormats: true,
      titlePlaceholder: __('Add title'),
      bodyPlaceholder: __('Start writing or type / to choose a block'),
      isRTL: false,
      autosaveInterval: 60,
      maxUploadFileSize: 0,
      // @ts-ignore */}
      allowedMimeTypes: [],
      styles: {
        css: "body { font-family: 'Noto Serif' }"
      },
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
      fixedToolbar: true,
      ...editor,
      // @ts-ignore */}
      availableLegacyWidgets: {},
      hasPermissionsToManageWidgets: false,
      // Default to no link suggestions
      // @ts-ignore */}
      __experimentalFetchLinkSuggestions: editor !== null && editor !== void 0 && editor.__experimentalFetchLinkSuggestions ? // @ts-ignore */}
      editor === null || editor === void 0 ? void 0 : editor.__experimentalFetchLinkSuggestions : () => []
    },
    collab
  };
}
//# sourceMappingURL=index.js.map