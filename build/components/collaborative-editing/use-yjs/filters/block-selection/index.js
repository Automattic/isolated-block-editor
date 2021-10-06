"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFilterCollabBlockSelection = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _hooks = require("@wordpress/hooks");

var _data = require("@wordpress/data");

require("./style.scss");

import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Adds peer selected className to the block-list-block component.
 *
 * @param {Object} OriginalComponent The original BlockListBlock component.
 * @return {Object} The enhanced component.
 */
var addSelectionBorders = function addSelectionBorders(OriginalComponent) {
  return function (props) {
    var _useSelect = (0, _data.useSelect)(function (select) {
      var peers = select('isolated/editor').getPeers();
      var matchedPeer = Object.values(peers).find(function (peer) {
        var _peer$start, _peer$end;

        return ((_peer$start = peer.start) === null || _peer$start === void 0 ? void 0 : _peer$start.clientId) === props.clientId && ((_peer$end = peer.end) === null || _peer$end === void 0 ? void 0 : _peer$end.clientId) === props.clientId;
      });
      return {
        isSelected: !!matchedPeer,
        color: matchedPeer === null || matchedPeer === void 0 ? void 0 : matchedPeer.color
      };
    }, [props.clientId]),
        isSelected = _useSelect.isSelected,
        color = _useSelect.color;

    return createElement(OriginalComponent, (0, _extends2["default"])({}, props, {
      className: isSelected ? 'is-iso-editor-collab-peer-selected' : undefined,
      wrapperProps: {
        style: {
          '--iso-editor-collab-peer-block-color': color
        }
      }
    }));
  };
};

var addFilterCollabBlockSelection = function addFilterCollabBlockSelection() {
  (0, _hooks.addFilter)('editor.BlockListBlock', 'isolated-block-editor', addSelectionBorders, 9);
};

exports.addFilterCollabBlockSelection = addFilterCollabBlockSelection;
//# sourceMappingURL=index.js.map