import RideCard from "../../../components/Card/RideCard";
import { ridesData as rd } from "../data/data";
import { useState } from "react";
import DashboardPageNav from "../../../components/Nav/DashboardPageNav";
import { useSelector } from "react-redux";
import PlacesAutoComplete from "../../../components/Input/PlacesAutoComplete";
import { useLoadScript } from "@react-google-maps/api";
import Input from "../../../components/Input/Input";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import Button from "../../../components/Button/Button";

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const DashboardIndex = () => {
  const filterOptions = [
    { value: "vehicle", label: "Vehicle" },
    { value: "price", label: "Price" },
    { value: "date", label: "Date/Time" },
    { value: "seats", label: "Seats" },
  ];

  const [filter, setFilter] = useState("vehicle");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const ridesData = useSelector((state) => state.rides || []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  return (
    <>
      {ridesData.length !== 0 ? (
        <div className="dashboard__location">
          <h1 className="dashboard__location__title">Find a ride</h1>
          <div className="dashboard__location__input">
            {isLoaded ? (
              <>
                <PlacesAutoComplete
                  className="from__input dashboard__location__input"
                  type={"text"}
                  placeholder={"Enter your location"}
                  LeftIcon={FaLocationCrosshairs}
                  setValue={setFrom}
                />
                <PlacesAutoComplete
                  className="to__input dashboard__location__input"
                  type={"text"}
                  placeholder={"Enter your destination"}
                  LeftIcon={FaLocationDot}
                  setValue={setTo}
                />
              </>
            ) : (
              <>
                <Input
                  className="from__input dashboard__location__input"
                  type={"text"}
                  placeholder={"Enter your location"}
                  LeftIcon={FaLocationCrosshairs}
                  setValue={setFrom}
                  value={from}
                  disabled
                />
                <Input
                  className="to__input dashboard__location__input"
                  type={"text"}
                  placeholder={"Enter your destination"}
                  LeftIcon={FaLocationDot}
                  setValue={setTo}
                  value={to}
                  disabled
                />
              </>
            )}
          </div>
          <Button className="dashboard__location__button">See rides</Button>
          <p className="dashboard__location__error">{errorMessage}</p>
        </div>
      ) : (
        <div className="dashboard__container">
          <DashboardPageNav
            filterOptions={filterOptions}
            filter={filter}
            setFilter={setFilter}
          />
          <div className="dashboard__rides">
            {rd.map((ride) => {
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
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardIndex;
