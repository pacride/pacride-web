import { useSelector } from "react-redux";
import "./MyBookings.css";
import RideCard from "../../../../components/Card/RideCard";

const MyBookings = () => {
  const ridesData = useSelector((state) => state.bookings || []);

  return (
    <div className="dashboard__index__content">
      {ridesData.map((ride) => {
        const departureDate = new Date(
          ride.metadata.departure
        ).toLocaleDateString("en-GB");
        const departureTime = new Date(ride.metadata.departure)
          .toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .toUpperCase();
        return (
          <RideCard
            className={`dashboard__index__content__card ${ride.status}`}
            key={ride._id}
            id={ride.metadata._id}
            image={ride.metadata.image}
            from={ride.metadata.from}
            to={ride.metadata.to}
            carName={ride.metadata.vehicle}
            seatsAvailable={ride.metadata.availableSeats}
            currency={ride.metadata.currency}
            price={ride.metadata.price}
            departureDate={departureDate}
            departureTime={departureTime}
            btnText={ride.status}
          />
        );
      })}
    </div>
  );
};

export default MyBookings;
