// dashboard/walletContext.js
import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { authFetch } from "../utils/authFetch";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [profitBalance, setProfitBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const resetWallet = () => {
    setWalletBalance(0);
    setProfitBalance(0);
  };

  const refreshWallet = useCallback(async () => {
    try {
      setLoading(true);

      const res = await authFetch("/api/dashboard-summary/");
      if (!res.ok) {
        resetWallet();
        return;
      }

      const data = await res.json();

      setWalletBalance(Number(data.wallet) || 0);
      setProfitBalance(Number(data.profit_wallet) || 0);
    } catch (err) {
      console.error("Wallet refresh failed", err);
      resetWallet();
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔑 Runs on first load AND after login
  useEffect(() => {
    refreshWallet();
  }, [refreshWallet]);

  return (
    <WalletContext.Provider
      value={{
        walletBalance,
        profitBalance,
        totalBalance: walletBalance + profitBalance,
        loading,
        refreshWallet,
        resetWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
