import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/kyndo-dark.png';
import copyright from '../assets/copyright.png';

export default function Footer() {
    return (
        <>
        <div className="footer">
            <nav class="navbar">
                <nav class="container-fluid nav">
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
                            <p className="brand-name-footer">Kyndo</p>
                        </Link>
                    </div>
                </nav>
            </nav>
            <div className="footer-content">
                <p className="motto">
                We are a team of passionate learners who want to spread the joy of learning to every learner out there.
                </p>
                <div className="contact">
                    <p>Contact Us</p>
                    <p>xxx@kyndo.com</p>
                </div>
            </div>
            <div className="copyright">
                <img src={copyright} alt="" />
                <p>2024 Kyndo</p>
            </div>
        </div>
        </>
    )
}