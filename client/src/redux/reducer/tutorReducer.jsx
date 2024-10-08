import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const createCourse = createAsyncThunk("create/course", async (courseData, {rejectedWithValue})=>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:8000/course/create", courseData, {
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        if(response.status === 200){
            const data = response.data;
            return data
        }else{
            const errorData = response.data;
            return rejectedWithValue(errorData)
        }
    } catch (error) {
        if (error.response) {
            console.error("Server responded with error:", error.response.data);
            return rejectedWithValue({ message: 'Server error occurred', ...error.response.data });
        } else {
            console.error("Error message:", error.message);
            return rejectedWithValue({ message: 'Network or other error occurred', error: error.message });
        }
    }
})

export const getCourse = createAsyncThunk("course/getdetails", async (_, {rejectedWithValue})=>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/course/get-course",{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        if(response.status === 200){
            const data = response.data;
            return data
        }else{
            const errorData = response.data;
            return rejectedWithValue(errorData)
        }
    } catch (error) {
        if (error.response) {
            console.error("Server responded with error:", error.response.data);
            return rejectedWithValue({ message: 'Server error occurred', ...error.response.data });
        } else {
            console.error("Error message:", error.message);
            return rejectedWithValue({ message: 'Network or other error occurred', error: error.message });
        }
    }
});

export const getSinglecourse = createAsyncThunk("get/single-course", async (id, {rejectedWithValue})=>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/course/getsingle-course/${id}`,{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        if(response.status === 200){
            const data = response.data;
            return data
        }else{
            const errorData = response.data;
            return rejectedWithValue(errorData)
        }
    } catch (error) {
        if (error.response) {
            console.error("Server responded with error:", error.response.data);
            return rejectedWithValue({ message: 'Server error occurred', ...error.response.data });
        } else {
            console.error("Error message:", error.message);
            return rejectedWithValue({ message: 'Network or other error occurred', error: error.message });
        }
    }
});

export const updateCourse = createAsyncThunk("course/edit", async ({id, coursedata},{rejectedWithValue})=>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(`http://localhost:8000/course/update/${id}`, coursedata, {
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        if(response.status === 200){
            const data = response.data;
            return data
        }else{
            const errorData = response.data;
            return rejectedWithValue(errorData)
        }
    } catch (error) {
        if (error.response) {
            console.error("Server responded with error:", error.response.data);
            return rejectedWithValue({ message: 'Server error occurred', ...error.response.data });
        } else {
            console.error("Error message:", error.message);
            return rejectedWithValue({ message: 'Network or other error occurred', error: error.message });
        }
    }
});

export const deleteCourses = createAsyncThunk("course/delete", async (id, {rejectedWithValue})=>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`http://localhost:8000/course/delete/${id}`,{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });
        if(response.status === 200){
            const data = response.data
            return data
        }else{
            const errorData = response.data;
            return rejectedWithValue(errorData)
        }
    } catch (error) {
        if (error.response) {
            console.error("Server responded with error:", error.response.data);
            return rejectedWithValue({ message: 'Server error occurred', ...error.response.data });
        } else {
            console.error("Error message:", error.message);
            return rejectedWithValue({ message: 'Network or other error occurred', error: error.message });
        }
    }
});

export const getAllCourse = createAsyncThunk("get/AllCourse", async (_,{rejectedWithValue})=>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8000/course/allcourse',{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        if(response.status === 200){
            console.log(response, "i m fron reducer")
            const data = response.data;
            return data
        }else{
            const errorData = response.data;
            return rejectedWithValue(errorData)
        }
    } catch (error) {
        if (error.response) {
            console.error("Server responded with error:", error.response.data);
            return rejectedWithValue({ message: 'Server error occurred', ...error.response.data });
        } else {
            console.error("Error message:", error.message);
            return rejectedWithValue({ message: 'Network or other error occurred', error: error.message });
        }
    }
})

const initialState = {
    status: "idle",
    courseData: [],
    singleCourseData: null,
    AllCourseData: [],
    error: null
}

const courseSlice = createSlice({
    name: "course_section",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(createCourse.pending, (state)=>{
            state.status = "pending..."
        })
        .addCase(createCourse.fulfilled, (state)=>{
            state.status = "fullfilled"
        })
        .addCase(createCourse.rejected, (state, action)=>{
            state.status = "Failed"
            state.error = action.payload
        })
        .addCase(getCourse.pending, (state)=>{
            state.status = "pending..."
        })
        .addCase(getCourse.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.courseData = action.payload.course
        })
        .addCase(getCourse.rejected, (state, action)=>{
            state.status = "Failed"
            state.error = action.payload
        })
        .addCase(getSinglecourse.pending, (state)=>{
            state.status = "pending..."
        })
        .addCase(getSinglecourse.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.singleCourseData = action.payload.course
        })
        .addCase(getSinglecourse.rejected, (state, action)=>{
            state.status = "Failed"
            state.error = action.payload
        })
        .addCase(updateCourse.pending, (state)=>{
            state.status = "Pending.."
        })
        .addCase(updateCourse.fulfilled, (state, action)=>{
            state.status = "Succeeded"
            state.courseData = state.courseData.filter(item=>item._id !== action.payload.courseId);
        })
        .addCase(updateCourse.rejected, (state, action)=>{
            state.status = "Failed"
            state.error = action.payload
        })
        .addCase(deleteCourses.pending, (state)=>{
            state.status = "pending.."
        })
        .addCase(deleteCourses.fulfilled, (state, action) => {
            state.status = "succeeded";
            const courseId = action.payload.courseId; 
            const index = state.courseData.findIndex(course => course._id === courseId);
            if (index !== -1) {
                state.courseData.splice(index, 1); 
            }
        })
        .addCase(deleteCourses.rejected, (state, action)=>{
            state.status = "Failed"
            state.error = action.payload
        })
        .addCase(getAllCourse.pending, (state)=>{
            state.status = "pending"
        })
        .addCase(getAllCourse.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.AllCourseData = action.payload.course
        })
        .addCase(getAllCourse.rejected, (state, action)=>{
            state.status = "Failed"
            state.error = action.payload
        })
    }
});

export const courseReducer = courseSlice.reducer;
export const courseSelector = (state)=>state.course;