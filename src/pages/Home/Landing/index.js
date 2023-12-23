import "./Landing.css";
import CarScroll from "../../../components/Scroll/CarScroll";
import { useLoadScript } from "@react-google-maps/api";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import Button from "../../../components/Button/Button";
import PlacesAutocomplete from "../../../components/Input/PlacesAutoComplete";
import peopleSharingRide from "../../../assets/images/people_sharing_ride.jpeg";

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const Landing = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="landing">
      <section className="landing__title__section">
        <div className="landing__title__container">
          <h1 className="landing__title__text">
            Share your fare with <span>Pacride</span>
          </h1>
          <form onSubmit={handleSubmit}>
            {isLoaded && (
              <>
                <PlacesAutocomplete
                  className="from__input"
                  type={"text"}
                  placeholder={"Enter your location"}
                  LeftIcon={FaLocationCrosshairs}
                  setValue={setFrom}
                />
                <PlacesAutocomplete
                  className="to__input"
                  type={"text"}
                  placeholder={"Enter your destination"}
                  LeftIcon={FaLocationDot}
                  setValue={setTo}
                />
              </>
            )}
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
      <CarScroll />
    </div>
  );
};

export default Landing;
