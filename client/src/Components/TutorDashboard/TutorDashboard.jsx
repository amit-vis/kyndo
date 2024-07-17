import React from "react";
import DashboardNavbar from "../DashboardNavbar";
import thumbnail from '../../assets/thumbnail.png';
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

export default function TutorDashboard() {

    const navigate = useNavigate();

    const manageCourse = (value) => {
        navigate(`/manage-course/${value}`);
    }

    const addCourse = () => {
        navigate('/upload-course');
    }

    return (
        <>
        <DashboardNavbar />
        <div className="dashboard">
            <div className="dashboard-content">
                <p className="welcomeback">
                    Welcome back, username!
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