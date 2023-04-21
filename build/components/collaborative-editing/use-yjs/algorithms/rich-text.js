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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * External dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             */ /** @typedef {import("yjs").XmlText} Y.XmlText */ /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */
var OBJECT_REPLACEMENT_CHARACTER = "\uFFFC"; // defined in @wordpress/rich-text special-characters

/**
 * Convert an array of Gutenberg RichText formats to an array of range-based Y.Text formats.
 *
 * @param {Object[]} formats
 * @return {Object[]} Y.Text formats
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
 *
 * @param format
 */
function namedGutenFormatToStandardTags(format) {
  // @ts-ignore
  var formatTypeRecord = (0, _data.select)('core/rich-text').getFormatType(format.type);
  if (!formatTypeRecord) return (0, _defineProperty2["default"])({}, format.type, true);
  var tagName = formatTypeRecord.tagName,
    _formatTypeRecord$att = formatTypeRecord.attributes,
    attributes = _formatTypeRecord$att === void 0 ? {} : _formatTypeRecord$att;
  if (!format.attributes) return (0, _defineProperty2["default"])({}, tagName, true);
  var remappedEntries = Object.entries(format.attributes).map(function (_ref3) {
    var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
      key = _ref4[0],
      value = _ref4[1];
    return [attributes[key], value];
  });
  return (0, _defineProperty2["default"])({}, tagName, Object.fromEntries(remappedEntries));
}

// TODO: Unsolved problem
// This is an imperfect inferral, so ideally we want to get this information
// from Gutenberg's internal representation of the RichText.
function getInferredMultilineTag(html) {
  var trimmedHtml = html.trim();
  if (/^<li>/.test(trimmedHtml)) return 'li';
  if (/^<p>/.test(trimmedHtml)) return 'p';
  return undefined;
}

/**
 * Massage the Gutenberg replacements into Yjs-friendly structures.
 *
 * @param {Array} a The `replacements` array of a Gutenberg RichText.
 * @param {Array} b The `replacements` array of another Gutenberg RichText.
 */
function prepareReplacementsForTransaction(a, b) {
  var partitionReplacementTypes = function partitionReplacementTypes(arr) {
    var multilineWrapperReplacements = {};
    var normalReplacements = [];
    arr.forEach(function (r, index) {
      if (Array.isArray(r)) {
        // If it's an array, it's a multiline wrapper tag (e.g. ul/ol) and not a normal replacement.
        multilineWrapperReplacements[index] = r;
      } else if (r) {
        // Since normal replacements do not rely on an index-based mapping
        // with the full text, let's condense the sparse array.
        normalReplacements.push(r);
      }
    });
    return {
      multilineWrapperReplacements: multilineWrapperReplacements,
      normalReplacements: normalReplacements
    };
  };
  var _partitionReplacement = partitionReplacementTypes(a),
    na = _partitionReplacement.normalReplacements;
  var _partitionReplacement2 = partitionReplacementTypes(b),
    multilineWrapperReplacements = _partitionReplacement2.multilineWrapperReplacements,
    nb = _partitionReplacement2.normalReplacements;
  return {
    multilineWrapperReplacements: multilineWrapperReplacements,
    replacementsDiff: diff.simpleDiffArray(na, nb)
  };
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
  var inferredMultilineWrapperTags = inferredMultilineTag === 'li' ? ['ul', 'ol'] : [];
  var mergedRichTextOpts = _objectSpread(_objectSpread({}, inferredMultilineTag ? {
    multilineTag: inferredMultilineTag
  } : {}), {}, {
    multilineWrapperTags: inferredMultilineWrapperTags
  }, richTextOpts);
  richTextMap.set('multilineTag', inferredMultilineTag);
  var a = (0, _richText.create)(_objectSpread(_objectSpread({}, mergedRichTextOpts), {}, {
    html: htmlA
  }));
  var b = (0, _richText.create)(_objectSpread(_objectSpread({}, mergedRichTextOpts), {}, {
    html: htmlB
  }));
  var stringDiff = diff.simpleDiffString(a.text, b.text);

  // By default, a Yjs string insertion will inherit the formats of the previous character.
  // We need to prevent this by inserting with an explicit format object nullifying the previous formats.
  var previousCharFormats = b.formats[stringDiff.index - 1];
  var nullifierFormat = previousCharFormats === null || previousCharFormats === void 0 ? void 0 : previousCharFormats.reduce(function (acc, _ref6) {
    var type = _ref6.type;
    return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, type, null));
  }, {});
  var _prepareReplacementsF = prepareReplacementsForTransaction(a.replacements, b.replacements),
    multilineWrapperReplacements = _prepareReplacementsF.multilineWrapperReplacements,
    replacementsDiff = _prepareReplacementsF.replacementsDiff;
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
    richTextMap.set('multilineWrapperReplacements', multilineWrapperReplacements);
  });
}

/**
 * Convert the RichText back from our Yjs representation to an HTML string.
 *
 * @param {import("yjs").Map} richTextMap
 * @return {string}
 */
function richTextMapToHTML(richTextMap) {
  var text = richTextMap.get('xmlText').toString();

  // Process multiline tags
  var multilineTag = richTextMap.get('multilineTag');
  text = multilineTag ? stringAsMultiline(text, multilineTag, richTextMap.get('multilineWrapperReplacements')) : text;

  // Process replacements (e.g. inline images)
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
  return text;
}

/**
 * Get HTML replacements for each multiline wrapper tag replacement.
 *
 * @param {string} str
 * @param {Record<number, {type: string}[]>} replacements
 */
function getMultilineWrapperTagHTMLReplacements(str, replacements) {
  var replacementsHTML = [];
  var currentMultilineWrappers = [];
  var foundLineSeparatorIndex = -1;
  var _loop = function _loop() {
    var _replacements$foundLi;
    foundLineSeparatorIndex = str.indexOf(_richText.__UNSTABLE_LINE_SEPARATOR, foundLineSeparatorIndex + 1);
    var multilineWrappers = (_replacements$foundLi = replacements[foundLineSeparatorIndex]) !== null && _replacements$foundLi !== void 0 ? _replacements$foundLi : [];
    var d = diff.simpleDiffArray(currentMultilineWrappers, multilineWrappers, _lodash.isEqual);
    var html = '';

    // Closing multiline wrapper tags
    currentMultilineWrappers.slice(d.index, d.index + d.remove).reverse().forEach(function (multilineWrapper) {
      html += "</".concat(multilineWrapper.type, "></li>");
    });

    // Opening multiline wrapper tags
    d.insert.forEach(function (multilineWrapper) {
      html += "<".concat(multilineWrapper.type, ">");
    });
    replacementsHTML.push({
      isOpeningTag: !!d.insert.length,
      html: html
    });
    currentMultilineWrappers = multilineWrappers;
  };
  do {
    _loop();
  } while (foundLineSeparatorIndex !== -1);
  return replacementsHTML;
}

/**
 * Wraps each line of a multiline string with the given tags.
 *
 * @param {string} str A multiline string delimited by __UNSTABLE_LINE_SEPARATOR.
 * @param {string} multilineTag The tag name to wrap each line with.
 * @param {Record<number, {type: string}[]>} replacements Multiline wrapper replacements.
 * @return {string} The string reconstructed with multiline considerations.
 */
function stringAsMultiline(str, multilineTag, replacements) {
  var wrapperTagReplacements = getMultilineWrapperTagHTMLReplacements(str, replacements);
  return str.split(_richText.__UNSTABLE_LINE_SEPARATOR).map(function (line, i) {
    var _wrapperTagReplacemen = wrapperTagReplacements[i],
      isOpeningTag = _wrapperTagReplacemen.isOpeningTag,
      html = _wrapperTagReplacemen.html;
    return isOpeningTag ? "<".concat(multilineTag, ">").concat(line).concat(html) : "<".concat(multilineTag, ">").concat(line, "</").concat(multilineTag, ">").concat(html);
  }).join('');
}
//# sourceMappingURL=rich-text.js.map