import { NavLink } from "react-router-dom";
import "./DashboardNav.css";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

const DashboardNav = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div
        className={`dashboard__nav__toggle ${toggle ? "active" : ""}`}
        onClick={() => setToggle(!toggle)}
      >
        <AiOutlineMenu />
        <AiOutlineClose />
      </div>
      <div className={`dashboard__nav ${toggle ? "active" : ""}`}>
        <div className="dashboard__nav__logo">
          <NavLink to="" end className="dashboard__nav__logo__container">
            <img src="https://via.placeholder.com/50" alt="logo" />
            <span>Pacride</span>
          </NavLink>
        </div>
        <NavLink to="" end className="dashboard__nav__item">
          Dashboard
        </NavLink>
        <NavLink to="my-listings" className="dashboard__nav__item">
          My Listings
        </NavLink>
        <NavLink to="rides" className="dashboard__nav__item">
          Rides
        </NavLink>
        <NavLink to="messages" className="dashboard__nav__item">
          Messages
        </NavLink>
        <NavLink to="settings" className="dashboard__nav__item">
          Settings
        </NavLink>
      </div>
    </>
  );
};

export default DashboardNav;
