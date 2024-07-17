import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp/signup';
import Homepage from './Components/Homepage';
import SignInLearner from './Components/SignIn/SignIn';
import UserSelection from './Components/User/UserSelection';
import StudentDashboard from './Components/StudentDashboard/StudentDashboard';
import TutorDashboard from './Components/TutorDashboard/TutorDashboard';
import ManageCourses from './Components/ManageCourses/ManageCourses';
import UploadCourse from './Components/UploadCourse/UploadCourse';
import UpdateCourse from './Components/UpdateCourse/UpdateCourse';
import Courses from './Components/Courses/courses';
import StudentProfile from './Components/StudentProfile/stupro';
import CourseUploaded from './Components/CourseUploaded/courseuploaded';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="/:id/signup" element={<SignUp />} />
          <Route path="/:id/signin" element={<SignInLearner />} />
          <Route path='/user' element={<UserSelection />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/student-dashboard' element={<StudentDashboard />} />
          <Route path='/tutor-dashboard' element={<TutorDashboard />} />
          <Route path='/manage-course' element={<ManageCourses />} />
          <Route path='/upload-course' element={<UploadCourse />} />
          <Route path='/update-course' element={<UpdateCourse />} />
          <Route path='/student-profile' element={<StudentProfile />} />
          <Route path='/course-uploaded' element={<CourseUploaded />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
