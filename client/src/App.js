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
import TutorProfile from './Components/TutorProfile/tupro';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ForgotPassword from './Components/ForgotPassword';
import CourseEnroll from './Components/CourseEnroll/CourseEnroll';

function App() {
  return (
    <>
    <Provider store={store}>
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
          <Route path='/student/course-enrolled' element={<CourseUploaded user="student" />} />
          <Route path='/tutor/course-uploaded' element={<CourseUploaded user="tutor" />} />
          <Route path='/tutor/course-updated' element={<CourseUploaded user="tutor" msg="update" />} />
          <Route path='/tutor-profile' element={<TutorProfile />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/course-enroll' element={<CourseEnroll />} />
        </Routes>
      </Router>
      </Provider>
    </>
  );
}

export default App;
