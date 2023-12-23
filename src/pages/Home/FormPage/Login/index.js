import "./Login.css";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import { MdAlternateEmail, MdOutlinePassword } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <form className="login__form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <Input
        type="text"
        label={"E-mail / Username"}
        placeholder="pacride"
        LeftIcon={MdAlternateEmail}
        name="username"
        value={username}
        setValue={setUsername
        }
      />
      <Input
        type={showPassword ? "text" : "password"}
        label={"Password"}
        placeholder="********"
        LeftIcon={MdOutlinePassword}
        RightIcon={
          showPassword ? FaEyeSlash : FaEye
        }
        rightIconOptions={{
          onClick: () => setShowPassword(!showPassword),
          className: "formpage__show-password",
        }}
        name="password"
        value={password}
        setValue={setPassword}
      />
      <small className="login__forgot-password">
        <Link to="/forgot-password">Forgot Password?</Link>
      </small>
      <Button type="submit">Login</Button>
      <br />
      <small>
        Don't have an account? <Link to="/signup">Signup</Link>
      </small>
    </form>
  );
};

export default Login;
