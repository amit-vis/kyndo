import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/formReducer";

export const store = configureStore({
    reducer:{
        user: userReducer
    }
})