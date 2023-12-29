import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Manage.css";
import Button from "../../../components/Button/Button";

const Manage = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <div className="manage">
      <div className="manage__nav">
        {!/edit\/*$/i.test(location) ? (
          <>
            <NavLink to={""} className="manage__nav__item">
              Requests
            </NavLink>
            <NavLink to={"passengers"} className="manage__nav__item">
              Passengers
            </NavLink>
          </>
        ) : (
          <Link className="manage__nav__item">Edit</Link>
        )}
        {!/edit\/*$/i.test(location) ? (
          <Button className="manage__back" onClick={() => navigate("edit")}>
            Edit Details
          </Button>
        ) : (
          <Button className="manage__back" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Manage;
