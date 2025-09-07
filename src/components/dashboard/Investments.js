import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { authFetch } from "../utils/authFetch";
import "../styles/investments.css";

function Investments() {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const loadInvestments = async () => {
      try {
        const res = await authFetch("/api/investments/");
        if (res.ok) {
          const data = await res.json();
          setInvestments(data);
        }
      } catch (err) {
        console.error("Failed to load investments", err);
      }
    };
    loadInvestments();
  }, []);

  const totalActive = investments
    .filter((inv) => inv.status === "Active")
    .reduce((sum, inv) => sum + parseFloat(inv.amount), 0);

  const totalEarnings = investments
    .reduce((sum, inv) => sum + parseFloat(inv.earnings || 0), 0);

  return (
    <div className="investments-page">
      <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        📈 Your Investments
      </motion.h2>

      <div className="investment-stats">
        <motion.div className="stat-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>${<CountUp end={totalActive} duration={2} />}</h3>
          <p>Total Active Investments</p>
        </motion.div>
        <motion.div className="stat-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>${<CountUp end={totalEarnings} duration={2} />}</h3>
          <p>Total Earnings</p>
        </motion.div>
      </div>

      <motion.div className="table-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <table className="investments-table">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Amount</th>
              <th>Earnings</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {investments.length > 0 ? (
              investments.map((inv, index) => (
                <tr key={index}>
                  <td>{inv.plan}</td>
                  <td>${inv.amount}</td>
                  <td>${inv.earnings || 0}</td>
                  <td className={inv.status === "Active" ? "active" : "inactive"}>{inv.status}</td>
                </tr>
              ))
            ) : (
              <tr className="empty-row">
                <td colSpan="4">No investments yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

export default Investments;
