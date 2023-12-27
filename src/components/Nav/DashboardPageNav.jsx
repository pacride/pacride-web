import "./DashboardPageNav.css";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Select from "../Select/Select";
import { useSelector } from "react-redux";

const DashboardPageNav = ({ filterOptions, filter, setFilter }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  return (
    <div className="dashboard__header">
      <div className="dashboard__search">
        <div className="dashboard__search__input">
          <input type="text" placeholder="Search" />
          <button>
            <IoSearchOutline />
          </button>
        </div>
        <Select value={filter} setValue={setFilter} options={filterOptions} />
      </div>
      <div className="dashboard__header__title__container">
        <div className="dashboard__header__title">
          <h1>Dashboard</h1>
          <span>Hello, {userData.username}</span>
        </div>
        <div className="dashboard__header__button">
          <button onClick={() => navigate("/dashboard/rides/new")}>
            List a ride
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPageNav;
