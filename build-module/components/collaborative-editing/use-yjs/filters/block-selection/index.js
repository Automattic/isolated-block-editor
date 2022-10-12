import _extends from "@babel/runtime/helpers/extends";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { useSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import './style.scss';
/**
 * Adds peer selected className to the block-list-block component.
 *
 * @param {Object} OriginalComponent The original BlockListBlock component.
 * @return {Object} The enhanced component.
 */

const addSelectionBorders = OriginalComponent => {
  return props => {
    const {
      isSelected,
      color
    } = useSelect(select => {
      // @ts-ignore
      const peers = select('isolated/editor').getCollabPeers();
      const matchedPeer = Object.values(peers).find(peer => {
        var _peer$start, _peer$end;

        return ((_peer$start = peer.start) === null || _peer$start === void 0 ? void 0 : _peer$start.clientId) === props.clientId && ((_peer$end = peer.end) === null || _peer$end === void 0 ? void 0 : _peer$end.clientId) === props.clientId;
      });
      return {
        isSelected: !!matchedPeer,
        color: matchedPeer === null || matchedPeer === void 0 ? void 0 : matchedPeer.color
      };
    }, [props.clientId]);
    return createElement(OriginalComponent, _extends({}, props, {
      className: isSelected ? 'is-iso-editor-collab-peer-selected' : undefined,
      wrapperProps: {
        style: {
          '--iso-editor-collab-peer-block-color': color
        }
      }
    }));
  };
};

export const addFilterCollabBlockSelection = () => {
  addFilter('editor.BlockListBlock', 'isolated-block-editor', addSelectionBorders, 9);
};
//# sourceMappingURL=index.js.map