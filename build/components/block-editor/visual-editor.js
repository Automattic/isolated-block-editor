"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = VisualEditor;
exports.unlock = exports.lock = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classnames = _interopRequireDefault(require("classnames"));
var _blockEditor = require("@wordpress/block-editor");
var _element = require("@wordpress/element");
var _components = require("@wordpress/components");
var _data = require("@wordpress/data");
var _compose = require("@wordpress/compose");
var _blocks = require("@wordpress/blocks");
var _editor = require("@wordpress/editor");
var _privateApis = require("@wordpress/private-apis");
var _editorHeadingSlot = _interopRequireDefault(require("../editor-heading-slot"));
var _footerSlot = _interopRequireDefault(require("../footer-slot"));
import { createElement, Fragment } from "react";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * External dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */ /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */ // @ts-ignore
// @ts-ignore
// @ts-ignore
var isGutenbergPlugin = true;

/**
 * Internal dependencies
 */

var _dangerousOptInToUns = (0, _privateApis.__dangerousOptInToUnstableAPIsOnlyForCoreModules)('I know using unstable features means my plugin or theme will inevitably break on the next WordPress release.', '@wordpress/edit-post'),
  lock = exports.lock = _dangerousOptInToUns.lock,
  unlock = exports.unlock = _dangerousOptInToUns.unlock;
var _unlock = unlock(_blockEditor.privateApis),
  LayoutStyle = _unlock.LayoutStyle,
  useLayoutClasses = _unlock.useLayoutClasses,
  useLayoutStyles = _unlock.useLayoutStyles,
  BlockCanvas = _unlock.ExperimentalBlockCanvas;

/**
 * Given an array of nested blocks, find the first Post Content
 * block inside it, recursing through any nesting levels,
 * and return its attributes.
 *
 * @param {Array} blocks A list of blocks.
 *
 * @return {Object | undefined} The Post Content block.
 */
function getPostContentAttributes(blocks) {
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].name === 'core/post-content') {
      return blocks[i].attributes;
    }
    if (blocks[i].innerBlocks.length) {
      var nestedPostContent = getPostContentAttributes(blocks[i].innerBlocks);
      if (nestedPostContent) {
        return nestedPostContent;
      }
    }
  }
}
function checkForPostContentAtRootLevel(blocks) {
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].name === 'core/post-content') {
      return true;
    }
  }
  return false;
}

/**
 * This is a copy of packages/edit-post/src/components/visual-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 *
 * @param {Object} args
 * @param args.styles
 */
function VisualEditor(_ref) {
  var styles = _ref.styles;
  var _useSelect = (0, _data.useSelect)(function (select) {
      var _select = select('isolated/editor'),
        isFeatureActive = _select.isFeatureActive;
      var _select2 = select(_editor.store),
        getCurrentPostId = _select2.getCurrentPostId,
        getCurrentPostType = _select2.getCurrentPostType,
        getEditorSettings = _select2.getEditorSettings;
      var _select3 = select(_blocks.store),
        getBlockTypes = _select3.getBlockTypes;
      var _isTemplateMode = false;
      var postTypeSlug = getCurrentPostType();
      var _wrapperBlockName;
      if (postTypeSlug === 'wp_block') {
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
        isBlockBasedTheme: editorSettings.__unstableIsBlockBasedTheme,
        hasV3BlocksOnly: getBlockTypes().every(function (type) {
          return type.apiVersion >= 3;
        })
      };
    }, []),
    deviceType = _useSelect.deviceType,
    isWelcomeGuideVisible = _useSelect.isWelcomeGuideVisible,
    isTemplateMode = _useSelect.isTemplateMode,
    postContentAttributes = _useSelect.postContentAttributes,
    _useSelect$editedPost = _useSelect.editedPostTemplate,
    editedPostTemplate = _useSelect$editedPost === void 0 ? {} : _useSelect$editedPost,
    wrapperBlockName = _useSelect.wrapperBlockName,
    wrapperUniqueId = _useSelect.wrapperUniqueId,
    isBlockBasedTheme = _useSelect.isBlockBasedTheme,
    hasV3BlocksOnly = _useSelect.hasV3BlocksOnly;
  // @ts-ignore
  var _useSelect2 = (0, _data.useSelect)(_editor.store),
    isCleanNewPost = _useSelect2.isCleanNewPost;
  var hasMetaBoxes = false;
  var _useSelect3 = (0, _data.useSelect)(function (select) {
      var _settings$__experimen;
      var _settings = select(_blockEditor.store).getSettings();
      return {
        themeHasDisabledLayoutStyles: _settings.disableLayoutStyles,
        themeSupportsLayout: _settings.supportsLayout,
        isFocusMode: _settings.focusMode,
        hasRootPaddingAwareAlignments: (_settings$__experimen = _settings.__experimentalFeatures) === null || _settings$__experimen === void 0 ? void 0 : _settings$__experimen.useRootPaddingAwareAlignments
      };
    }, []),
    themeHasDisabledLayoutStyles = _useSelect3.themeHasDisabledLayoutStyles,
    themeSupportsLayout = _useSelect3.themeSupportsLayout;
  var desktopCanvasStyles = {
    height: '100%',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
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
  var contentRef = (0, _compose.useMergeRefs)([ref, (0, _blockEditor.__unstableUseTypewriter)()]);

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
    var parseableContent =
    // @ts-ignore
    typeof (editedPostTemplate === null || editedPostTemplate === void 0 ? void 0 : editedPostTemplate.content) === 'string'
    // @ts-ignore
    ? editedPostTemplate === null || editedPostTemplate === void 0 ? void 0 : editedPostTemplate.content : '';

    // @ts-ignore
    return getPostContentAttributes((0, _blocks.parse)(parseableContent)) || {};
  }, [// @ts-ignore
  editedPostTemplate === null || editedPostTemplate === void 0 ? void 0 : editedPostTemplate.content, // @ts-ignore
  editedPostTemplate === null || editedPostTemplate === void 0 ? void 0 : editedPostTemplate.blocks, postContentAttributes]);
  var hasPostContentAtRootLevel = (0, _element.useMemo)(function () {
    // @ts-ignore
    if (!(editedPostTemplate !== null && editedPostTemplate !== void 0 && editedPostTemplate.content) && !(editedPostTemplate !== null && editedPostTemplate !== void 0 && editedPostTemplate.blocks)) {
      return false;
    }
    // When in template editing mode, we can access the blocks directly.
    // @ts-ignore
    if (editedPostTemplate !== null && editedPostTemplate !== void 0 && editedPostTemplate.blocks) {
      // @ts-ignore
      return checkForPostContentAtRootLevel(editedPostTemplate === null || editedPostTemplate === void 0 ? void 0 : editedPostTemplate.blocks);
    }
    // If there are no blocks, we have to parse the content string.
    // Best double-check it's a string otherwise the parse function gets unhappy.
    var parseableContent =
    // @ts-ignore
    typeof (editedPostTemplate === null || editedPostTemplate === void 0 ? void 0 : editedPostTemplate.content) === 'string'
    // @ts-ignore
    ? editedPostTemplate === null || editedPostTemplate === void 0 ? void 0 : editedPostTemplate.content : '';
    return checkForPostContentAtRootLevel((0, _blocks.parse)(parseableContent)) || false;
    // @ts-ignore
  }, [editedPostTemplate === null || editedPostTemplate === void 0 ? void 0 : editedPostTemplate.content, editedPostTemplate === null || editedPostTemplate === void 0 ? void 0 : editedPostTemplate.blocks]);
  var _ref2 = newestPostContentAttributes || {},
    _ref2$layout = _ref2.layout,
    layout = _ref2$layout === void 0 ? {} : _ref2$layout,
    _ref2$align = _ref2.align,
    align = _ref2$align === void 0 ? '' : _ref2$align;
  var postContentLayoutClasses = useLayoutClasses(newestPostContentAttributes, 'core/post-content');
  var blockListLayoutClass = (0, _classnames["default"])({
    'is-layout-flow': !themeSupportsLayout
  }, themeSupportsLayout && postContentLayoutClasses, align && "align".concat(align));
  var postContentLayoutStyles = useLayoutStyles(newestPostContentAttributes, 'core/post-content', '.block-editor-block-list__layout.is-root-container');

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
  var postEditorLayout = (blockListLayout === null || blockListLayout === void 0 ? void 0 : blockListLayout.type) === 'default' && !hasPostContentAtRootLevel ? fallbackLayout : blockListLayout;
  var titleRef = (0, _element.useRef)();
  (0, _element.useEffect)(function () {
    var _titleRef$current;
    if (isWelcomeGuideVisible || !isCleanNewPost()) {
      return;
    }
    // @ts-ignore
    titleRef === null || titleRef === void 0 || (_titleRef$current = titleRef.current) === null || _titleRef$current === void 0 || _titleRef$current.focus();
  }, [isWelcomeGuideVisible, isCleanNewPost]);
  styles = (0, _element.useMemo)(function () {
    return [].concat((0, _toConsumableArray2["default"])(styles), [{
      // We should move this in to future to the body.
      css: ".edit-post-visual-editor__post-title-wrapper{margin-top:4rem}" + (paddingBottom ? "body{padding-bottom:".concat(paddingBottom, "}") : '')
    }]);
  }, [styles]);

  // Add some styles for alignwide/alignfull Post Content and its children.
  var alignCSS = ".is-root-container.alignwide { max-width: var(--wp--style--global--wide-size); margin-left: auto; margin-right: auto;}\n\t\t.is-root-container.alignwide:where(.is-layout-flow) > :not(.alignleft):not(.alignright) { max-width: var(--wp--style--global--wide-size);}\n\t\t.is-root-container.alignfull { max-width: none; margin-left: auto; margin-right: auto;}\n\t\t.is-root-container.alignfull:where(.is-layout-flow) > :not(.alignleft):not(.alignright) { max-width: none;}";

  // TODO: Styles not appearing in the iframe mode yet
  // const isToBeIframed =
  // 	( ( hasV3BlocksOnly || ( isGutenbergPlugin && isBlockBasedTheme ) ) &&
  // 		! hasMetaBoxes ) ||
  // 	isTemplateMode ||
  // 	deviceType === 'Tablet' ||
  // 	deviceType === 'Mobile';
  var isToBeIframed = false;
  return createElement(_blockEditor.BlockTools, {
    __unstableContentRef: ref,
    className: (0, _classnames["default"])('edit-post-visual-editor', {
      'is-template-mode': isTemplateMode,
      'has-inline-canvas': !isToBeIframed
    })
  }, createElement(_components.__unstableMotion.div, {
    className: "edit-post-visual-editor__content-area",
    animate: {
      padding: isTemplateMode ? '48px 48px 0' : 0
    }
  }, createElement(_components.__unstableMotion.div, {
    animate: animatedStyles,
    initial: desktopCanvasStyles,
    className: previewMode
  }, createElement(BlockCanvas, {
    shouldIframe: isToBeIframed,
    contentRef: contentRef,
    styles: styles,
    height: "100%"
  }, themeSupportsLayout && !themeHasDisabledLayoutStyles && !isTemplateMode && createElement(Fragment, null, createElement(LayoutStyle, {
    selector: ".edit-post-visual-editor__post-title-wrapper",
    layout: fallbackLayout
  }), createElement(LayoutStyle, {
    selector: ".block-editor-block-list__layout.is-root-container",
    layout: postEditorLayout
  }), align && createElement(LayoutStyle, {
    css: alignCSS
  }), postContentLayoutStyles && createElement(LayoutStyle, {
    layout: postContentLayout,
    css: postContentLayoutStyles
  })), createElement(_editorHeadingSlot["default"].Slot, {
    mode: "visual"
  }), createElement(_blockEditor.__experimentalRecursionProvider, {
    blockName: wrapperBlockName,
    uniqueId: wrapperUniqueId
  }, createElement(_blockEditor.BlockList, {
    className: isTemplateMode ? 'wp-site-blocks' : "".concat(blockListLayoutClass, " wp-block-post-content") // Ensure root level blocks receive default/flow blockGap styling rules.
    ,

    layout: blockListLayout
  })), createElement(_footerSlot["default"].Slot, {
    mode: "visual"
  })))));
}
//# sourceMappingURL=visual-editor.js.map