"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFilterCollabBlockSelection = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _hooks = require("@wordpress/hooks");
var _data = require("@wordpress/data");
require("./style.scss");
import { createElement } from "react";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             */ /**
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
        // @ts-ignore
        var peers = select('isolated/editor').getCollabPeers();
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
    return createElement(OriginalComponent, _objectSpread(_objectSpread({}, props), {}, {
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