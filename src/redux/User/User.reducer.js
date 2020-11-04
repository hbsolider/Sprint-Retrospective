import USER from "./constants";

let user = localStorage.getItem("user");
const initialState = user
  ? { loggedIn: true, user, loggingIn: false, registering: false, edit: null }
  : { registering: false, edit: null };

const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case USER.LOGIN_REQUEST:
      return {
        loggingIn: true,
        ...state,
      };
    case USER.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload,
        loggingIn: false,
        ...state,
      };
    case USER.REGISTER_REQUEST:
      state.registering = true;
      return { ...state };
    case USER.REGISTER_SUCCESS:
      state.registering = false;
      return { ...state };
    case USER.REGISTER_FAILURE:
      state.registering = false;
      return { ...state };
    case USER.LOGIN_FAILURE:
      return {};
    case USER.LOGOUT:
      return {};
    case USER.EDIT_DONE:
      state.edit = null;
      return { ...state };
    case USER.EDIT_REQUEST:
      state.edit = action.payload;
      return { ...state };
    default:
      return {
        ...state,
      };
  }
};
export default reducerUser;
