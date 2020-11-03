import USER from "./constants";
import UserApi from "../../services/UserAPI";
import { message } from "antd";

const UserAction = {};

UserAction.login = ({ username, password }) => {
  const loginRequest = () => ({ type: USER.LOGIN_REQUEST });
  const loginSuccess = (data) => {
    message.success("Login success");
    return { type: USER.LOGIN_SUCCESS, payload: data };
  };
  const loginFailure = (data) => {
    message.error("Invalid fields");
    return { type: USER.LOGIN_FAILURE, payload: data };
  };
  return (dispatch) => {
    dispatch(loginRequest());

    UserApi.login({ username, password })
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", res.user);
          dispatch(loginSuccess(res.user));
          // window.location.href = process.env.PUBLIC_URL+'/';
        }
      })
      .catch((err) => {
        dispatch(loginFailure());
      });
  };
};
UserAction.logout = () => {
  return (dispatch) => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: USER.LOGOUT });
  };
};
export default UserAction;
