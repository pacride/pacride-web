import "./DashboardIndex.css";
import RideCard from "../../../components/Card/RideCard";
import { ridesData as rd } from "../data/data";
import { useEffect, useState } from "react";
import DashboardPageNav from "../../../components/Nav/DashboardPageNav";
import { useDispatch, useSelector } from "react-redux";
import PlacesAutoComplete from "../../../components/Input/PlacesAutoComplete";
import { useLoadScript } from "@react-google-maps/api";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import Button from "../../../components/Button/Button";
import { useLocation } from "react-router-dom";

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const DashboardIndex = () => {
  const filterOptions = [
    { value: "vehicle", label: "Vehicle" },
    { value: "price", label: "Price" },
    { value: "date", label: "Date/Time" },
    { value: "seats", label: "Seats" },
  ];

  const location = useLocation().search?.split(/[?&]/);
  const [filter, setFilter] = useState("vehicle");
  const [from, setFrom] = useState(location?.find((el) => el.includes("from"))?.split("=")[1] || "");
  const [to, setTo] = useState(location?.find((el) => el.includes("to"))?.split("=")[1] || "");
  const [openOverlay, setOpenOverlay] = useState(true);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const ridesData = useSelector((state) => state.rides || []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  const getRides = async () => {
    if (!from && !to) {
      setLoading(false);
      return;
    };
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/rides?from=${from}&to=${to}`
      );
      const data = await res.json();
      setLoading(false);
      if (data.error) {
        console.log(data.error);
        return;
      }
      if (data.data.rides.length) setOpenOverlay(false);
      dispatch({ type: "SET_RIDES", payload: data.data.rides });
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  }
    
  useEffect(() => {
    setLoading(true);
    getRides();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getRides();
  };

  return (
    <div className="dashboard__container">
      <DashboardPageNav
        filterOptions={filterOptions}
        filter={filter}
        setFilter={setFilter}
      />
      <div className="dashboard__rides">
        {loading ? (
          <div className="dashboard__rides__loading">
            <h1>Loading...</h1>
          </div>
        ) : ridesData.length === 0 ? (
          <div className="dashboard__rides__loading">
            <h1>No rides available</h1>
          </div>
        ) : (
          <>
            {ridesData.map((ride) => {
              const departureDate = new Date(ride.departure).toLocaleDateString(
                "en-GB"
              );
              const departureTime = new Date(ride.departure)
                .toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                .toUpperCase();
              return (
                <RideCard
                  key={ride._id}
                  image={ride.image}
                  from={ride.from}
                  to={ride.to}
                  carName={ride.vehicle}
                  seatsAvailable={ride.availableSeats}
                  currency={ride.currency}
                  price={ride.price}
                  departureDate={departureDate}
                  departureTime={departureTime}
                />
              );
            })}
          </>
        )}
      </div>
      <div className={`dashboard__location ${openOverlay && "open"}`}>
        {openOverlay ? (
          <IoIosArrowDropdown
            className="dashboard__location__overlay__icon"
            onClick={() => setOpenOverlay(false)}
          />
        ) : (
          <IoIosArrowDropup
            className="dashboard__location__overlay__icon"
            onClick={() => setOpenOverlay(true)}
          />
        )}
        <form className="dashboard__location__container" onSubmit={handleSubmit}>
          <h1 className="dashboard__location__title">Find a ride</h1>
          <PlacesAutoComplete
            autoFocus
            className="from__input dashboard__location__input"
            type={"text"}
            placeholder={"Enter your location"}
            LeftIcon={FaLocationCrosshairs}
            setValue={setFrom}
            isLoaded={isLoaded}
          />
          <PlacesAutoComplete
            className="to__input dashboard__location__input"
            type={"text"}
            placeholder={"Enter your destination"}
            LeftIcon={FaLocationDot}
            setValue={setTo}
            isLoaded={isLoaded}
          />
          <Button className="dashboard__location__button">See rides</Button>
        </form>
      </div>
    </div>
  );
};

export default DashboardIndex;
