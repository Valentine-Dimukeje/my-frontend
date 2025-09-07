// dashboard/walletContext.js
import React, { createContext, useCallback, useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [profitBalance, setProfitBalance] = useState(0);

  const refreshWallet = useCallback(async () => {
    try {
      const res = await authFetch("/api/dashboard-summary/");
      if (!res.ok) return;

      const data = await res.json();

      setWalletBalance(Number(data.wallet) || 0);
      setProfitBalance(Number(data.profit_wallet) || 0);
    } catch (e) {
      console.error("Failed to refresh wallet", e);
    }
  }, []);

  useEffect(() => {
    refreshWallet();
  }, [refreshWallet]);

  const totalBalance = walletBalance + profitBalance;

  return (
    <WalletContext.Provider
      value={{
        walletBalance,
        profitBalance,
        totalBalance,
        refreshWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
