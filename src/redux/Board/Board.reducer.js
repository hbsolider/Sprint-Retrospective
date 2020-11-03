import BOARD from "./constants";
let initState = {
  listBoard: [],
  column: [],
  visibleAdd: false,
  creating: false,
  isfetching: false,
  isaddCard: [false, false, false],
  isEditBoard: false,
};

const reducerBoard = (state = initState, action) => {
  switch (action.type) {
    case BOARD.FETCH:
      state.listBoard = action.payload;
      return { ...state };
    case BOARD.FETCH_REQUEST:
      state.isfetching = true;
      return { ...state };
    case BOARD.UPDATE_BOARD:
      state.isEditBoard = true;
      return { ...state };
    case BOARD.UPDATE_BOARD_SUCCESS:
      state.isEditBoard = false;
      return { ...state };
    case BOARD.UPDATE_BOARD_FAILURE:
      state.isEditBoard = true;
      return { ...state };
    case BOARD.FETCH_BOARD_DATA:
      state.isfetching = false;
      state.column = action.payload;
      return { ...state };
    case BOARD.CHANGE_VISIBLE_ADD:
      state.visibleAdd = !state.visibleAdd;
      return { ...state };
    case BOARD.CREATE_REQUEST:
      state.creating = true;
      return { ...state };
    case BOARD.CREATE_SUCCESS:
      state.creating = false;
      return { ...state };
    case BOARD.CREATE_FAIL:
      state.creating = false;
      return { ...state };
    case BOARD.ADD_CARD_REQUEST:
      state.isaddCard[action.payload] = true;
      return { ...state };
    case BOARD.ADD_CARD_SUCCESS:
      state.isaddCard[action.payload] = false;
      return { ...state };
    case BOARD.ADD_CARD_FAILURE:
      state.isaddCard[action.payload] = true;
      return { ...state };
    case BOARD.ADD_CARD_CANCEL_REQUEST:
      state.isaddCard[action.payload] = false;
      return { ...state };
    case BOARD.UPDATE_CARD:
      return { ...state };
    case BOARD.DELETE_CARD:
      return { ...state };
    default:
      return { ...state };
  }
};

export default reducerBoard;
