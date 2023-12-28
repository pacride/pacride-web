import "./ListingsNav.css";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Select from "../Select/Select";
import { useSelector } from "react-redux";

const DashboardPageNav = ({ filterOptions, filter, setFilter }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  return (
    <div className="listings__header">
      <div className="listings__search">
        <div className="listings__search__input">
          <input type="text" placeholder="Search" />
          <button>
            <IoSearchOutline />
          </button>
        </div>
        <Select value={filter} setValue={setFilter} options={filterOptions} />
      </div>
      <div className="listings__header__title__container">
        <div className="listings__header__title">
          <h1>Listings</h1>
          <span>Hello, {userData.username}</span>
        </div>
        <div className="listings__header__button">
          <button onClick={() => navigate("create")}>
            List a ride
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPageNav;
