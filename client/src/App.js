import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp/signup';
import Homepage from './Components/Homepage';
import SignInLearner from './Components/SignIn/SignIn';
import UserSelection from './Components/User/UserSelection';
import StudentDashboard from './Components/StudentDashboard/StudentDashboard';
import Courses from './Components/Courses/courses';
import StudentProfile from './Components/StudentProfile/stupro';

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
          <Route path='/student-profile' element={<StudentProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
