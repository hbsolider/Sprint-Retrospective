import { message } from "antd";
import axios from "./Axios";
const BoardApi = {};
const apiURL = "/board";
// const apiURL = process.env.REACT_APP_API_URL + "board";
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
BoardApi.delete = async ({ _id }) => {
  try {
    return await axios.delete(apiURL, { data: { _id } }).then((r) => {
      if (r) return r;
    });
  } catch (error) {
    console.log(error);
  }
};
BoardApi.public = async (_id) => {
  const success = () => {
    message.success("Coppied!");
  };
  const failure = () => {
    message.error("Error");
  };
  try {
    return await axios.post(apiURL + "/public", { _id }).then((r) => {
      if (r) {
        success();
        return r.data;
      }
    });
  } catch (error) {
    failure();
    console.log(error);
  }
};

export default BoardApi;
