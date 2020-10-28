import BOARD from "./constants";
import BoardApi from '../../services/BoardAPI'
export const fetchBoard = () => {
  const fetch =(data)=> ({type:BOARD.FETCH,payload:data});
  return dispatch =>{
    BoardApi.fetchAPI().then(data=>{
      dispatch(fetch(data))
    })
  }
};
