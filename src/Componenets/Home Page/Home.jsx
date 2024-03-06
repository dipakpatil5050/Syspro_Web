import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/reducers/authReducer";
import Navbar from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";
import { Footer } from "../Footer/Footer";
function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const CompanyName = userData?.CompanyName;
  const dispatch = useDispatch();

  const Logout = () => {
    Cookies.remove("token");
    dispatch(setUserData(null));

    navigate("/");
  };

  return (
    <>
      <Navbar />

      <Sidebar />
      <Footer />
    </>
  );
}

export default Home;
