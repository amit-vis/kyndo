import React from "react";
import user from '../assets/user.png';
import {Link, useParams} from 'react-router-dom';
import logo from '../assets/kyndo-light.png';

export default function DashboardNavbar() {
    
    const { id } = useParams();

    const userProfile = `/${id}-profile`;

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
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto dash-nav">
                        <li className="nav-item">
                        <Link to='/user' className="nav-link"><button className="signout">Sign out</button></Link>
                        </li>
                        <li className="nav-item">
                        <Link to={userProfile} className="nav-link username">Username</Link>
                        </li>
                        <li className="nav-item">
                        <Link to={userProfile} className="nav-link"><img src={user} alt="login" /></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
    )
}