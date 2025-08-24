import React, { useState } from "react";
import { motion } from "framer-motion";
import { authFetch } from "../api";
import { useNotification } from "./NotificationProvider";  
import "../styles/deposit.css";

const gateways = [
  { value: "USDT_TRX", label: "USDT (TRC-20)" },
  { value: "BTC", label: "Bitcoin" },
  { value: "ETH", label: "Ethereum" },
];

function Deposit() {
  const [method, setMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [txId, setTxId] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showNotification } = useNotification();

  const getWalletAddress = () => {
    if (method === "USDT_TRX") return "TAsidNbKHMxWQ2KoCo6JSYw16Rz1mWhSJS";
    if (method === "BTC") return "15CbXpqzMJP4wDUUsSEnXoo2zQEB2kTDEU";
    if (method === "ETH") return "0x929283099ef4050c4c8f8ca868abd89039f486b5";
    return "";
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getWalletAddress());
    setCopied(true);
    showNotification("Wallet address copied!", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authFetch("/api/deposit/", {
        method: "POST",
        body: JSON.stringify({ method, amount, tx_id: txId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Deposit failed");

      showNotification("✅ Deposit submitted! Waiting for admin approval.", "success");

      // reset form
      setAmount("");
      setTxId("");
      setMethod("");
    } catch (err) {
      showNotification("❌ " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="deposit-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="deposit-card">
        <h2>Add Money</h2>
        <form onSubmit={handleSubmit} className="deposit-form">
          <label>Payment Method:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} required>
            <option value="">--Select Gateway--</option>
            {gateways.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>

          {method && (
            <>
              <label>Enter Amount:</label>
              <div className="amount-field">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="10"
                  required
                />
                <span>USD</span>
              </div>

              <label>Wallet Address:</label>
              <div className="wallet-copy">
                <input className="readonly bold-address" readOnly value={getWalletAddress()} />
                <button type="button" onClick={copyToClipboard} className="copy-btn">
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <label>Transaction ID:</label>
              <input
                type="text"
                value={txId}
                onChange={(e) => setTxId(e.target.value)}
                required
              />

              <label>Upload Proof of Payment:</label>
              <input type="file" accept="image/*,.pdf" />
            </>
          )}

          <button type="submit" className="primary-btn" disabled={!method || !amount || !txId || loading}>
            {loading ? "Processing..." : "Proceed to Payment »"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Deposit;
