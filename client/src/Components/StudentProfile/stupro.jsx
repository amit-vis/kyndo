import './stupro.css';
import DashboardNavbar from '../DashboardNavbar';
import user from '../../assets/user.png';

const StudentProfile = ()=>{
    return(
        <>
        <div className="stuprocontainer">
            <DashboardNavbar/>
            <img src={user} className="stuproimg" alt="" />
            <div className="stuproheading">Username
            </div>
            <div className="stuproinfo">
                <div className="stuproname tango">
                    <div className="nameuser">Username:</div>
                    <div className="nameactual">random username</div>
                </div>
                <div className="stuproemail tango">
                    <div className="emailuser">Email Address:</div>
                    <div className="emailactual">random123@gmail.com</div>
                </div>
                <div className="stupropass tango">
                    <div className="passuser">Password:</div>
                    <div className="passactual">XXXXXXXXX</div>
                </div>
                <div className="stuprochange tango">
                    <div className="changepassuser">Change Password:</div>
                    <input type="password" className='passnew' placeholder='XXXXXXXX' />
                </div>
                <button className='passchangebutton'>Change Password</button>
            </div>
        </div>
        
        </>
    )
};

export default StudentProfile;