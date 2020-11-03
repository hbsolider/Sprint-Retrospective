import axios from "./Axios";
const BoardApi = {};
const apiURL = process.env.REACT_APP_API_URL + "board";
BoardApi.fetchAPI = async () => {
  return await axios.get(apiURL).then(({ data }) => {
    return data.data;
  });
};
BoardApi.fetchDataApi = async (param) => {
  try {
    return await axios
      .get(apiURL + "/data", { params: { boardId: param } })
      .then(({ data }) => {
        return data;
      });
  } catch (error) {
    console.log(error);
  }
};
BoardApi.addBoard = async (boardTitle) => {
  try {
    return await axios.post(apiURL, { title: boardTitle }).then(({ data }) => {
      return data;
    });
  } catch (error) {
    console.log(error);
  }
};
BoardApi.update = async ({ _id, title }) => {
  try {
    return await axios.patch(apiURL, { _id, title }).then(({ data }) => {
      if (data) return data;
    });
  } catch (error) {
    console.log(error);
  }
};
export default BoardApi;
