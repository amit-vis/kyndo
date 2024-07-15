import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/kyndo-light.png';

export default function UserSelection() {
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
                    <button className="sign-up-button">Tutor</button>
                    <button className="sign-up-button">Learner</button>
                </div>
            </div>
        </div>
        </>
    )
}