import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientAuth from "../Client Auth/ClientAuth";
import ClientLogin from "../Client Login/ClientLogin";
import Home from "../Home Page/Home";
function RouteFile() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<ClientAuth />} />
          <Route path="/login" element={<ClientLogin />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default RouteFile;
