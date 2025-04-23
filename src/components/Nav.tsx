import { Link, useLocation, useNavigate } from "react-router-dom";
import apiService from "../services/api-service";
import { useState } from "react";
import { IGameResultRequest } from "../models/IGameResultRequest";
import hamburger from "../images/icons8-hamburger-menu-64.png";

// Jag behöver inte ha med setGameIsRunning som prop.
// Den nollställs ändå, när jag navigerar till HangmanView.

type NavProps = {
  gameIsRunning?: boolean;
};

const Nav = ({ gameIsRunning }: NavProps) => {
  const [confirmLosingGameAndNavigate, setConfirmLosingGameAndNavigate] =
    useState(false);
  const [confirmLosingGameAndLogout, setConfirmLosingGameAndLogout] =
    useState(false);
  const [errorInNav, setErrorInNav] = useState<string | null>(null);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

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
        <button
          className="high-score-link-in-nav"
          onClick={handleNavigateToHighScore}
        >
          Highscore
        </button>

        <button className="log-out-btn" onClick={handleLogoutFromHangmanView}>
          Logga ut
        </button>

        {!hamburgerMenuOpen && (
          <img
            src={hamburger}
            alt="Picture of a hamburger menu"
            onClick={() => setHamburgerMenuOpen(true)}
          />
        )}
        {hamburgerMenuOpen && (
          <div
            className="hamburger-menu-open-overlay"
            onClick={() => setHamburgerMenuOpen(false)}
          >
            <div
              className="hamburger-menu-open"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-hamburger-menu"
                onClick={() => setHamburgerMenuOpen(false)}
              >
                Stäng meny
              </button>
              <button
                className="high-score-link-in-nav-mobile-view"
                onClick={handleNavigateToHighScore}
              >
                Highscore
              </button>
              <button
                className="log-out-btn-mobile-view"
                onClick={handleLogoutFromHangmanView}
              >
                Logga ut
              </button>
            </div>
          </div>
        )}

        {confirmLosingGameAndNavigate && (
          <>
            <div className="overlay" onClick={(e) => e.stopPropagation()} />
            <div className="middle-of-overlay">
              <p>Är du säker?</p>
              <p>Detta innebär en förlust i statistiken.</p>
              <div className="yes-or-cancel-buttons">
                <button onClick={handleConfirmLosingGameAndNavigate}>JA</button>
                <button onClick={() => setConfirmLosingGameAndNavigate(false)}>
                  AVBRYT
                </button>
              </div>
            </div>
          </>
        )}

        {confirmLosingGameAndLogout && (
          <>
            <div className="overlay" onClick={(e) => e.stopPropagation()} />
            <div className="middle-of-overlay">
              <p>Är du säker?</p>
              <p>Detta innebär en förlust i statistiken.</p>
              <div className="yes-or-cancel-buttons">
                <button onClick={handleConfirmLosingGameAndLogout}>JA</button>
                <button onClick={() => setConfirmLosingGameAndLogout(false)}>
                  AVBRYT
                </button>
              </div>
            </div>
          </>
        )}
      </nav>
    );

  if (location.pathname === "/highscore")
    return (
      <nav>
        <p>Inloggad som: {loggedInUserNickname}</p>
        <Link to="/hangman" className="hangman-link-in-nav">
          Spela Hänga Gubben
        </Link>
        <button className="log-out-btn" onClick={handleLogoutFromHighScoreView}>
          Logga ut
        </button>
        {!hamburgerMenuOpen && (
          <img
            src={hamburger}
            alt="Picture of a hamburger menu"
            onClick={() => setHamburgerMenuOpen(true)}
          />
        )}
        {hamburgerMenuOpen && (
          <div
            className="hamburger-menu-open-overlay"
            onClick={() => setHamburgerMenuOpen(false)}
          >
            <div
              className="hamburger-menu-open"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-hamburger-menu"
                onClick={() => setHamburgerMenuOpen(false)}
              >
                Stäng meny
              </button>
              <Link to="/hangman" className="hangman-link-in-nav-mobile-view">
                Spela Hänga Gubben
              </Link>
              <button
                className="log-out-btn-mobile-view"
                onClick={handleLogoutFromHighScoreView}
              >
                Logga ut
              </button>
            </div>
          </div>
        )}
      </nav>
    );
};

export default Nav;
