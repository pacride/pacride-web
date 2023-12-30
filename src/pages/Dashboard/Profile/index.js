import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import Input from "../../../components/Input/Input";
import { useRef, useState } from "react";
import Button from "../../../components/Button/Button";
import anonymousUser from "../../../assets/svgs/anonymous_user.svg";
import { toast } from "react-toastify";
import { updateUser } from "../../../redux/action";

const Profile = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(userData.username);
  const [phone, setPhone] = useState(userData.phone);
  const [email, setEmail] = useState(userData.email);
  const [firstname, setFirstname] = useState(userData.firstname);
  const [lastname, setLastname] = useState(userData.lastname);
  const [image, setImage] = useState(userData.image);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const imageRef = useRef(null);

  const changeTheme = () => {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  const resetPassword = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (
      username === userData.username &&
      phone === userData.phone &&
      email === userData.email &&
      firstname === userData.firstname &&
      lastname === userData.lastname &&
      image === userData.image
    ) {
      toast.error("No changes made");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("image", imageRef.current?.files?.[0] || image);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/user`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      dispatch(updateUser(data.data.user));
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="profile">
      <h1 className="profile__title">Profile</h1>
      <div className="profile__container">
        <section className="profile__section">
          <div className="profile__image">
            <label>
              <img src={image || anonymousUser} alt="user" onError={(e) => e.target.src = anonymousUser} />
              <input type="file" hidden onChange={handleImageChange} ref={imageRef} />
            </label>
          </div>
          <div className="profile__info">
            <div className="profile__info__item">
              <Input
                label="Username"
                placeholder={userData.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="profile__info__item">
              <Input
                label="Phone"
                placeholder={userData.phone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="profile__info__item">
              <Input
                label="E-mail"
                placeholder={userData.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="profile__info__item">
              <Input
                label="First Name"
                placeholder={userData.firstname}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="profile__info__item">
              <Input
                label="Last Name"
                placeholder={userData.lastname}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="profile__info__item">
              <Button onClick={handleSubmit}>Save</Button>
            </div>
            <div className="profile__info__item">
              <Button className="change__password__btn" onClick={resetPassword}>
                Change Password
              </Button>
            </div>
          </div>
        </section>
        <section className="settings__section">
          <label className="settings__item">
            <span>Change Theme</span>
            <Button onClick={changeTheme}>
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
          </label>
        </section>
      </div>
    </div>
  );
};

export default Profile;
