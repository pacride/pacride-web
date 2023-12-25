import "./Button.css"

const Button = ({ children, className="", ...props }) => {
  return (
    <button className={`custom__button ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button