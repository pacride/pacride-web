import "./DashboardIndex.css";
import RideCard from "../../../components/Card/RideCard";
import { useEffect, useRef, useState } from "react";
import DashboardPageNav from "../../../components/Nav/DashboardPageNav";
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

const DashboardIndex = () => {
  const filterOptions = [
    { value: "vehicle", label: "Vehicle" },
    { value: "seats", label: "Seats" },
    { value: "price", label: "Price" },
    { value: "date", label: "Date/Time" },
  ];

  const navigate = useNavigate();
  const location = useLocation().pathname;
  const search = useLocation().search?.split(/[?&]/);
  const [filter, setFilter] = useState("vehicle");
  const [from, setFrom] = useState(
    search?.find((el) => el.includes("from"))?.split("=")[1] || ""
  );
  const [to, setTo] = useState(
    search?.find((el) => el.includes("to"))?.split("=")[1] || ""
  );
  const [openOverlay, setOpenOverlay] = useState(true);
  const [loading, setLoading] = useState(true);
  const [contactDetails, setContactDetails] = useState({});
  const dispatch = useDispatch();
  const ridesData = useSelector((state) => state.rides || []);
  const requestButtonRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    setContactDetails({});
    if (/\/dashboard\/ride\/.+/.test(location)) {
      setOpenOverlay(false);
      fetch(`${process.env.REACT_APP_SERVER}/ride/${location.split("/")[3]}`, {
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
    <div className="dashboard__container">
      <DashboardPageNav
        filterOptions={filterOptions}
        filter={filter}
        setFilter={setFilter}
      />
      {!/\/dashboard$/i.test(location) &&
      Object.keys(contactDetails).length > 0 ? (
        <div className="dashboard__contact">
          <button
            className="dashboard__contact__back"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack />
            <span>Back</span>
          </button>
          <div className="card dashboard__contact__container">
            <div className="dashboard__contact__details">
              {contactDetails.image && (
                <img
                  className="dashboard__contact__details__image"
                  src={contactDetails.image}
                  alt="contact"
                />
              )}
              <h4 className="dashboard__contact__details__title">
                Contact details
              </h4>
              <div className="dashboard__contact__details__name">
                <FaUser className="dashboard__contact__icon" />
                <span>
                  {contactDetails.firstname} {contactDetails.lastname}
                </span>
              </div>
            </div>
            <div className="dashboard__contact__phone">
              <FaPhone className="dashboard__contact__icon" />
              <span>
                <Link to={`tel:${contactDetails.phone}`}>
                  {contactDetails.phone}
                </Link>
              </span>
            </div>
            <Button
              className="dashboard__contact__request__button"
              onClick={
                contactDetails.self
                  ? () =>
                      navigate(`/dashboard/manage/ride/${contactDetails.id}`)
                  : contactDetails.requested
                  ? () => cancelRequest(contactDetails.id)
                  : () => sendRequest(contactDetails.id)
              }
              ref={requestButtonRef}
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
                  const departureDate = new Date(
                    ride.departure
                  ).toLocaleDateString("en-GB");
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
            <form
              className="dashboard__location__container"
              onSubmit={handleSubmit}
            >
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
        </>
      )}
    </div>
  );
};

export default DashboardIndex;
