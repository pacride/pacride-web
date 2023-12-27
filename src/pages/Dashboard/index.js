import "./Dashboard.css";
import DashboardNav from "../../components/Nav/DashboardNav";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MoonLoader } from "react-spinners";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
        dispatch({ type: "SET_USER", payload: data.data.user });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="dashboard">
      {loading ? (
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
