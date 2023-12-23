import "./Input.css";

const Input = ({
  label,
  type,
  placeholder,
  value = "",
  setValue,
  LeftIcon,
  RightIcon,
  className = "",
  ...props
}) => {
  return (
    <div className={`custom__input__wrapper ${className}`} {...props}>
      {label && <label>{label}</label>}
      <div className="custom__input__conatainer">
        {LeftIcon && (
          <LeftIcon className="custom__input__icon custom__input__icon--left" />
        )}
        <input
          className="custom__input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue && setValue(e.target.value)}
        />
        {RightIcon && (
          <RightIcon className="custom__input__icon custom__input__icon--right" />
        )}
      </div>
    </div>
  );
};

export default Input;
