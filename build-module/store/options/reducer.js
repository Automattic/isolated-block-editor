const DEFAULT_STATE = {};
const reducer = function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case 'TOGGLE_OPTION':
      return {
        ...state,
        [action.option]: state[action.option] ? !state[action.option] : true
      };
  }
  return state;
};
export default reducer;
//# sourceMappingURL=reducer.js.map