let initState = {
    user:null,
    number:0
}

const rootReducer = (state=initState,action)=>{
    switch(action.type){
        default:
            return {...state}
    }
}

export default rootReducer;