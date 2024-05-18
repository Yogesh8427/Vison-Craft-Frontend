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
            state=state.filter((value) => value.item_id!==action.payload.item_id);
            return state;
        },
        updateCart:(state,action)=>{
            const index = state.findIndex((item) => item.item_id === action.payload.item_id);
            state[index]=action.payload;
            return state;
        },
        emptyCart:(state)=>{
            state=[];
            return state;
        },
        add_item_arr:(state,action)=>{
            state=action.payload;
            return state;
        }
    }
})

export  const{addItem,removeItem,updateCart,emptyCart,add_item_arr}=cart.actions;
export default  cart.reducer;