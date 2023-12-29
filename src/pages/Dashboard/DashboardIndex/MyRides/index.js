import "./MyRides.css";
import { useSelector } from "react-redux";
import RideCard from "../../../../components/Card/RideCard";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";

const MyRides = () => {
  const ridesData = useSelector((state) => state.myRides);
  const requestsData = useSelector((state) => state.requests);
  const navigate = useNavigate();

  return (
    <div className="dashboard__index__content">
      {ridesData.length === 0 && (
        <div className="dashboard__index__content__empty">
          <h2>You have no listings</h2>
          <Button 
            className="dashboard__index__content__empty__btn"
            onClick={() => navigate("/dashboard/listings/create")}>
            List a ride
          </Button>
        </div>
      )}
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
            btnText={"Manage"}
            onClick={() => navigate(`/dashboard/manage/${ride._id}`)}
            requests={
              requestsData.filter((request) => request.rideId === ride._id)
                .length
            }
          />
        );
      })}
    </div>
  );
};

export default MyRides;
