import { useEffect, useState } from "react";
import "./DashboardPageNav.css";
import { FaChevronDown, FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

const DashboardPageNav = ({ filter, setFilter }) => {
  const [selectOpen, setSelectOpen] = useState(false);

  useEffect(() => {
    const closeSelect = () => {
      setSelectOpen(false);
    };
    document.addEventListener("click", (e) => {
      if (e.target.closest(".dashboard__search__filter__select")) return;
      closeSelect();
    });
    return () => document.removeEventListener("click", closeSelect);
  }, []);

  useEffect(() => {
    setSelectOpen(false);
  }, [filter]);

  return (
    <div className="dashboard__header">
      <div className="dashboard__search">
        <div className="dashboard__search__input">
          <input type="text" placeholder="Search" />
          <button>
            <IoSearchOutline />
          </button>
        </div>
        <div className="dashboard__search__filter">
          <div className="dashboard__search__filter__select">
            <div
              className="dashboard__search__filter__select__title"
              onClick={() => setSelectOpen(!selectOpen)}
            >
              <span>{filter}</span>
              <FaChevronDown className="dashboard__search__filter__select__title__icon" />
            </div>
            {selectOpen && (
              <div className="dashboard__search__filter__select__options">
                <span onClick={() => setFilter("Departure")}>Departure</span>
                <span onClick={() => setFilter("Arrival")}>Arrival</span>
                <span onClick={() => setFilter("Price")}>Price</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="dashboard__header__title__container">
        <div className="dashboard__header__title">
          <h1>Dashboard</h1>
          <span>Hello, John</span>
        </div>
        <div className="dashboard__header__button">
          <button>
            List a ride
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPageNav