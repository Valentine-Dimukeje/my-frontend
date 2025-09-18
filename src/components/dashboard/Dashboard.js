// Dashboard.js (replace your useEffect with this)
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { authFetch } from "../utils/authFetch";
import "../styles/dashboard.css";

const parseMoney = (v) => {
  if (v === null || v === undefined) return 0;
  if (typeof v === "string") {
    // remove commas, $ signs, etc and parse
    const n = parseFloat(v.replace(/[^0-9.-]+/g, ""));
    return isNaN(n) ? 0 : n;
  }
  const n = Number(v);
  return isNaN(n) ? 0 : n;
};

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
        // IMPORTANT: use a relative path so authFetch will prepend API_BASE in production
        const res = await authFetch("/api/dashboard-summary/");

        if (!res.ok) {
          console.error("❌ Unauthorized or failed fetch", res.status);
          return;
        }

        const data = await res.json();

        setTransactions(Array.isArray(data.recent) ? data.recent : []);
        setStats({
          deposits: parseMoney(data.total_deposits),
          withdrawals: parseMoney(data.total_withdrawals),
          investments: parseMoney(data.total_investments),
          earnings: parseMoney(data.total_earnings),
        });
      } catch (e) {
        console.error("Failed to load dashboard", e);
      }
    };
    load();
  }, []);

  const displayType = (t) =>
    t.type ? t.type.charAt(0).toUpperCase() + t.type.slice(1) : "-";

  const displayMethod = (t) => {
    const m = t.meta || {};
    return m.gateway || m.plan || m.method || "-";
  };

  const displayDate = (t) => {
    const d = t.created_at || t.updated_at;
    if (!d) return "-";
    try {
      return new Date(d).toLocaleString();
    } catch {
      return d;
    }
  };

  return (
    <div className="dashboard-page">
      <h2>📊 Dashboard</h2>

      <div className="dashboard-stats">
        <motion.div className="stat-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>$<CountUp end={stats.deposits} duration={1.5} decimals={2} /></h3>
          <p>Total Deposits</p>
        </motion.div>

        <motion.div className="stat-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>$<CountUp end={stats.withdrawals} duration={1.5} decimals={2} /></h3>
          <p>Total Withdrawals</p>
        </motion.div>

        <motion.div className="stat-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>$<CountUp end={stats.investments} duration={1.5} decimals={2} /></h3>
          <p>Total Investments</p>
        </motion.div>

        <motion.div className="stat-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>$<CountUp end={stats.earnings} duration={1.5} decimals={2} /></h3>
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
                  <td>${(parseFloat(t.amount) || 0).toFixed(2)}</td>
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
