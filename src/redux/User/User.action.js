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
  return async (dispatch) => {
    dispatch(loginRequest());

    await UserApi.login({ username, password })
      .then(async (res) => {
        if (res) {
          await localStorage.setItem("token", res.token);
          await localStorage.setItem("user", JSON.stringify(res.user));
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
  return async (dispatch) => {
    try {
      await UserAPI.logOut();
    } catch (error) {}
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: USER.LOGOUT });
  };
};
UserAction.update = ({ _id, username, password, email, passwordChange,displayName }) => {
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
        displayName
      }).then((r) => {
        if (r) {
          localStorage.setItem("user", JSON.stringify(r.user));
          return dispatch(success());
        }
        dispatch(failure());
      });
    } catch (error) {
      dispatch(UserAction.getUser2())
      dispatch(failure());
    }
  };
};
UserAction.updateRequest = () => {
  return (dispatch) => {
    dispatch({ type: USER.EDIT_REQUEST });
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
      });
    } catch (error) {}
  };
};

UserAction.getUser2 = () => {
  const loginSuccess = (data) => {
    return { type: USER.LOGIN_SUCCESS, payload: data };
  };
  const loginFail = () => {
    return { type: USER.LOGIN_FAILURE };
  };
  return async (dispatch) => {
    try {
      await UserAPI.getUser().then((r) => {
        if (r) {
          if (r.isLogged) {
            localStorage.setItem("user", JSON.stringify(r));
            return dispatch(loginSuccess(r));
          } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return dispatch(loginFail());
          }
        }
      });
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return dispatch(loginFail());
    }
  };
};
export default UserAction;
