import React, { createContext, useContext } from "react";

const mpinContext = createContext();

export const useMpin = () => useContext(mpinContext);
