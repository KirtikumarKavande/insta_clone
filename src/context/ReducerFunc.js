
export const ReducerFunc=(state,action)=>{

if(action.type==="SET_USER")
{
    return {...state,user:action.payload}
}

}