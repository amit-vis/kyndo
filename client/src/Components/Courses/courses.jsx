import Footer from "../Footer";
import Navbar from "../Navbar";
import './courses.css';
import thumbnail from '../../assets/thumbnail.png';

const Courses = ()=>{
    return(
        <>
        <Navbar/>
        <div className="DashContainer">
            <div className="courses-head">Available Courses</div>
            <div className="container">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div className="course">
                            <div className="course-card">
                                <img src={thumbnail} alt="" />
                            </div>
                            <p className="course-name">Zidio UI/UX Training Session</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div className="course">
                            <div className="course-card">
                                <img src={thumbnail} alt="" />
                            </div>
                            <p className="course-name">Zidio UI/UX Training Session</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div className="course">
                            <div className="course-card">
                                <img src={thumbnail} alt="" />
                            </div>
                            <p className="course-name">Zidio UI/UX Training Session</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div className="course">
                            <div className="course-card">
                                <img src={thumbnail} alt="" />
                            </div>
                            <p className="course-name">Zidio UI/UX Training Session</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div className="course">
                            <div className="course-card">
                                <img src={thumbnail} alt="" />
                            </div>
                            <p className="course-name">Zidio UI/UX Training Session</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div className="course">
                            <div className="course-card">
                                <img src={thumbnail} alt="" />
                            </div>
                            <p className="course-name">Zidio UI/UX Training Session</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
};;

export default Courses;