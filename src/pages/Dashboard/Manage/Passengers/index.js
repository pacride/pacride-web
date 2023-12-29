import { useSelector } from "react-redux";
import "./Passengers.css";
import { Link, useLocation } from "react-router-dom";
import ManageNav from "../components/ManageNav";
import anonymousUser from "../../../../assets/svgs/anonymous_user.svg";

const Passengers = () => {
  const location = useLocation().pathname;
  const passengersData = useSelector((state) =>
    state.myRides.find((ride) => ride._id === location.split("/")[3])
  )?.passengers;

  return (
    <div className="passengers">
      <ManageNav />
      <div className="passengers__content">
        {
            passengersData.length === 0 && (
                <div className="passenger-item">
                    <div className="passenger-item__left">
                        <div className="user-details">
                            <span className="user-name">
                                No passengers yet
                            </span>
                        </div>
                    </div>
                </div>
            )
        }
        {passengersData &&
          passengersData.map((passenger) => (
            <div key={passenger._id} className="passenger-item">
              <div className="passenger-item__left">
                <div className="user-image">
                  <img src={passenger.image || anonymousUser} alt="user" />
                </div>
                <div className="user-details">
                  <span className="user-name">
                    {passenger.firstname} {passenger.lastname}
                  </span>
                  <Link to={`tel:${passenger.phone}`} className="user-phone">{passenger.phone}</Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Passengers;
