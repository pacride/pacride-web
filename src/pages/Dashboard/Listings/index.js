import { useState } from "react";
import "./Listings.css";
import ListingsNav from "../../../components/Nav/ListingsNav";
import { Outlet } from "react-router-dom";

const Listings = () => {
  const filterOptions = [
    { value: "vehicle", label: "Vehicle" },
    { value: "seats", label: "Seats" },
    { value: "price", label: "Price" },
    { value: "date", label: "Date" },
  ];
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("vehicle");

  return (
    <div className="listings__container">
      <ListingsNav
        search={search}
        setSearch={setSearch}
        filterOptions={filterOptions}
        filter={filter}
        setFilter={setFilter}
      />
      <Outlet context={{ search, filter }} />
    </div>
  );
};

export default Listings;
