import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useMpin = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [mpin, setMpin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <UserContext.Provider value={{ mpin, setMpin, authenticated }}>
      {children}
    </UserContext.Provider>
  );
};
