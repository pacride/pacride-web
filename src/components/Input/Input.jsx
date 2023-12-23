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
  leftIconOptions,
  rightIconOptions,
  ...props
}) => {
  return (
    <div className={`custom__input__wrapper ${className}`}>
      {label && <label>{label}</label>}
      <div className="custom__input__conatainer">
        {LeftIcon && (
          <LeftIcon
            className="custom__input__icon custom__input__icon--left"
            {...leftIconOptions}
          />
        )}
        <input
          className="custom__input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue && setValue(e.target.value)}
          {...props}
        />
        {RightIcon && (
          <RightIcon
            className="custom__input__icon custom__input__icon--right"
            {...rightIconOptions}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
