import React, { createContext, useState, useContext, useEffect } from "react";

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [investments, setInvestments] = useState([]);

  // Load saved investments from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("investments")) || [];
    setInvestments(saved);
  }, []);

  // Persist investments to localStorage
  useEffect(() => {
    localStorage.setItem("investments", JSON.stringify(investments));
  }, [investments]);

  const addTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  const addInvestment = (inv) => {
    setInvestments((prev) => [inv, ...prev]);
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, investments, addInvestment }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
