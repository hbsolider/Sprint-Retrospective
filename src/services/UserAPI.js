import axios from "./Axios";
const UserAPI = {};
const apiUrl = process.env.REACT_APP_API_URL + "user";
UserAPI.login = async ({ username, password }) => {
  return await axios
    .post(apiUrl + "/login", { username, password })
    .then(({ data }) => {
      return data.user;
    })
    .catch((err) => {
      console.log(err)
      throw new Error({err})
    });
};

export default UserAPI;
