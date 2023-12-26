import { Link, NavLink, useLocation } from "react-router-dom";
import "./DashboardNav.css";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";

const DashboardNav = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".dashboard__nav") &&
        !e.target.closest(".dashboard__nav__toggle")
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setToggle(false);
  }, [location])

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
        <NavLink to="profile" className="dashboard__nav__item">
          Profile
        </NavLink>
        <Link to="/login" className="dashboard__nav__item" onClick={() => localStorage.clear()}>
          Log out
        </Link>
      </div>
    </>
  );
};

export default DashboardNav;
