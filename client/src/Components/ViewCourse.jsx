import React, { useEffect, useState } from "react";
import thumbnail from '../assets/thumbnail.png';
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";
import SyllabusViewer from "./SyllabusViewer";
import DashboardNavbar from "./DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getUser, userSelector } from "../redux/reducer/formReducer";
import { courseSelector, getSinglecourse } from "../redux/reducer/studentReducer";

export default function ViewCourse() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { singleCourseData, status, error } = useSelector(courseSelector);
    const { userData } = useSelector(userSelector);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSinglecourse(id));
        dispatch(getUser());
    }, [dispatch, id]);

    const enrollCourse = () => {
        navigate('/student/course-enrolled');
    };

    const [syllabusVisible, setSyllabusVisible] = useState(false);

    const closeSyllabus = () => {
        document.getElementById('manage-course').classList.remove('blur');
        setSyllabusVisible(false);
    };

    if (status === 'pending...') return <p>Loading...</p>;
    if (status === 'Failed') return <p>{error?.message || 'Failed to load course'}</p>;
    if (!singleCourseData) return <p>No course data available</p>;

    const dateObject = new Date(singleCourseData.createdAt || 0);
    const formattedDate = dateObject.toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    console.log(singleCourseData)

    return (
        <>
            <DashboardNavbar user="student" />
            <SyllabusViewer visible={syllabusVisible} closeSyllabus={closeSyllabus} />
            <div id="manage-course" className="manage-course">
                <div className="courses-head">
                    {singleCourseData.title || 'Course Title'}
                </div>
                <div className="course-thumbnail">
                    <div className="course">
                        <div className="course-card">
                            <img src={singleCourseData.courseThumbnail} alt={singleCourseData.title || 'Course Thumbnail'} />
                        </div>
                    </div>
                </div>
                <div className="row course-desc">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="sub-des">
                            <p className="subtitle">Course Name:</p>
                            <p className="subtitle-content">{singleCourseData.title || 'N/A'}</p>
                        </div>
                        <div className="sub-des">
                            <p className="subtitle">Author Name:</p>
                            <p className="subtitle-content">{singleCourseData.author || 'N/A'}</p>
                        </div>
                        <div className="sub-des">
                            <p className="subtitle">Upload Date:</p>
                            <p className="subtitle-content">{formattedDate || 'N/A'}</p>
                        </div>
                        <div className="sub-des">
                            <p className="subtitle">Course Description:</p>
                            <p className="subtitle-content">{singleCourseData.description || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-sm-12">
                        <div className="sub-des">
                            <p className="subtitle">Prerequisites:</p>
                            <div className="subtitle-content">
                                <p>{singleCourseData.prerequisites ? "Yes" : "No"}</p>
                                <p style={{ display: singleCourseData.prerequisites ? 'block' : 'none' }}>
                                    {singleCourseData.prerequisites || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="sub-des">
                            <p className="subtitle">Total Enrollments:</p>
                            <p className="subtitle-content">{singleCourseData.enrollments || 'N/A'}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <button className="btn update" onClick={enrollCourse}>Enroll</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
