import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const EnrollCourse = createAsyncThunk("enroll/course", async (id, {rejectWithValue})=>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`http://localhost:8000/enroll/${id}`,{
            course: id
        },{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        if(response.status === 200){
            const data = response.data;
            return data
        }else{
            const errorData = response.data;
            return rejectWithValue(errorData)
        }
    } catch (error) {
        if (error.response) {
            console.error("Server responded with error:", error.response.data);
            return rejectWithValue({ message: 'Server error occurred', ...error.response.data });
        } else {
            console.error("Error message:", error.message);
            return rejectWithValue({ message: 'Network or other error occurred', error: error.message });
        }
    }
});

export const getEnrollCourse = createAsyncThunk("get/enrollcourse", async (_, {rejectWithValue})=>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/enroll/getCourse",{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });
        if(response.status === 200){
            const data = response.data;
            return data
        }else{
            const errorData = response.data;
            return rejectWithValue(errorData)
        }
    } catch (error) {
        if (error.response) {
            console.error("Server responded with error:", error.response.data);
            return rejectWithValue({ message: 'Server error occurred', ...error.response.data });
        } else {
            console.error("Error message:", error.message);
            return rejectWithValue({ message: 'Network or other error occurred', error: error.message });
        }
    }
})

export const enrollCount = createAsyncThunk("enroll/count", async (id, {rejectWithValue})=>{
    try {
        const response = await axios.get(`http://localhost:8000/enroll/enroll-Count/${id}`)
        if(response.status === 200){
            const data = response.data;
            return data
        }else{
            const errorData = response.data;
            return rejectWithValue(errorData)
        }
    } catch (error) {
        if (error.response) {
            console.error("Server responded with error:", error.response.data);
            return rejectWithValue({ message: 'Server error occurred', ...error.response.data });
        } else {
            console.error("Error message:", error.message);
            return rejectWithValue({ message: 'Network or other error occurred', error: error.message });
        }
    }
})

export const deleteEnrollCourse = createAsyncThunk("enroll/delete", async (id, {rejectWithValue})=>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`http://localhost:8000/enroll/delete/${id}`,{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });
        if(response.status === 200){
            const data = response.data;
            return data
        }else{
            const errorData = response.data;
            return rejectWithValue(errorData)
        }
    } catch (error) {
        if (error.response) {
            console.error("Server responded with error:", error.response.data);
            return rejectWithValue({ message: 'Server error occurred', ...error.response.data });
        } else {
            console.error("Error message:", error.message);
            return rejectWithValue({ message: 'Network or other error occurred', error: error.message });
        }
    }
})

const initialState = {
    status: "idle",
    enrollCourseData: [],
    count: null,
    error: null
}

const studentSlice = createSlice({
    name: "student_course_section",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(EnrollCourse.pending, (state)=>{
            state.status = "pending"
        })
        .addCase(EnrollCourse.fulfilled, (state)=>{
            state.status = "fullfilled"
        })
        .addCase(EnrollCourse.rejected, (state, action)=>{
            state.status = "Failed"
            state.error = action.payload
        })
        .addCase(getEnrollCourse.pending, (state)=>{
            state.status= "pending"
        })
        .addCase(getEnrollCourse.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.enrollCourseData=action.payload.enrollment
        })
        .addCase(getEnrollCourse.rejected, (state, action)=>{
            state.status = "Failed"
            state.error = action.payload
        })
        .addCase(enrollCount.pending, (state)=>{
            state.status = "pending"
        })
        .addCase(enrollCount.fulfilled, (state,action)=>{
            state.status = "succeeded"
            state.count = action.payload.count
        })
        .addCase(deleteEnrollCourse.pending, (state)=>{
            state.status = "pending"
        })
        .addCase(deleteEnrollCourse.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.enrollCourseData = state.enrollCourseData.filter(item=>item._id !== action.payload.enrollId)
        })
        .addCase(deleteEnrollCourse.rejected, (state, action)=>{
            state.status = "Failed"
            state.error = action.payload
        })
    }
});

export const studentReducer = studentSlice.reducer;
export const studentSelector = (state)=>state.student;