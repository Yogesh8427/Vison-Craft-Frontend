import { combineReducers } from "redux";
import cartreducer from "./reducers/cartreducer";
const rootreducer=combineReducers({cartreducer})
export default rootreducer;