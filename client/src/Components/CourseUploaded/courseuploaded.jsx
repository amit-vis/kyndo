import './courseuploaded.css';
import DashboardNavbar from '../DashboardNavbar';
import checkmark from '../../assets/checkmark.png';

const CourseUploaded = ()=>{
    return(
        <>
            <div className="courseuploadedcontainer">
                <DashboardNavbar/>
                <img src={checkmark} className='courseuploadedimg' alt="" />
                <div className="courseuploadedtext">Your course has been uploaded successfully!</div>
            </div>
        
        </>
    )
};

export default CourseUploaded;