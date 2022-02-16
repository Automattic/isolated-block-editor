import _defineProperty from "@babel/runtime/helpers/defineProperty";

/**
 * External dependencies
 */
import * as yjs from 'yjs';
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

export class RelativePosition {
  /**
   * @param {() => SelectionRange} getSelection - Function to get block editor selection.
   * @param {(clientId: string, attributeKey: string, startOffset: number, endOffset: number) => void} selectionChange - Function to set block editor selection.
   */
  constructor(getSelection, selectionChange) {
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


  saveRelativePosition(doc) {
    var _doc$getMap, _doc$getMap$get, _richTexts$get;

    const {
      start,
      end
    } = this.getSelection();
    const {
      clientId,
      attributeKey
    } = start !== null && start !== void 0 ? start : {};
    const richTexts = (_doc$getMap = doc.getMap('post')) === null || _doc$getMap === void 0 ? void 0 : (_doc$getMap$get = _doc$getMap.get('blocks')) === null || _doc$getMap$get === void 0 ? void 0 : _doc$getMap$get.get('richTexts');

    if (richTexts !== null && richTexts !== void 0 && (_richTexts$get = richTexts.get(clientId)) !== null && _richTexts$get !== void 0 && _richTexts$get.has(attributeKey) && typeof start.offset === 'number' && typeof end.offset === 'number') {
      const xmlText = richTexts.get(clientId).get(attributeKey).get('xmlText');
      this.relPos = {
        clientId,
        attributeKey,
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


  setAbsolutePosition(doc) {
    var _this$relPos, _this$relPos2, _yjs$createAbsolutePo, _yjs$createAbsolutePo2;

    if (!((_this$relPos = this.relPos) !== null && _this$relPos !== void 0 && _this$relPos.clientId) || !((_this$relPos2 = this.relPos) !== null && _this$relPos2 !== void 0 && _this$relPos2.attributeKey)) {
      return;
    }

    const {
      clientId,
      attributeKey,
      startOffset,
      endOffset
    } = this.relPos;
    const absStartOffset = (_yjs$createAbsolutePo = yjs.createAbsolutePositionFromRelativePosition(startOffset, doc)) === null || _yjs$createAbsolutePo === void 0 ? void 0 : _yjs$createAbsolutePo.index;
    const absEndOffset = (_yjs$createAbsolutePo2 = yjs.createAbsolutePositionFromRelativePosition(endOffset, doc)) === null || _yjs$createAbsolutePo2 === void 0 ? void 0 : _yjs$createAbsolutePo2.index;

    if (typeof absStartOffset !== 'number' || typeof absEndOffset !== 'number') {
      return;
    }

    this.selectionChange(clientId, attributeKey, absStartOffset, absEndOffset);
  }

}
export class PeerRelativePosition {
  /**
   * @private
   * @type {RelativePosition[]}
   */

  /**
   * @param {() => Record<string, Partial<SelectionRange>>} getPeers
   * @param {(peerId: string, selection: SelectionRange) => void} setPeerSelection
   */
  constructor(getPeers, setPeerSelection) {
    _defineProperty(this, "_peerRelativePositions", []);

    /** @private */
    this._getPeers = getPeers;
    /** @private */

    this._setPeerSelection = setPeerSelection;
  }
  /**
   * @private
   * @param {string} peerId
   * @param {Partial<SelectionRange>} peer
   * @returns {RelativePosition}
   */


  _initRelativePositionForPeer(peerId, peer) {
    return new RelativePosition(() => {
      var _peer$start, _peer$end;

      return {
        start: (_peer$start = peer.start) !== null && _peer$start !== void 0 ? _peer$start : {},
        end: (_peer$end = peer.end) !== null && _peer$end !== void 0 ? _peer$end : {}
      };
    }, (clientId, attributeKey, startOffset, endOffset) => this._setPeerSelection(peerId, {
      start: {
        clientId,
        attributeKey,
        offset: startOffset
      },
      end: {
        clientId,
        attributeKey,
        offset: endOffset
      }
    }));
  }
  /**
   * @param {yjs.Doc} doc
   */


  saveRelativePositions(doc) {
    this._peerRelativePositions = Object.entries(this._getPeers()).map(_ref => {
      let [peerId, peer] = _ref;
      return this._initRelativePositionForPeer(peerId, peer);
    });

    this._peerRelativePositions.forEach(relPos => relPos.saveRelativePosition(doc));
  }
  /**
   * @param {yjs.Doc} doc
   */


  setAbsolutePositions(doc) {
    this._peerRelativePositions.forEach(relPos => relPos.setAbsolutePosition(doc));
  }

}
//# sourceMappingURL=relative-position.js.map