import React, { useState } from "react";
import { motion } from "framer-motion";
import { authFetch } from "../utils/authFetch";
import { useNotification } from "./NotificationProvider";  
import "../styles/withdraw.css";

const withdrawMethods = [
  { value: "USDT_TRX", label: "USDT (TRC-20)" },
  { value: "BTC", label: "Bitcoin" },
  { value: "ETH", label: "Ethereum" },
  { value: "BANK", label: "Bank Transfer" },
];

function Withdraw() {
  const [method, setMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const { showNotification } = useNotification();

  const charge = amount ? parseFloat(amount) * 0.02 : 0;
  const total = amount ? parseFloat(amount) - charge : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authFetch("/api/withdraw/", {
        method: "POST",
        body: JSON.stringify({
          method,
          amount,
          destination: walletAddress,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Withdrawal request failed");

      showNotification("✅ Withdrawal request submitted. Awaiting admin approval.", "success");

      setAmount("");
      setWalletAddress("");
      setMethod("");
    } catch (err) {
      showNotification("❌ " + err.message, "error");
    }
  };

  return (
    <motion.div className="withdraw-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="withdraw-card">
        <h2>Withdraw Funds</h2>
        <form onSubmit={handleSubmit} className="withdraw-form">
          <label>Withdrawal Method:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} required>
            <option value="">--Select Method--</option>
            {withdrawMethods.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>

          {method && (
            <>
              <label>Enter Amount (USD):</label>
              <input
                type="number"
                min="10"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <label>
                {method === "BANK"
                  ? "Bank Account Info:"
                  : `${withdrawMethods.find(m => m.value === method)?.label} Wallet Address:`}
              </label>
              <input
                type="text"
                required
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder={method === "BANK" ? "Bank name, Account No, Account name" : "Paste wallet address here"}
              />

              <motion.div className="review-box" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <h4>Review Summary</h4>
                <div className="review-item">
                  <span>Withdraw Amount</span>
                  <span>${parseFloat(amount || 0).toFixed(2)}</span>
                </div>
                <div className="review-item">
                  <span>Charge (2%)</span>
                  <span>${charge.toFixed(2)}</span>
                </div>
                <div className="review-item total">
                  <span>You'll Receive</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </motion.div>
            </>
          )}

          <button type="submit" className="primary-btn" disabled={!method || !amount || !walletAddress}>
            Request Withdrawal »
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Withdraw;
