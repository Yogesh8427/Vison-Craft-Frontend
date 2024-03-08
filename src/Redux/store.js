import { configureStore } from "@reduxjs/toolkit";
import rootreducer from "./rootreduser";

const store=configureStore({
    reducer:rootreducer
})


export default store;