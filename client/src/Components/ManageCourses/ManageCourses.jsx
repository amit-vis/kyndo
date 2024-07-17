import React from "react";
import DashboardNavbar from "../DashboardNavbar";
import thumbnail from '../../assets/thumbnail.png';
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

export default function ManageCourses() {

    const navigate = useNavigate();

    const updateCourse = () => {
        navigate('/update-course');
    }

    const deleteCourse = () => {
        
    }

    return(
        <>
        <DashboardNavbar />
        <div className="manage-course">
            <div className="courses-head">Zidio UI/UX Training Session</div>
            <div className="course-thumbnail">
                {/* courses */}
                <div className="course">
                    <div className="course-card">
                        {/* thumbnail */}
                        <img src={thumbnail} alt=""
                            data-course="Zidio UI/UX Training Session" />
                    </div>
                </div>
            </div>
            <div className="row course-desc">
                <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="sub-des">
                        <p className="subtitle">Course Name:</p>
                        <p className="subtitle-content">Zidio UI/UX Training Session</p>
                    </div>
                    <div className="sub-des">
                        <p className="subtitle">Author Name:</p>
                        <p className="subtitle-content">Zidio Development</p>
                    </div>
                    <div className="sub-des">
                        <p className="subtitle">Upload Date:</p>
                        <p className="subtitle-content">10 July 2024</p>
                    </div>
                    <div className="sub-des">
                        <p className="subtitle">Course Description:</p>
                        <p className="subtitle-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-sm-12">
                    <div className="sub-des">
                        <p className="subtitle">Prerequisites:</p>
                        <div className="subtitle-content">
                            <p>Yes</p>
                            {/* if prequisites is yes, then show the following text, else set display to none */}
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo</p>
                        </div>
                    </div>
                    <div className="sub-des">
                        <p className="subtitle">Author Name:</p>
                        <p className="subtitle-content">Zidio Development</p>
                    </div>
                    <div className="sub-des">
                        <p className="subtitle">Total Enrollments:</p>
                        <p className="subtitle-content">20,000</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12"><button className="btn delete" onClick={deleteCourse}>Delete Course</button></div>
                <div className="col-lg-6 col-md-6 col-sm-12"><button className="btn update" onClick={updateCourse}>Update Course</button></div>
            </div>
        </div>
        <Footer />
        </>
    )
}