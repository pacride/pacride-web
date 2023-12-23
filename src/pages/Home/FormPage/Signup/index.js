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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (
    <form className="signup__form" onSubmit={handleSignup}>
      <h2>Signup</h2>
      <Input
        type="text"
        label={"First Name"}
        placeholder="Pac"
        LeftIcon={FaUser}
        name="firstName"
        value={firstName}
        setValue={setFirstName}
      />
      <Input
        type="text"
        label={"Last Name"}
        placeholder="Ride"
        LeftIcon={FaUser}
        name="lastName"
        value={lastName}
        setValue={setLastName}
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
