import USER from "./constants";

let user = localStorage.getItem("user");
const initialState = user ? { loggedIn: true, user, loggingIn: false } : {};

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
    case USER.LOGIN_FAILURE:
      return {};
    case USER.LOGOUT:
      return {};
    default:
      return {
        ...state,
      };
  }
};
export default reducerUser;
