import React, { useEffect, useState } from "react";
import DashboardNavbar from "../DashboardNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { courseSelector, getSinglecourse, updateCourse } from "../../redux/reducer/tutorReducer";
import { Notification } from "../Notification";
import { userSelector } from "../../redux/reducer/formReducer";

export default function UpdateCourse() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {singleCourseData} = useSelector(courseSelector);
    const {userData} = useSelector(userSelector)
    const [courseData, setCourseData] = useState({
        title:"",
        author:"",
        description:"",
        videoUrl: null,
        prerequisites: "",
        syllabus:[],
        courseNotes:null,
        courseAssignments:null,
        courseThumbnail:null
    })
    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');
    const [select, setSelect] = useState('');
    const[weeks, setWeeks] = useState([{
        chapters: ['']
    }]);

    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();
    
    const addSkill = () => {
        if (currentSkill.trim()) {
            setSkills([...skills, currentSkill]);
            setCurrentSkill('');
        }
    };

    const addChapter = (weekIndex) => {
        const newWeeks = weeks.map((week, index) => {
            if (index === weekIndex) {
                return {
                    ...week,
                    chapters: [...week.chapters, '']
                };
            }
            return week;
        });
        setWeeks(newWeeks);
    };

    const addWeek = () => {
        setWeeks([...weeks, { chapters: [''] }]);
    };

    const handleChapterChange = (weekIndex, chapterIndex, event) => {
        const newWeeks = weeks.map((week, wIdx) => {
            if (wIdx === weekIndex) {
                return {
                    ...week,
                    chapters: week.chapters.map((chapter, cIdx) => {
                        if (cIdx === chapterIndex) {
                            return event.target.value;
                        }
                        return chapter;
                    })
                };
            }
            return week;
        });
        setWeeks(newWeeks);
    };

    const handleSkillChange = (event) => {
        setCurrentSkill(event.target.value);
    };

    const deleteSkill = (index) => {
        const newSkills = skills.filter((_, i) => i !== index);
        setSkills(newSkills);
    }

    const handleSelect = (event) => {
        setSelect(event.target.value);
    }

    const cancelUpdate = () => {
        navigate(`/tutor-dashboard/${id}`);
    }

    const proceedUpdate = async () => {
        try {
            console.log("im here")
            const formData = new FormData();
            formData.append("title", courseData.title);
            formData.append("author", courseData.author);
            formData.append("description", courseData.description);
            formData.append("videoUrl", courseData.videoUrl);
            formData.append("prerequisites", courseData.prerequisites);
            formData.append("syllabus", JSON.stringify(weeks));
            formData.append("courseNotes", courseData.courseNotes);
            formData.append("courseAssignments", courseData.courseAssignments);
            formData.append("courseThumbnail", courseData.courseThumbnail);
            const results = await dispatch(updateCourse({
                id: id,
                coursedata: formData
            }));
            if(updateCourse.fulfilled.match(results)){
                console.log("im inside")
                setCourseData({
                    title:"",
                    author:"",
                    description:"",
                    videoUrl: null,
                    prerequisites: "",
                    syllabus:[],
                    courseNotes:null,
                    courseAssignments:null,
                    courseThumbnail:null
                })
                setShowModal(true);
                setIsError(false);
                setMessage(results.payload.message);
                setTimeout(()=>{
                    setShowModal(false)
                    navigate(`/tutor/course-updated/${userData._id}`)
                },3000)
            }else{
                console.log(results.payload.message)
                setShowModal(true);
                setIsError(true);
                setMessage(results.payload.message);
                setTimeout(()=>{
                    setShowModal(false);
                },3000)
            }
        } catch (error) {
            console.log(error.message)
            setShowModal(true);
            setIsError(true);
            setMessage(error.message);
            setTimeout(()=>{
                setShowModal(false);
            },3000)
        }
    }

    useEffect(()=>{
        dispatch(getSinglecourse(id))
    },[dispatch,id])

    useEffect(()=>{
        if(singleCourseData){
            setCourseData({
                title:singleCourseData.title,
                author:singleCourseData.author,
                description:singleCourseData.description,
                videoUrl: singleCourseData.videoUrl,
                prerequisites: singleCourseData.prerequisites,
                courseNotes:singleCourseData.courseNotes,
                courseAssignments:singleCourseData.courseAssignments,
                courseThumbnail:singleCourseData.courseThumbnail
            })
            setWeeks(singleCourseData.syllabus)
        }
    },[singleCourseData]);

    return (
        <>
        <DashboardNavbar user="tutor" />
        <div className="manage-course">
            {/* pull the course name */}
            <div className="courses-head">Update course, <span>Zidio UI/UX Training Session</span></div>
            <div className="row upload-form">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="sub-form">
                        <p className="label">Course Name:</p>
                        <input type="text" 
                        value={courseData.title}
                        onChange={(e)=>setCourseData({...courseData, title: e.target.value})}
                        className="input" placeholder="Enter course name" />
                    </div>
                    <div className="sub-form">
                        <p className="label">Author Name:</p>
                        <input type="text"
                        value={courseData.author}
                        onChange={(e)=>setCourseData({...courseData, author: e.target.value})}
                         className="input" placeholder="Enter author name" />
                    </div>
                    <div className="sub-form">
                        <p className="label">Upload Date:</p>
                        <p className="input date">{new Date().toLocaleDateString("en-US", {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}</p>
                    </div>
                    <div className="sub-form">
                        <p className="label">Upload Course:</p>
                        <input type="file" 
                        onChange={(e)=>setCourseData({...courseData, videoUrl: e.target.files[0]})}
                        accept="video/*" className="input"  />
                    </div>
                    <div className="sub-form">
                        <p className="label desc">Course Description:</p>
                        <textarea name="" id="" 
                        value={courseData.description}
                        onChange={(e)=>setCourseData({...courseData, description: e.target.value})}
                        placeholder="Enter the course description" className="input textarea" ></textarea>
                    </div>
                    <div className="sub-form">
                        <p className="label desc">Skills Gained:</p>
                        <div className="input add-skill">
                            <ul className="list">
                                {skills.map((skill, index) => (
                                    <li className="li" key={index}>
                                        <p>{skill}</p>
                                        <p className="delete-skill" style={{color: "#ff0000"}}
                                            onClick={() => deleteSkill(index)}>delete</p>
                                    </li>
                                ))}
                            </ul>
                            <input
                                type="text"
                                className="input"
                                placeholder="Enter skill"
                                value={currentSkill}
                                onChange={handleSkillChange}
                            />
                            <button className="signout" onClick={addSkill}>Add skill</button>
                        </div>
                    </div>
                    <div className="sub-form">
                        <p className="label desc">Syllabus:</p>
                        <div className="input add-skill">
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="week-section">
                                    <p className="label desc week">Week {weekIndex + 1}</p>
                                    {week.chapters.map((chapter, chapterIndex) => (
                                        <div key={chapterIndex} className="input add-skill">
                                            <p className="label desc">Chapter {chapterIndex + 1}:</p>
                                            <input
                                                type="text"
                                                className="input"
                                                placeholder="Enter chapter"
                                                value={chapter}
                                                onChange={(e) => handleChapterChange(weekIndex, chapterIndex, e)}
                                            />
                                        </div>
                                    ))}
                                    <button className="signout" onClick={() => addChapter(weekIndex)}>Add Chapter</button>
                                </div>
                            ))}
                            <button className="signout" onClick={addWeek}>Add Week</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="sub-form">
                        <p className="label prereq">Prerequisites:</p>
                        <div className="add-skill">
                            <select name="" id="" className="input" value={select} onChange={handleSelect}>
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            {select === 'yes' && (
                                <textarea name="" id="" 
                                value={courseData.prerequisites}
                                onChange={(e)=>setCourseData({...courseData, prerequisites: e.target.value})}
                                placeholder="Enter the prerequisites" className="input textarea"></textarea>
                            )}
                        </div>
                    </div>
                    <div className="sub-form">
                        <p className="label">Upload Course Notes:</p>
                        <input type="file" accept=".pdf, .doc" 
                        onChange={(e)=>setCourseData({...courseData, courseNotes: e.target.files[0]})}
                        className="input" />
                    </div>
                    <div className="sub-form">
                        <p className="label">Upload Course Assignments:</p>
                        <input type="file" 
                        onChange={(e)=>setCourseData({...courseData, courseAssignments: e.target.files[0]})}
                        className="input"  />
                    </div>
                    <div className="sub-form">
                        <p className="label">Upload Course Thumbnail:</p>
                        <input type="file" 
                        onChange={(e)=>setCourseData({...courseData, courseThumbnail: e.target.files[0]})}
                        accept="image/*" className="input"  />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12"><button className="btn delete" onClick={cancelUpdate}>Cancel Update</button></div>
                <div className="col-lg-6 col-md-6 col-sm-12"><button className="btn update" onClick={proceedUpdate}>Update Course</button></div>
            </div>
        </div>
        <Notification
        show={showModal}
        onHide={() => setShowModal(false)}
        message={message}
        isError={isError}
        />
        </>
    )
}