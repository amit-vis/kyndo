import React, { useState } from "react";

export default function SyllabusViewer({findData, visible, closeSyllabus }) {

    const visibility = visible ? 'block' : 'none';
    const [isContentVisible, setIsContentVisible] = useState(false);
    
    const caretDirection = isContentVisible ? 'fa-caret-down' : 'fa-caret-up';

    const toggleContent = (index) => {
        setIsContentVisible(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    }

    return (
        <>
         <div className="slider" style={{ display: visibility }}>
            <div className="cross">
                <i className="fa-solid fa-x"
                    style={{ color: '#76ABAE' }}
                    onClick={closeSyllabus}></i>
            </div>
            <div className="courses-head">Syllabus</div>
            <div className="syllabus-div">
                {findData?.syllabus?.map((week, index) => (
                    <div className="week" key={index}>
                        <div className="week-header">
                            <div className="week-head">Week {index + 1}</div>
                            <div className="drop">
                                <i className={`fa-solid ${isContentVisible[index] ? 'fa-caret-up' : 'fa-caret-down'}`}
                                    onClick={() => toggleContent(index)}></i>
                            </div>
                        </div>
                        <div className="chapter-content"
                            style={{ display: isContentVisible[index] ? 'block' : 'none' }}>
                            { week.chapters.map((chapter, chapterIndex) => (
                                <ul className="content" key={chapterIndex}>
                                    <li>Chapter {chapterIndex + 1}: {chapter || "Introduction to UI/UX"}</li>
                                </ul>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}