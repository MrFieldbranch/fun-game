import { Link } from "react-router-dom";

const StartView = () => {
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