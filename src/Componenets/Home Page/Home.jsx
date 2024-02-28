import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const CompanyName = userData?.Data?.CompanyName;
  // const token = userData?.Data?.Token;
  // localStorage.setItem("Token", token);

  const logout = () => {
    navigate("/");
  };

  return (
    <>
      <div className="h-screen w-full">
        <div className="logout-functionality w-ful flex items-center justify-end mr-10">
          <button
            onClick={logout}
            className="bg-black p-3 m-3 text-white rounded-3xl flex items-center justify-center"
          >
            Logout
          </button>
        </div>
        <h1 className="flex items-center justify-center font-bold text-2xl mt-32">
          Welcome, {CompanyName}
        </h1>
      </div>
    </>
  );
}

export default Home;
