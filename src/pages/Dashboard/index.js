import "./Dashboard.css";
import DashboardNav from "../../components/Nav/DashboardNav";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import { setBookings, setMyRides, setRequests, setUser } from "../../redux/action";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    document.title = "Dashboard | Pacride";

    fetch(`${process.env.REACT_APP_SERVER}/data`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.error) {
          localStorage.clear();
          navigate("/login");
          return;
        }
        dispatch(setUser(data.data.user));
        dispatch(setMyRides(data.data.rides));
        dispatch(setBookings(data.data.bookings));
        dispatch(setRequests(data.data.requests));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="dashboard">
      {loading || !user ? (
        <div className="loading">
          <MoonLoader color="var(--primary-color)" />
        </div>
      ) : (
        <>
          <Outlet />
          <DashboardNav />
        </>
      )}
    </div>
  );
};

export default Dashboard;
