import "./Landing.css";
import CarScroll from "../../../components/Scroll/CarScroll";
import { useLoadScript } from "@react-google-maps/api";
import {
  FaFacebookF,
  FaInstagram,
  FaLocationCrosshairs,
  FaLocationDot,
  FaTwitter,
} from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button/Button";
import PlacesAutocomplete from "../../../components/Input/PlacesAutoComplete";
import peopleSharingRide from "../../../assets/images/people_sharing_ride.jpeg";
import Input from "../../../components/Input/Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../../../assets/svgs/logo.svg";
import { toast } from "react-toastify";

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const Landing = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation().pathname;
  const aboutSectionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const contactSectionRef = useRef(null);
  const contactBtnRef = useRef(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (/\/about/.test(location))
      aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    else if (/\/contact/.test(location))
      contactSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (loading) {
      document.body.style.cursor = "wait";
      contactBtnRef.current.disabled = true;
      return;
    }
    document.body.style.cursor = "default";
    contactBtnRef.current.disabled = false;
  }, [loading])

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/dashboard/listings?from=${from}&to=${to}`);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!email || !message) return;

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_SERVER}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subject, message }),
      });
      const data = await response.json();
      setLoading(false);
      if (data.error) {
        return toast.error(data.message);
      }
      toast.success(data.message);
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="landing">
      <section className="landing__title__section">
        <div className="landing__title__container">
          <h1 className="landing__title__text">
            Share your fare with <span>Pacride</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <PlacesAutocomplete
              className="from__input"
              type={"text"}
              placeholder={"Enter your location"}
              LeftIcon={FaLocationCrosshairs}
              setValue={setFrom}
              isLoaded={isLoaded}
            />
            <PlacesAutocomplete
              className="to__input"
              type={"text"}
              placeholder={"Enter your destination"}
              LeftIcon={FaLocationDot}
              setValue={setTo}
              isLoaded={isLoaded}
            />
            <Button>See available rides</Button>
          </form>
        </div>
        <div className="landing__title__image__container">
          <div />
          <img
            src={peopleSharingRide}
            alt="people sharing ride"
            className="landing__title__image"
          />
        </div>
      </section>
      <section className="landing__about__section" ref={aboutSectionRef}>
        <div className="landing__about__container">
          <img src={logoImage} alt="logo" className="landing__about__logo" />
          <h2 className="landing__about__title">About Pacride</h2>
          <p className="landing__about__text">
            Pacride is a ride sharing platform that enables passengers going to
            similar destination to share a ride, thereby reducing the cost of
            transportation.
          </p>
        </div>
      </section>
      <section className="landing__how__section">
        <div className="landing__how__container">
          <h2 className="landing__how__title">How it works</h2>
          <div className="landing__how__steps">
            <div className="landing__how__step">
              <span className="landing__how__step__number">1</span>
              <p className="landing__how__step__text">
                Enter your location and destination
              </p>
            </div>
            <div className="landing__how__step">
              <span className="landing__how__step__number">2</span>
              <p className="landing__how__step__text">
                Select a ride from the available rides
              </p>
            </div>
            <div className="landing__how__step">
              <span className="landing__how__step__number">3</span>
              <p className="landing__how__step__text">
                Contact the lister to book a ride
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="landing__contact__section" ref={contactSectionRef}>
        <div className="landing__contact__container">
          <h2 className="landing__contact__title">Contact us</h2>
          <form
            className="landing__contact__form"
            onSubmit={handleContactSubmit}
          >
            <Input
              type="email"
              placeholder="Email"
              className="landing__contact__input"
              value={email}
              setValue={setEmail}
              required
            />
            <Input
              type="text"
              placeholder="Subject"
              className="landing__contact__input"
              value={subject}
              setValue={setSubject}
            />
            <textarea
              type="text"
              placeholder="Message"
              className="landing__contact__textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button ref={contactBtnRef} className="landing__contact__button">Send</Button>
          </form>
        </div>
      </section>
      <section className="landing__footer__section">
        <div className="landing__footer__container">
          <div className="landing__footer__links">
            <Link to="/" className="landing__footer__link">
              Privacy Policy
            </Link>
            <Link to="/" className="landing__footer__link">
              Terms and Conditions
            </Link>
          </div>
          <div className="landing__footer__socials">
            <Link to="/" className="landing__footer__social">
              <FaFacebookF className="landing__footer__social__icon" />
            </Link>
            <Link to="/" className="landing__footer__social">
              <FaTwitter className="landing__footer__social__icon" />
            </Link>
            <Link to="/" className="landing__footer__social">
              <FaInstagram className="landing__footer__social__icon" />
            </Link>
          </div>
        </div>
      </section>
      <CarScroll />
    </div>
  );
};

export default Landing;
