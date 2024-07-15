import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp/signup';
import Homepage from './Components/Homepage';
import SigninStudent from './Components/SignIn-Student/signin-student';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/student-signin" element={<SigninStudent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
