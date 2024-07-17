import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp/signup';
import Homepage from './Components/Homepage';
import SignInLearner from './Components/SignIn/SignIn';
import UserSelection from './Components/User/UserSelection';
import StudentDashboard from './Components/StudentDashboard/studentdashboardhtml';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="/:id/signup" element={<SignUp />} />
          <Route path="/:id/signin" element={<SignInLearner />} />
          <Route path='/user' element={<UserSelection />} />
          <Route path='/studentdash' element={<StudentDashboard/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
