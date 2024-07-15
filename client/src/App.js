import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp/signup';
import Homepage from './Components/Homepage';
import SignInLearner from './Components/SignInLearner/SignInLearner';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignInLearner />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
