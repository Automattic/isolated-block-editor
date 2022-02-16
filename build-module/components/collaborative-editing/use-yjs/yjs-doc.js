/**
 * External dependencies
 */
import * as yjs from 'yjs';
/**
 * Internal dependencies
 */

import { postDocToObject, updatePostDoc } from './algorithms/yjs';
/** @typedef {import('./algorithms/yjs').PostObject} PostObject */

/** @typedef {import('./algorithms/relative-position').RelativePositionManager} RelativePositionManager */

/** @typedef {import('..').RichTextHint} RichTextHint */

const encodeArray = array => array.toString();

const decodeArray = string => new Uint8Array(string.split(','));
/**
 * Create a Yjs document.
 *
 * @param {Object} opts
 * @param {RelativePositionManager} opts.relativePositionManager - Module to coordinate conversions between the block editor selection and Y.RelativePosition.
 * @param {string} opts.identity - Client identifier.
 * @param {function(Record<string, unknown>): void} opts.sendMessage
 */


export function createDocument(_ref) {
  let {
    identity,
    relativePositionManager,
    sendMessage
  } = _ref;
  const doc = new yjs.Doc();
  /** @type {'off'|'connecting'|'on'} */

  let state = 'off';
  let yDocTriggeredChangeListeners = [];
  let connectionReadyListeners = [];
  doc.on('update', (update, origin) => {
    relativePositionManager.peers.setAbsolutePositions(doc); // Change received from peer, or triggered by self undo/redo

    if (origin !== identity) {
      const newData = postDocToObject(doc, {
        sanitize: true
      });
      yDocTriggeredChangeListeners.forEach(listener => listener(newData));
      relativePositionManager.self.setAbsolutePosition(doc);
    }

    const isLocalOrigin = origin === identity || origin === `no-undo--${identity}` || origin instanceof yjs.UndoManager; // Change should be broadcast to peers

    if (isLocalOrigin && state === 'on') {
      sendMessage({
        protocol: 'yjs1',
        messageType: 'syncUpdate',
        update: encodeArray(update)
      });
    }
  });

  const setState = newState => {
    state = newState;

    if (newState === 'on') {
      connectionReadyListeners.forEach(listener => listener());
    }
  };

  const sync = (destination, isReply) => {
    const stateVector = yjs.encodeStateVector(doc);
    sendMessage({
      protocol: 'yjs1',
      messageType: 'sync1',
      stateVector: encodeArray(stateVector),
      origin: identity,
      destination,
      isReply
    });
  };

  return {
    /**
     * @param {PostObject} data
     * @param {Object} [opts]
     * @param {boolean} [opts.isInitialContent] Whether this is the initial content loaded from the editor onLoad.
     * @param {RichTextHint} [opts.richTextHint] Indication that a certain block attribute is a RichText, inferred from the current editor selection.
     */
    applyLocalChangesToYDoc(data) {
      let {
        isInitialContent = false,
        richTextHint
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (state !== 'on') {
        throw 'wrong state';
      }

      relativePositionManager.peers.saveRelativePositions(doc);
      const transactionOrigin = isInitialContent ? `no-undo--${identity}` : identity;
      doc.transact(() => {
        updatePostDoc(doc, data, richTextHint);
      }, transactionOrigin);
    },

    connect() {
      if (state === 'on') {
        throw 'wrong state';
      }

      setState('connecting');
      sync();
    },

    disconnect() {
      setState('off');
    },

    startSharing(data) {
      if (state === 'on') {
        throw 'wrong state';
      }

      setState('on');
      this.applyLocalChangesToYDoc(data, {
        isInitialContent: true
      });
    },

    receiveMessage(_ref2) {
      let {
        protocol,
        messageType,
        origin,
        ...content
      } = _ref2;

      if (protocol !== 'yjs1') {
        throw 'wrong protocol';
      }

      switch (messageType) {
        case 'sync1':
          if (content.destination && content.destination !== identity) {
            return;
          }

          sendMessage({
            protocol: 'yjs1',
            messageType: 'sync2',
            update: encodeArray(yjs.encodeStateAsUpdate(doc, decodeArray(content.stateVector))),
            destination: origin
          });

          if (!content.isReply) {
            sync(origin, true);
          }

          break;

        case 'sync2':
          if (content.destination !== identity) {
            return;
          }

          yjs.applyUpdate(doc, decodeArray(content.update), origin);
          setState('on');
          break;

        case 'syncUpdate':
          relativePositionManager.self.saveRelativePosition(doc);
          relativePositionManager.peers.saveRelativePositions(doc);
          yjs.applyUpdate(doc, decodeArray(content.update), origin);
          break;
      }
    },

    onYDocTriggeredChange(listener) {
      yDocTriggeredChangeListeners.push(listener);
      return () => {
        yDocTriggeredChangeListeners = yDocTriggeredChangeListeners.filter(l => l !== listener);
      };
    },

    onConnectionReady(listener) {
      connectionReadyListeners.push(listener);
      return () => {
        connectionReadyListeners = connectionReadyListeners.filter(l => l !== listener);
      };
    },

    getState() {
      return state;
    },

    getDoc() {
      return doc;
    },

    getPostMap() {
      return doc.getMap('post');
    }

  };
}
//# sourceMappingURL=yjs-doc.js.map