import "./Listings.css";
import RideCard from "../../../components/Card/RideCard";
import { useEffect, useRef, useState } from "react";
import DashboardPageNav from "../../../components/Nav/ListingsNav";
import { useDispatch, useSelector } from "react-redux";
import PlacesAutoComplete from "../../../components/Input/PlacesAutoComplete";
import { useLoadScript } from "@react-google-maps/api";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import {
  FaLocationCrosshairs,
  FaLocationDot,
  FaPhone,
  FaUser,
} from "react-icons/fa6";
import Button from "../../../components/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const Listings = () => {
  const filterOptions = [
    { value: "vehicle", label: "Vehicle" },
    { value: "seats", label: "Seats" },
    { value: "price", label: "Price" },
    { value: "date", label: "Date" },
  ];

  const navigate = useNavigate();
  const location = useLocation().pathname;
  const searchLocation = useLocation().search?.split(/[?&]/);
  const [filter, setFilter] = useState("vehicle");
  const [from, setFrom] = useState(
    searchLocation?.find((el) => el.includes("from"))?.split("=")[1] || ""
  );
  const [to, setTo] = useState(
    searchLocation?.find((el) => el.includes("to"))?.split("=")[1] || ""
  );
  const [openOverlay, setOpenOverlay] = useState(true);
  const [loading, setLoading] = useState(true);
  const [contactDetails, setContactDetails] = useState({});
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const ridesData = useSelector((state) => state.rides || []);
  const [rides, setRides] = useState(ridesData);

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

  useEffect(() => {
    setContactDetails({});
    if (/\/dashboard\/listings\/ride\/.+/.test(location)) {
      setOpenOverlay(false);
      fetch(`${process.env.REACT_APP_SERVER}/ride/${location.split("/")[4]}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            return;
          }
          setContactDetails(data.data.contact);
        })
        .catch((err) => console.error(err.message));
    }
  }, [location]);

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
      dispatch({ type: "SET_RIDES", payload: data.data.rides });
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

  const sendRequest = async (id) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/ride/${id}/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (data.error) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      setContactDetails((prev) => ({ ...prev, requested: true }));
    } catch (err) {
      console.error(err.message);
    }
  };

  const cancelRequest = async (id) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/ride/${id}/request`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (data.error) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      setContactDetails((prev) => ({ ...prev, requested: false }));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="listings__container">
      <DashboardPageNav
        search={search}
        setSearch={setSearch}
        filterOptions={filterOptions}
        filter={filter}
        setFilter={setFilter}
      />
      {!/\/listings$/i.test(location) &&
      Object.keys(contactDetails).length > 0 ? (
        <div className="listings__contact">
          <button
            className="listings__contact__back"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack />
            <span>Back</span>
          </button>
          <div className="card listings__contact__container">
            <div className="listings__contact__details">
              {contactDetails.image && (
                <img
                  className="listings__contact__details__image"
                  src={contactDetails.image}
                  alt="contact"
                />
              )}
              <h4 className="listings__contact__details__title">
                Contact details
              </h4>
              <div className="listings__contact__details__name">
                <FaUser className="listings__contact__icon" />
                <span>
                  {contactDetails.firstname} {contactDetails.lastname}
                </span>
              </div>
            </div>
            <div className="listings__contact__phone">
              <FaPhone className="listings__contact__icon" />
              <span>
                <Link to={`tel:${contactDetails.phone}`}>
                  {contactDetails.phone}
                </Link>
              </span>
            </div>
            <Button
              className="listings__contact__request__button"
              onClick={
                contactDetails.self
                  ? () =>
                      navigate(`/dashboard/manage/ride/${contactDetails.id}`)
                  : contactDetails.requested
                  ? () => cancelRequest(contactDetails.id)
                  : () => sendRequest(contactDetails.id)
              }
            >
              {contactDetails.self
                ? "Manage Ride"
                : contactDetails.requested
                ? "Cancel Request"
                : "Send Request"}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="listings__rides">
            {loading ? (
              <div className="listings__rides__loading">
                <h1>Loading...</h1>
              </div>
            ) : rides.length === 0 ? (
              <div className="listings__rides__loading">
                <h1 className="listings__rides__loading__title">
                  No rides found
                </h1>
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
            <form
              className="listings__location__container"
              onSubmit={handleSubmit}
            >
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
      )}
    </div>
  );
};

export default Listings;
