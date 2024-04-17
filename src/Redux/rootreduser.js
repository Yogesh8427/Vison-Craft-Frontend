import { combineReducers } from "redux";
import cartreducer from "./reducers/cartreducer";
import alertreduser from "./reducers/alertReduser";
const rootreducer=combineReducers({cartreducer,alertreduser});
export default rootreducer;