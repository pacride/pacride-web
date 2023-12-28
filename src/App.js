import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Home/Landing";
import FormPage from "./pages/Home/FormPage";
import Login from "./pages/Home/FormPage/Login";
import Signup from "./pages/Home/FormPage/Signup";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardIndex from "./pages/Dashboard/DashboardIndex";
import NewRide from "./pages/Dashboard/NewRide";
import Profile from "./pages/Dashboard/Profile";
import Listings from "./pages/Dashboard/Listings";
import Manage from "./pages/Dashboard/Manage";
import MyBookings from "./pages/Dashboard/DashboardIndex/MyBookings";
import MyRides from "./pages/Dashboard/DashboardIndex/MyRides";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Landing />} />
            <Route path="about" element={<Landing />} />
            <Route path="contact" element={<Landing />} />
            <Route path="/" element={<FormPage />}>
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="listings">
              <Route index element={<Listings />} />
              <Route path="create" element={<NewRide />} />
              <Route path="ride/:id" element={<Listings />} />
            </Route>
            <Route path="/dashboard" element={<DashboardIndex />}>
              <Route index element={<MyRides />} />
              <Route path="bookings" element={<MyBookings />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="manage/:id" element={<Manage />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
