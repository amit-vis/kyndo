import './tupro.css';
import DashboardNavbar from '../DashboardNavbar';
import user from '../../assets/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, userSelector } from '../../redux/reducer/formReducer';
import { useEffect } from 'react';
import { getCourse } from '../../redux/reducer/tutorReducer';


const TutorProfile = ()=>{

    const dispatch = useDispatch();
    const {userData} = useSelector(userSelector);

    useEffect(()=>{
        dispatch(getUser(true))
        dispatch(getCourse())
    },[])

    return(
        <>
        <DashboardNavbar user="tutor" />
        <div className="tuprocontainer">
            <img src={user} className='tuproimg' alt="" />
            <div className="tuproheading">{userData.name} <span>(Tutor)</span></div>
            <div className="tuproinfo">
                <div className="tuproinfoleft">
                    <div className="tango">
                        <div className="subtitle">Username:</div>
                        <div className="subtitle-content">{userData.name}</div>
                    </div>
                    <div className="tango">
                        <div className="subtitle">Email address:</div>
                        <div className="subtitle-content">{userData.email}</div>
                    </div>
                    <div className="tango">
                        <div className="subtitle">Password:</div>
                        <div className="subtitle-content">XXXXXXX</div>
                    </div>
                    <div className="tango">
                        <div className="subtitle">Change Password:</div>
                        <div className="subtitle-content pass">
                            <input type="password" placeholder='XXXXXXXX' className='subtitle-content' />
                            <button className='signout pass-change'>Change Password</button>
                        </div>
                    </div>
                </div>
                <div className="tuproinforight">
                    <div className="tango">
                        <div className="subtitle">Courses Uploaded:</div>
                        <div className="subtitle-content">23</div>
                    </div>
                    <div className="tango">
                        <div className="subtitle">Total Number of Enrollments:</div>
                        <div className="subtitle-content">100,000</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default TutorProfile;