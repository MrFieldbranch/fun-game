import { Navigate, Route, Routes } from "react-router-dom";
import StartView from "./views/StartView";
import LoginView from "./views/LoginView";
import RegisterNewUserView from "./views/RegisterNewUserView";
import NotFoundView from "./views/NotFoundView";
import HangmanView from "./views/HangmanView";
import HighScoreView from "./views/HighScoreView";

const App = () => {

  return (
    
      <Routes>
        <Route path="/" element={<Navigate to="/start" />} />
        <Route path="/start" element={<StartView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/registernewuser" element={<RegisterNewUserView />} />
        <Route path="/hangman" element={<HangmanView />} />
        <Route path="/highscore" element={<HighScoreView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    
  );
};

export default App;
