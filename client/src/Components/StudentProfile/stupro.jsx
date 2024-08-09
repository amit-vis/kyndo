import './stupro.css';
import DashboardNavbar from '../DashboardNavbar';
import user from '../../assets/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, userSelector } from '../../redux/reducer/formReducer';
import { useEffect } from 'react';

const StudentProfile = ()=>{

    const dispatch = useDispatch();
    const {userData} = useSelector(userSelector);

    useEffect(()=>{
        dispatch(getUser(false))
    },[dispatch])

    if (!userData) {
        return <p>Loading...</p>;
    }

    return(
        <>
        <DashboardNavbar user="student" />
        <div className="stuprocontainer">
            <img src={user} className="stuproimg" alt="" />
            <div className="stuproheading">{userData.name}</div>
            <div className="stuproinfo">
                <div className="tango">
                    <div className="subtitle">Username:</div>
                    <div className="subtitle-content">{userData.name}</div>
                </div>
                <div className="tango">
                    <div className="subtitle">Email Address:</div>
                    <div className="subtitle-content">{userData.email}</div>
                </div>
                <div className="tango">
                    <div className="subtitle">Password:</div>
                    <div className="subtitle-content">XXXXXXXXX</div>
                </div>
                <div className="tango">
                    <div className="subtitle">Change Password:</div>
                    <input type="password" className='subtitle-content' 
                    disabled
                    placeholder='XXXXXXXX' />
                </div>
                <button className='signout pass-change'>Change Password</button>
            </div>
        </div>
        </>
    )
};

export default StudentProfile;