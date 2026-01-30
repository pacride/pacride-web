import "./Error.css";
import { Link } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";
import Button from "../../components/Button/Button";

const Error = () => {
  return (
    <div className="error-page">
      <div className="error-page__content">
        <div className="error-page__icon">
          <FaMapLocationDot />
        </div>
        <h1 className="error-page__code">404</h1>
        <h2 className="error-page__title">Lost your way?</h2>
        <p className="error-page__text">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button className="error-page__button">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
