import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [totals, setTotals] = useState({
    walletBalance: 0,
    totalInvested: 0,
    earnings: 0,
  });

  return (
    <UserContext.Provider value={{ totals, setTotals }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
