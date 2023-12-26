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
            <Route index element={<DashboardIndex />} />
            <Route path="profile" element={<Profile />} />
            <Route path="rides/new" element={<NewRide />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
