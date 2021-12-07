const reducer = function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_COLLAB_PEER_SELECTION':
      {
        if (!state[action.peerId]) {
          return state;
        }

        return { ...state,
          [action.peerId]: { ...state[action.peerId],
            ...action.selection
          }
        };
      }

    case 'SET_AVAILABLE_COLLAB_PEERS':
      {
        return action.peers.reduce((acc, _ref) => {
          let {
            id,
            name,
            color,
            avatarUrl
          } = _ref;
          acc[id] = state[id] || {
            name,
            color,
            avatarUrl
          };
          return acc;
        }, {});
      }
  }

  return state;
};

export default reducer;
//# sourceMappingURL=reducer.js.map