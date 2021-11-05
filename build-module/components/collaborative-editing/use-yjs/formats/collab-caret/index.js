/**
 * External dependencies
 */
import memoize from 'memize';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { applyFormat, registerFormatType } from '@wordpress/rich-text';
/**
 * Internal dependencies
 */

import { shouldUseWhiteText } from './color-utils';
import './style.scss';
export const FORMAT_NAME = 'isolated/collab-caret';
/**
 * Applies given carets to the given record.
 *
 * @param {Object} record The record to apply carets to.
 * @param {Array} carets The carets to apply.
 * @return {Object} A record with the carets applied.
 */

export function applyCarets(record) {
  let carets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  carets.forEach(caret => {
    let {
      start,
      end,
      id,
      color,
      label
    } = caret;
    const isCollapsed = start === end;
    const isShifted = isCollapsed && end >= record.text.length;

    if (isShifted) {
      start = record.text.length - 1;
    }

    if (isCollapsed) {
      end = start + 1;
    }

    record = applyFormat(record, {
      type: FORMAT_NAME,
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
  return Object.entries(peers).filter(_ref => {
    var _peer$start, _peer$end;

    let [, peer] = _ref;
    return (peer === null || peer === void 0 ? void 0 : (_peer$start = peer.start) === null || _peer$start === void 0 ? void 0 : _peer$start.clientId) === blockClientId && (peer === null || peer === void 0 ? void 0 : (_peer$end = peer.end) === null || _peer$end === void 0 ? void 0 : _peer$end.clientId) === blockClientId && peer.start.attributeKey === richTextIdentifier;
  }).map(_ref2 => {
    let [id, peer] = _ref2;
    return {
      id,
      label: peer.name,
      start: peer.start.offset,
      end: peer.end.offset,
      color: peer.color
    };
  });
});
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

  __experimentalGetPropsForEditableTreePreparation(select, _ref3) {
    let {
      richTextIdentifier,
      blockClientId
    } = _ref3;
    return {
      carets: getCarets(select('isolated/editor').getPeers(), richTextIdentifier, blockClientId)
    };
  },

  __experimentalCreatePrepareEditableTree(_ref4) {
    let {
      carets
    } = _ref4;
    return (formats, text) => {
      if (!(carets !== null && carets !== void 0 && carets.length)) {
        return formats;
      }

      let record = {
        formats,
        text
      };
      record = applyCarets(record, carets);
      return record.formats;
    };
  }

};
export const registerFormatCollabCaret = () => {
  registerFormatType(FORMAT_NAME, settings);
};
//# sourceMappingURL=index.js.map