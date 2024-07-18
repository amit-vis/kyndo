import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk("add/register", async (user, {rejectWithValue})=>{
    try {
        const {name, email, password,cpassword} = user;
        const response = await axios.post("http://localhost:8000/create",
            {name, email, password,cpassword});
            if(response.status === 200){
                const data = response.data.user;
                return data
            }else{
                const errorData = response.data;
                return errorData
            }
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

const initialstate = {
    status: "idle",
    userData: null,
    error: null
}

const userSlice = createSlice({
    name:"formsection",
    initialState: initialstate,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(createUser.pending, (state)=>{
            state.status = "pending"
        })
        .addCase(createUser.fulfilled, (state,action)=>{
            state.status = "succeeded";
            state.userData = action.payload;
            state.error = null
        })
        .addCase(createUser.rejected, (state,action)=>{
            state.status = "Failed";
            state.error = action.payload
        })
    }
});

export const userReducer = userSlice.reducer;
export const userSelector = (state)=>state.user.userData;