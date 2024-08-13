import React, { useEffect, useState } from "react";
import DashboardNavbar from "../DashboardNavbar";
import thumbnail from '../../assets/thumbnail.png';
import Footer from "../Footer";
import { useNavigate, useParams } from "react-router-dom";
import SyllabusViewer from "../SyllabusViewer";
import { useDispatch, useSelector } from "react-redux";
import { courseSelector, getSinglecourse } from "../../redux/reducer/tutorReducer";
import { getUser, userSelector } from "../../redux/reducer/formReducer";
import { Notification } from "../Notification";
import { EnrollCourse } from "../../redux/reducer/studentReducer";

export default function EnrollCourses() {
    const {id} = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {singleCourseData, status, error} = useSelector(courseSelector);
    const {userData} = useSelector(userSelector);

    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(()=>{
        dispatch(getSinglecourse(id))
        dispatch(getUser(false))
    },[dispatch, id])
    const enrollCourse = async () => {
        try {
            const result = await dispatch(EnrollCourse(singleCourseData._id));
            if(EnrollCourse.fulfilled.match(result)){
                setShowModal(true);
                setIsError(false);
                setMessage(result.payload.message);
                setTimeout(()=>{
                    setShowModal(false)
                    navigate(`/student-dashboard/${userData._id}`)
                },3000)
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

 

    const [syllabusVisible, setSyllabusVisible] = useState(false);

    const viewSyllabus = () => {
        document.getElementById('manage-course').classList.add('blur');
        setSyllabusVisible(true);
    }
    const dateObject = new Date(singleCourseData?.createdAt)
    const formatedDate = dateObject.toLocaleDateString("en-us",{
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    const closeSyllabus = () => {
        document.getElementById('manage-course').classList.remove('blur');
        setSyllabusVisible(false);
    }

    return(
        <>
        <DashboardNavbar user="student" />
        <SyllabusViewer findData={singleCourseData} visible={syllabusVisible} closeSyllabus={closeSyllabus}  />
        <div id="manage-course" className="manage-course">
            <div className="courses-head">{singleCourseData?singleCourseData.title:"Zidio UI/UX Training Session"}</div>
            <div className="course-thumbnail">
                {/* courses */}
                <div className="course">
                    <div className="course-card">
                        {/* thumbnail */}
                        <img src={singleCourseData?singleCourseData.courseThumbnail:thumbnail} alt={singleCourseData?.title}
                            data-course="Zidio UI/UX Training Session" />
                    </div>
                </div>
            </div>
            <div className="row course-desc">
                <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="sub-des">
                        <p className="subtitle">Course Name:</p>
                        <p className="subtitle-content">{singleCourseData?singleCourseData.title:"Zidio UI/UX Training Session"}</p>
                    </div>
                    <div className="sub-des">
                        <p className="subtitle">Author Name:</p>
                        <p className="subtitle-content">{singleCourseData?singleCourseData.author:"Zidio Development"}</p>
                    </div>
                    <div className="sub-des">
                        <p className="subtitle">Upload Date:</p>
                        <p className="subtitle-content">{singleCourseData?formatedDate:"10 July 2024"}</p>
                    </div>
                    <div className="sub-des">
                        <p className="subtitle">Course Description:</p>
                        <p className="subtitle-content">{singleCourseData?singleCourseData.description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-sm-12">
                    <div className="sub-des">
                        <p className="subtitle">Prerequisites:</p>
                        <div className="subtitle-content">
                            <p>Yes</p>
                            {/* if prequisites is yes, then show the following text, else set display to none */}
                            <p>{singleCourseData?singleCourseData.prerequisites:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo"}</p>
                        </div>
                    </div>
                    <div className="sub-des">
                        <p className="subtitle">Author Name:</p>
                        <p className="subtitle-content">{singleCourseData?singleCourseData.author:"Zidio Development"}</p>
                    </div>
                    <div className="sub-des">
                        <p className="subtitle">Total Enrollments:</p>
                        <p className="subtitle-content">20,000</p>
                    </div>
                </div>
            </div>
           
            <div className="row">

                <div className="col-lg-12 col-md-12 col-sm-12"><button className="btn update" onClick={enrollCourse}>Enroll</button></div>
            </div>
        </div>
        <Footer />
        <Notification
        show={showModal}
        onHide={() => setShowModal(false)}
        message={message}
        isError={isError}
        />
        </>
    )
}