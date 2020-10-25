import axios from 'axios'
const URL = (process.env.PUBLIC_URL||'localhost:3001')+'/board'
export const fetchBoard = async() => {
    await axios.get(URL).then((res)=>{
        console.log(res)
    })
}
