import * as yjs from 'yjs';

const encodeArray = array => array.toString();

const decodeArray = string => new Uint8Array(string.split(','));

export function createDocument({
  identity,
  applyDataChanges,
  getData,
  sendMessage
}) {
  const doc = new yjs.Doc();
  let state = 'off';
  let listeners = [];
  let stateListeners = [];
  doc.on('update', (update, origin) => {
    if (origin === identity && state === 'on') {
      sendMessage({
        protocol: 'yjs1',
        messageType: 'syncUpdate',
        update: encodeArray(update)
      });
    }

    if (origin !== identity) {
      const newData = getData(doc);
      listeners.forEach(listener => listener(newData));
    }
  });

  const setState = newState => {
    state = newState;
    stateListeners.forEach(listener => listener(newState));
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
    applyDataChanges(data) {
      if (state !== 'on') {
        throw 'wrong state';
      }

      doc.transact(() => {
        applyDataChanges(doc, data);
      }, identity);
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
      this.applyDataChanges(data);
    },

    receiveMessage({
      protocol,
      messageType,
      origin,
      ...content
    }) {
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
          yjs.applyUpdate(doc, decodeArray(content.update), origin);
          break;
      }
    },

    onRemoteDataChange(listener) {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    },

    onStateChange(listener) {
      stateListeners.push(listener);
      return () => {
        stateListeners = stateListeners.filter(l => l !== listener);
      };
    },

    getState() {
      return state;
    }

  };
}
//# sourceMappingURL=yjs-doc.js.map