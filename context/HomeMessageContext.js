import React, { createContext, useContext, useState } from "react";

const HomeMessageContext = createContext();

export const HomeMessageProvider = ({ children }) => {
  const [homeMessage, setHomeMessage] = useState("Welcome to DHAN GAMA ENTERTAINMENT APP!");
  return (
    <HomeMessageContext.Provider value={{ homeMessage, setHomeMessage }}>
      {children}
    </HomeMessageContext.Provider>
  );
};

export const useHomeMessage = () => useContext(HomeMessageContext);
