import _extends from "@babel/runtime/helpers/extends";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { useSelect } from '@wordpress/data';
import './style.scss';
/**
 * Adds peer selected className to the block-list-block component.
 *
 * @param {Object} OriginalComponent The original BlockListBlock component.
 * @return {Object} The enhanced component.
 */

const addSelectionBorders = OriginalComponent => {
  return props => {
    const isSelected = useSelect(select => {
      const peers = select('isolated/editor').getPeers();
      return Object.values(peers).some(peer => {
        var _peer$start, _peer$end;

        return ((_peer$start = peer.start) === null || _peer$start === void 0 ? void 0 : _peer$start.clientId) === props.clientId && ((_peer$end = peer.end) === null || _peer$end === void 0 ? void 0 : _peer$end.clientId) === props.clientId;
      });
    }, [props.clientId]);
    return createElement(OriginalComponent, _extends({}, props, {
      className: isSelected ? 'is-iso-editor-collab-peer-selected' : undefined
    }));
  };
};

export const addFilterCollabBlockSelection = () => {
  addFilter('editor.BlockListBlock', 'isolated-block-editor', addSelectionBorders);
};
//# sourceMappingURL=index.js.map