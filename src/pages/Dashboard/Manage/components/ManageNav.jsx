import { FaCar, FaChair } from "react-icons/fa6";
import "./ManageNav.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ManageNav = () => {
  const location = useLocation().pathname;
  const ridesData = useSelector((state) => state.myRides)?.find(
    (ride) => ride._id === location.split("/")[3]
  );

  return (
    <div className="manage__inner__nav">
      <div className="manage__inner__nav__item">
        <FaCar />
        <span>{ridesData?.vehicle}</span>
      </div>
      <div className="manage__inner__nav__item">
        <FaChair />
        <span>
          {ridesData?.availableSeats} seat
          {ridesData?.availableSeats > 1 ? "s" : ""} available
        </span>
      </div>
    </div>
  );
};

export default ManageNav;
