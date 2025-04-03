import { Link } from "react-router-dom";

const StartView = () => {
  return (
    <div className="start">
      <h1>Välkommen</h1>
	  <Link to="/login">LOGGA IN</Link>
	  <Link to="/registernewuser">SKAPA NY ANVÄNDARE</Link>
    </div>
  );
};

export default StartView;