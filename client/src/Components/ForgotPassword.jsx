import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/kyndo-light.png';

export default function ForgotPassword() {

    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
    }

    return (
        <>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid nav">
                <div class="nav-left">
                    <Link to='/' style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        fontWeight: '600'
                    }}>
                        <img src={logo} alt="logo" />
                        <p className="brand-name">Kyndo</p>
                    </Link>
                </div>
            </div>
        </nav>
        <div className="reset">
            <div className="form">
                <div className="form-label">Enter registered e-mail address:</div>
                <div> <input type="email" className="input" required placeholder="Enter your e-mail address" /></div>
                <button className="btn update">Reset Password</button>
            </div>
        </div>
        </>
    )
}