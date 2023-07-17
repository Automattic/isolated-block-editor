/**
 * External dependencies
 */
import memoize from 'memize';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { applyFormat, create, registerFormatType, __UNSTABLE_LINE_SEPARATOR } from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import { shouldUseWhiteText } from './color-utils';
import './style.scss';

/**
 * @typedef MultilineData
 * @property {boolean} isMultiline - Whether this is a multiline attribute.
 * @property {(offset: number) => {isAtMultilineItemEnd: boolean, multilineItemText?: string}} checkOffset - Determine whether a given caret index is at the end of a multiline segment.
 */

export const FORMAT_NAME = 'isolated/collab-caret';

/**
 * Applies given carets to the given record.
 *
 * @param {Object} record The record to apply carets to.
 * @param {MultilineData} multiline
 * @param {Array} carets The carets to apply.
 * @return {Object} A record with the carets applied.
 */
export function applyCarets(record, multiline, carets = []) {
  carets.forEach(caret => {
    var _lastGrapheme$length;
    let {
      start,
      end,
      id,
      color,
      label
    } = caret;
    const isCollapsed = start === end;
    const {
      isAtMultilineItemEnd,
      multilineItemText
    } = multiline.checkOffset(end);
    const isShifted = isCollapsed && (multiline.isMultiline ? isAtMultilineItemEnd : end >= record.text.length);
    const text = isAtMultilineItemEnd ? multilineItemText : record.text;

    // Try to accurately get the `length` of the last character (i.e. grapheme) in case
    // the last character is an emoji, where "<emoji>".length can be more than 1.
    // For example, "👩‍👩‍👧‍👦".length === 11. (Intl.Segementer is still unsupported in Firefox)
    // @ts-ignore Intl.Segmenter is not in spec yet
    const lastGrapheme = Intl.Segmenter ?
    // @ts-ignore Intl.Segmenter is not in spec yet
    [...new Intl.Segmenter().segment(text)].pop()?.segment : undefined;
    const offset = (_lastGrapheme$length = lastGrapheme?.length) !== null && _lastGrapheme$length !== void 0 ? _lastGrapheme$length : 1; // fall back to 1 if we can't accurately segment the last grapheme

    if (isShifted) {
      start = end - offset;
    }
    if (isCollapsed) {
      end = start + offset;
    }
    record = applyFormat(record, {
      type: FORMAT_NAME,
      // @ts-ignore
      attributes: {
        id: 'iso-editor-collab-caret-' + id,
        class: classnames({
          'is-collapsed': isCollapsed,
          'is-shifted': isShifted
        }),
        title: label,
        style: [`--iso-editor-collab-caret-color: ${color || '#2e3d48'};`, `--iso-editor-collab-caret-label-text-color: ${shouldUseWhiteText(color) ? '#fff' : '#1e1e1e'};`].join(' ')
      }
    }, start, end);
  });
  return record;
}
const getCarets = memoize((peers, richTextIdentifier, blockClientId) => {
  return Object.entries(peers).filter(([, peer]) => {
    return peer?.start?.clientId === blockClientId && peer?.end?.clientId === blockClientId && peer.start.attributeKey === richTextIdentifier;
  }).map(([id, peer]) => ({
    id,
    label: peer.name,
    start: peer.start.offset,
    end: peer.end.offset,
    color: peer.color
  }));
});

/**
 * @param {string} multilineTag
 * @param {string} attributeValue
 * @return {MultilineData}
 */
const getMultilineData = (multilineTag, attributeValue) => {
  const multilineItems = multilineTag ? create({
    html: attributeValue,
    multilineTag
  })?.text?.split?.(__UNSTABLE_LINE_SEPARATOR) : [];
  return {
    isMultiline: !!multilineTag,
    checkOffset: offset => {
      let count = 0;
      for (const itemText of multilineItems) {
        count += itemText.length;
        if (offset === count) {
          return {
            isAtMultilineItemEnd: true,
            multilineItemText: itemText
          };
        }
        count += 1; // line separator character
      }

      return {
        isAtMultilineItemEnd: false
      };
    }
  };
};
const getStableBlockAttributeSelector = memoize((getBlockAttributes, blockClientId, attributeKey) => () => getBlockAttributes(blockClientId)[attributeKey]);
export const settings = {
  title: 'Collaboration peer caret',
  tagName: 'mark',
  className: 'iso-editor-collab-caret',
  attributes: {
    id: 'id',
    className: 'class'
  },
  edit() {
    return null;
  },
  __experimentalGetPropsForEditableTreePreparation(select, {
    richTextIdentifier,
    blockClientId
  }) {
    // Adds special handling for certain block attributes that are known to be multiline,
    // e.g. the `values` attribute of the List block.
    const MULTILINE_ATTRIBUTES = {
      'core/list': {
        values: {
          multilineTag: 'li'
        }
      }
    };
    const blockName = select('core/block-editor').getBlockName(blockClientId);
    const multilineTag = MULTILINE_ATTRIBUTES[blockName]?.[richTextIdentifier]?.multilineTag;

    // The properties in this return object need to be as stable as possible.
    // See https://github.com/WordPress/gutenberg/issues/23428
    return {
      carets: getCarets(select('isolated/editor').getCollabPeers(), richTextIdentifier, blockClientId),
      multilineTag,
      blockAttributeSelector: getStableBlockAttributeSelector(select('core/block-editor').getBlockAttributes, blockClientId, richTextIdentifier)
    };
  },
  __experimentalCreatePrepareEditableTree({
    carets,
    multilineTag,
    blockAttributeSelector
  }) {
    return (formats, text) => {
      if (!carets?.length) {
        return formats;
      }
      const multiline = getMultilineData(multilineTag, blockAttributeSelector());
      const record = applyCarets({
        formats,
        text
      }, multiline, carets);
      return record.formats;
    };
  }
};
export const registerFormatCollabCaret = () => {
  // @ts-ignore
  registerFormatType(FORMAT_NAME, settings);
};
//# sourceMappingURL=index.js.map