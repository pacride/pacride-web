import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import "./ListingsIndex.css";
import PlacesAutoComplete from "../../../../components/Input/PlacesAutoComplete";
import Button from "../../../../components/Button/Button";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RideCard from "../../../../components/Card/RideCard";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import { useLoadScript } from "@react-google-maps/api";
import { setRides as setRidesAction } from "../../../../redux/action";

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const ListingsIndex = () => {
  const searchLocation = useLocation().search?.split(/[?&]/);
  const [from, setFrom] = useState(
    searchLocation?.find((el) => el.includes("from"))?.split("=")[1] || ""
  );
  const [to, setTo] = useState(
    searchLocation?.find((el) => el.includes("to"))?.split("=")[1] || ""
  );
  const [openOverlay, setOpenOverlay] = useState(true);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const ridesData = useSelector((state) => state.rides || []);
  const [rides, setRides] = useState(ridesData);
  const { search, filter } = useOutletContext();

  useEffect(() => {
    setRides(
      ridesData
        .filter((ride) => {
          if (filter === "vehicle")
            return ride.vehicle.toLowerCase().includes(search.toLowerCase());
          if (filter === "seats") return ride.availableSeats >= search;
          if (filter === "price" && search) return ride.price <= search;
          if (filter === "date" && search)
            return new Date(ride.departure) >= new Date(search);
          return ride;
        })
        .map((ride) => {
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
              id={ride._id}
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
        })
    );
  }, [ridesData, filter, search]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  const getRides = async () => {
    if (!from && !to) {
      setLoading(false);
      return;
    }
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
      dispatch(setRidesAction(data.data.rides));
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getRides();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getRides();
  };

  return (
    <>
      <div className="listings__rides">
        {loading ? (
          <div className="listings__rides__loading">
            <h1>Loading...</h1>
          </div>
        ) : rides.length === 0 ? (
          <div className="listings__rides__loading">
            <h1 className="listings__rides__loading__title">No rides found</h1>
          </div>
        ) : (
          <>{rides}</>
        )}
      </div>
      <div className={`listings__location ${openOverlay && "open"}`}>
        {openOverlay ? (
          <IoIosArrowDropdown
            className="listings__location__overlay__icon"
            onClick={() => setOpenOverlay(false)}
          />
        ) : (
          <IoIosArrowDropup
            className="listings__location__overlay__icon"
            onClick={() => setOpenOverlay(true)}
          />
        )}
        <form className="listings__location__container" onSubmit={handleSubmit}>
          <h1 className="listings__location__title">Find a ride</h1>
          <PlacesAutoComplete
            autoFocus
            className="from__input listings__location__input"
            type={"text"}
            placeholder={"Enter your location"}
            LeftIcon={FaLocationCrosshairs}
            setValue={setFrom}
            isLoaded={isLoaded}
          />
          <PlacesAutoComplete
            className="to__input listings__location__input"
            type={"text"}
            placeholder={"Enter your destination"}
            LeftIcon={FaLocationDot}
            setValue={setTo}
            isLoaded={isLoaded}
          />
          <Button className="listings__location__button">See rides</Button>
        </form>
      </div>
    </>
  );
};

export default ListingsIndex;
