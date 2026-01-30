import "./Landing.css";
import CarScroll from "../../../components/Scroll/CarScroll";
import { useLoadScript } from "@react-google-maps/api";
import {
  FaLocationCrosshairs,
  FaLocationDot,
  FaCar,
  FaMessage,
  FaMapLocationDot,
  FaShieldHalved,
  FaLeaf,
  FaWallet,
} from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button/Button";
import PlacesAutocomplete from "../../../components/Input/PlacesAutoComplete";
import peopleSharingRide from "../../../assets/images/people_sharing_ride.jpeg";
import Input from "../../../components/Input/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../../components/Footer/Footer";

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
    document.title = "Pacride";

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://queekk-service.vercel.app/assistant.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src =
      "https://queekk-service.vercel.app/assistant/q-eb04f432d24e377a5ff73658b90ea2e79f95c005";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.Queekk.setMainColors("#1877F2");
    };

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

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
  }, [loading]);

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
      <div id="queekk-container" />
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
            <Button className="landing__hero__button">
              See available rides
            </Button>
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
      <section className="landing__features__section" ref={aboutSectionRef}>
        <div className="landing__features__container">
          <div className="landing__features__header">
            <h2 className="landing__features__title">Why Choose Pacride?</h2>
            <p className="landing__features__subtitle">
              Experience the future of travel with our community-driven
              platform.
            </p>
          </div>

          <div className="landing__features__grid">
            <div className="landing__feature__card">
              <div className="landing__feature__icon">
                <FaWallet />
              </div>
              <h3>Save Money</h3>
              <p>
                Cut your travel costs by up to 50% when you share rides with
                others going your way.
              </p>
            </div>

            <div className="landing__feature__card">
              <div className="landing__feature__icon">
                <FaLeaf />
              </div>
              <h3>Eco-Friendly</h3>
              <p>
                Reduce your carbon footprint. Fewer cars on the road means a
                greener planet for everyone.
              </p>
            </div>

            <div className="landing__feature__card">
              <div className="landing__feature__icon">
                <FaShieldHalved />
              </div>
              <h3>Safe & Secure</h3>
              <p>
                Verified profiles and real-time tracking ensure you travel with
                peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="landing__how__section">
        <div className="landing__how__container">
          <h2 className="landing__how__title">How it works</h2>
          <div className="landing__how__steps">
            <div className="landing__how__step">
              <div className="landing__how__step__icon">
                <FaMapLocationDot />
              </div>
              <span className="landing__how__step__number">Step 1</span>
              <h3 className="landing__how__step__title">Search</h3>
              <p className="landing__how__step__text">
                Enter your location and destination to find rides going your
                way.
              </p>
            </div>
            <div className="landing__how__step">
              <div className="landing__how__step__icon">
                <FaCar />
              </div>
              <span className="landing__how__step__number">Step 2</span>
              <h3 className="landing__how__step__title">Select</h3>
              <p className="landing__how__step__text">
                Choose a ride that fits your schedule and budget from the list.
              </p>
            </div>
            <div className="landing__how__step">
              <div className="landing__how__step__icon">
                <FaMessage />
              </div>
              <span className="landing__how__step__number">Step 3</span>
              <h3 className="landing__how__step__title">Connect</h3>
              <p className="landing__how__step__text">
                Contact the driver directly to book your seat and arrange
                details.
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
            <Button ref={contactBtnRef} className="landing__contact__button">
              Send
            </Button>
          </form>
        </div>
      </section>
      <Footer />
      <CarScroll />
    </div>
  );
};

export default Landing;
