import "./App.css";
import Booking from "./Components/User/hotelBooking";
import MyBooking from "./Components/User/myBooking";
import SignUp from "./Components/Auth/signup";
import Login from "./Components/Auth/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bookings from "./Components/Hotel/Bookings";
import Dashboard from "./Components/Hotel/Dashboard";
import Profile from "./Components/Hotel/Profile";
import UserProfile from "./Components/User/userProfile";
import Logout from "./Components/Auth/Logout";
import HotelDetails from "./Components/Hotel/HotelDetails";

function App() {
  // sessionStorage.setItem("username", "kd");
  // sessionStorage.setItem("usertype", "Customer");
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
        <Routes>
          <Route exact path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route exact path="/" element={<Booking />} />
        </Routes>
        <Routes>
          <Route exact path="/booking" element={<Booking />} />
        </Routes>
        <Routes>
          <Route exact path="/mybooking" element={<MyBooking />} />
        </Routes>

        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/bookings" element={<Bookings />} />
        </Routes>
        <Routes>
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
        <Routes>
          <Route exact path="/userprofile" element={<UserProfile />} />
        </Routes>
        <Routes>
          <Route exact path="/logout" element={<Booking />} />
        </Routes>
        <Routes>
          <Route exact path="/hoteldetails" element={<HotelDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
