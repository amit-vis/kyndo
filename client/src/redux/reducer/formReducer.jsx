import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk("user/register", async (user, { rejectWithValue }) => {
    try {
        const { name, email, password, cpassword, isTutor } = user;
        const response = await axios.post("http://localhost:8000/user/create",
            { name, email, password, cpassword, isTutor });
        if (response.status === 200) {
            const data = response.data;
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

export const signuser = createAsyncThunk("user/signin", async (user, { rejectWithValue }) => {
    try {
        const { email, password, isTutor } = user;
        const response = await axios.post("http://localhost:8000/user/signin",
            { email, password, isTutor })
        if (response.status === 200) {
            const data = response.data;
            return data
        } else {
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
});

export const getUser = createAsyncThunk("user/details", async (isTutor, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token")
        const endpoint = isTutor ? "/view-tutor" : "/view-user"
        const response = await axios.get(`http://localhost:8000/user/${endpoint}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            const data = response.data
            return data
        } else {
            const errorData = response.data
            return rejectWithValue(errorData)
        }
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const logoutUser = createAsyncThunk("user/signout", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.post("http://localhost:8000/user/logout",{},{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            const data = response.data
            return data
        } else {
            const errorData = response.data
            return rejectWithValue(errorData)
        }
    } catch (error) {
        if (error.response) {
            console.error("Server responded with error:", error.response.data); // Log server response
            return rejectWithValue(error.response.data);
        } else {
            console.error("Error message:", error.message); // Log error message
            return rejectWithValue(error.message);
        }
    }
})


const initialState = {
    status: "idle",
    userData: null,
    user: [],
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
                state.user.push(action.payload)
                state.error = null;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(signuser.pending, (state) => {
                state.status = "pending"
            })
            .addCase(signuser.fulfilled, (state, action) => {
                state.status = "succeeded"
                localStorage.setItem("token", action.payload.token)
            })
            .addCase(signuser.rejected, (state, action) => {
                state.status = "Failed"
                state.error = action.payload
            })
            .addCase(getUser.pending, (state) => {
                state.status = "Pending"
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.userData = action.payload.user
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = "Failed"
                state.error = action.payload
            })
            .addCase(logoutUser.pending, (state)=>{
                state.status = "Pending"
            })
            .addCase(logoutUser.fulfilled, (state, action)=>{
                state.status = "succeeded"
            })
            .addCase(logoutUser.rejected, (state, action)=>{
                state.status = "Failed"
                state.error = action.payload
            })
    }
});

export const userReducer = userSlice.reducer;
export const userSelector = (state) => state.user;

