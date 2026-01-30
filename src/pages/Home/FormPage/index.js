import "./FormPage.css";
import signupGif from "../../../assets/gif/people_in_car.gif";
import signupGifFallback from "../../../assets/images/people_in_car.jpg";
import loginGif2 from "../../../assets/gif/people_in_car2.gif";
import loginGif2Fallback from "../../../assets/images/people_in_car2.jpg";
import { Outlet, useLocation } from "react-router-dom";

const FormPage = () => {
  const location = useLocation().pathname;

  return (
    <div className="formpage">
      <div>
        <h1>Pacride</h1>
        <picture>
          {/\/login/i.test(location) ? (
            <source srcSet={loginGif2} type="image/gif" />
          ) : (
            <source srcSet={signupGif} type="image/gif" />
          )}
          {/\/login/i.test(location) ? (
            <img src={loginGif2Fallback} alt="people in car" />
          ) : (
            <img src={signupGifFallback} alt="people in car" />
          )}
        </picture>
        {/\/login/i.test(location) ? (
          <p>
            Reconnect with your journey's tale, unlock the adventures, and
            embrace the shared thrills.
          </p>
        ) : (
          <p>
            Transform every mile into a timeless memory, amplify your adventure,
            and share the bounty of the journey - because epic rides Are meant
            to Be shared in grand style!
          </p>
        )}
      </div>
      <div>
        <div className="card formpage__card">
          <Outlet />
        </div>
        <footer className="formpage__footer">
          <small>Pacride © {new Date().getFullYear()}. All rights reserved.</small>
        </footer>
      </div>
    </div>
  );
};

export default FormPage;
