import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import SignupPage from './pages/signup'
import LoginPage from './pages/login';
import HomePage from './pages/home';
import Quiz from './pages/quiz'
import LeaderboardUI from './pages/leaderboardui';
function App() {
  return (
    <div> 
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/quiz-page" element={<Quiz/>} />
            <Route path="/leaderboard" element={<LeaderboardUI/>} />
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;