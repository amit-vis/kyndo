import './courseuploaded.css';
import DashboardNavbar from '../DashboardNavbar';
import checkmark from '../../assets/checkmark.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const CourseUploaded = (props)=>{

    let msg = "";
    const { id } = useParams();
    let profileType = "";
    console.log(id);
    const navigate = useNavigate();

    if(id === "tutor") {
        profileType = "tutor";
    } else {
        profileType = "student"
    }

    if(props.user === "tutor") {
        if(props.msg === "update") {
            msg = "Course has been updated successfully!";
        } else {
            msg = "Your course has been uploaded successfully!";
        }
    } else {
        msg = "You have been enrolled into the course successfully!"
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(props.user === "tutor"){
                navigate(`/tutor-dashboard/${id}`)
            }else{
                navigate(`/student-dashboard/${id}`)
            }
        },3000)
        return ()=>clearTimeout(timer);
    },[navigate,id])
    return(
        <>
            <DashboardNavbar user={profileType} />
            <div className="courseuploadedcontainer">
                <img src={checkmark} className='courseuploadedimg' alt="" />
                <div className="courseuploadedtext">{msg}</div>
            </div>
        </>
    )
};

export default CourseUploaded;