import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Popover, VisuallyHidden } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import './style.scss';
/**
 * @param {object} props
 * @param {import("../..").AvailablePeer[]} props.peers
 */

export function CollaborativeEditingAvatars({
  peers
}) {
  const MAX_AVATAR_COUNT = 4;
  const shouldOverflow = peers.length > MAX_AVATAR_COUNT;
  const actualAvatarCount = shouldOverflow ? MAX_AVATAR_COUNT - 1 : MAX_AVATAR_COUNT;
  return createElement("div", {
    className: "iso-editor-collab-avatars"
  }, createElement(VisuallyHidden, null, "Currently editing:"), peers.slice(0, actualAvatarCount).map(peer => createElement(CollaborativeEditingAvatar, {
    key: peer.id,
    peer: peer
  })), shouldOverflow && createElement(CollaborativeEditingAvatarsOverflow, {
    peers: peers === null || peers === void 0 ? void 0 : peers.slice(actualAvatarCount)
  }));
}
export function CollaborativeEditingAvatar({
  peer
}) {
  const [isVisible, setIsVisible] = useState(false);
  return createElement("div", {
    className: "iso-editor-collab-avatars__avatar",
    "aria-label": peer.name,
    onMouseEnter: () => setIsVisible(true),
    onMouseLeave: () => setIsVisible(false),
    style: {
      borderColor: peer.color,
      background: peer.color
    }
  }, isVisible && createElement(Popover, {
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
export function CollaborativeEditingAvatarsOverflow({
  peers
}) {
  const MAX_NAME_COUNT = 20;
  const [isVisible, setIsVisible] = useState(false);

  const NameList = () => {
    return createElement(Fragment, null, createElement("ul", {
      className: "iso-editor-collab-avatars__overflow-list"
    }, peers.slice(0, MAX_NAME_COUNT).map(peer => createElement("li", {
      className: "iso-editor-collab-avatars__overflow-list-item",
      key: peer.id
    }, peer.name))), peers.length > MAX_NAME_COUNT && createElement("p", {
      className: "iso-editor-collab-avatars__overflow-more"
    }, sprintf(
    /* translators: %s: number of how many more users there are */
    __('and %s more'), peers.length - MAX_NAME_COUNT)));
  };

  return createElement("div", {
    className: "iso-editor-collab-avatars__overflow"
  }, isVisible && createElement(Popover, {
    className: "iso-editor-collab-avatars__popover",
    animate: false
  }, createElement(NameList, null)), createElement("span", {
    "aria-hidden": "true",
    onMouseEnter: () => setIsVisible(true),
    onMouseLeave: () => setIsVisible(false)
  }, `+${peers.length}`), createElement(VisuallyHidden, null, createElement(NameList, null)));
}
export default withSelect(select => {
  const peers = select('isolated/editor').getPeers();
  return {
    peers: Object.keys(peers).map(id => {
      return {
        id,
        ...peers[id]
      };
    })
  };
})(CollaborativeEditingAvatars);
//# sourceMappingURL=index.js.map