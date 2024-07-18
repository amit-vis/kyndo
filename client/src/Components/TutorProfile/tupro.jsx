import './tupro.css';
import DashboardNavbar from '../DashboardNavbar';
import user from '../../assets/user.png';


const TutorProfile = ()=>{
    return(
        <>
        <DashboardNavbar/>
        <div className="tuprocontainer">
            <img src={user} className='tuproimg' alt="" />
            <div className="tuproheading">Username (Tutor)</div>
            <div className="tuproinfo">
                <div className="tuproinfoleft">
                    <div className="kol">
                        <div className="tuproname">Username:</div>
                        <div className="tuproactualname">random username</div>
                    </div>
                    <div className="kol">
                        <div className="tuproemail">Email address:</div>
                        <div className="tuproactualemail">random123@email.com</div>
                    </div>
                    <div className="kol">
                        <div className="tupropass">Password:</div>
                        <div className="tuproactualpass">XXXXXXX</div>
                    </div>
                    <div className="kol">
                        <div className="tuprochangepass">Change Password:</div>
                        <input type="password" placeholder='XXXXXXXX' className='tuprochangepassbutton' />
                    </div>
                    <button className='changepassbutt'>Change Password</button>
                </div>
                <div className="tuproinforight">
                    <div className="del">
                        <div className="tuprocourseinfo">Courses Uploaded:</div>
                        <div className="tuproactualcourse">23</div>
                    </div>
                    <div className="del">
                        <div className="tuproenroll">Total Number of Enrollments:</div>
                        <div className="tuproactualenroll">100,000</div>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default TutorProfile;