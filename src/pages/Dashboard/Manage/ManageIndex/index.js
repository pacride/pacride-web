import { useDispatch, useSelector } from "react-redux";
import "./ManageIndex.css";
import anonymousUser from "../../../../assets/svgs/anonymous_user.svg";
import { currencyOptions } from "../../../../data/currency";
import { Link, useLocation } from "react-router-dom";
import { FaCar, FaChair } from "react-icons/fa6";
import { toast } from "react-toastify";
import { deleteRequest } from "../../../../redux/action";

const ManageIndex = () => {
  const location = useLocation().pathname;
  const requestsData = useSelector((state) => state.requests);
  const ridesData = useSelector((state) => state.myRides)?.find(
    (ride) => ride._id === location.split("/")[3]
  );
  const dispatch = useDispatch();

  const updateRequest = async (id, status) => {
    try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER}/ride/${id}/request`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ status }),
          }
        );
        const data = await response.json();
        if (data.error) {
            toast.error(data.message);
            return;
        }
        toast.success(data.message);
        dispatch(deleteRequest(id));
    } catch (error) {
        toast.error(error.message);
    }
  };

  return (
    <div className="manageindex">
      <div className="manageindex__header">
        <div className="manageindex__header__item">
          <FaCar />
          <span>{ridesData?.vehicle}</span>
        </div>
        <div className="manageindex__header__item">
          <FaChair />
          <span>
            {ridesData?.availableSeats} seat
            {ridesData?.availableSeats > 1 ? "s" : ""} available
          </span>
        </div>
      </div>
      <div className="manageindex__content">
        {requestsData &&
          requestsData
            .filter((request) => {
              return (
                request.status === "pending" &&
                request.metadata._id === location.split("/")[3]
              );
            })
            .map((request) => (
              <div key={request._id} className="request-item">
                <div className="request-item__left">
                  <div className="user-image">
                    <img
                      src={request.userdata.image || anonymousUser}
                      alt="user"
                    />
                  </div>
                  <div className="user-details">
                    <span className="user-name">
                      {request.userdata.firstname} {request.userdata.lastname}
                    </span>
                    <Link
                      to={`tel:${request.userdata.phone}`}
                      className="user-phone"
                    >
                      {request.userdata.phone}
                    </Link>
                  </div>
                </div>
                <div className="request-item__right">
                  <div className="destination-from">
                    {request.metadata.from}
                  </div>
                  <div className="destination-to">{request.metadata.to}</div>
                  <div className="departure-time">
                    {new Date(request.metadata.departure).toLocaleString()}
                  </div>
                  <div className="price-info">
                    {
                      currencyOptions.find(
                        (currency) =>
                          currency.label === request.metadata.currency
                      )?.value
                    }{" "}
                    {request.metadata.price}
                  </div>
                  <div className="action-buttons">
                    <button
                      className="accept-button"
                      onClick={() => updateRequest(request._id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => updateRequest(request._id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ManageIndex;
