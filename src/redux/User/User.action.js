import USER from "./constants";
import UserApi from "../../services/UserAPI";
import { message } from "antd";
import UserAPI from "../../services/UserAPI";

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
          localStorage.setItem("user", JSON.stringify(res.user));
          dispatch(loginSuccess(res.user));
        }
      })
      .catch((err) => {
        dispatch(loginFailure());
      });
  };
};
UserAction.register = ({ username, password, email }) => {
  const request = () => {
    return { type: USER.REGISTER_REQUEST };
  };
  const success = () => {
    message.success("Register success!");
    return { type: USER.REGISTER_SUCCESS };
  };
  const failure = () => {
    message.error("Register failure!");
    return { type: USER.REGISTER_FAILURE };
  };
  return async (dispatch) => {
    dispatch(request());
    try {
      await UserApi.register({ username, password, email }).then((r) => {
        if (!r) return dispatch(failure());
        dispatch(success());
      });
    } catch (error) {
      dispatch(failure);
    }
  };
};
UserAction.logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: USER.LOGOUT });
  };
};
UserAction.update = ({ _id, username, password, email, passwordChange }) => {
  const success = () => {
    message.success("Update success");
    return { type: USER.EDIT_DONE };
  };
  const failure = () => {
    message.error("Update failure");
    return { type: USER.EDIT_DONE };
  };
  return async (dispatch) => {
    try {
      await UserAPI.update({
        _id,
        username,
        password,
        email,
        passwordChange,
      }).then((r) => {
        if (r) {
          localStorage.setItem("user", JSON.stringify(r.user));
          return dispatch(success());
        }
        dispatch(failure());
      });
    } catch (error) {
      dispatch(failure());
    }
  };
};
UserAction.updateRequest = (payload) => {
  return (dispatch) => {
    dispatch({ type: USER.EDIT_REQUEST, payload });
  };
};
UserAction.cancelRequest = () => {
  return (disp) => {
    disp({ type: USER.EDIT_DONE });
  };
};
UserAction.compare = ({ password, hashpassword }) => {
  return async (dispatch) => {
    try {
      await UserAPI.compare({ password, hashpassword }).then((r) => {
        console.log(r);
      });
    } catch (error) {}
  };
};
export default UserAction;
