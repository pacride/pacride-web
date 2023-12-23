/**
import "./Login.css";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import { MdAlternateEmail, MdOutlinePassword } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

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
      <Button type="submit">Login</Button>
    </form>
  );
};

export default Login;
 */

import "./Signup.css";
import { useState } from "react";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdAlternateEmail, MdOutlinePassword } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log({ firstname, lastname, email, username, password, confirmPassword });
    if (
      !firstname ||
      !lastname ||
      !email ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          username,
          password,
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        alert("Signup Successful");
      }
    } catch (error) {}
  };

  return (
    <form className="signup__form" onSubmit={handleSignup}>
      <h2>Signup</h2>
      <Input
        type="text"
        label={"First Name"}
        placeholder="Pac"
        LeftIcon={FaUser}
        name="firstname"
        value={firstname}
        setValue={setFirstname}
      />
      <Input
        type="text"
        label={"Last Name"}
        placeholder="Ride"
        LeftIcon={FaUser}
        name="lastname"
        value={lastname}
        setValue={setLastname}
      />
      <Input
        type="email"
        label={"Email"}
        placeholder="pacride@example.com"
        LeftIcon={MdEmail}
        name="email"
        value={email}
        setValue={setEmail}
      />
      <Input
        type="text"
        label={"Username"}
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
      <Input
        type={showPassword ? "text" : "password"}
        label={"Confirm Password"}
        placeholder="********"
        LeftIcon={MdOutlinePassword}
        name="confirmPassword"
        value={confirmPassword}
        setValue={setConfirmPassowrd}
      />
      <small>
        By clicking the "Signup" button below, you agree to our{" "}
        <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>.
      </small>
      <br />
      <Button type="submit">Signup</Button>
      <br />
      <small>
        Already have an account? <Link to="/login">Login</Link>
      </small>
    </form>
  );
};

export default Signup;
