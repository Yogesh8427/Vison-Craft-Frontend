import { setAlert,removeAlert } from "../reducers/alertReduser";
import store from "../store";

export const  alert = (message, type) =>{
    store.dispatch(setAlert({message,type}));
    setTimeout(()=> store.dispatch(removeAlert()),2000);
}

