import { Link, useLocation, useNavigate } from "react-router-dom";
import apiService from "../services/api-service";
import { useState } from "react";
import { IGameResultRequest } from "../models/IGameResultRequest";

type NavProps = {
  gameIsRunning?: boolean;
};

const Nav = ({ gameIsRunning }: NavProps) => {
  const [confirmLosingGameAndNavigate, setConfirmLosingGameAndNavigate] =
    useState(false);
  const [confirmLosingGameAndLogout, setConfirmLosingGameAndLogout] =
    useState(false);
  const [errorInNav, setErrorInNav] = useState<string | null>(null);

  const navigate = useNavigate();

  const location = useLocation(); // This gives me access to the current pathname

  const handleNavigateToHighScore = () => {
    if (gameIsRunning) {
      setConfirmLosingGameAndNavigate(true);
    } else {
      navigate("/highscore");
    }
  };

  const sendGameResult = async (result: IGameResultRequest) => {
    try {
      await apiService.createNewGameResultAsync(result);
    } catch (err: any) {
      setErrorInNav(err.message || "An unknown error occurred.");
    }
  };

  const handleLogoutFromHangmanView = () => {
    if (gameIsRunning) {
      setConfirmLosingGameAndLogout(true);
    } else {
      apiService.removeAuthorizationHeader();
      localStorage.removeItem("nickname");
      navigate("/start");
    }
  };

  const handleLogoutFromHighScoreView = () => {
    apiService.removeAuthorizationHeader();
    localStorage.removeItem("nickname");
    navigate("/start");
  };

  const handleConfirmLosingGameAndNavigate = () => {
    const result: IGameResultRequest = {
      isWinner: false,
    };
    setConfirmLosingGameAndNavigate(false);
    sendGameResult(result);
    navigate("/highscore");
  };

  const handleConfirmLosingGameAndLogout = () => {
    const result: IGameResultRequest = {
      isWinner: false,
    };
    setConfirmLosingGameAndLogout(false);
    sendGameResult(result);
    apiService.removeAuthorizationHeader();
    localStorage.removeItem("nickname");
    navigate("/start");
  };

  const loggedInUserNickname = localStorage.getItem("nickname");

  if (errorInNav)
    return (
      <>
        <div className="overlay" onClick={(e) => e.stopPropagation()} />
        <div className="middle-of-overlay">
          <p>{errorInNav}</p>
          <button onClick={() => setErrorInNav(null)}>Tillbaka</button>
        </div>
      </>
    );

  if (location.pathname === "/hangman")
    return (
      <nav>
        <p>Inloggad som: {loggedInUserNickname}</p>
        <button className="high-score-link-in-nav" onClick={handleNavigateToHighScore}>Highscore</button>
        {/* <Link to="/highscore">Maratontabell</Link> */}
        <button className="log-out-btn" onClick={handleLogoutFromHangmanView}>
          Logga ut
        </button>

        {confirmLosingGameAndNavigate && (
          <>
            <div className="overlay" onClick={(e) => e.stopPropagation()} />
            <div className="middle-of-overlay">
              <p>Är du säker?</p>
              <p>Detta innebär en förlust i statistiken.</p>
              <button onClick={handleConfirmLosingGameAndNavigate}>JA</button>
              <button onClick={() => setConfirmLosingGameAndNavigate(false)}>
                AVBRYT
              </button>
            </div>
          </>
        )}

        {confirmLosingGameAndLogout && (
          <>
            <div className="overlay" onClick={(e) => e.stopPropagation()} />
            <div className="middle-of-overlay">
              <p>Är du säker?</p>
              <p>Detta innebär en förlust i statistiken.</p>
              <button onClick={handleConfirmLosingGameAndLogout}>JA</button>
              <button onClick={() => setConfirmLosingGameAndLogout(false)}>
                AVBRYT
              </button>
            </div>
          </>
        )}
      </nav>
    );

  if (location.pathname === "/highscore")
    return (
      <nav>
        <p>Inloggad som: {loggedInUserNickname}</p>
        <Link to="/hangman">Spela Hänga Gubben</Link>
        <button className="log-out-btn" onClick={handleLogoutFromHighScoreView}>
          Logga ut
        </button>
      </nav>
    );
};

export default Nav;
