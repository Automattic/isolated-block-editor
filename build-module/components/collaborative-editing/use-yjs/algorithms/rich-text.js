/**
 * External dependencies
 */
import * as diff from 'lib0/diff';
import { isEqual } from 'lodash';

/** @typedef {import("yjs").XmlText} Y.XmlText */

/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';
import { create, toHTMLString, __UNSTABLE_LINE_SEPARATOR } from '@wordpress/rich-text';
const OBJECT_REPLACEMENT_CHARACTER = '\ufffc'; // defined in @wordpress/rich-text special-characters

/**
 * Convert an array of Gutenberg RichText formats to an array of range-based Y.Text formats.
 *
 * @param {Object[]} formats
 * @return {Object[]} Y.Text formats
 */
export function gutenFormatsToYFormats(formats) {
  const findIndexOfEqualFormat = function (needle) {
    let haystack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return haystack.findIndex(f => needle === f);
  };
  const visited = Array(formats.length).fill(null).map(() => ({}));
  const yFormats = [];
  formats.forEach((formatsForChar, charIdx) => {
    formatsForChar.forEach((f, fIdx) => {
      if (visited[charIdx][fIdx]) return;
      let fLength = 1;
      for (let ci = charIdx + 1; ci < formats.length; ci++) {
        const foundIndex = findIndexOfEqualFormat(f, formats[ci]);
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
export function namedGutenFormatToStandardTags(format) {
  // @ts-ignore
  const formatTypeRecord = select('core/rich-text').getFormatType(format.type);
  if (!formatTypeRecord) return {
    [format.type]: true
  };
  const {
    tagName,
    attributes = {}
  } = formatTypeRecord;
  if (!format.attributes) return {
    [tagName]: true
  };
  const remappedEntries = Object.entries(format.attributes).map(_ref => {
    let [key, value] = _ref;
    return [attributes[key], value];
  });
  return {
    [tagName]: Object.fromEntries(remappedEntries)
  };
}

// TODO: Unsolved problem
// This is an imperfect inferral, so ideally we want to get this information
// from Gutenberg's internal representation of the RichText.
function getInferredMultilineTag(html) {
  const trimmedHtml = html.trim();
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
  const partitionReplacementTypes = arr => {
    const multilineWrapperReplacements = {};
    const normalReplacements = [];
    arr.forEach((r, index) => {
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
      multilineWrapperReplacements,
      normalReplacements
    };
  };
  const {
    normalReplacements: na
  } = partitionReplacementTypes(a);
  const {
    multilineWrapperReplacements,
    normalReplacements: nb
  } = partitionReplacementTypes(b);
  return {
    multilineWrapperReplacements,
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
export function applyHTMLDelta(htmlA, htmlB, richTextMap) {
  var _richTextMap$doc;
  let richTextOpts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const [multilineTagA, multilineTagB] = [htmlA, htmlB].map(getInferredMultilineTag);
  const inferredMultilineTag = multilineTagA || multilineTagB;
  const inferredMultilineWrapperTags = inferredMultilineTag === 'li' ? ['ul', 'ol'] : [];
  const mergedRichTextOpts = {
    ...(inferredMultilineTag ? {
      multilineTag: inferredMultilineTag
    } : {}),
    multilineWrapperTags: inferredMultilineWrapperTags,
    ...richTextOpts
  };
  richTextMap.set('multilineTag', inferredMultilineTag);
  const a = create({
    ...mergedRichTextOpts,
    html: htmlA
  });
  const b = create({
    ...mergedRichTextOpts,
    html: htmlB
  });
  const stringDiff = diff.simpleDiffString(a.text, b.text);

  // By default, a Yjs string insertion will inherit the formats of the previous character.
  // We need to prevent this by inserting with an explicit format object nullifying the previous formats.
  const previousCharFormats = b.formats[stringDiff.index - 1];
  const nullifierFormat = previousCharFormats === null || previousCharFormats === void 0 ? void 0 : previousCharFormats.reduce((acc, _ref2) => {
    let {
      type
    } = _ref2;
    return {
      ...acc,
      [type]: null
    };
  }, {});
  const {
    multilineWrapperReplacements,
    replacementsDiff
  } = prepareReplacementsForTransaction(a.replacements, b.replacements);
  (_richTextMap$doc = richTextMap.doc) === null || _richTextMap$doc === void 0 ? void 0 : _richTextMap$doc.transact(() => {
    richTextMap.get('xmlText').delete(stringDiff.index, stringDiff.remove);
    richTextMap.get('xmlText').insert(stringDiff.index, stringDiff.insert, nullifierFormat);
    const yfa = gutenFormatsToYFormats(a.formats);
    const yfb = gutenFormatsToYFormats(b.formats);
    const formatsDiff = diff.simpleDiffArray(yfa, yfb, isEqual);
    if (formatsDiff.remove) {
      yfa.slice(formatsDiff.index, formatsDiff.index + formatsDiff.remove).forEach(f => {
        const tagName = Object.keys(f.format)[0];
        richTextMap.get('xmlText').format(f.index, f.length, {
          [tagName]: null
        });
      });
    }
    if (formatsDiff.insert) {
      formatsDiff.insert.forEach(f => richTextMap.get('xmlText').format(f.index, f.length, f.format));
    }
    richTextMap.get('replacements').delete(replacementsDiff.index, replacementsDiff.remove);
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
export function richTextMapToHTML(richTextMap) {
  let text = richTextMap.get('xmlText').toString();

  // Process multiline tags
  const multilineTag = richTextMap.get('multilineTag');
  text = multilineTag ? stringAsMultiline(text, multilineTag, richTextMap.get('multilineWrapperReplacements')) : text;

  // Process replacements (e.g. inline images)
  richTextMap.get('replacements').forEach(replacement => {
    const replacementHTML = toHTMLString({
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
  const replacementsHTML = [];
  let currentMultilineWrappers = [];
  let foundLineSeparatorIndex = -1;
  do {
    var _replacements$foundLi;
    foundLineSeparatorIndex = str.indexOf(__UNSTABLE_LINE_SEPARATOR, foundLineSeparatorIndex + 1);
    const multilineWrappers = (_replacements$foundLi = replacements[foundLineSeparatorIndex]) !== null && _replacements$foundLi !== void 0 ? _replacements$foundLi : [];
    const d = diff.simpleDiffArray(currentMultilineWrappers, multilineWrappers, isEqual);
    let html = '';

    // Closing multiline wrapper tags
    currentMultilineWrappers.slice(d.index, d.index + d.remove).reverse().forEach(multilineWrapper => {
      html += `</${multilineWrapper.type}></li>`;
    });

    // Opening multiline wrapper tags
    d.insert.forEach(multilineWrapper => {
      html += `<${multilineWrapper.type}>`;
    });
    replacementsHTML.push({
      isOpeningTag: !!d.insert.length,
      html
    });
    currentMultilineWrappers = multilineWrappers;
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
  const wrapperTagReplacements = getMultilineWrapperTagHTMLReplacements(str, replacements);
  return str.split(__UNSTABLE_LINE_SEPARATOR).map((line, i) => {
    const {
      isOpeningTag,
      html
    } = wrapperTagReplacements[i];
    return isOpeningTag ? `<${multilineTag}>${line}${html}` : `<${multilineTag}>${line}</${multilineTag}>${html}`;
  }).join('');
}
//# sourceMappingURL=rich-text.js.map