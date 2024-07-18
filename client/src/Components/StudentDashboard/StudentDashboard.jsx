import React from "react";
import DashboardNavbar from "../DashboardNavbar";
import thumbnail from '../../assets/thumbnail.png';
import Footer from "../Footer";

export default function StudentDashboard() {


    return (
        <>
        <DashboardNavbar user="student" />
        <div className="dashboard">
            <div className="dashboard-content">
                <p className="welcomeback">
                    Welcome back, username!
                </p>
                <p className="courses-head">Courses</p>
                <div className="courses">
                    {/* courses */}
                    <div className="course">
                        <div className="course-card">
                            {/* thumbnail */}
                            <img src={thumbnail} alt="" />
                        </div>
                        {/* course-name */}
                        <p className="course-name">Zidio UI/UX Training Session</p>
                    </div>
                </div>
                <p className="courses-head">My Courses</p>
                <div className="courses">
                    {/* courses */}
                    <div className="course">
                        <div className="course-card">
                            {/* thumbnail */}
                            <img src={thumbnail} alt="" />
                        </div>
                        {/* course-name */}
                        <p className="course-name">Zidio UI/UX Training Session</p>
                        <div className="bar">
                            <div className="completed">
                                {/* progress */}
                                <div className="progress" style={{width: '75%'}}></div>
                            </div>
                            {/* percentage */}
                            <p className="percentage">75%</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
}