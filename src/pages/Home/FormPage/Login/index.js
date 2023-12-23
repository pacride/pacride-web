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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        alert(data.error);
      } else {
        alert("Login Successful");
      }
    } catch (error) {}
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
        setValue={setUsername}
      />
      <Input
        type={showPassword ? "text" : "password"}
        label={"Password"}
        placeholder="********"
        LeftIcon={MdOutlinePassword}
        RightIcon={showPassword ? FaEyeSlash : FaEye}
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
