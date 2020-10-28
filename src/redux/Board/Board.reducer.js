import BOARD from "./constants";
let initState = {
  listBoard: [],
};

const reducerBoard = (state = initState, action) => {
  switch (action.type) {
    case BOARD.FETCH:
      state.listBoard = action.payload;
      return { ...state };
    case BOARD.UPDATE:
      state.listBoard = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default reducerBoard;
