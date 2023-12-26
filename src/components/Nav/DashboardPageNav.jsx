import "./DashboardPageNav.css";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Select from "../Select/Select";

const DashboardPageNav = ({ filterOptions, filter, setFilter }) => {

  const navigate = useNavigate();

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
          <span>Hello, John</span>
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
