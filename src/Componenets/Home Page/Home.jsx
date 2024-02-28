import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const userData = useSelector((state) => state.auth.userData);

  const CompanyName = userData?.Data?.CompanyName;
  return (
    <>
      <div className="h-screen w-full">
        <h1 className="flex items-center justify-center font-bold text-2xl mt-32">
          Welcome, {CompanyName}
        </h1>
      </div>
    </>
  );
}

export default Home;
