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
import ViewCourse from './Components/ViewCourse';
import ResetPassword from './Components/ResetPassword';
import EnrollCourses from './Components/EnrollCourse/EnrollCourse';

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
          <Route path='/student-dashboard/:id' element={<StudentDashboard />} />
          <Route path='/tutor-dashboard/:id' element={<TutorDashboard />} />
          <Route path='/tutor/manage-course/:id' element={<ManageCourses />} />
          <Route path='/tutor/upload-course/:id' element={<UploadCourse />} />
          <Route path='/tutor/update-course/:id' element={<UpdateCourse />} />
          <Route path='/student-profile/:id' element={<StudentProfile />} />
          <Route path='/student/course-enrolled' element={<CourseUploaded user="student" />} />
          <Route path='/tutor/course-uploaded/:id' element={<CourseUploaded user="tutor" />} />
          <Route path='/tutor/course-updated/:id' element={<CourseUploaded user="tutor" msg="update" />} />
          <Route path='/tutor-profile/:id' element={<TutorProfile />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path='/student/course-enroll/:id' element={<CourseEnroll />} />
          <Route path='/student/view-course/:id' element={<ViewCourse />} />
          <Route path='/student/enroll/:id' element={<EnrollCourses />} />
        </Routes>
      </Router>
      </Provider>
    </>
  );
}

export default App;
