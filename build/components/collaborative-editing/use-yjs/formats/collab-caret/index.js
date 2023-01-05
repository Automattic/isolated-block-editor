"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FORMAT_NAME = void 0;
exports.applyCarets = applyCarets;
exports.settings = exports.registerFormatCollabCaret = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _memize = _interopRequireDefault(require("memize"));
var _classnames = _interopRequireDefault(require("classnames"));
var _richText = require("@wordpress/rich-text");
var _colorUtils = require("./color-utils");
require("./style.scss");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * @typedef MultilineData
 * @property {boolean} isMultiline - Whether this is a multiline attribute.
 * @property {(offset: number) => {isAtMultilineItemEnd: boolean, multilineItemText?: string}} checkOffset - Determine whether a given caret index is at the end of a multiline segment.
 */

var FORMAT_NAME = 'isolated/collab-caret';

/**
 * Applies given carets to the given record.
 *
 * @param {Object} record The record to apply carets to.
 * @param {MultilineData} multiline
 * @param {Array} carets The carets to apply.
 * @return {Object} A record with the carets applied.
 */
exports.FORMAT_NAME = FORMAT_NAME;
function applyCarets(record, multiline) {
  var carets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  carets.forEach(function (caret) {
    var _pop, _lastGrapheme$length;
    var start = caret.start,
      end = caret.end,
      id = caret.id,
      color = caret.color,
      label = caret.label;
    var isCollapsed = start === end;
    var _multiline$checkOffse = multiline.checkOffset(end),
      isAtMultilineItemEnd = _multiline$checkOffse.isAtMultilineItemEnd,
      multilineItemText = _multiline$checkOffse.multilineItemText;
    var isShifted = isCollapsed && (multiline.isMultiline ? isAtMultilineItemEnd : end >= record.text.length);
    var text = isAtMultilineItemEnd ? multilineItemText : record.text;

    // Try to accurately get the `length` of the last character (i.e. grapheme) in case
    // the last character is an emoji, where "<emoji>".length can be more than 1.
    // For example, "👩‍👩‍👧‍👦".length === 11. (Intl.Segementer is still unsupported in Firefox)
    // @ts-ignore Intl.Segmenter is not in spec yet
    var lastGrapheme = Intl.Segmenter ? // @ts-ignore Intl.Segmenter is not in spec yet
    (_pop = (0, _toConsumableArray2["default"])(new Intl.Segmenter().segment(text)).pop()) === null || _pop === void 0 ? void 0 : _pop.segment : undefined;
    var offset = (_lastGrapheme$length = lastGrapheme === null || lastGrapheme === void 0 ? void 0 : lastGrapheme.length) !== null && _lastGrapheme$length !== void 0 ? _lastGrapheme$length : 1; // fall back to 1 if we can't accurately segment the last grapheme

    if (isShifted) {
      start = end - offset;
    }
    if (isCollapsed) {
      end = start + offset;
    }
    record = (0, _richText.applyFormat)(record, {
      type: FORMAT_NAME,
      attributes: {
        id: 'iso-editor-collab-caret-' + id,
        "class": (0, _classnames["default"])({
          'is-collapsed': isCollapsed,
          'is-shifted': isShifted
        }),
        title: label,
        style: ["--iso-editor-collab-caret-color: ".concat(color || '#2e3d48', ";"), "--iso-editor-collab-caret-label-text-color: ".concat((0, _colorUtils.shouldUseWhiteText)(color) ? '#fff' : '#1e1e1e', ";")].join(' ')
      }
    }, start, end);
  });
  return record;
}
var getCarets = (0, _memize["default"])(function (peers, richTextIdentifier, blockClientId) {
  return Object.entries(peers).filter(function (_ref) {
    var _peer$start, _peer$end;
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      peer = _ref2[1];
    return (peer === null || peer === void 0 ? void 0 : (_peer$start = peer.start) === null || _peer$start === void 0 ? void 0 : _peer$start.clientId) === blockClientId && (peer === null || peer === void 0 ? void 0 : (_peer$end = peer.end) === null || _peer$end === void 0 ? void 0 : _peer$end.clientId) === blockClientId && peer.start.attributeKey === richTextIdentifier;
  }).map(function (_ref3) {
    var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
      id = _ref4[0],
      peer = _ref4[1];
    return {
      id: id,
      label: peer.name,
      start: peer.start.offset,
      end: peer.end.offset,
      color: peer.color
    };
  });
});

/**
 * @param {string} multilineTag
 * @param {string} attributeValue
 * @return {MultilineData}
 */
var getMultilineData = function getMultilineData(multilineTag, attributeValue) {
  var _create, _create$text, _create$text$split;
  var multilineItems = multilineTag ? (_create = (0, _richText.create)({
    html: attributeValue,
    multilineTag: multilineTag
  })) === null || _create === void 0 ? void 0 : (_create$text = _create.text) === null || _create$text === void 0 ? void 0 : (_create$text$split = _create$text.split) === null || _create$text$split === void 0 ? void 0 : _create$text$split.call(_create$text, _richText.__UNSTABLE_LINE_SEPARATOR) : [];
  return {
    isMultiline: !!multilineTag,
    checkOffset: function checkOffset(offset) {
      var count = 0;
      var _iterator = _createForOfIteratorHelper(multilineItems),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var itemText = _step.value;
          count += itemText.length;
          if (offset === count) {
            return {
              isAtMultilineItemEnd: true,
              multilineItemText: itemText
            };
          }
          count += 1; // line separator character
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return {
        isAtMultilineItemEnd: false
      };
    }
  };
};
var getStableBlockAttributeSelector = (0, _memize["default"])(function (getBlockAttributes, blockClientId, attributeKey) {
  return function () {
    return getBlockAttributes(blockClientId)[attributeKey];
  };
});
var settings = {
  title: 'Collaboration peer caret',
  tagName: 'mark',
  className: 'iso-editor-collab-caret',
  attributes: {
    id: 'id',
    className: 'class'
  },
  edit: function edit() {
    return null;
  },
  __experimentalGetPropsForEditableTreePreparation: function __experimentalGetPropsForEditableTreePreparation(select, _ref5) {
    var _MULTILINE_ATTRIBUTES, _MULTILINE_ATTRIBUTES2;
    var richTextIdentifier = _ref5.richTextIdentifier,
      blockClientId = _ref5.blockClientId;
    // Adds special handling for certain block attributes that are known to be multiline,
    // e.g. the `values` attribute of the List block.
    var MULTILINE_ATTRIBUTES = {
      'core/list': {
        values: {
          multilineTag: 'li'
        }
      }
    };
    var blockName = select('core/block-editor').getBlockName(blockClientId);
    var multilineTag = (_MULTILINE_ATTRIBUTES = MULTILINE_ATTRIBUTES[blockName]) === null || _MULTILINE_ATTRIBUTES === void 0 ? void 0 : (_MULTILINE_ATTRIBUTES2 = _MULTILINE_ATTRIBUTES[richTextIdentifier]) === null || _MULTILINE_ATTRIBUTES2 === void 0 ? void 0 : _MULTILINE_ATTRIBUTES2.multilineTag;

    // The properties in this return object need to be as stable as possible.
    // See https://github.com/WordPress/gutenberg/issues/23428
    return {
      carets: getCarets(select('isolated/editor').getCollabPeers(), richTextIdentifier, blockClientId),
      multilineTag: multilineTag,
      blockAttributeSelector: getStableBlockAttributeSelector(select('core/block-editor').getBlockAttributes, blockClientId, richTextIdentifier)
    };
  },
  __experimentalCreatePrepareEditableTree: function __experimentalCreatePrepareEditableTree(_ref6) {
    var carets = _ref6.carets,
      multilineTag = _ref6.multilineTag,
      blockAttributeSelector = _ref6.blockAttributeSelector;
    return function (formats, text) {
      if (!(carets !== null && carets !== void 0 && carets.length)) {
        return formats;
      }
      var multiline = getMultilineData(multilineTag, blockAttributeSelector());
      var record = applyCarets({
        formats: formats,
        text: text
      }, multiline, carets);
      return record.formats;
    };
  }
};
exports.settings = settings;
var registerFormatCollabCaret = function registerFormatCollabCaret() {
  (0, _richText.registerFormatType)(FORMAT_NAME, settings);
};
exports.registerFormatCollabCaret = registerFormatCollabCaret;
//# sourceMappingURL=index.js.map