import BOARD from "./constants";
import BoardApi from "../../services/BoardAPI";
import CardApi from "../../services/CardAPI";
import { message } from "antd";
const setData = (data) => {
  const fetch = (data) => ({ type: BOARD.FETCH, payload: data });
  return async (dispatch) => {
    dispatch(fetch(data));
  };
};
const fetchBoard = () => {
  const fetch = (data) => ({ type: BOARD.FETCH, payload: data });
  return async (dispatch) => {
    await BoardApi.fetchAPI().then((data) => {
      dispatch(fetch(data));
    });
  };
};
const fetchBoardData = (boardId) => {
  const fetchRequest = () => ({ type: BOARD.FETCH_REQUEST });
  const fetchData = (data) => {
    return { type: BOARD.FETCH_BOARD_DATA, payload: data };
  };
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      await BoardApi.fetchDataApi(boardId).then((data) => {
        if (data) {
          dispatch(fetchData(data.column));
          dispatch(setCurrentBoard({ _id: boardId, title: data.title }));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};
const fetchBoardWithOutLoading = (boardId) => {
  const fetchData = (data) => ({ type: BOARD.FETCH_BOARD_DATA, payload: data });
  return async (dispatch) => {
    await BoardApi.fetchDataApi(boardId).then((data) => {
      if (data) {
        dispatch(setCurrentBoard({ _id: boardId, title: data.title }));
        dispatch(fetchData(data.column));
      }
    });
  };
};
const changeVisibleAdd = () => {
  return (dispatch) => {
    dispatch({ type: BOARD.CHANGE_VISIBLE_ADD });
  };
};
const addBoard = (boardTitle) => {
  const success = () => {
    message.success("Create board success!");
    return {
      type: BOARD.CREATE_SUCCESS,
    };
  };
  const fail = () => {
    message.error("Something went wrong!");
    return {
      type: BOARD.CREATE_FAIL,
    };
  };
  return (dispatch) => {
    dispatch({ type: BOARD.CREATE_REQUEST });
    try {
      BoardApi.addBoard(boardTitle).then((data) => {
        if (data) {
          dispatch(success());
          dispatch(fetchBoard());
        }
      });
    } catch (error) {
      dispatch(fail());
    }
  };
};
const addCardRequest = (index) => {
  const request = () => ({ type: BOARD.ADD_CARD_REQUEST, payload: index });
  return (dispatch) => {
    dispatch(request());
  };
};
const addCardCancelRequest = (index) => {
  const request = () => ({
    type: BOARD.ADD_CARD_CANCEL_REQUEST,
    payload: index,
  });
  return (dispatch) => {
    dispatch(request());
  };
};
const addCard = (index, { columnId, title }, boardId) => {
  const success = () => {
    message.success("Add card success");
    return { type: BOARD.ADD_CARD_SUCCESS, payload: index };
  };
  const fail = () => {
    message.error("Fail in adding card");
    return { type: BOARD.ADD_CARD_FAILURE, payload: index };
  };
  return async (dispatch) => {
    message.loading("Loading...");
    try {
      await CardApi.createCard({ columnId, title }).then((r) => {
        if (r) {
          dispatch(success());
          dispatch(fetchBoardWithOutLoading(boardId));
        }
      });
    } catch (error) {
      dispatch(fail());
    }
  };
};
const updateCard = ({ _id, title }, boardId) => {
  const updateSuccess = () => {
    message.success("Update card success!");
    return {
      type: BOARD.UPDATE_CARD,
    };
  };
  const updateFail = () => {
    message.error("Update failure!");
    return {
      type: BOARD.UPDATE_CARD,
    };
  };
  return async (dispatch) => {
    try {
      await CardApi.update({ _id, title }).then(async (r) => {
        if (r) {
          dispatch(fetchBoardWithOutLoading(boardId));
          return dispatch(updateSuccess());
        }
      });
    } catch (error) {
      dispatch(updateFail());
    }
  };
};
const deleteCard = ({ _id }, columnId, boardId) => {
  const deleteSuccess = () => {
    message.success("Delete card success!");
    return {
      type: BOARD.DELETE_CARD,
    };
  };
  const deleteFail = () => {
    message.error("Delete failure!");
    return {
      type: BOARD.DELETE_CARD_FAIL,
    };
  };
  return async (dispatch) => {
    message.loading("Action in progress..", 1);
    try {
      return await CardApi.delete({ _id, columnId }).then((r) => {
        if (r) {
          dispatch(fetchBoardWithOutLoading(boardId));
          return dispatch(deleteSuccess());
        }

        dispatch(deleteFail());
      });
    } catch (error) {
      console.log(error);
      dispatch(deleteFail());
    }
  };
};
const updateBoardRequest = () => {
  const updateRequest = () => ({ type: BOARD.UPDATE_BOARD });
  return (dispatch) => {
    dispatch(updateRequest());
  };
};
const updateBoard = ({ _id, title }) => {
  const updateSuccess = () => {
    message.success("Update board title success!", 0.5).then(() => {
      message.loading("Waiting refesh data ...", 1.5);
    });
    return { type: BOARD.UPDATE_BOARD_SUCCESS };
  };
  const updateFailure = () => ({ type: BOARD.UPDATE_BOARD_FAILURE });
  return async (dispatch) => {
    try {
      await BoardApi.update({ _id, title }).then((r) => {
        if (r) {
          dispatch(fetchBoardWithOutLoading(_id));
          return dispatch(updateSuccess());
        }
        dispatch(updateFailure());
      });
    } catch (error) {
      console.log(error);
      dispatch(updateFailure());
    }
  };
};
const setCurrentBoard = ({ _id, title }) => {
  return (dispatch) => {
    dispatch({ type: BOARD.SET_CURRENT_BOARD, payload: { _id, title } });
  };
};
const deleteBoard = ({ _id }) => {
  const deleteSuccess = () => {
    message.success("Delete board success!");
    return { type: BOARD.DELETE_BOARD };
  };
  const deleteFail = () => {
    message.error("Error when delete board!");
  };
  return async (dispatch) => {
    try {
      await BoardApi.delete({ _id }).then((r) => {
        if (!r) dispatch(deleteFail());
        dispatch(deleteSuccess());
      });
    } catch (error) {
      dispatch(deleteFail());
    }
  };
};
const publicBoard = (_id) => {
  return async (dispatch) => {
    await BoardApi.public(_id).then((r) => {
      console.log(r);
    });
  };
};

const changeIndexCard = (source, destination, cardId, boardId) => {
  const { sourceId, sourceIndex } = source;
  const { desId, desIndex } = destination;
  return async (dispatch, getState) => {
    try {
      let src = [];
      let des = [];
      if (sourceId === desId) {
        if (sourceIndex !== desIndex) {
          const listCard = [...getState().board.column].filter(
            (e) => e._id === sourceId
          )[0].card;
          const sc = listCard[sourceIndex];
          listCard.splice(sourceIndex, 1);
          listCard.splice(desIndex, 0, sc);
          des = listCard.map((e) => e._id);
        }
      } else {
        let col = [...getState().board.column];
        const colS = col.filter((e) => {
          if (e._id === sourceId) return e.card;
          return null;
        });
        const colD = col.filter((e) => {
          if (e._id === desId) {
            return e.card;
          }
          return null;
        });
        const cardS = colS[0].card;
        const cardD = colD[0].card;
        let a = cardS.splice(sourceIndex, 1);
        cardD.splice(desIndex, 0, a[0]);
        src = cardS;
        des = cardD;
      }
      await CardApi.changeColumnAndIndex({
        sourceId,
        desId,
        sourceOrderCard: src,
        desOrderCard: des,
      });
    } catch (error) {
      dispatch(fetchBoardWithOutLoading(boardId));
    }
  };
};
export {
  changeIndexCard,
  publicBoard,
  fetchBoard,
  fetchBoardData,
  changeVisibleAdd,
  addBoard,
  addCard,
  addCardRequest,
  addCardCancelRequest,
  updateCard,
  deleteCard,
  updateBoard,
  updateBoardRequest,
  setCurrentBoard,
  deleteBoard,
  fetchBoardWithOutLoading,
  setData,
};
