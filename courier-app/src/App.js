import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TrackOrder from "./pages/TrackOrder";
import OrderHistory from "./pages/OrderHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courier from "./pages/Courier";
import Navbar1 from "./components/Navbar";
import BookNow from "./pages/BookNow";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Hide Navbar for Login and Signup Pages
  const hideNavbar = location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar1 />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/home" element={<Courier />} />
        <Route path="/book-now" element={<BookNow />} />
      </Routes>
    </>
  );
};

export default App;
