import { createSlice } from "@reduxjs/toolkit";
const order=createSlice({
    name:"order",
    initialState:[],
    reducers:{
        addOrder_arr:(state,action)=>{
            state=action.payload
            return state;
        },
        updateOrders:(state,action)=>{
           const index= state.findIndex((item)=>
            item.order_id===action.payload.order_id && item.item_id===action.payload.item_id
            )
            state[index].order_status="Cancle";
            return state;
        },
        emptyOrders:(state,action)=>{
            state=[];
            return state;
        }
    }
})
export  const{addOrder_arr,emptyOrders,updateOrders}=order.actions;
export default  order.reducer;