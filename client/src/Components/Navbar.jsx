import React from "react";
import {Link} from 'react-router-dom';
import logo from '../assets/kyndo-light.png';
import login from '../assets/login.png';

export default function Navbar() {
    return (
        <>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <div className="logo">
                    <img src={logo} alt="" />
                    <Link to='/' style={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}><p className="brand-name">Kyndo</p></Link>
                </div>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="nav">
            
            <div className="right-nav">
                <ul>
                    <li>Courses</li>
                    {/* <li>About</li> */}
                    <li><Link to='/user'><img src={login} alt="" /></Link></li>
                </ul>
            </div>
        </div>
        </>
    )
}