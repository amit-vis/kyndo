import React, { useState } from "react";
import DashboardNavbar from "../DashboardNavbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../redux/reducer/tutorReducer";
import { Notification } from "../Notification";
import { userSelector } from "../../redux/reducer/formReducer";

export default function UploadCourse() {
    const {userData} = useSelector(userSelector)
    const dispatch = useDispatch();
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
    const handleChange = (e)=>{
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value
        })
    }
    
    const handleFileChange = (e)=>{
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.files[0]
        })
    }

    const addSkill = () => {
        if (currentSkill.trim()) {
            setSkills([...skills, currentSkill]);
            setCurrentSkill('');
        }
    };

    const addChapter = (weekIndex) => {
        const newWeeks = [...weeks];
        newWeeks[weekIndex].chapters.push('');
        setWeeks(newWeeks);
    }

    const addWeek = () => {
        const newWeek = {chapters: ['']};
        setWeeks([...weeks, newWeek]);
    }

    const handleChapterChange = (weekIndex, chapterIndex, event) => {
        const newWeeks = [...weeks];
        newWeeks[weekIndex].chapters[chapterIndex] = event.target.value;
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

    const cancelUpload = () => {
        navigate(`/tutor-dashboard/${userData._id}`);
    }

    const proceedUpload = async () => {
        try {
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
            const results = await dispatch(createCourse(formData));
            if(createCourse.fulfilled.match(results)){
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
                });
                setShowModal(true);
                setIsError(false);
                setMessage(results.payload.message);
                setTimeout(()=>{
                    setShowModal(false);
                    navigate(`/tutor/course-uploaded/${userData._id}`);
                },3000)
            }else{
                setShowModal(true);
                setIsError(true);
                setMessage(results.payload.message);
                setTimeout(()=>{
                    setShowModal(false);
                },3000)
            }
        } catch (error) {
            setShowModal(true);
            setIsError(true);
            setMessage(error.message);
            setTimeout(()=>{
                setShowModal(false);
            },3000)
        }
    }



    return (
        <>
        <DashboardNavbar user="tutor" />
        <div className="manage-course">
            <div className="courses-head">Upload a new course</div>
            <div className="row upload-form">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="sub-form">
                        <p className="label">Course Name:</p>
                        <input type="text" className="input" 
                        name="title"
                        value={courseData.title}
                        onChange={handleChange}
                        placeholder="Enter course name" required />
                    </div>
                    <div className="sub-form">
                        <p className="label">Author Name:</p>
                        <input type="text" className="input"
                        name="author"
                        value={courseData.author}
                        onChange={handleChange}
                         placeholder="Enter author name" required />
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
                        <input type="file" accept="video/*" 
                        name="videoUrl"
                        onChange={handleFileChange}
                        className="input" required />
                    </div>
                    <div className="sub-form">
                        <p className="label desc">Course Description:</p>
                        <textarea name="description" id="" 
                        value={courseData.description}
                        onChange={handleChange}
                        placeholder="Enter the course description" className="input textarea" required></textarea>
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
                                    <div className="add-chapter w-100">
                                        <button className="signout align-right" onClick={() => addChapter(weekIndex)}>Add Chapter</button>
                                    </div>
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
                                <textarea name="prerequisites" id="" 
                                value={courseData.prerequisites}
                                onChange={handleChange}
                                placeholder="Enter the prerequisites" className="input textarea" required></textarea>
                            )}
                        </div>
                    </div>
                    <div className="sub-form">
                        <p className="label">Upload Course Notes:</p>
                        <input type="file" 
                        name="courseNotes"
                        onChange={handleFileChange}
                        accept=".pdf, .doc" className="input" required />
                    </div>
                    <div className="sub-form">
                        <p className="label">Upload Course Assignments:</p>
                        <input type="file" 
                        name="courseAssignments"
                        onChange={handleFileChange}
                        className="input" required />
                    </div>
                    <div className="sub-form">
                        <p className="label">Upload Course Thumbnail:</p>
                        <input type="file" 
                        name="courseThumbnail"
                        onChange={handleFileChange}
                        accept="image/*" className="input" required />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12"><button className="btn delete" onClick={cancelUpload}>Cancel Upload</button></div>
                <div className="col-lg-6 col-md-6 col-sm-12"><button className="btn update" onClick={proceedUpload}>Upload Course</button></div>
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