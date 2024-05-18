import { createSlice } from "@reduxjs/toolkit";

const user=createSlice({
    name:"user",
    initialState:null,
    reducers:{
        setUser:(state,action)=>{
            state=action.payload;
            return state
        },
        emptyUserdetails:(state,action)=>{
            state=null;
            return state;
        }
    }
})
export  const{setUser,emptyUserdetails}=user.actions;
export default  user.reducer;