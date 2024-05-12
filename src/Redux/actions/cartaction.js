import store from "../store"
import { addItem, removeItem, updateCart, emptyCart, add_item_arr } from "../reducers/cartreducer";
import axios from "axios";
import { geturl } from "../../config/url";
//add item to the cart
export const add_to_cart = async (item) => {
    const userid=localStorage.getItem('userid');
    const config = { headers: { authToken: localStorage.getItem('token') } }
    const newurl = geturl("/cart/cartdata");
    console.log(item);
    const newitem={...item,isSlected:true,Quantity:1,actualQuantity:item.Quantity,userid};
    await axios.post(newurl, newitem, config);
    store.dispatch(addItem({...item,isSlected:"true",Quantity:1,price:item.Price,actualQuantity:item.Quantity,userid}));
}
//remove item from the cart
export const remove_to_cart = async (item) => {
    const config = { headers: { authToken: localStorage.getItem('token') } }
    const newurl = geturl("/cart/deleteitem");
    await axios.post(newurl,{item_id:item.item_id},config)
    .then(()=>store.dispatch(removeItem(item)))
    .catch((error)=>console.log(error));
}
//update item from the cart
export const update_to_cart = async (item) => {
    const config = { headers: { authToken: localStorage.getItem('token') } }
    const newurl = geturl("/cart/cartupdate");
    await axios.post(newurl, { Quantity: item.Quantity, item_id: item.item_id,isSlected:item.isSlected}, config);
    store.dispatch(updateCart({...item,isSlected:item.isSlected.toString()}));
}
//make cart empty
export const empty_cart = () => {
    store.dispatch(emptyCart());
}

//set database cart datat to redux
export const set_data_to_cart = async () => {
    const config = { headers: { authToken: localStorage.getItem('token') } }
    const newurl = geturl("/cart/usercartdata");
    await axios.get(newurl, config).then((res) => {
        if (res.data.status === 200) {
            store.dispatch(add_item_arr(res.data.data));
        } else {
            console.log(res);
        }
    });
}