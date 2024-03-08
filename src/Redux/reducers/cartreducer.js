import { createSlice } from "@reduxjs/toolkit";

const cart=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addItem:(state,actions)=>{
            state=[...state,actions.payload];
            return state;
        },
        removeItem:(state,action)=>{
            state=state.filter((value) => value.id!=action.payload.id);
            console.log(state);
            return state;
        }
    }
})

export  const{addItem,removeItem}=cart.actions;
export default  cart.reducer;