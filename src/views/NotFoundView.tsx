import { Link } from "react-router-dom";

const NotFoundView = () => {
  return (
    <div className="not-found">
      <h1>Oops, sidan kunde inte hittas</h1>
      <Link to="/start">Tillbaka till start</Link>
    </div>
  );
};

export default NotFoundView;
