import React, { createContext, useState, useContext } from "react";

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("admin");
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
    setUser(userData);
  };

  //   http://103.67.238.230:1385/SysMpin/authenticateSysmpin?mPin=VEERAPP
  const logout = () => {
    setUsername("");
    setIsLoggedIn(false);
    setUser(null);
  };

  const mpinkey = (username) => {
    setUsername(username);
    // setIsLoggedIn(true);
    setUser(userData);
  };

  return (
    <LoginContext.Provider
      value={{ user, isLoggedIn, login, logout, username, mpinkey }}
    >
      {children}
    </LoginContext.Provider>
  );
};
