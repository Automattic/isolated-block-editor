"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyHTMLDelta = applyHTMLDelta;
exports.gutenFormatsToYFormats = gutenFormatsToYFormats;
exports.namedGutenFormatToStandardTags = namedGutenFormatToStandardTags;
exports.richTextMapToHTML = richTextMapToHTML;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var diff = _interopRequireWildcard(require("lib0/diff"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _richText = require("@wordpress/rich-text");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var OBJECT_REPLACEMENT_CHARACTER = "\uFFFC"; // defined in @wordpress/rich-text special-characters

/**
 * Convert an array of Gutenberg RichText formats to an array of range-based Y.Text formats.
 *
 * @param {Object[]} formats
 * @returns {Object[]} Y.Text formats
 */

function gutenFormatsToYFormats(formats) {
  var findIndexOfEqualFormat = function findIndexOfEqualFormat(needle) {
    var haystack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return haystack.findIndex(function (f) {
      return needle === f;
    });
  };

  var visited = Array(formats.length).fill(null).map(function () {
    return {};
  });
  var yFormats = [];
  formats.forEach(function (formatsForChar, charIdx) {
    formatsForChar.forEach(function (f, fIdx) {
      if (visited[charIdx][fIdx]) return;
      var fLength = 1;

      for (var ci = charIdx + 1; ci < formats.length; ci++) {
        var foundIndex = findIndexOfEqualFormat(f, formats[ci]);
        if (foundIndex === -1) break;
        visited[ci][foundIndex] = true;
        fLength++;
      }

      yFormats.push({
        format: namedGutenFormatToStandardTags(f),
        index: charIdx,
        length: fLength
      });
    });
  });
  return yFormats;
}
/**
 * Converts registered formats back to their standard tag/attribute names.
 *
 * For example, `core/bold` will be converted back to `strong`.
 */


function namedGutenFormatToStandardTags(format) {
  var _select$getFormatType = (0, _data.select)('core/rich-text').getFormatType(format.type),
      tagName = _select$getFormatType.tagName,
      _select$getFormatType2 = _select$getFormatType.attributes,
      attributes = _select$getFormatType2 === void 0 ? {} : _select$getFormatType2;

  if (!format.attributes) return (0, _defineProperty2["default"])({}, tagName, true);
  var remappedEntries = Object.entries(format.attributes).map(function (_ref2) {
    var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

    return [attributes[key], value];
  });
  return (0, _defineProperty2["default"])({}, tagName, Object.fromEntries(remappedEntries));
} // TODO: Unsolved problem
// This is an imperfect inferral, so ideally we want to get this information
// from Gutenberg's internal representation of the RichText.


function getInferredMultilineTag(html) {
  var trimmedHtml = html.trim();
  if (/^<li>/.test(trimmedHtml)) return 'li';
  if (/^<p>/.test(trimmedHtml)) return 'p';
  return undefined;
}
/**
 * Apply the delta between two HTML strings to a Y.XmlText.
 *
 * @param {string} htmlA
 * @param {string} htmlB
 * @param {import("yjs").Map} richTextMap
 * @param {Object} [richTextOpts] Optional options object to pass @wordpress/rich-text create().
 */


function applyHTMLDelta(htmlA, htmlB, richTextMap) {
  var _richTextMap$doc;

  var richTextOpts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var _map = [htmlA, htmlB].map(getInferredMultilineTag),
      _map2 = (0, _slicedToArray2["default"])(_map, 2),
      multilineTagA = _map2[0],
      multilineTagB = _map2[1];

  var inferredMultilineTag = multilineTagA || multilineTagB;

  var mergedRichTextOpts = _objectSpread(_objectSpread({}, inferredMultilineTag ? {
    multilineTag: inferredMultilineTag
  } : {}), richTextOpts);

  richTextMap.set('multilineTag', inferredMultilineTag);
  var a = (0, _richText.create)(_objectSpread(_objectSpread({}, mergedRichTextOpts), {}, {
    html: htmlA
  }));
  var b = (0, _richText.create)(_objectSpread(_objectSpread({}, mergedRichTextOpts), {}, {
    html: htmlB
  }));
  var stringDiff = diff.simpleDiffString(a.text, b.text); // By default, a Yjs string insertion will inherit the formats of the previous character.
  // We need to prevent this by inserting with an explicit format object nullifying the previous formats.

  var previousCharFormats = b.formats[stringDiff.index - 1];
  var nullifierFormat = previousCharFormats === null || previousCharFormats === void 0 ? void 0 : previousCharFormats.reduce(function (acc, _ref5) {
    var type = _ref5.type;
    return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, type, null));
  }, {}); // Yjs can't do insertion operations on sparse arrays. Since replacements do not rely on
  // an index-based mapping with the full text, let's condense the arrays here.

  var toDenseArray = function toDenseArray(arr) {
    return arr.filter(function (x) {
      return x;
    });
  };

  var replacementsDiff = diff.simpleDiffArray(toDenseArray(a.replacements), toDenseArray(b.replacements));
  (_richTextMap$doc = richTextMap.doc) === null || _richTextMap$doc === void 0 ? void 0 : _richTextMap$doc.transact(function () {
    richTextMap.get('xmlText')["delete"](stringDiff.index, stringDiff.remove);
    richTextMap.get('xmlText').insert(stringDiff.index, stringDiff.insert, nullifierFormat);
    var yfa = gutenFormatsToYFormats(a.formats);
    var yfb = gutenFormatsToYFormats(b.formats);
    var formatsDiff = diff.simpleDiffArray(yfa, yfb, _lodash.isEqual);

    if (formatsDiff.remove) {
      yfa.slice(formatsDiff.index, formatsDiff.index + formatsDiff.remove).forEach(function (f) {
        var tagName = Object.keys(f.format)[0];
        richTextMap.get('xmlText').format(f.index, f.length, (0, _defineProperty2["default"])({}, tagName, null));
      });
    }

    if (formatsDiff.insert) {
      formatsDiff.insert.forEach(function (f) {
        return richTextMap.get('xmlText').format(f.index, f.length, f.format);
      });
    }

    richTextMap.get('replacements')["delete"](replacementsDiff.index, replacementsDiff.remove);
    richTextMap.get('replacements').insert(replacementsDiff.index, replacementsDiff.insert);
  });
}
/**
 * Convert the RichText back from our Yjs representation to an HTML string.
 *
 * @param {import("yjs").Map} richTextMap
 * @returns {string}
 */


function richTextMapToHTML(richTextMap) {
  var text = richTextMap.get('xmlText').toString();
  richTextMap.get('replacements').forEach(function (replacement) {
    var replacementHTML = (0, _richText.toHTMLString)({
      value: {
        replacements: [replacement],
        formats: Array(1),
        text: OBJECT_REPLACEMENT_CHARACTER
      }
    });
    text = text.replace(OBJECT_REPLACEMENT_CHARACTER, replacementHTML);
  });
  var multilineTag = richTextMap.get('multilineTag');
  return multilineTag ? stringAsMultiline(text, multilineTag) : text;
}
/**
 * Wraps each line of a multiline string with the given tags.
 *
 * @param {string} str A multiline string delimited by __UNSTABLE_LINE_SEPARATOR.
 * @param {string} multilineTag The tag name to wrap each line with.
 * @returns
 */


function stringAsMultiline(str, multilineTag) {
  return str.split(_richText.__UNSTABLE_LINE_SEPARATOR).map(function (str) {
    return "<".concat(multilineTag, ">").concat(str, "</").concat(multilineTag, ">");
  }).join('');
}
//# sourceMappingURL=rich-text.js.map