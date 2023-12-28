import "./DashboardIndex.css";
import { NavLink, Outlet } from "react-router-dom";

const DashboardIndex = () => {

  return (
    <div className="dashboard__index">
      <div className="dashboard__index__nav">
        <NavLink to={""} end className="dashboard__index__nav__item">My Listings</NavLink>
        <NavLink to={"bookings"} className="dashboard__index__nav__item">My Bookings</NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default DashboardIndex;
