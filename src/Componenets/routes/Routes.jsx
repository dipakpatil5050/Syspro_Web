import React from "react";
import { Routes, Route } from "react-router-dom";
import ClientAuth from "../Client Auth/ClientAuth";
import ClientLogin from "../Client Login/ClientLogin";
import Home from "../Home Page/Home";
function RouteFile() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<ClientAuth />} />
        <Route path="/login" element={<ClientLogin />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default RouteFile;
