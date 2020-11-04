import axios from "./Axios";
const CardApi = {};
const URL = process.env.REACT_APP_API_URL + "card";
CardApi.createCard = async ({ columnId, title }) => {
  try {
    return await axios.post(URL, { columnId, title }).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};
CardApi.update = async ({ _id, title }) => {
  try {
    return await axios.patch(URL, { _id, title }).then(({ data }) => {
      if (data) {
        return data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
CardApi.delete = async ({ _id }) => {
  try {
    return await axios.delete(URL, { data:{_id} }).then((res) => {
      if (res) {
        return res;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export default CardApi;
