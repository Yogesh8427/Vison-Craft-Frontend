import store from "../store";
import axios from "axios";
import { addOrder_arr, emptyOrders, updateOrders } from "../reducers/ordersReduser";
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
export const update_order = async(item,cancleReason) => {
    try {
        const config = { headers: { authToken: localStorage.getItem('token') } }
        const newurl = geturl("/orders/cancleorder");
        await axios.post(newurl,{order_id:item.order_id,cancleReason},config).then((res) => {
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