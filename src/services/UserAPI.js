import axios from "./Axios";
const UserAPI = {};
// const apiUrl = process.env.REACT_APP_API_URL + "user";
const apiUrl = "/user";
UserAPI.login = async ({ username, password }) => {
  return await axios
    .post(apiUrl + "/login", { username, password })
    .then(({ data }) => {
      return data.user;
    })
    .catch((err) => {
      console.log(err);
      throw new Error({ err });
    });
};
UserAPI.register = async ({ username, password, email,displayName }) => {
  try {
    return await axios
      .post(apiUrl + "/", { username, password, email,displayName })
      .then((r) => {
        if (r) return r.data;
      });
  } catch (error) {
    console.log(error);
  }
};
UserAPI.update = async ({
  _id,
  username,
  password,
  email,
  passwordChange = false,
  displayName
}) => {
  try {
    return await axios
      .patch(apiUrl + "/", { _id, username, password, email, passwordChange,displayName })
      .then((r) => {
        if (r) return r.data;
      });
  } catch (error) {
    console.log(error);
  }
};
UserAPI.compare = async ({ password, hashpassword }) => {
  try {
    return await axios
      .get(apiUrl + "/confirm", { password, hashpassword })
      .then((r) => {
        return r;
      });
  } catch (error) {
    console.log(error);
  }
};
UserAPI.getUser = async () => {
  try {
    return await axios.get(apiUrl + "/").then((r) => {
      return r.data;
    });
  } catch (error) {
    throw error
  }
};
UserAPI.logOut = async () => {
  try {
    return axios.get(apiUrl + "/logout").then((r) => r.data);
  } catch (error) {
    console.log(error);
  }
};
export default UserAPI;
