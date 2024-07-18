import React from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/kyndo-light.png';

export default function UserSelection() {

    const navigate = useNavigate();

    const handleTutor = () => {
        navigate('/tutor/signup')
    }

    const handleLearner = () => {
        navigate('/learner/signup')
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
                    <button onClick={handleLearner} className="sign-up-button learner-btn">Learner</button>
                </div>
            </div>
        </div>
        </>
    )
}