import React, { useState } from "react";

export default function SyllabusViewer({ visible, closeSyllabus }) {

    const visibility = visible ? 'block' : 'none';
    const [isContentVisible, setIsContentVisible] = useState(false);
    
    const caretDirection = isContentVisible ? 'fa-caret-down' : 'fa-caret-up';

    const toggleContent = () => {
        setIsContentVisible(!isContentVisible);
    }

    return (
        <>
        <div className="slider" style={{display: visibility}}>
            <div className="cross"><i class="fa-solid fa-x"
                style={{color: '#76ABAE'}}
                onClick={closeSyllabus}></i></div>
            <div className="courses-head">Syllabus</div>
            <div className="syllabus-div">
                {/* 1 week syllabus */}
                <div className="week">
                    <div className="week-header">
                        <div className="week-head">Week 1</div>
                        <div className="drop">
                            <i class={`fa-solid ${caretDirection}`}
                                onClick={toggleContent}></i>
                        </div>
                    </div>
                    <div className="chapter-content"
                        style={{ display: isContentVisible ? 'block' : 'none' }}>
                        <ul className="content">
                            <li>Chapter 1: Introduction to UI/UX</li>
                            <li>Chapter 2: Tools used for UI/UX</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}