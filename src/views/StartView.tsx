import { useEffect } from "react";
import { Link } from "react-router-dom";
/* import evilLaugh from "../../public/sounds/evil-laugh.mp3"; */

const StartView = () => {
  useEffect(() => {
    const audioEvilLaugh = new Audio("/sounds/evil-laugh.mp3");
    audioEvilLaugh.play();
  }, []);

  return (
    <div className="start">
      <h1>HANGMAN</h1>
      <div className="skeleton-image-container" />
      <div className="start-links">
        <div id="login-link">
          <Link to="/login">LOGGA IN</Link>
        </div>
        <div id="register-link">
          <Link to="/registernewuser">NY ANVÄNDARE</Link>
        </div>
      </div>
    </div>
  );
};

export default StartView;
