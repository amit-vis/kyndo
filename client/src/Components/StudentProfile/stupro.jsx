import './stupro.css';
import DashboardNavbar from '../DashboardNavbar';
import user from '../../assets/user.png';

const StudentProfile = ()=>{
    return(
        <>
        <DashboardNavbar user="student" />
        <div className="stuprocontainer">
            <img src={user} className="stuproimg" alt="" />
            <div className="stuproheading">Username
            </div>
            <div className="stuproinfo">
                <div className="tango">
                    <div className="subtitle">Username:</div>
                    <div className="subtitle-content">random username</div>
                </div>
                <div className="tango">
                    <div className="subtitle">Email Address:</div>
                    <div className="subtitle-content">random123@gmail.com</div>
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