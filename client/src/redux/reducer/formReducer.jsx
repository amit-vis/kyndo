import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk("user/register", async (user, { rejectWithValue }) => {
    try {
        const { name, email, password, cpassword, isTutor } = user;
        const response = await axios.post("http://localhost:8000/user/create", 
            { name, email, password, cpassword, isTutor });
        if (response.status === 200) {
            const data = response.data.user;
            return data;
        } else {
            const errorData = response.data;
            return rejectWithValue(errorData);
        }
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const signuser = createAsyncThunk("user/signin", async (user, {rejectWithValue})=>{
    try {
        const {email, password} = user;
        const response = await axios.post("http://localhost:8000/user/signin",
            {email, password})
        if(response.status === 200){
            const data = response.data;
            return data
        }else{
            const errorData = response.data;
            return rejectWithValue(errorData)
        }
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

const initialState = {
    status: "idle",
    userData: [],
    error: null
};

const userSlice = createSlice({
    name: "formsection",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.status = "pending";
        })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userData.push(action.payload);
                state.error = null;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(signuser.pending, (state)=>{
                state.status = "pending"
            })
            .addCase(signuser.fulfilled, (state, action)=>{
                state.status = "succeeded"
                state.userData.push(action.payload)
            })
            .addCase(signuser.rejected, (state, action)=>{
                state.status = "Failed"
                state.error = action.payload
            })
    }
});

export const userReducer = userSlice.reducer;
export const userSelector = (state) => state.user.userData;

