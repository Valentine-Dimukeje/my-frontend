import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/plans.css";
import { FaGem, FaRocket, FaStar } from "react-icons/fa";
import { WalletContext } from "./walletContext";
import { authFetch } from "../utils/authFetch";

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { walletBalance, refreshWallet } = useContext(WalletContext);

  const plans = [
    {
      name: "Amateur Plan",
      price: "$200 - $500",
      min: 200,
      max: 500,
      returns: "5% Weekly",
      color: "#2F80ED",
      desc: "Perfect for beginners starting small.",
      icon: <FaStar size={28} color="#FFD700" />,
    },
    {
      name: "Exclusive Plan",
      price: "$500 - $1,000",
      min: 500,
      max: 1000,
      returns: "8% Weekly",
      color: "#9B51E0",
      desc: "For serious investors looking for stable growth.",
      icon: <FaRocket size={28} color="#ff7b00" />,
    },
    {
      name: "Diamond Plan",
      price: "$1,000 - $1,000,000",
      min: 1000,
      max: 1000000,
      returns: "12% Weekly",
      color: "#F2994A",
      desc: "Maximize returns with the highest tier.",
      icon: <FaGem size={28} color="#00E4FF" />,
    },
  ];

 const handleInvestment = async () => {
  const investAmount = parseFloat(amount);

  if (!investAmount || investAmount < selectedPlan.min || investAmount > selectedPlan.max) {
    alert(`Please enter an amount between $${selectedPlan.min} and $${selectedPlan.max}`);
    return;
  }

  if (investAmount > walletBalance) {
    alert("❌ Not enough funds in your Main Wallet. Redirecting to deposit page...");
    navigate("/admin/deposit");
    return;
  }

  setLoading(true);

  try {
    const res = await authFetch("/api/invest/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan: selectedPlan.name,
        amount: investAmount,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to create investment");
    }

    await refreshWallet(); 
    setSelectedPlan(null);
    setAmount("");
    navigate("/admin/investments"); 
  } catch (err) {
    alert("❌ " + err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="plans-page">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="page-title"
      >
        💼 Choose Your Investment Plan
      </motion.h2>

      <p className="page-subtitle">
        Total Balance: <strong>${walletBalance.toLocaleString()}</strong> (Main Wallet used for investments)
      </p>

      <div className="plans-grid">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            className="plan-card"
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <div className="plan-header" style={{ backgroundColor: plan.color }}>
              {plan.icon}
              <h3>{plan.name}</h3>
            </div>
            <div className="plan-body">
              <p className="price">{plan.price}</p>
              <p className="returns">{plan.returns}</p>
              <p className="desc">{plan.desc}</p>
              <button className="btn-primary" onClick={() => setSelectedPlan(plan)}>
                Invest Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3>Invest in {selectedPlan.name}</h3>
              <p>Min: ${selectedPlan.min} - Max: ${selectedPlan.max}</p>

              {amount && parseFloat(amount) > walletBalance && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Insufficient funds in your Main Wallet.
                </p>
              )}

              <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="modal-actions">
                <button
                  className="btn-primary"
                  onClick={handleInvestment}
                  disabled={
                    loading ||
                    !amount ||
                    parseFloat(amount) < selectedPlan.min ||
                    parseFloat(amount) > selectedPlan.max ||
                    parseFloat(amount) > walletBalance
                  }
                >
                  {loading ? "Processing..." : "Proceed"}
                </button>
                <button className="btn-secondary" onClick={() => setSelectedPlan(null)}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Plans;
