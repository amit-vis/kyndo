import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/formReducer";
import {courseReducer} from "./reducer/tutorReducer"
import { studentReducer } from "./reducer/studentReducer";

export const store = configureStore({
    reducer:{
        user: userReducer,
        course: courseReducer,
        student: studentReducer
    }
})