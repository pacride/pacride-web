import { Link, NavLink } from "react-router-dom";
import "./HomeNav.css";
import logoImage from "../../assets/svgs/logo.svg";

const HomeNav = () => {
  return (
    <div className="home__nav">
      <Link to={"/"} className="home__nav__item home__nav__logo__container">
        <img src={logoImage} alt="logo" className="home__nav__logo" />
        {/* <span>Pacride</span> */}
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