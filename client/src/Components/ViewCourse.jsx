import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import SyllabusViewer from "./SyllabusViewer";
import DashboardNavbar from "./DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getUser, userSelector } from "../redux/reducer/formReducer";
import { courseSelector, getSinglecourse  } from "../redux/reducer/tutorReducer";
import { VideoModal } from "./videoPlayerModal/VideoPlayer";

export default function ViewCourse() {
    const { role, id } = useParams();
    const dispatch = useDispatch();
    const {singleCourseData} = useSelector(courseSelector);
    const {userData} = useSelector(userSelector);

    const [syllabusVisible, setSyllabusVisible] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);

    const handleVideoPlayer = ()=>{
        setShowVideoModal(!showVideoModal)
    }

    const isTutor = role === "tutor"

    useEffect(() => {
        dispatch(getUser(isTutor));
        dispatch(getSinglecourse(id));
    }, [dispatch, id, isTutor]);
    

    const viewSyllabus = () => {
        document.getElementById('manage-course').classList.add('blur');
        setSyllabusVisible(true);
    }

    const dateObject = new Date(singleCourseData?.createdAt)
    const formatedDate = dateObject.toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    const closeSyllabus = () => {
        document.getElementById('manage-course').classList.remove('blur');
        setSyllabusVisible(false);
    }

    return (
        <>
            <DashboardNavbar user="student" />
            <SyllabusViewer findData={singleCourseData} visible={syllabusVisible} closeSyllabus={closeSyllabus} />
            <div id="manage-course" className="manage-course">
                <div className="courses-head">{singleCourseData ? singleCourseData.title : "Zidio UI/UX Training Session"}</div>
                <div className="course-thumbnail">
                    <div className="course">
                        <div className="course-card">
                            <img 
                                src={singleCourseData?.courseThumbnail || 'default-thumbnail.png'} 
                                alt={singleCourseData?.title || 'Course Thumbnail'} 
                                onClick={handleVideoPlayer}
                            />
                            <VideoModal 
                            userId={userData?._id}
                            sourceVideo={singleCourseData}
                            show={showVideoModal} 
                            onHide={()=>setShowVideoModal(false)} />
                        </div>
                    </div>
                </div>
                <div className="row course-desc">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="sub-des">
                            <p className="subtitle">Course Name:</p>
                            <p className="subtitle-content">{singleCourseData?.title || 'N/A'}</p>
                        </div>
                        <div className="sub-des">
                            <p className="subtitle">Author Name:</p>
                            <p className="subtitle-content">{singleCourseData?.author || 'N/A'}</p>
                        </div>
                        <div className="sub-des">
                            <p className="subtitle">Upload Date:</p>
                            <p className="subtitle-content">{singleCourseData ? formatedDate : 'N/A'}</p>
                        </div>
                        <div className="sub-des">
                            <p className="subtitle">Course Description:</p>
                            <p className="subtitle-content">{singleCourseData?.description || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-sm-12">
                        <div className="sub-des">
                            <p className="subtitle">Prerequisites:</p>
                            <div className="subtitle-content">
                                <p>{singleCourseData?.prerequisites ? "Yes" : "No"}</p>
                                <p style={{ display: singleCourseData?.prerequisites ? 'block' : 'none' }}>
                                    {singleCourseData?.prerequisites || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="sub-des">
                            <p className="subtitle">Notes:</p>
                            <div className="subtitle-content">
                                <a href={singleCourseData?.courseNotes} className="subtitle-content text-light">click</a>
                                <small>Note:- Kindly put .pdf extension at the end of the downloaded file</small>
                            </div>
                        </div>
                        <div className="sub-des">
                            <p className="subtitle">Assignment:</p>
                            <a href={singleCourseData?.courseAssignments} className="subtitle-content text-light">click</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                            <button className="btn update" onClick={viewSyllabus}>View Syllabus</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );    
}
