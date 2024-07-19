import React from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/kyndo-light.png';

export default function UserSelection() {

    const navigate = useNavigate();

    const handleTutor = () => {
        navigate('/tutor/signup')
    }

    const handleStudent = () => {
        navigate('/student/signup')
    }
        

    return (
        <>
        <div className="fluid-container sign-container">
            <div className="logo-div">
                <img src={logo} alt="" className="logo" />
                <div className="kyndo">Kyndo</div>
            </div>
            <div className="main-form">
                <div className="signup">
                    <p className='heading'>Who are you?</p>
                    <button onClick={handleTutor} className="sign-up-button">Tutor</button>
                    <button onClick={handleStudent} className="sign-up-button learner-btn">Student</button>
                </div>
            </div>
        </div>
        </>
    )
}