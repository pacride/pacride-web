import "./Signup.css";
import { useState } from "react";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdAlternateEmail, MdOutlinePassword, MdPhone } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log({
      firstname,
      lastname,
      email,
      username,
      password,
      confirmPassword,
    });
    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/^[a-zA-Z]+$/.test(firstname) || !/^[a-zA-Z]+$/.test(lastname)) {
      toast.error("First name and last name must contain only letters");
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      toast.error("Username must contain only letters and numbers");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
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
          phone,
          username,
          password,
        }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      if (/failed to fetch|network *error/i.test(error.message)) {
        toast.error("Please check your internet connection");
        return;
      }
      toast.error("Something went wrong");
    }
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
        required
      />
      <Input
        type="text"
        label={"Last Name"}
        placeholder="Ride"
        LeftIcon={FaUser}
        name="lastname"
        value={lastname}
        setValue={setLastname}
        required
      />
      <Input
        type="email"
        label={"Email"}
        placeholder="pacride@example.com"
        LeftIcon={MdEmail}
        name="email"
        value={email}
        setValue={setEmail}
        required
      />
      <Input
        type="number"
        label={"Phone"}
        placeholder="09038043846"
        LeftIcon={MdPhone}
        name="phone"
        value={phone}
        setValue={setPhone}
        required
      />
      <Input
        type="text"
        label={"Username"}
        placeholder="pacride"
        LeftIcon={MdAlternateEmail}
        name="username"
        value={username}
        setValue={setUsername}
        autoComplete="off"
        required
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
        minLength={8}
        required
      />
      <Input
        type={showPassword ? "text" : "password"}
        label={"Confirm Password"}
        placeholder="********"
        LeftIcon={MdOutlinePassword}
        name="confirmPassword"
        value={confirmPassword}
        setValue={setConfirmPassowrd}
        required
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
