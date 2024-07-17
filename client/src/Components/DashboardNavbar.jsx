import React from "react";
import user from '../assets/user.png';
import {Link} from 'react-router-dom';
import logo from '../assets/kyndo-light.png';

export default function DashboardNavbar() {
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
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto dash-nav">
                        <li class="nav-item">
                        <Link to='/user' className="nav-link"><button className="signout">Sign out</button></Link>
                        </li>
                        <li class="nav-item">
                        <Link to='/student-profile' className="nav-link username">Username</Link>
                        </li>
                        <li class="nav-item">
                        <Link to='/student-profile' className="nav-link"><img src={user} alt="login" /></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
    )
}