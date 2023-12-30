import "./Edit.css";
import { useEffect, useRef, useState } from "react";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { updateRide } from "../../../../redux/action";

const Edit = () => {
  const location = useLocation().pathname.split("/")[3];
  const rideData = useSelector((state) => state.myRides).find(
    (ride) => ride._id === location
  );
  const dispatch = useDispatch();

  const [image, setImage] = useState(rideData.image);
  const [vehicle, setVehicle] = useState(rideData.vehicle);
  const [from, setFrom] = useState(rideData.from);
  const [to, setTo] = useState(rideData.to);
  const [currency, setCurrency] = useState(rideData.currency);
  const [price, setPrice] = useState(rideData.price);
  const [departure, setDeparture] = useState(rideData.departure);
  const [availableSeats, setAvailableSeats] = useState(rideData.availableSeats);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    if (
      image !== rideData.image ||
      vehicle !== rideData.vehicle ||
      from !== rideData.from ||
      to !== rideData.to ||
      currency !== rideData.currency ||
      price !== rideData.price ||
      departure !== rideData.departure ||
      availableSeats !== rideData.availableSeats
    ) {
      setChanges(true);
    } else {
      setChanges(false);
    }
  }, [image, vehicle, from, to, currency, price, departure, availableSeats]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {

    if (
      vehicle === rideData.vehicle &&
      from === rideData.from &&
      to === rideData.to &&
      currency === rideData.currency &&
      price === rideData.price &&
      departure === rideData.departure &&
      availableSeats === rideData.availableSeats &&
      image === rideData.image
    ) {
      toast.error("No changes made");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("vehicle", vehicle);
    formData.append("from", from);
    formData.append("to", to);
    formData.append("currency", currency);
    formData.append("price", price);
    formData.append("departure", departure);
    formData.append("availableSeats", availableSeats);
    formData.append("image", imageRef.current?.files?.[0] || image);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/ride/${location}/edit`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setLoading(false);
      if (data.error) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      dispatch(updateRide(data.data.ride));
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="ride__edit">
      <div className="ride__edit__container">
        <div className="ride__edit__container__image">
          <img src={image} alt="ride" />
          <input type="file" ref={imageRef} onChange={handleImageChange} />
        </div>
        <div className="ride__edit__container__form">
          <Input
            type="text"
            placeholder="Vehicle"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <Input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Departure"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Available Seats"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(e.target.value)}
          />
          <Button disabled={loading || !changes} onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
