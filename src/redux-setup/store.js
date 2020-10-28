import {combineReducers} from 'redux'
import root from './rootReducer'    
import board from '../redux/Board/Board.reducer'
import user from '../redux/User/User.reducer'
const rootReducer = combineReducers({
    root,
    board,
    user
})

export default rootReducer