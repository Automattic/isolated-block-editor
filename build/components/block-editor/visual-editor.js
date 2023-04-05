"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = VisualEditor;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classnames = _interopRequireDefault(require("classnames"));
var _blockEditor = require("@wordpress/block-editor");
var _editor = require("@wordpress/editor");
var _data = require("@wordpress/data");
var _components = require("@wordpress/components");
var _element = require("@wordpress/element");
var _compose = require("@wordpress/compose");
var _editorHeadingSlot = _interopRequireDefault(require("../editor-heading-slot"));
var _footerSlot = _interopRequireDefault(require("../footer-slot"));
import { createElement, Fragment } from "@wordpress/element";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * External dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             */ /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */ /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Internal dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */
function MaybeIframe(_ref) {
  var children = _ref.children,
    contentRef = _ref.contentRef,
    shouldIframe = _ref.shouldIframe,
    styles = _ref.styles,
    style = _ref.style;
  var ref = (0, _blockEditor.__unstableUseMouseMoveTypingReset)();
  if (!shouldIframe) {
    return createElement(Fragment, null, createElement(_blockEditor.__unstableEditorStyles, {
      styles: styles
    }), createElement(_blockEditor.WritingFlow, {
      ref: contentRef,
      className: "editor-styles-wrapper",
      style: _objectSpread({
        flex: '1'
      }, style),
      tabIndex: -1
    }, children));
  }
  return createElement(_blockEditor.__unstableIframe, {
    ref: ref,
    contentRef: contentRef,
    style: {
      width: '100%',
      height: '100%',
      display: 'block'
    },
    name: "editor-canvas"
  }, createElement(_blockEditor.__unstableEditorStyles, {
    styles: styles
  }), children);
}

/**
 * This is a copy of packages/edit-post/src/components/visual-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 *
 * @param {Object} args
 * @param args.styles
 */
function VisualEditor(_ref2) {
  var styles = _ref2.styles;
  var _useSelect = (0, _data.useSelect)(function (select) {
      var _select = select('isolated/editor'),
        isFeatureActive = _select.isFeatureActive;
      // @ts-ignore
      var _select2 = select(_editor.store),
        getCurrentPostId = _select2.getCurrentPostId,
        getCurrentPostType = _select2.getCurrentPostType,
        getEditorSettings = _select2.getEditorSettings;
      var _isTemplateMode = false;
      var _wrapperBlockName;
      if (getCurrentPostType() === 'wp_block') {
        _wrapperBlockName = 'core/block';
      } else if (!_isTemplateMode) {
        _wrapperBlockName = 'core/post-content';
      }
      var editorSettings = getEditorSettings();
      return {
        deviceType: 'Desktop',
        // @ts-ignore
        isWelcomeGuideVisible: isFeatureActive('welcomeGuide'),
        isTemplateMode: _isTemplateMode,
        postContentAttributes: getEditorSettings().postContentAttributes,
        // Post template fetch returns a 404 on classic themes, which
        // messes with e2e tests, so check it's a block theme first.
        editedPostTemplate: undefined,
        wrapperBlockName: _wrapperBlockName,
        wrapperUniqueId: getCurrentPostId(),
        isBlockBasedTheme: editorSettings.__unstableIsBlockBasedTheme
      };
    }, []),
    deviceType = _useSelect.deviceType,
    isWelcomeGuideVisible = _useSelect.isWelcomeGuideVisible,
    isTemplateMode = _useSelect.isTemplateMode,
    postContentAttributes = _useSelect.postContentAttributes,
    _useSelect$editedPost = _useSelect.editedPostTemplate,
    editedPostTemplate = _useSelect$editedPost === void 0 ? {} : _useSelect$editedPost,
    wrapperBlockName = _useSelect.wrapperBlockName,
    wrapperUniqueId = _useSelect.wrapperUniqueId;
  // @ts-ignore
  var _useSelect2 = (0, _data.useSelect)(_editor.store),
    isCleanNewPost = _useSelect2.isCleanNewPost;
  var hasMetaBoxes = false;
  var _useSelect3 = (0, _data.useSelect)(function (select) {
      // @ts-ignore
      var _settings = select(_blockEditor.store).getSettings();
      return {
        themeHasDisabledLayoutStyles: _settings.disableLayoutStyles,
        themeSupportsLayout: _settings.supportsLayout,
        isFocusMode: _settings.focusMode
      };
    }, []),
    themeHasDisabledLayoutStyles = _useSelect3.themeHasDisabledLayoutStyles,
    themeSupportsLayout = _useSelect3.themeSupportsLayout;
  var desktopCanvasStyles = {
    height: '100%',
    width: '100%',
    margin: 0,
    display: 'flex',
    flexFlow: 'column',
    // Default background color so that grey
    // .edit-post-editor-regions__content color doesn't show through.
    background: 'white'
  };
  var templateModeStyles = _objectSpread(_objectSpread({}, desktopCanvasStyles), {}, {
    borderRadius: '2px 2px 0 0',
    border: '1px solid #ddd',
    borderBottom: 0
  });
  var resizedCanvasStyles = (0, _blockEditor.__experimentalUseResizeCanvas)(deviceType, isTemplateMode);
  var globalLayoutSettings = (0, _blockEditor.useSetting)('layout');
  var previewMode = 'is-' + deviceType.toLowerCase() + '-preview';
  var animatedStyles = isTemplateMode ? templateModeStyles : desktopCanvasStyles;
  if (resizedCanvasStyles) {
    animatedStyles = resizedCanvasStyles;
  }
  var paddingBottom;

  // Add a constant padding for the typewritter effect. When typing at the
  // bottom, there needs to be room to scroll up.
  if (!hasMetaBoxes && !resizedCanvasStyles && !isTemplateMode) {
    paddingBottom = '40vh';
  }
  var ref = (0, _element.useRef)();
  var contentRef = (0, _compose.useMergeRefs)([ref, (0, _blockEditor.__unstableUseClipboardHandler)(), (0, _blockEditor.__unstableUseTypewriter)(), (0, _blockEditor.__unstableUseTypingObserver)(), (0, _blockEditor.__unstableUseBlockSelectionClearer)()]);
  var blockSelectionClearerRef = (0, _blockEditor.__unstableUseBlockSelectionClearer)();

  // fallbackLayout is used if there is no Post Content,
  // and for Post Title.
  var fallbackLayout = (0, _element.useMemo)(function () {
    if (isTemplateMode) {
      return {
        type: 'default'
      };
    }
    if (themeSupportsLayout) {
      // We need to ensure support for wide and full alignments,
      // so we add the constrained type.
      return _objectSpread(_objectSpread({}, globalLayoutSettings), {}, {
        type: 'constrained'
      });
    }
    // Set default layout for classic themes so all alignments are supported.
    return {
      type: 'default'
    };
  }, [isTemplateMode, themeSupportsLayout, globalLayoutSettings]);
  var newestPostContentAttributes = (0, _element.useMemo)(function () {
    // @ts-ignore
    if (!(editedPostTemplate !== null && editedPostTemplate !== void 0 && editedPostTemplate.content) && !(editedPostTemplate !== null && editedPostTemplate !== void 0 && editedPostTemplate.blocks)) {
      return postContentAttributes;
    }
    // When in template editing mode, we can access the blocks directly.
    // @ts-ignore
    if (editedPostTemplate !== null && editedPostTemplate !== void 0 && editedPostTemplate.blocks) {
      // @ts-ignore
      return getPostContentAttributes(editedPostTemplate === null || editedPostTemplate === void 0 ? void 0 : editedPostTemplate.blocks);
    }
    // If there are no blocks, we have to parse the content string.
    // Best double-check it's a string otherwise the parse function gets unhappy.
    // @ts-ignore
    var parseableContent = typeof (editedPostTemplate === null || editedPostTemplate === void 0 ? void 0 : editedPostTemplate.content) === 'string' ? editedPostTemplate === null || editedPostTemplate === void 0 ? void 0 : editedPostTemplate.content : '';

    // @ts-ignore
    return getPostContentAttributes(parse(parseableContent)) || {};
  }, [// @ts-ignore
  editedPostTemplate === null || editedPostTemplate === void 0 ? void 0 : editedPostTemplate.content, // @ts-ignore
  editedPostTemplate === null || editedPostTemplate === void 0 ? void 0 : editedPostTemplate.blocks, postContentAttributes]);
  var layout = (newestPostContentAttributes === null || newestPostContentAttributes === void 0 ? void 0 : newestPostContentAttributes.layout) || {};
  var postContentLayoutClasses = (0, _blockEditor.__experimentaluseLayoutClasses)(newestPostContentAttributes, 'core/post-content');
  var blockListLayoutClass = (0, _classnames["default"])({
    'is-layout-flow': !themeSupportsLayout
  }, themeSupportsLayout && postContentLayoutClasses);
  var postContentLayoutStyles = (0, _blockEditor.__experimentaluseLayoutStyles)(newestPostContentAttributes, 'core/post-content', '.block-editor-block-list__layout.is-root-container');

  // Update type for blocks using legacy layouts.
  var postContentLayout = (0, _element.useMemo)(function () {
    return layout && ((layout === null || layout === void 0 ? void 0 : layout.type) === 'constrained' || layout !== null && layout !== void 0 && layout.inherit || layout !== null && layout !== void 0 && layout.contentSize || layout !== null && layout !== void 0 && layout.wideSize) ? _objectSpread(_objectSpread(_objectSpread({}, globalLayoutSettings), layout), {}, {
      type: 'constrained'
    }) : _objectSpread(_objectSpread(_objectSpread({}, globalLayoutSettings), layout), {}, {
      type: 'default'
    });
  }, [layout === null || layout === void 0 ? void 0 : layout.type, layout === null || layout === void 0 ? void 0 : layout.inherit, layout === null || layout === void 0 ? void 0 : layout.contentSize, layout === null || layout === void 0 ? void 0 : layout.wideSize, globalLayoutSettings]);

  // If there is a Post Content block we use its layout for the block list;
  // if not, this must be a classic theme, in which case we use the fallback layout.
  var blockListLayout = postContentAttributes ? postContentLayout : fallbackLayout;
  var titleRef = (0, _element.useRef)();
  (0, _element.useEffect)(function () {
    var _titleRef$current;
    if (isWelcomeGuideVisible || !isCleanNewPost()) {
      return;
    }
    // @ts-ignore
    titleRef === null || titleRef === void 0 ? void 0 : (_titleRef$current = titleRef.current) === null || _titleRef$current === void 0 ? void 0 : _titleRef$current.focus();
  }, [isWelcomeGuideVisible, isCleanNewPost]);
  styles = (0, _element.useMemo)(function () {
    return [].concat((0, _toConsumableArray2["default"])(styles), [{
      // We should move this in to future to the body.
      css: ".edit-post-visual-editor__post-title-wrapper{margin-top:4rem}" + (paddingBottom ? "body{padding-bottom:".concat(paddingBottom, "}") : '')
    }]);
  }, [styles]);
  return createElement(_blockEditor.BlockTools, {
    __unstableContentRef: ref,
    className: (0, _classnames["default"])('edit-post-visual-editor', {
      'is-template-mode': isTemplateMode
    })
  }, createElement(_editor.VisualEditorGlobalKeyboardShortcuts, null), createElement(_components.__unstableMotion.div, {
    className: "edit-post-visual-editor__content-area",
    animate: {
      padding: isTemplateMode ? '48px 48px 0' : 0
    },
    ref: blockSelectionClearerRef
  }, createElement(_components.__unstableMotion.div, {
    animate: animatedStyles,
    initial: desktopCanvasStyles,
    className: previewMode
  }, createElement(MaybeIframe, {
    shouldIframe: isTemplateMode || deviceType === 'Tablet' || deviceType === 'Mobile',
    contentRef: contentRef,
    styles: styles,
    style: {}
  }, themeSupportsLayout && !themeHasDisabledLayoutStyles && !isTemplateMode && createElement(Fragment, null, createElement(_blockEditor.__experimentalLayoutStyle, {
    selector: ".edit-post-visual-editor__post-title-wrapper, .block-editor-block-list__layout.is-root-container",
    layout: fallbackLayout,
    layoutDefinitions: globalLayoutSettings === null || globalLayoutSettings === void 0 ? void 0 : globalLayoutSettings.definitions
  }), postContentLayoutStyles && createElement(_blockEditor.__experimentalLayoutStyle, {
    layout: postContentLayout,
    css: postContentLayoutStyles,
    layoutDefinitions: globalLayoutSettings === null || globalLayoutSettings === void 0 ? void 0 : globalLayoutSettings.definitions
  })), createElement(_editorHeadingSlot["default"].Slot, {
    mode: "visual"
  }), createElement(_blockEditor.__experimentalRecursionProvider, {
    blockName: wrapperBlockName,
    uniqueId: wrapperUniqueId
  }, createElement(_blockEditor.BlockList, {
    className: isTemplateMode ? 'wp-site-blocks' : "".concat(blockListLayoutClass, " wp-block-post-content") // Ensure root level blocks receive default/flow blockGap styling rules.
    ,

    __experimentalLayout: blockListLayout
  })), createElement(_footerSlot["default"].Slot, {
    mode: "visual"
  })))));
}
;
//# sourceMappingURL=visual-editor.js.map