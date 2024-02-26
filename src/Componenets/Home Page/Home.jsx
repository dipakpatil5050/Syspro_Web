import React from "react";
import { useLogin } from "../../contexts/LoginContext";

function Home() {
  const { username, logout } = useLogin();
  return (
    <>
      <div className="h-screen w-full">
        <h1 className="flex items-center justify-center font-bold text-2xl mt-32">
          Welcome, {username}
        </h1>
      </div>
    </>
  );
}

export default Home;
