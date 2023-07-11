const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_COLLAB_YJS_DOC':
      {
        return {
          ...state,
          yDoc: action.doc
        };
      }
    case 'SET_COLLAB_UNDO_MANAGER':
      {
        return {
          ...state,
          undoManager: action.undoManager
        };
      }
  }
  return state;
};
export default reducer;
//# sourceMappingURL=reducer.js.map