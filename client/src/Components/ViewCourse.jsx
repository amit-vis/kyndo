// import React, { useEffect, useState } from "react";
// import Footer from "./Footer";
// import { useNavigate, useParams } from "react-router-dom";
// import SyllabusViewer from "./SyllabusViewer";
// import DashboardNavbar from "./DashboardNavbar";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser, userSelector } from "../redux/reducer/formReducer";
// import { courseSelector, getSinglecourse } from "../redux/reducer/studentReducer";
// import { courseSelector as CS, getSinglecourse as GCS } from "../redux/reducer/tutorReducer";
// import axios from "axios";

// export default function ViewCourse() {
//     const { role, id } = useParams();
//     const dispatch = useDispatch()
//     const navigate = useNavigate();
//     const { singleCourseData, status, error } = useSelector(role === "student"? courseSelector: CS);
//     const { userData } = useSelector(userSelector);

//     useEffect(() => {
//         dispatch(role === "student" ? getSinglecourse(id) : GCS(id));
//         dispatch(role === "tutor" ? getUser(true) : getUser(false));
//     }, [dispatch, id, role]);
    

//     const [syllabusVisible, setSyllabusVisible] = useState(false);
//     const [isEnrolled, setIsEnrolled] = useState(false);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!userData?._id) {
//             console.error('User data is not available.');
//             setLoading(false);
//             return;
//         }
//     }, [id, userData?._id]);
    
//     useEffect(() => {
//         console.log('Checking enrollment status...');
//         const checkEnrollment = async () => {
//             if (!userData?._id) {
//                 console.error('User data is not available.');
//                 setLoading(false);
//                 return;
//             }
    
//             try {
//                 const response = await axios.get(`/api/enrollment/check/${id}`, {
//                     params: { userId: userData._id }
//                 });
//                 console.log('Enrollment status:', response.data.enrolled);
//                 setIsEnrolled(response.data.enrolled);
//             } catch (error) {
//                 console.error('Error checking enrollment status:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
    
//         checkEnrollment();
//     }, [id, userData?._id]);      

//     const viewSyllabus = () => {
//         document.getElementById('manage-course').classList.add('blur');
//         setSyllabusVisible(true);
//     }

//     const dateObject = new Date(singleCourseData?.createdAt)
//     const formatedDate = dateObject.toLocaleDateString("en-us", {
//         year: "numeric",
//         month: "long",
//         day: "numeric"
//     })

//     const closeSyllabus = () => {
//         document.getElementById('manage-course').classList.remove('blur');
//         setSyllabusVisible(false);
//     }

//     const enrollCourse = async () => {
//         try {
//             const payload = {
//                 userId: userData._id,
//                 courseId: id
//             };
//             console.log('Enrolling with payload:', payload);
//             const response = await axios.post('http://localhost:8000/api/enrollment/enroll', payload);
//             setIsEnrolled(true);
//             navigate('/tutor/course-enrolled');
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 console.error('Error enrolling in course:', error.response.data.message);
//                 alert(error.response.data.message); // Display specific error message
//             } else {
//                 console.error('Unexpected error:', error);
//                 alert('An unexpected error occurred.');
//             }
//         }
//     };    

//     if (loading) return <p>Loading...</p>;
//     if (!userData) return <p>User data not found.</p>;


//     return (
//         <>
//             <DashboardNavbar user={role} />
//             <SyllabusViewer visible={syllabusVisible} closeSyllabus={closeSyllabus} />
//             <div id="manage-course" className="manage-course">
//                 <div className="courses-head">
//                     {singleCourseData ? singleCourseData.title : 'Loading...'}
//                 </div>
//                 <div className="course-thumbnail">
//                     <div className="course">
//                         <div className="course-card">
//                             <img 
//                                 src={singleCourseData?.courseThumbnail || 'default-thumbnail.png'} 
//                                 alt={singleCourseData?.title || 'Course Thumbnail'} 
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row course-desc">
//                     <div className="col-sm-12 col-md-6 col-lg-6">
//                         <div className="sub-des">
//                             <p className="subtitle">Course Name:</p>
//                             <p className="subtitle-content">{singleCourseData?.title || 'N/A'}</p>
//                         </div>
//                         <div className="sub-des">
//                             <p className="subtitle">Author Name:</p>
//                             <p className="subtitle-content">{singleCourseData?.author || 'N/A'}</p>
//                         </div>
//                         <div className="sub-des">
//                             <p className="subtitle">Upload Date:</p>
//                             <p className="subtitle-content">{singleCourseData ? formatedDate : 'N/A'}</p>
//                         </div>
//                         <div className="sub-des">
//                             <p className="subtitle">Course Description:</p>
//                             <p className="subtitle-content">{singleCourseData?.description || 'N/A'}</p>
//                         </div>
//                     </div>
//                     <div className="col-md-6 col-lg-6 col-sm-12">
//                         <div className="sub-des">
//                             <p className="subtitle">Prerequisites:</p>
//                             <div className="subtitle-content">
//                                 <p>{singleCourseData?.prerequisites ? "Yes" : "No"}</p>
//                                 <p style={{ display: singleCourseData?.prerequisites ? 'block' : 'none' }}>
//                                     {singleCourseData?.prerequisites || 'N/A'}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="sub-des">
//                             <p className="subtitle">Total Enrollments:</p>
//                             <p className="subtitle-content">{singleCourseData?.enrollments || 'N/A'}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-lg-12 col-md-12 col-sm-12">
//                         {isEnrolled ? (
//                             <button className="btn update" onClick={viewSyllabus}>View Syllabus</button>
//                         ) : (
//                             <button className="btn update" onClick={enrollCourse} disabled={loading}>
//                                 {loading ? 'Enrolling...' : 'Enroll'}
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );    
// }
