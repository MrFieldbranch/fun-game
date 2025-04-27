import { Link } from "react-router-dom";

const StartView = () => {
  return (
    <div className="start">
      <h1>HANGMAN</h1>
      <div className="skeleton-image-container" />
      <div className="start-links">
        <Link to="/login" className="start-link">
          LOGGA IN
        </Link>
        <Link to="/registernewuser" className="start-link">
          NY ANVÄNDARE
        </Link>
      </div>
    </div>
  );
};

export default StartView;
