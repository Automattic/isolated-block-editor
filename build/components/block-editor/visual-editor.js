"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _blockEditor = require("@wordpress/block-editor");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _editorHeadingSlot = _interopRequireDefault(require("../editor-heading-slot"));

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
/**
 * This is a copy of packages/edit-post/src/components/visual-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 *
 * @param {Object} args
 * @param args.styles
 */


var VisualEditor = function VisualEditor(_ref2) {
  var styles = _ref2.styles;
  var themeSupportsLayout = (0, _data.useSelect)(function (select) {
    var _select = select(_blockEditor.store),
        getSettings = _select.getSettings;

    return getSettings().supportsLayout;
  }, []);

  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      deviceType: select('isolated/editor').getPreviewDeviceType()
    };
  }),
      deviceType = _useSelect.deviceType;

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

  var blockSelectionClearerRef = (0, _blockEditor.__unstableUseBlockSelectionClearer)();
  var ref = (0, _element.useRef)();
  var contentRef = (0, _compose.useMergeRefs)([ref, (0, _blockEditor.__unstableUseClipboardHandler)(), (0, _blockEditor.__unstableUseTypewriter)(), (0, _blockEditor.__unstableUseBlockSelectionClearer)(), (0, _blockEditor.__unstableUseTypingObserver)()]);
  var layout = (0, _element.useMemo)(function () {
    if (themeSupportsLayout) {
      return defaultLayout;
    }

    return undefined;
  }, [themeSupportsLayout, defaultLayout]);
  return createElement(_blockEditor.BlockTools, {
    __unstableContentRef: ref,
    className: "edit-post-visual-editor"
  }, createElement(_components.__unstableMotion.div, {
    className: "edit-post-visual-editor__content-area",
    animate: {
      padding: '0'
    },
    ref: blockSelectionClearerRef
  }, createElement(_components.__unstableMotion.div, {
    animate: animatedStyles,
    initial: desktopCanvasStyles,
    className: previewMode
  }, createElement(MaybeIframe, {
    shouldIframe: deviceType === 'Tablet' || deviceType === 'Mobile',
    contentRef: contentRef,
    styles: styles,
    style: {}
  }, createElement(_blockEditor.__experimentalLayoutStyle, {
    selector: ".edit-post-visual-editor__post-title-wrapper, .block-editor-block-list__layout.is-root-container",
    layout: defaultLayout
  }), createElement(_editorHeadingSlot["default"].Slot, {
    mode: "visual"
  }), createElement(_blockEditor.BlockList, {
    className: undefined,
    __experimentalLayout: layout
  })))));
};

var _default = VisualEditor;
exports["default"] = _default;
//# sourceMappingURL=visual-editor.js.map