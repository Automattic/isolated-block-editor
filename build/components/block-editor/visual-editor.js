"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _blockEditor = require("@wordpress/block-editor");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _editorHeadingSlot = _interopRequireDefault(require("../editor-heading-slot"));

var _footerSlot = _interopRequireDefault(require("../footer-slot"));

var _excluded = ["children", "disableAnimations", "initialStyle", "currentStyle"];
import { createElement, Fragment } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function MaybeIframe(_ref) {
  var children = _ref.children,
      contentRef = _ref.contentRef,
      shouldIframe = _ref.shouldIframe,
      styles = _ref.styles,
      style = _ref.style;
  var ref = (0, _blockEditor.__unstableUseMouseMoveTypingReset)();

  var _useSelect = (0, _data.useSelect)(function (select) {
    var settings = select('core/block-editor').getSettings();
    return {
      assets: settings.__unstableResolvedAssets
    };
  }, []),
      assets = _useSelect.assets;

  if (!shouldIframe) {
    // TODO: this will add an EditorStyles for each editor on the page, which includes adding a <style> element. probably harmless but something to keep an eye on
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
    head: createElement(_blockEditor.__unstableEditorStyles, {
      styles: styles
    }),
    assets: assets,
    ref: ref,
    contentRef: contentRef,
    style: {
      width: '100%',
      height: '100%',
      display: 'block'
    },
    name: "editor-canvas"
  }, children);
}

var PreviewWrapper = function PreviewWrapper(_ref2) {
  var children = _ref2.children,
      disableAnimations = _ref2.disableAnimations,
      initialStyle = _ref2.initialStyle,
      currentStyle = _ref2.currentStyle,
      props = (0, _objectWithoutProperties2["default"])(_ref2, _excluded);

  if (disableAnimations) {
    return createElement("div", (0, _extends2["default"])({
      style: currentStyle
    }, props), children);
  }

  return createElement(_components.__unstableMotion.div, (0, _extends2["default"])({
    animate: currentStyle,
    initial: initialStyle
  }, props), children);
};
/**
 * This is a copy of packages/edit-post/src/components/visual-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 *
 * @param {Object} args
 * @param args.styles
 */


var VisualEditor = function VisualEditor(_ref3) {
  var styles = _ref3.styles;
  var themeSupportsLayout = (0, _data.useSelect)(function (select) {
    var _select = select(_blockEditor.store),
        getSettings = _select.getSettings;

    return getSettings().supportsLayout;
  }, []);

  var _useSelect2 = (0, _data.useSelect)(function (select) {
    var _select2 = select('isolated/editor'),
        getCanvasStyles = _select2.getCanvasStyles,
        getPreviewDeviceType = _select2.getPreviewDeviceType,
        getEditorSettings = _select2.getEditorSettings,
        isIframePreview = _select2.isIframePreview;

    return {
      canvasStyles: getCanvasStyles(),
      deviceType: getPreviewDeviceType(),
      disableCanvasAnimations: getEditorSettings().disableCanvasAnimations,
      isIframePreview: isIframePreview()
    };
  }),
      canvasStyles = _useSelect2.canvasStyles,
      deviceType = _useSelect2.deviceType,
      disableCanvasAnimations = _useSelect2.disableCanvasAnimations,
      isIframePreview = _useSelect2.isIframePreview;

  var resizedCanvasStyles = (0, _blockEditor.__experimentalUseResizeCanvas)(deviceType, false);
  var defaultLayout = (0, _blockEditor.useSetting)('layout');
  var previewMode = 'is-' + deviceType.toLowerCase() + '-preview';
  var desktopCanvasStyles = {
    // We intentionally omit a 100% height here. The container is a flex item, so the 100% height is granted by default.
    // If a percentage height is present, older browsers such as Safari 13 apply that, but do so incorrectly as the inheritance is buggy.
    width: '100%',
    margin: 0,
    display: 'flex',
    flexFlow: 'column',
    // Default background color so that grey
    // .edit-post-editor-regions__content color doesn't show through.
    background: 'white'
  };
  var animatedStyles = desktopCanvasStyles;

  if (resizedCanvasStyles) {
    animatedStyles = resizedCanvasStyles;
  }

  if (canvasStyles) {
    animatedStyles = _objectSpread(_objectSpread({}, animatedStyles), canvasStyles);
  }

  var blockSelectionClearerRef = (0, _blockEditor.__unstableUseBlockSelectionClearer)();
  var ref = (0, _element.useRef)();
  var contentRef = (0, _compose.useMergeRefs)([ref, (0, _blockEditor.__unstableUseClipboardHandler)(), (0, _blockEditor.__unstableUseTypewriter)(), (0, _blockEditor.__unstableUseBlockSelectionClearer)(), (0, _blockEditor.__unstableUseTypingObserver)()]);
  var layout = (0, _element.useMemo)(function () {
    if (themeSupportsLayout) {
      return defaultLayout;
    }

    return undefined;
  }, [themeSupportsLayout, defaultLayout]); // If there is a layout definition, then we're on Gutenberg > v14, which requires us to pass the
  // 'constrained' type

  var usedLayout = layout !== null && layout !== void 0 && layout.definitions ? _objectSpread(_objectSpread({}, layout), {}, {
    type: 'constrained'
  }) : layout;
  return createElement(_blockEditor.BlockTools, {
    __unstableContentRef: ref,
    className: "edit-post-visual-editor"
  }, createElement(_components.__unstableMotion.div, {
    className: "edit-post-visual-editor__content-area",
    animate: {
      padding: '0'
    },
    ref: blockSelectionClearerRef
  }, createElement(PreviewWrapper, {
    className: previewMode,
    currentStyle: animatedStyles,
    disableAnimations: disableCanvasAnimations,
    initialStyle: desktopCanvasStyles
  }, createElement(MaybeIframe, {
    shouldIframe: isIframePreview,
    contentRef: contentRef,
    styles: styles,
    style: {}
  }, createElement(_blockEditor.__experimentalLayoutStyle, {
    selector: ".edit-post-visual-editor__post-title-wrapper, .block-editor-block-list__layout.is-root-container",
    layout: usedLayout
  }), createElement(_editorHeadingSlot["default"].Slot, {
    mode: "visual"
  }), createElement(_blockEditor.BlockList, {
    className: undefined,
    __experimentalLayout: layout
  }), createElement(_footerSlot["default"].Slot, {
    mode: "visual"
  })))));
};

var _default = VisualEditor;
exports["default"] = _default;
//# sourceMappingURL=visual-editor.js.map