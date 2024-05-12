import { combineReducers } from "redux";
import cartreducer from "./reducers/cartreducer";
import alertreduser from "./reducers/alertReduser";
import userdetails from "./reducers/userdetails";
const rootreducer=combineReducers({cartreducer,alertreduser,userdetails});
export default rootreducer;