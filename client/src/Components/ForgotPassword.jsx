import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/kyndo-light.png';
import Footer from './Footer';
import axiosInstances from '../axiosConfig';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting email for password reset:", email);
        try {
            const response = await axiosInstances.backendInstance.post("/forgot-password", { email });
            console.log("Response from server:", response.data);
            setMessage(response.data.message);
            setError("");
        } catch (error) {
            console.error("Error from server:", error.response);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unknown error occurred.");
            }
            setMessage("");
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
                    <div className="form-label">Enter registered e-mail address:</div>
                    <div>
                        <input 
                            type="email" 
                            className="input" 
                            required 
                            placeholder="Enter your e-mail address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button className="btn update" onClick={handleSubmit}>Reset Password</button>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
            <Footer />
        </>
    )
}
