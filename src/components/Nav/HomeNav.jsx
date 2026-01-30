import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./HomeNav.css";
import logoImage from "../../assets/svgs/logo.svg";

const HomeNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="home__nav">
      <Link
        to={"/"}
        className="home__nav__item home__nav__logo__container"
        onClick={closeMenu}
      >
        <img src={logoImage} alt="logo" className="home__nav__logo" />
      </Link>

      <div className={`home__nav__links ${isMenuOpen ? "active" : ""}`}>
        <NavLink to={"/"} className="home__nav__item" onClick={closeMenu}>
          <span>Home</span>
        </NavLink>
        <NavLink to={"/about"} className="home__nav__item" onClick={closeMenu}>
          <span>About</span>
        </NavLink>
        <NavLink
          to={"/contact"}
          className="home__nav__item"
          onClick={closeMenu}
        >
          <span>Contact</span>
        </NavLink>
        <NavLink
          to={"/login"}
          className="home__nav__item home__nav__login"
          onClick={closeMenu}
        >
          <span>Login</span>
        </NavLink>
        <NavLink
          to={"/signup"}
          className="home__nav__item home__nav__signup"
          onClick={closeMenu}
        >
          <span>Create an account</span>
        </NavLink>
      </div>

      <div className="home__nav__toggle" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </div>
  );
};

export default HomeNav;
