import React, { useEffect, useState } from "react";
import user from '../assets/user.png';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../assets/kyndo-light.png';
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser, userSelector } from "../redux/reducer/formReducer";
import { Notification } from "./Notification";

export default function DashboardNavbar(props) {
    const dispatch = useDispatch();
    const {userData, state, error} = useSelector(userSelector);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    let dataroute = null
    if(props.user === "tutor"){
        dataroute = true
    }else{
        dataroute = false
    }
    
    const navigate = useNavigate();

    const loadProfile = () => {
        const userProfile = `/${props.user}-profile/${userData?._id}`;
        navigate(userProfile);
    }
    useEffect(() => {
            dispatch(getUser(dataroute));
    }, [dispatch, navigate, dataroute]);

    const signoutUser = async ()=>{
        try {
            const result = await dispatch(logoutUser());
            if(logoutUser.fulfilled.match(result)){
                setShowModal(true)
                setIsError(false)
                setMessage(result.payload.message)
                localStorage.removeItem("token")
                setTimeout(()=>{
                    setShowModal(false)
                    navigate(`/${props.user}/signin`)
                },3000)
            }else{
                setIsError(true)
                setMessage(result.payload.message)
                setShowModal(true)
                setTimeout(()=>{setShowModal(false)},3000)
                console.log("here is the error message",result)
            }
            
        } catch (error) {
            setIsError(true)
            setMessage(error.message)
            setShowModal(true)
            setTimeout(()=>{setShowModal(false)},3000)
            console.log("here is the error message",error)
        }
    }

    return (
    <>
    <nav className="navbar navbar-expand-lg">
            <div className="container-fluid nav">
                <div className="nav-left">
                    <Link to={`/${props.user}-dashboard/${userData?._id}`} style={{
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
                        <li to='/user' className="nav-link"><button className="signout" onClick={signoutUser}>Sign out</button></li>
                        </li>
                        <li className="nav-item">
                        <li onClick={loadProfile} className="nav-link username">{userData?.name}</li>
                        </li>
                        <li className="nav-item">
                        <li onClick={loadProfile} className="nav-link"><img src={user} alt="login" /></li>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <Notification show={showModal}
        message={message}
        onHide={()=>setShowModal(false)}
        isError={isError}/>
    </>
    )
}