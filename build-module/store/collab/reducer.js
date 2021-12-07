const reducer = function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_COLLAB_YJS_DOC':
      {
        return { ...state,
          yDoc: action.doc
        };
      }

    case 'SET_COLLAB_UNDO_MANAGER':
      {
        return { ...state,
          undoManager: action.undoManager
        };
      }
  }

  return state;
};

export default reducer;
//# sourceMappingURL=reducer.js.map