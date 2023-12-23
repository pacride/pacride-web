import { Link, NavLink } from "react-router-dom";
import "./HomeNav.css";

const HomeNav = () => {
  return (
    <div className="home__nav">
      <Link to={"/"} className="home__nav__item home__nav__logo__container">
        <span>Pacride</span>
      </Link>
      <NavLink to={"/"} className="home__nav__item">
        <span>Home</span>
      </NavLink>
      <NavLink to={"/about"} className="home__nav__item">
        <span>About</span>
      </NavLink>
      <NavLink to={"/contact"} className="home__nav__item">
        <span>Contact</span>
      </NavLink>
      <NavLink to={"/login"} className="home__nav__item home__nav__login">
        <span>Login</span>
      </NavLink>
      <NavLink to={"/signup"} className="home__nav__item home__nav__signup">
        <span>Create an account</span>
      </NavLink>
    </div>
  );
}

export default HomeNav