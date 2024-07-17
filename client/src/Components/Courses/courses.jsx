import Footer from "../Footer";
import Navbar from "../Navbar";
import './courses.css';
import thumbnail from '../../assets/thumbnail.png';

const Courses = ()=>{
    return(
        <>
        <Navbar/>
        <div className="DashContainer">
            <div className="courseheading">Available Courses</div>
            <div className="coursecontainer">
            <div class="row row-cols-3">
                <div class="col">
                    <div className="course">
                    <div className="course-card">
                        <img src={thumbnail} alt="" />
                    </div>
                    <p className="course-name">Zidio UI/UX Training Session</p>
                </div>
                </div>
                <div class="col">
                    <div className="courseimg"></div>
                    <div className="courseName">Zidio UI/UX Training Session</div>
                </div>
                <div class="col">
                    <div className="courseimg"></div>
                    <div className="courseName">Zidio UI/UX Training Session</div>
                </div>
                <div class="col">
                    <div className="courseimg"></div>
                    <div className="courseName">Zidio UI/UX Training Session</div>
                </div>
                <div class="col">
                    <div className="courseimg"></div>
                    <div className="courseName">Zidio UI/UX Training Session</div>
                </div>
                <div class="col">
                    <div className="courseimg"></div>
                    <div className="courseName">Zidio UI/UX Training Session</div>
                </div>
            </div>
            </div>
        </div>
        <Footer/>
        </>
    )
};;

export default Courses;