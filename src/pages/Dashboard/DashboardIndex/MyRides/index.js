import "./MyRides.css"
import { useSelector } from "react-redux";
import RideCard from "../../../../components/Card/RideCard";
import { useNavigate } from "react-router-dom";

const MyRides = () => {
    const ridesData = useSelector((state) => state.myRides || []);
    const navigate = useNavigate();
  return (
    <div className="dashboard__index__rides">
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
            requests={ride.requests?.length}
          />
        );
      })}
    </div>
  );
}

export default MyRides