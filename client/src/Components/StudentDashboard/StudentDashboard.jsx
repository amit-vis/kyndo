import React, { useEffect } from "react";
import DashboardNavbar from "../DashboardNavbar";
import thumbnail from '../../assets/thumbnail.png';
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { getUser, userSelector } from "../../redux/reducer/formReducer";
import { useNavigate } from "react-router-dom";
import { courseSelector, getAllCourse } from "../../redux/reducer/tutorReducer";
import { getEnrollCourse, studentSelector } from "../../redux/reducer/studentReducer";

export default function StudentDashboard() {
    const dispatch = useDispatch();
    const {userData} = useSelector(userSelector);
    const { AllCourseData, status, error} = useSelector(courseSelector);
    const {enrollCourseData} = useSelector(studentSelector);

    // const data = enrollCourseData?.map((item) => {
    //     return item.course.map((courseItem) => {
    //         console.log(courseItem);
    //         return courseItem; // Return the courseItem if you need to collect these into a new array
    //     });
    // });
    
    // console.log("Here is the data", data);

    useEffect(()=>{
        dispatch(getUser())
        dispatch(getAllCourse())
        dispatch(getEnrollCourse())
    },[dispatch])

    const navigate = useNavigate();

    const manageCourse = (value) => {
        navigate(`/student/enroll/${value}`);
    }

    const getProgressVideo = (videoId)=>{
        const progress = localStorage.getItem(`video-progress-${videoId}`);
        return progress ? parseFloat(progress): 0
    }

    const viewcourse = (value)=>{
        navigate(`/student/view-course/${value}`)
    }

    return (
        <>
            <DashboardNavbar user="student" />
            <div className="dashboard">
                <div className="dashboard-content">
                    <p className="welcomeback">
                        Welcome back, {userData?.name}!
                    </p>
                    <p className="courses-head">Courses</p>
                    <div className="courses">
                        {AllCourseData?.map((item, index) => (
                                <div className="course" key={index}>
                                    <div className="course-card">
                                        <img src={item.courseThumbnail} alt={item.title} onClick={() => manageCourse(item._id)} />
                                    </div>
                                    <p className="course-name" onClick={() => manageCourse(item._id)}>
                                        {item.title}
                                    </p>
                                </div>
                            ))}
                    </div>
                    <p className="courses-head">My Courses</p>
                    {enrollCourseData?.map((item,index)=>(
                        <div className="courses" key={index}>
                        <div className="course">
                            <div className="course-card">
                                <img src={item? item.course.courseThumbnail: thumbnail} alt={item.course.title} onClick={()=>viewcourse(item.course._id)} />
                            </div>
                            <p className="course-name">{item? item.course.title:"Zidio UI/UX Training Session"}</p>
                            <div className="bar">
                                <div className="completed">
                                    <div className="progress" style={{ width: `${getProgressVideo(item.course._id)}%` }}></div>
                                </div>
                                <p className="percentage">{Math.round(getProgressVideo(item.course._id))}%</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                <Footer />
            </div>
        </>
    );
}
