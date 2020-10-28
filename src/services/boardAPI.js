import axios from "./Axios";
const BoardApi = {};
const apiURL = process.env.REACT_APP_API_URL + "board";
BoardApi.fetchAPI = () => {
  const temp = '/5f9964a7c1369a4150cc7deb';
  return axios.get(apiURL+temp).then(({ data }) => {
    return data.data;
  });
};

// BoardApi.update = ({title})=>{
//    return dispatch =>{
//      axios.post(apiURL,{title}).then(res=>{
//        return
//      })
//    }
// }
export default BoardApi;
