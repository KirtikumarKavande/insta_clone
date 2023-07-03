import { createSlice } from "@reduxjs/toolkit";
const initiallikesState={likes:{},likesCountManger:{}}
const likeSlice=createSlice({
    name:"likes",
    initialState:initiallikesState,
    reducers:{
        likes(state,action){
            state.likes={...action.payload}
        },
        likesCountManage(){
            // state.likesCountManger=action.payload
        }
    }
})

export default likeSlice.reducer
export const likeAction = likeSlice.actions.likes
export const likesCountManageAction=likeSlice.actions.likesCountManage