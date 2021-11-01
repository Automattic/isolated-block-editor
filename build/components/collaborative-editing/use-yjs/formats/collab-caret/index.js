"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FORMAT_NAME = void 0;
exports.applyCarets = applyCarets;
exports.settings = exports.registerFormatCollabCaret = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _memize = _interopRequireDefault(require("memize"));

var _classnames = _interopRequireDefault(require("classnames"));

var _richText = require("@wordpress/rich-text");

var _colorUtils = require("./color-utils");

require("./style.scss");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var FORMAT_NAME = 'isolated/collab-caret';
/**
 * Applies given carets to the given record.
 *
 * @param {Object} record The record to apply carets to.
 * @param {Array} carets The carets to apply.
 * @return {Object} A record with the carets applied.
 */

exports.FORMAT_NAME = FORMAT_NAME;

function applyCarets(record) {
  var carets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  carets.forEach(function (caret) {
    var start = caret.start,
        end = caret.end,
        id = caret.id,
        color = caret.color,
        label = caret.label;
    var isCollapsed = start === end;
    var isShifted = isCollapsed && end >= record.text.length;

    if (isShifted) {
      start = record.text.length - 1;
    }

    if (isCollapsed) {
      end = start + 1;
    }

    record = (0, _richText.applyFormat)(record, {
      type: FORMAT_NAME,
      attributes: {
        id: 'iso-editor-collab-caret-' + id,
        "class": (0, _classnames["default"])({
          'is-collapsed': isCollapsed,
          'is-shifted': isShifted
        }),
        title: label,
        style: ["--iso-editor-collab-caret-color: ".concat(color || '#2e3d48', ";"), "--iso-editor-collab-caret-label-text-color: ".concat((0, _colorUtils.shouldUseWhiteText)(color) ? '#fff' : '#1e1e1e', ";")].join(' ')
      }
    }, start, end);
  });
  return record;
}

var getCarets = (0, _memize["default"])(function (peers, richTextIdentifier, blockClientId) {
  return Object.entries(peers).filter(function (_ref) {
    var _peer$start, _peer$end;

    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        peer = _ref2[1];

    return (peer === null || peer === void 0 ? void 0 : (_peer$start = peer.start) === null || _peer$start === void 0 ? void 0 : _peer$start.clientId) === blockClientId && (peer === null || peer === void 0 ? void 0 : (_peer$end = peer.end) === null || _peer$end === void 0 ? void 0 : _peer$end.clientId) === blockClientId && peer.start.attributeKey === richTextIdentifier;
  }).map(function (_ref3) {
    var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
        id = _ref4[0],
        peer = _ref4[1];

    return {
      id: id,
      label: peer.name,
      start: peer.start.offset,
      end: peer.end.offset,
      color: peer.color
    };
  });
});
var settings = {
  title: 'Collaboration peer caret',
  tagName: 'mark',
  className: 'iso-editor-collab-caret',
  attributes: {
    id: 'id',
    className: 'class'
  },
  edit: function edit() {
    return null;
  },
  __experimentalGetPropsForEditableTreePreparation: function __experimentalGetPropsForEditableTreePreparation(select, _ref5) {
    var richTextIdentifier = _ref5.richTextIdentifier,
        blockClientId = _ref5.blockClientId;
    return {
      carets: getCarets(select('isolated/editor').getPeers(), richTextIdentifier, blockClientId)
    };
  },
  __experimentalCreatePrepareEditableTree: function __experimentalCreatePrepareEditableTree(_ref6) {
    var carets = _ref6.carets;
    return function (formats, text) {
      if (!(carets !== null && carets !== void 0 && carets.length)) {
        return formats;
      }

      var record = {
        formats: formats,
        text: text
      };
      record = applyCarets(record, carets);
      return record.formats;
    };
  }
};
exports.settings = settings;

var registerFormatCollabCaret = function registerFormatCollabCaret() {
  (0, _richText.registerFormatType)(FORMAT_NAME, settings);
};

exports.registerFormatCollabCaret = registerFormatCollabCaret;
//# sourceMappingURL=index.js.map