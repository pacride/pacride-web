import "./Dashboard.css";
import RideCard from "../../components/Card/RideCard";
import DashboardNav from "../../components/Nav/DashboardNav";
import { ridesData } from "./data/data";
import { useState } from "react";
import DashboardPageNav from "../../components/Nav/DashboardPageNav";

const Dashboard = () => {
  const [filter, setFilter] = useState("Departure");

  return (
    <div className="dashboard">
      <DashboardNav />
      <div className="dashboard__container">
        <DashboardPageNav 
          filter={filter}
          setFilter={setFilter}
        />
        <div className="dashboard__rides">
          {ridesData.map((ride) => (
            <RideCard
              key={ride._id}
              image={ride.image}
              from={ride.from}
              to={ride.to}
              carName={ride.carName}
              seatsAvailable={ride.seatsAvailable}
              price={ride.price}
              departureDate={ride.departureDate}
              departureTime={ride.departureTime}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
