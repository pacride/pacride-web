import "./Button.css"

const Button = ({ children, className="", ...props }) => {
  return (
    <button className={`custom__button ${className}`}>
        {children}
    </button>
  )
}

export default Button