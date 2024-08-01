import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from '../assets/kyndo-light.png';
import Footer from './Footer';
import axiosInstances from "../axiosConfig";

export default function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/user');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            setMessage("Passwords do not match!");
            return;
        }
        try {
            const response = await axiosInstances.backendInstance.post(`/reset/${token}`, { password, cpassword });
            setMessage(response.data.message);
            if (response.status === 200) {
                setTimeout(() => goToHomePage(), 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <>
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid nav">
                <div className="nav-left">
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
                <div className="form-label">New password:</div>
                <div>
                    <input 
                        type="password" 
                        className="input" 
                        required 
                        placeholder="Enter your new password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-label" style={{marginTop: '1rem'}}>Confirm new password:</div>
                <div>
                    <input 
                        type="password" 
                        className="input" 
                        required 
                        placeholder="Confirm your new password" 
                        value={cpassword}
                        onChange={(e) => setCpassword(e.target.value)}
                    />
                </div>
                <button className="btn update" onClick={handleSubmit}>Reset Password</button>
                {message && <p>{message}</p>}
            </div>
        </div>
        <Footer />
        </>
    )
}
