import React, { useEffect } from "react";
import DashboardNavbar from "../DashboardNavbar";
import thumbnail from '../../assets/thumbnail.png';
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, userSelector } from "../../redux/reducer/formReducer";

export default function TutorDashboard() {

    const dispatch = useDispatch();
    const {userData, state, error} = useSelector(userSelector);

    useEffect(()=>{
        dispatch(getUser(true))
    },[])

    const navigate = useNavigate();

    const manageCourse = (value) => {
        navigate(`/tutor/manage-course`);
    }

    const addCourse = () => {
        navigate('/tutor/upload-course');
    }

    return (
        <>
        <DashboardNavbar user="tutor" />
        <div className="dashboard">
            <div className="dashboard-content">
                <p className="welcomeback">
                    Welcome back, {userData?.name}!
                </p>
                <p className="courses-head">Uploaded Courses</p>
                <div className="courses">
                    {/* courses */}
                    <div className="course">
                        <div className="course-card">
                            {/* thumbnail */}
                            <img src={thumbnail} alt=""
                                data-course="Zidio UI/UX Training Session"
                                onClick={(e) => manageCourse(e.currentTarget.dataset.course)} />
                        </div>
                        {/* course-name */}
                        <p className="course-name"
                            data-course="Zidio UI/UX Training Session"
                            onClick={(e) => manageCourse(e.currentTarget.dataset.course)} >
                                Zidio UI/UX Training Session
                        </p>
                    </div>
                </div>
                <div className="courses-head-div">
                    <p className="courses-head">All Courses</p>
                    <button className="signout" onClick={addCourse}>Add Course</button>
                </div>
                <div className="courses">
                    {/* courses */}
                    <div className="course">
                        <div className="course-card">
                            {/* thumbnail */}
                            <img src={thumbnail} alt=""
                                data-course="Zidio UI/UX Training Session"
                                onClick={(e) => manageCourse(e.currentTarget.dataset.course)} />
                        </div>
                        {/* course-name */}
                        <p className="course-name"
                            data-course="Zidio UI/UX Training Session"
                            onClick={(e) => manageCourse(e.currentTarget.dataset.course)} >
                                Zidio UI/UX Training Session
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
}