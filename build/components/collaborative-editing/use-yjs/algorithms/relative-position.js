"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelativePosition = exports.PeerRelativePosition = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var yjs = _interopRequireWildcard(require("yjs"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * External dependencies
 */
/**
 * @typedef WPBlockSelection
 * @property {string} [clientId]
 * @property {string} [attributeKey]
 * @property {number} [offset]
 */
/**
 * @typedef SelectionRange
 * @property {WPBlockSelection} start
 * @property {WPBlockSelection} end
 */
/**
 * @typedef RelativePositionManager
 * @property {RelativePosition} self
 * @property {PeerRelativePosition} peers
 */
/**
 * Handle the conversion between a Yjs relative position and a Gutenberg absolute position.
 *
 * This is used to maintain a user's caret position so it doesn't look like it's pushed around by remote changes.
 * For example, if my caret is at `ab|c` and a remote user changes the text to `aabc`, I want my
 * caret to "stay" relative to the `b` (`aab|c`) instead of staying at the same absolute index (`aa|bc`).
 */
var RelativePosition = /*#__PURE__*/function () {
  /**
   * @param {() => SelectionRange} getSelection - Function to get block editor selection.
   * @param {(clientId: string, attributeKey: string, startOffset: number, endOffset: number) => void} selectionChange - Function to set block editor selection.
   */
  function RelativePosition(getSelection, selectionChange) {
    (0, _classCallCheck2["default"])(this, RelativePosition);
    this.getSelection = getSelection;
    this.selectionChange = selectionChange;
  }

  /**
   * Get the current block editor selection, convert it to a Y.RelativePosition, and remember it.
   *
   * Call this method _before_ the Y.Doc is mutated.
   *
   * @param {yjs.Doc} doc
   */
  (0, _createClass2["default"])(RelativePosition, [{
    key: "saveRelativePosition",
    value: function saveRelativePosition(doc) {
      var _doc$getMap, _richTexts$get;
      var _this$getSelection = this.getSelection(),
        start = _this$getSelection.start,
        end = _this$getSelection.end;
      var _ref = start !== null && start !== void 0 ? start : {},
        clientId = _ref.clientId,
        attributeKey = _ref.attributeKey;
      var richTexts = (_doc$getMap = doc.getMap('post')) === null || _doc$getMap === void 0 || (_doc$getMap = _doc$getMap.get('blocks')) === null || _doc$getMap === void 0 ? void 0 : _doc$getMap.get('richTexts');
      if (richTexts !== null && richTexts !== void 0 && (_richTexts$get = richTexts.get(clientId)) !== null && _richTexts$get !== void 0 && _richTexts$get.has(attributeKey) && typeof start.offset === 'number' && typeof end.offset === 'number') {
        var xmlText = richTexts.get(clientId).get(attributeKey).get('xmlText');
        this.relPos = {
          clientId: clientId,
          attributeKey: attributeKey,
          startOffset: yjs.createRelativePositionFromTypeIndex(xmlText, start.offset, -1),
          endOffset: yjs.createRelativePositionFromTypeIndex(xmlText, end.offset, -1)
        };
      } else {
        this.relPos = undefined;
      }
    }

    /**
     * If a saved Y.RelativePosition exists, convert it to an absolute position and
     * dispatch it as a selection change to the block editor.
     *
     * Call this method _after_ the Y.Doc is mutated.
     *
     * @param {yjs.Doc} doc
     */
  }, {
    key: "setAbsolutePosition",
    value: function setAbsolutePosition(doc) {
      var _this$relPos, _this$relPos2, _yjs$createAbsolutePo, _yjs$createAbsolutePo2;
      if (!((_this$relPos = this.relPos) !== null && _this$relPos !== void 0 && _this$relPos.clientId) || !((_this$relPos2 = this.relPos) !== null && _this$relPos2 !== void 0 && _this$relPos2.attributeKey)) {
        return;
      }
      var _this$relPos3 = this.relPos,
        clientId = _this$relPos3.clientId,
        attributeKey = _this$relPos3.attributeKey,
        startOffset = _this$relPos3.startOffset,
        endOffset = _this$relPos3.endOffset;
      var absStartOffset = (_yjs$createAbsolutePo = yjs.createAbsolutePositionFromRelativePosition(startOffset, doc)) === null || _yjs$createAbsolutePo === void 0 ? void 0 : _yjs$createAbsolutePo.index;
      var absEndOffset = (_yjs$createAbsolutePo2 = yjs.createAbsolutePositionFromRelativePosition(endOffset, doc)) === null || _yjs$createAbsolutePo2 === void 0 ? void 0 : _yjs$createAbsolutePo2.index;
      if (typeof absStartOffset !== 'number' || typeof absEndOffset !== 'number') {
        return;
      }
      this.selectionChange(clientId, attributeKey, absStartOffset, absEndOffset);
    }
  }]);
  return RelativePosition;
}();
exports.RelativePosition = RelativePosition;
var PeerRelativePosition = /*#__PURE__*/function () {
  /**
   * @param {() => Record<string, Partial<SelectionRange>>} getPeers
   * @param {(peerId: string, selection: SelectionRange) => void} setPeerSelection
   */
  function PeerRelativePosition(getPeers, setPeerSelection) {
    (0, _classCallCheck2["default"])(this, PeerRelativePosition);
    /**
     * @private
     * @type {RelativePosition[]}
     */
    (0, _defineProperty2["default"])(this, "_peerRelativePositions", []);
    /** @private */
    this._getPeers = getPeers;
    /** @private */
    this._setPeerSelection = setPeerSelection;
  }

  /**
   * @private
   * @param {string} peerId
   * @param {Partial<SelectionRange>} peer
   * @return {RelativePosition}
   */
  (0, _createClass2["default"])(PeerRelativePosition, [{
    key: "_initRelativePositionForPeer",
    value: function _initRelativePositionForPeer(peerId, peer) {
      var _this = this;
      return new RelativePosition(function () {
        var _peer$start, _peer$end;
        return {
          start: (_peer$start = peer.start) !== null && _peer$start !== void 0 ? _peer$start : {},
          end: (_peer$end = peer.end) !== null && _peer$end !== void 0 ? _peer$end : {}
        };
      }, function (clientId, attributeKey, startOffset, endOffset) {
        return _this._setPeerSelection(peerId, {
          start: {
            clientId: clientId,
            attributeKey: attributeKey,
            offset: startOffset
          },
          end: {
            clientId: clientId,
            attributeKey: attributeKey,
            offset: endOffset
          }
        });
      });
    }

    /**
     * @param {yjs.Doc} doc
     */
  }, {
    key: "saveRelativePositions",
    value: function saveRelativePositions(doc) {
      var _this2 = this;
      this._peerRelativePositions = Object.entries(this._getPeers()).map(function (_ref2) {
        var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
          peerId = _ref3[0],
          peer = _ref3[1];
        return _this2._initRelativePositionForPeer(peerId, peer);
      });
      this._peerRelativePositions.forEach(function (relPos) {
        return relPos.saveRelativePosition(doc);
      });
    }

    /**
     * @param {yjs.Doc} doc
     */
  }, {
    key: "setAbsolutePositions",
    value: function setAbsolutePositions(doc) {
      this._peerRelativePositions.forEach(function (relPos) {
        return relPos.setAbsolutePosition(doc);
      });
    }
  }]);
  return PeerRelativePosition;
}();
exports.PeerRelativePosition = PeerRelativePosition;
//# sourceMappingURL=relative-position.js.map