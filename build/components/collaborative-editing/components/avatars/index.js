"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollaborativeEditingAvatar = CollaborativeEditingAvatar;
exports.CollaborativeEditingAvatars = CollaborativeEditingAvatars;
exports.CollaborativeEditingAvatarsOverflow = CollaborativeEditingAvatarsOverflow;
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _components = require("@wordpress/components");
var _data = require("@wordpress/data");
var _element = require("@wordpress/element");
var _i18n = require("@wordpress/i18n");
var _compose = require("@wordpress/compose");
require("./style.scss");
import { createElement, Fragment } from "@wordpress/element";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             */ /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * Internal dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */
/**
 * @param {Object} props
 * @param {import("../..").AvailablePeer[]} props.peers
 * @param {Function} props.onAvatarClick
 */
function CollaborativeEditingAvatars(_ref) {
  var peers = _ref.peers,
    onAvatarClick = _ref.onAvatarClick;
  var MAX_AVATAR_COUNT = 4;
  var shouldOverflow = peers.length > MAX_AVATAR_COUNT;
  var actualAvatarCount = shouldOverflow ? MAX_AVATAR_COUNT - 1 : MAX_AVATAR_COUNT;
  return createElement("div", {
    className: "iso-editor-collab-avatars"
  }, createElement(_components.VisuallyHidden, null, "Currently editing:"), peers.slice(0, actualAvatarCount).map(function (peer) {
    return createElement(CollaborativeEditingAvatar, {
      key: peer.id,
      peer: peer,
      onAvatarClick: onAvatarClick
    });
  }), shouldOverflow && createElement(CollaborativeEditingAvatarsOverflow, {
    peers: peers === null || peers === void 0 ? void 0 : peers.slice(actualAvatarCount)
  }));
}
function CollaborativeEditingAvatar(_ref2) {
  var peer = _ref2.peer,
    onAvatarClick = _ref2.onAvatarClick;
  var _useState = (0, _element.useState)(false),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    isVisible = _useState2[0],
    setIsVisible = _useState2[1];
  return createElement("button", {
    className: "iso-editor-collab-avatars__avatar-btn",
    "aria-label": peer.name,
    onMouseEnter: function onMouseEnter() {
      return setIsVisible(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsVisible(false);
    },
    onClick: function onClick() {
      return onAvatarClick(peer);
    },
    style: {
      borderColor: peer.color,
      background: peer.color
    }
  }, isVisible && createElement(_components.Popover, {
    className: "iso-editor-collab-avatars__popover",
    animate: false
  }, peer.name), peer.avatarUrl ? createElement("img", {
    className: "iso-editor-collab-avatars__image",
    src: peer.avatarUrl,
    alt: ""
  }) : createElement("span", {
    className: "iso-editor-collab-avatars__name-initial"
  }, peer.name.charAt(0)));
}
function CollaborativeEditingAvatarsOverflow(_ref3) {
  var peers = _ref3.peers;
  var MAX_NAME_COUNT = 20;
  var _useState3 = (0, _element.useState)(false),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    isVisible = _useState4[0],
    setIsVisible = _useState4[1];
  var NameList = function NameList() {
    return createElement(Fragment, null, createElement("ul", {
      className: "iso-editor-collab-avatars__overflow-list"
    }, peers.slice(0, MAX_NAME_COUNT).map(function (peer) {
      return createElement("li", {
        className: "iso-editor-collab-avatars__overflow-list-item",
        key: peer.id
      }, peer.name);
    })), peers.length > MAX_NAME_COUNT && createElement("p", {
      className: "iso-editor-collab-avatars__overflow-more"
    }, (0, _i18n.sprintf)( /* translators: %s: number of how many more users there are */
    (0, _i18n.__)('and %s more'), peers.length - MAX_NAME_COUNT)));
  };
  return createElement("div", {
    className: "iso-editor-collab-avatars__overflow"
  }, isVisible && createElement(_components.Popover, {
    className: "iso-editor-collab-avatars__popover",
    animate: false
  }, createElement(NameList, null)), createElement("span", {
    "aria-hidden": "true",
    onMouseEnter: function onMouseEnter() {
      return setIsVisible(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsVisible(false);
    }
  }, "+".concat(peers.length)), createElement(_components.VisuallyHidden, null, createElement(NameList, null)));
}

// @ts-ignore
var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var peers = select('isolated/editor').getCollabPeers();
  return {
    peers: Object.keys(peers).map(function (id) {
      return _objectSpread({
        id: id
      }, peers[id]);
    })
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
    selectBlock = _dispatch.selectBlock;
  return {
    onAvatarClick: function onAvatarClick(peer) {
      var _peer$start;
      if (peer !== null && peer !== void 0 && (_peer$start = peer.start) !== null && _peer$start !== void 0 && _peer$start.clientId) {
        selectBlock(peer.start.clientId);
      }
    }
  };
})])(CollaborativeEditingAvatars);
exports["default"] = _default;
//# sourceMappingURL=index.js.map