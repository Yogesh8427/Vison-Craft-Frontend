import store from "../store";
import axios from "axios";
import { addOrder_arr, emptyOrders, updateOrders,updateordersatus } from "../reducers/ordersReduser";
import { geturl } from "../../config/url";

export const add_orders = async () => {
    try {
        const config = { headers: { authToken: localStorage.getItem('token') } }
        const newurl = geturl("/orders/getorders");
        await axios.get(newurl, config).then((res) => {
            if (res.data.status === 200) {
                store.dispatch(addOrder_arr(res.data.data));
            } else {
                console.log(res);
            }
        });
    } catch (error) {
        console.log("there is an error to feching a data");
    }
}
export const empty_order = () => {
 store.dispatch(emptyOrders());
}
export const update_order = async(item,cancleReason,admin) => {
    try {
        const config = { headers: { authToken: localStorage.getItem('token') } }
        const newurl = geturl("/orders/cancleorder");
        await axios.post(newurl,{order_id:item.order_id,cancleReason,admin_id:admin?true:false},config).then((res) => {
            if (res.data.status === 200) {
                store.dispatch(updateOrders(item));
            } else {
                console.log(res);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const admin_add_orders=async()=>{
    try {
        const config = { headers: { authToken: localStorage.getItem('token') } }
        const newurl = geturl("/orders/getAdminorders");
        await axios.get(newurl, config).then((res) => {
            if (res.data.status === 200) {
                store.dispatch(addOrder_arr(res.data.data));
            } else {
                console.log(res);
            }
        });
    } catch (error) {
        console.log("there is an error to feching a data");
    }
}
export const update_order_status=async(item,value)=>{
    try {
        const config = { headers: { authToken: localStorage.getItem('token') } }
        const newurl = geturl("/orders/setorderstatus");
        await axios.post(newurl,{order_id:item.order_id,status:value},config).then((res) => {
            if (res.data.status === 200) {
                store.dispatch(updateordersatus({item,status:value}));
            } else {
                console.log(res);
            }
        });
    } catch (error) {
        console.log("there is an error to update status of order")
    }
}