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
import Edit from "./pages/Dashboard/Manage/Edit";
import ListingsIndex from "./pages/Dashboard/Listings/ListingsIndex";
import Contact from "./pages/Dashboard/Contact";
import Requests from "./pages/Dashboard/Manage/Requests";
import Passengers from "./pages/Dashboard/Manage/Passengers";
import InfoPage from "./pages/InfoPage";
import CareersContent from "./pages/InfoPage/contents/CareersContent";
import BlogContent from "./pages/InfoPage/contents/BlogContent";
import BlogDetail from "./pages/InfoPage/BlogDetail";
import HelpContent from "./pages/InfoPage/contents/HelpContent";
import SafetyContent from "./pages/InfoPage/contents/SafetyContent";
import {
  PrivacyContent,
  TermsContent,
  CookiesContent,
} from "./pages/InfoPage/contents/LegalContent";

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
            <Route
              path="careers"
              element={
                <InfoPage title="Careers">
                  <CareersContent />
                </InfoPage>
              }
            />
            <Route
              path="blog"
              element={
                <InfoPage title="Blog">
                  <BlogContent />
                </InfoPage>
              }
            />
            <Route path="blog/:id" element={<BlogDetail />} />
            <Route
              path="help"
              element={
                <InfoPage title="Help Center">
                  <HelpContent />
                </InfoPage>
              }
            />
            <Route
              path="safety"
              element={
                <InfoPage title="Safety">
                  <SafetyContent />
                </InfoPage>
              }
            />
            <Route
              path="privacy"
              element={
                <InfoPage title="Privacy Policy">
                  <PrivacyContent />
                </InfoPage>
              }
            />
            <Route
              path="terms"
              element={
                <InfoPage title="Terms of Service">
                  <TermsContent />
                </InfoPage>
              }
            />
            <Route
              path="cookies"
              element={
                <InfoPage title="Cookie Policy">
                  <CookiesContent />
                </InfoPage>
              }
            />
            <Route path="/" element={<FormPage />}>
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="listings" element={<Listings />}>
              <Route index element={<ListingsIndex />} />
              <Route path="ride/:id" element={<Contact />} />
            </Route>
            <Route path="listings/create" element={<NewRide />} />
            <Route path="/dashboard" element={<DashboardIndex />}>
              <Route index element={<MyRides />} />
              <Route path="bookings" element={<MyBookings />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="manage/:id" element={<Manage />}>
              <Route index element={<Requests />} />
              <Route path="passengers" element={<Passengers />} />
              <Route path="edit" element={<Edit />} />
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
