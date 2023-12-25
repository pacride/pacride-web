import Button from "../Button/Button";
import "./RideCard.css";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";

const RideCard = ({
  from,
  to,
  carName,
  seatsAvailable,
  price,
  departureDate,
  departureTime,
  image,
}) => {
  return (
    <div className="card ride__card">
      {image && (
        <div className="ride__card__image">
          <img src={image} alt="ride" />
        </div>
      )}
      <div className="ride__card__details">
        <div className="ride__card__details__header">
          <div className="ride__card__details__header__item ride__card__details__header__from">
            <FaLocationCrosshairs className="ride__card__details__header__icon ride__card__details__header__from__icon" />
            <h4>{from}</h4>
          </div>
          <div className="ride__card__details__header__item ride__card__details__header__to">
            <h4>{to}</h4>
            <FaLocationDot className="ride__card__details__header__icon ride__card__details__header__to__icon" />
          </div>
        </div>
        <div className="ride__card__details__body">
          <div className="ride__card__details__body__car">
            <h5>{carName}</h5>
          </div>
          <div className="ride__card__details__body__seats">
            <h5>{seatsAvailable} seats available</h5>
          </div>
          <div className="ride__card__details__body__price">
            <h5>₹{price}</h5>
          </div>
        </div>
        <div className="ride__card__details__footer">
          <div className="ride__card__details__footer__date">
            <h5>{departureDate}</h5>
          </div>
          <div className="ride__card__details__footer__time">
            <h5>{departureTime}</h5>
          </div>
          <div className="ride__card__details__footer__button">
            <Button>Book</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideCard;
