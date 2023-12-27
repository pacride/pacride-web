import { currencyOptions } from "../../data/currency";
import Button from "../Button/Button";
import "./RideCard.css";
import {
  FaCar,
  FaChair,
  FaLocationCrosshairs,
  FaLocationDot,
  FaMoneyBill,
} from "react-icons/fa6";

const RideCard = ({
  from,
  to,
  carName,
  seatsAvailable,
  currency,
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
            <FaCar className="ride__card__details__body__icon" />
            <h5>{carName}</h5>
          </div>
          <div className="ride__card__details__body__seats">
            <FaChair className="ride__card__details__body__icon" />
            <h5>{seatsAvailable} seats available</h5>
          </div>
          <div className="ride__card__details__body__price">
            <FaMoneyBill className="ride__card__details__body__icon" />
            <h5>
              {currencyOptions.filter(
                (option) => option.label === currency
              )?.[0]?.value || []}
              {price}
            </h5>
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
