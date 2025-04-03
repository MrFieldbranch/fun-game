import { Link } from "react-router-dom";

const LoginView = () => {
  return (
    <div className="login">
      <h1>LOGGA IN</h1>
      <Link to="/start">TILLBAKA TILL START</Link>      
    </div>
  );
};

export default LoginView;
