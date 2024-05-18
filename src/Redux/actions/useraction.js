import store from "../store";
import { setUser,emptyUserdetails} from "../reducers/userdetails";
import axios from "axios";
import { geturl} from "../../config/url";
import { alert } from "./alertaction";

export const setUserAddress=async(data)=>{
    try {
        const config = { headers: { authToken: localStorage.getItem('token') } }
        const newurl=geturl("/users/address");
        const result=await axios.post(newurl,data,config);
        store.dispatch(setUser(data));
        console.log(result);

    } catch (error) {
        console.log(error);
        alert("Server error","danger");
    }
}
export const getUserAddress=async()=>{
    try {
        const config = { headers: { authToken: localStorage.getItem('token') } }
        const newurl=geturl("/users/details");
        const result=await axios.get(newurl,config);
        // console.log(result.data.result[0]);
        store.dispatch(setUser(result.data.result[0]));
        return result.data.result[0];
    } catch (error) {
        console.log(error);
        alert("Server error","danger");
    }
}
export const emptyuser=()=>{
   store.dispatch(emptyUserdetails());
}