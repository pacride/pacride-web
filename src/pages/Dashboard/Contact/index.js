import { FaPhone, FaUser } from "react-icons/fa6";
import "./Contact.css";
import Button from "../../../components/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteBooking, updateBookings } from "../../../redux/action";
import { IoIosArrowBack } from "react-icons/io";

const Contact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contactDetails, setContactDetails] = useState({});
  const location = useLocation().pathname;

  useEffect(() => {
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
  }, [location]);

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
      dispatch(updateBookings(data.data.booking));
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
      dispatch(deleteBooking(id));
      setContactDetails((prev) => ({ ...prev, requested: false }));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="listings__contact">
      <button className="listings__contact__back" onClick={() => navigate(-1)}>
        <IoIosArrowBack />
        <span>Back</span>
      </button>
      {Object.keys(contactDetails).length > 0 ? (
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
            className={`listings__contact__request__button ${""}`}
            onClick={
              contactDetails.self
                ? () => navigate(`/dashboard/manage/${contactDetails.id}`)
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
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Contact;
