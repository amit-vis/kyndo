import React from "react";
import Navbar from "./Navbar";
import groupImages from '../assets/group-images.png';
import group2 from '../assets/Group2.png';
import focused from '../assets/focused.png';
import writing from '../assets/writing.png';
import teaching from '../assets/teaching.png';
import learning from '../assets/learning.png';
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function Homepage() {

    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/user');
    }


    return (
        <>
        <Navbar />
        <section className="section1">
            <div className="title">
                <p><span>e-learning</span> in it's best form</p>
                <button onClick={handleGetStarted}>Get Started</button>
            </div>
            <div className="section-images">
                <img src={groupImages} alt="" />
            </div>
        </section>
        <section className="section2">
            <img src={group2} alt="" />
            <p>Get access to over <span>10+ courses</span> at <span>ZERO cost</span></p>
        </section>
        <section className="section3">
            <div className="img-group1">
                <img className="bigimg" src={writing} alt="" />
                <img className="smallimg" src={focused} alt="" />
            </div>
            <p>Because learning <span>never stops</span></p>
            <div className="img-group1">
                <img className="smallimg" src={learning} alt="" />
                <img className="bigimg" src={teaching} alt="" />
            </div>
        </section>
        <Footer />
        </>
    )
}