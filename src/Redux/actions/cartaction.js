import store from "../store"
import { addItem,removeItem } from "../reducers/cartreducer";

export const add_to_cart=(item)=>{
    store.dispatch(addItem(item));
}
export const remove_to_cart=(item)=>{
 store.dispatch(removeItem(item));
}
