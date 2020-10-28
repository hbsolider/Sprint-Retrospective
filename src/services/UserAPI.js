import axios from "./Axios";
const UserAPI = {};
const apiUrl = process.env.REACT_APP_API_URL + "user";
UserAPI.login = ({ username, password }) => {
  return axios
    .post(apiUrl + "/login", { username, password })
    .then(({ data }) => {
      return data.user;
    });
}

export default UserAPI;
