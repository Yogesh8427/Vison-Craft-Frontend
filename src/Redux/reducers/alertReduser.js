import { createSlice } from "@reduxjs/toolkit";
const alert=createSlice({
    name:"alert",
    initialState:{message:"",type:""},
    reducers:{
        setAlert:(state,action)=>{
            state.message=action.payload.message;
            state.type=action.payload.type;
            return state;
        },
        removeAlert:(state)=>{
            state.message="";
            state.type="";
            return state;
        }
    }
})
export const{setAlert,removeAlert}=alert.actions;
export default  alert.reducer;