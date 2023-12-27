import {
  FaCar,
  FaChair,
  FaImage,
  FaLocationArrow,
  FaLocationDot,
  FaMoneyBill,
} from "react-icons/fa6";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import "./NewRide.css";
import { useRef, useState } from "react";
import Select from "../../../components/Select/Select";
import PlacesAutoComplete from "../../../components/Input/PlacesAutoComplete";
import { useLoadScript } from "@react-google-maps/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const NewRide = () => {
  const currencyOptions = [
    { label: "NGN", value: "NGN" },
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
  ];
  
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [price, setPrice] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const imageRef = useRef(null);
  const formRef = useRef(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !vehicle ||
      !from ||
      !to ||
      !currency ||
      !price ||
      !availableSeats ||
      !pickupDate ||
      !pickupTime
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const departure = new Date(`${pickupDate} ${pickupTime}`);
    if (departure < new Date()) {
      toast.error("Please pick a date in the future");
      return;
    }

    const formData = new FormData();
    formData.append("vehicle", vehicle);
    formData.append("from", from);
    formData.append("to", to);
    formData.append("currency", currency);
    formData.append("price", price);
    formData.append("availableSeats", availableSeats);
    formData.append("departure", departure);
    if (imageRef.current?.files?.[0]) {
      formData.append("image", imageRef.current.files[0]);
    }

    const response = await fetch(`${process.env.REACT_APP_SERVER}/rides/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.message);
      return;
    }
    toast.success("Ride created successfully");
    formRef.current.reset();
    setVehicle("");
    setFrom("");
    setTo("");
    setCurrency("");
    setPrice("");
    setAvailableSeats("");
    setPickupDate("");
    setPickupTime("");
    setImage("");
    setErrorMessage("");
    navigate("/dashboard");
  };

  return (
    <div className="new__ride">
      <div className="new__ride__container">
        <h1 className="new__ride__header">Create a new ride</h1>
        <form className="new__ride__form" onSubmit={handleSubmit} ref={formRef}>
          <Input
            label={"Vehicle"}
            className="new__ride__input"
            type={"text"}
            placeholder={"Enter your vehicle"}
            LeftIcon={FaCar}
            setValue={setVehicle}
            value={vehicle}
          />
          <PlacesAutoComplete
            label={"Pickup location"}
            className="new__ride__input"
            type={"text"}
            placeholder={"Enter your pickup location"}
            LeftIcon={FaLocationArrow}
            setValue={setFrom}
            value={from}
            isLoaded={isLoaded}
          />
          <PlacesAutoComplete
            label={"Destination"}
            className="new__ride__input"
            type={"text"}
            placeholder={"Enter your destination"}
            LeftIcon={FaLocationDot}
            setValue={setTo}
            value={to}
            isLoaded={isLoaded}
          />
          <Select
            label={"Currency"}
            className="new__ride__input"
            placeholder={"Select currency"}
            setValue={setCurrency}
            value={currency}
            options={currencyOptions}
          />
          <Input
            label={"Price"}
            className="new__ride__input"
            type={"number"}
            placeholder={"Enter your price"}
            LeftIcon={FaMoneyBill}
            setValue={setPrice}
            value={price}
          />
          <Input
            label={"Available seats"}
            className="new__ride__input"
            type={"number"}
            placeholder={"Enter your available seats"}
            LeftIcon={FaChair}
            setValue={setAvailableSeats}
            value={availableSeats}
          />
          <Input
            label={"Pickup date"}
            className="new__ride__input"
            type={"date"}
            placeholder={"Enter pickup date"}
            setValue={setPickupDate}
            value={pickupDate}
          />
          <Input
            type={"time"}
            className="new__ride__input"
            label={"Pickup time"}
            placeholder={"Enter pickup time"}
            setValue={setPickupTime}
            value={pickupTime}
          />
          <Input
            label={"Vehicle Image"}
            className="new__ride__input"
            type={"file"}
            placeholder={"Enter your image"}
            LeftIcon={FaImage}
            setValue={setImage}
            value={image}
            ref={imageRef}
          />
          <Button className="new__ride__button">Create ride</Button>
          <p className="new__ride__error">{errorMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default NewRide;
