import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const HomeMessageContext = createContext();


export const HomeMessageProvider = ({ children }) => {
  const [homeMessage, setHomeMessage] = useState("Welcome to DHAN GAMA ENTERTAINMENT APP!");

  useEffect(() => {
    let intervalId;
    const fetchMessage = async () => {
      try {
        const res = await axios.get("/api/home_message");
        if (res.data && res.data.data && res.data.data.message) {
          setHomeMessage(res.data.data.message);
        }
      } catch (err) {
        // Optionally handle error
        console.log("Failed to fetch home message", err);
      }
    };
    fetchMessage();
    intervalId = setInterval(fetchMessage, 10000); // Poll every 10 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <HomeMessageContext.Provider value={{ homeMessage, setHomeMessage }}>
      {children}
    </HomeMessageContext.Provider>
  );
};

export const useHomeMessage = () => useContext(HomeMessageContext);
