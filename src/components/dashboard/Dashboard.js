// Dashboard.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { authFetch } from "../api";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    deposits: 0,
    withdrawals: 0,
    investments: 0,
    earnings: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await authFetch("/api/dashboard-summary/");
        if (!res.ok) return;

        const data = await res.json();
        setTransactions(data.recent || []);
        setStats({
          deposits: Number(data.total_deposits || 0),
          withdrawals: Number(data.total_withdrawals || 0),
          investments: Number(data.total_investments || 0),
          earnings: Number(data.total_earnings || 0),
        });
      } catch (e) {
        console.error("Failed to load dashboard", e);
      }
    };
    load();
  }, []);

  const displayType = (t) => t.type ? (t.type.charAt(0).toUpperCase() + t.type.slice(1)) : "-";
  const displayMethod = (t) => {
    const m = t.meta || {};
    return m.gateway || m.plan || m.method || "-";
  };
  const displayDate = (t) => {
    const d = t.created_at || t.updated_at;
    if (!d) return "-";
    try { return new Date(d).toLocaleString(); } catch { return d; }
  };

  return (
    <div className="dashboard-page">
      <h2>📊 Dashboard</h2>

      <div className="dashboard-stats">
        <motion.div className="stat-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>${<CountUp end={stats.deposits} duration={2} />}</h3>
          <p>Total Deposits</p>
        </motion.div>

        <motion.div className="stat-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>${<CountUp end={stats.withdrawals} duration={2} />}</h3>
          <p>Total Withdrawals</p>
        </motion.div>

        <motion.div className="stat-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>${<CountUp end={stats.investments} duration={2} />}</h3>
          <p>Total Investments</p>
        </motion.div>

        <motion.div className="stat-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>${<CountUp end={stats.earnings} duration={2} />}</h3>
          <p>Total Earnings</p>
        </motion.div>
      </div>

      <motion.div className="transactions-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h3>Recent Transactions</h3>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Method/Plan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((t, i) => (
                <tr key={i}>
                  <td>{displayDate(t)}</td>
                  <td>{displayType(t)}</td>
                  <td>${parseFloat(t.amount).toFixed(2)}</td>
                  <td>{displayMethod(t)}</td>
                  <td>{t.status ? t.status.charAt(0).toUpperCase() + t.status.slice(1) : "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No transactions yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Dashboard;
