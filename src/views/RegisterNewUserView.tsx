import { Link } from "react-router-dom";

const RegisterNewUserView = () => {
  return (
    <div className="register">
      <h1>REGISTRERA DIG</h1>
      <Link to="/start">TILLBAKA TILL START</Link>
    </div>
  );
};

export default RegisterNewUserView;
