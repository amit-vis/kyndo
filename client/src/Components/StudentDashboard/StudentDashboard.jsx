import React, { useEffect, useState } from "react";
import DashboardNavbar from "../DashboardNavbar";
import thumbnail from '../../assets/thumbnail.png';
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { getUser, userSelector } from "../../redux/reducer/formReducer";
import { useNavigate } from "react-router-dom";
import { courseSelector, getAllCourse } from "../../redux/reducer/tutorReducer";
import { deleteEnrollCourse, getEnrollCourse, studentSelector } from "../../redux/reducer/studentReducer";
import { Notification } from "../Notification";

export default function StudentDashboard() {
    const dispatch = useDispatch();
    const {userData} = useSelector(userSelector);
    const { AllCourseData, status, error} = useSelector(courseSelector);
    const {enrollCourseData} = useSelector(studentSelector);

    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const deleteCourse = async (id,videoId)=>{
        try {
            const result = await dispatch(deleteEnrollCourse(id));
            if(deleteEnrollCourse.fulfilled.match(result)){
                setShowModal(true);
                setIsError(false);
                setMessage(result.payload.message);
                dispatch(getEnrollCourse())
                setTimeout(()=>{
                    setShowModal(false)
                },3000)
                localStorage.removeItem(`video-progress-${videoId}`)
            }else{
                setShowModal(true);
                setIsError(true);
                setMessage(result.payload.message);
                setTimeout(()=>{
                    setShowModal(false)
                },3000)
            }
        } catch (error) {
            setShowModal(true);
            setIsError(true);
            setMessage(error.message);
            setTimeout(()=>{
                setShowModal(false)
            },3000)
        }
    }

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
        const progress = localStorage.getItem(`video-progress-${userData?._id}-${videoId}`);
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
                        <button onClick={()=>deleteCourse(item._id,item.course._id)}>delete</button>
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
            <Notification
            show={showModal} 
            message={message}
            onHide={() => setShowModal(false)}
            isError={isError}
            />
        </>
    );
}
