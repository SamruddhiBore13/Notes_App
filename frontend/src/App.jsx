import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";



const AppRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
      <Route path="/home" element={<Home />} />
      {/* Add other routes here */}
    </Routes>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </BrowserRouter>
  );
};

export default App;