import { combineReducers } from "redux";
import cartreducer from "./reducers/cartreducer";
import alertreduser from "./reducers/alertReduser";
import userdetails from "./reducers/userdetails";
import ordersReduser from "./reducers/ordersReduser";
const rootreducer=combineReducers({cartreducer,alertreduser,userdetails,ordersReduser});
export default rootreducer;