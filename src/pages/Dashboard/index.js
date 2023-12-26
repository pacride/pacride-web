import "./Dashboard.css";
import DashboardNav from "../../components/Nav/DashboardNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Outlet />
      <DashboardNav />
    </div>
  );
};

export default Dashboard;
