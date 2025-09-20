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
  // const [transactions, setTransactions] = useState([]);
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

        // setTransactions(Array.isArray(data.recent) ? data.recent : []);
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

  /*
  
              // transactions.map((t, i) => (
              //   <tr key={i} className="block md:table-row">
              //     <td className="block md:table-cell"><span className="font-semibold md:hidden">{displayDate(t)}</span></td>
              //     <td className="block md:table-cell"><span className="font-semibold md:hidden">{displayType(t)}</span></td>
              //     <td className="block md:table-cell"><span className="font-semibold md:hidden">${(parseFloat(t.amount) || 0).toFixed(2)}</span></td>
              //     <td className="block md:table-cell"><span className="font-semibold md:hidden">{displayMethod(t)}</span></td>
              //     <td className="block md:table-cell"><span className="font-semibold md:hidden">{t.status ? t.status.charAt(0).toUpperCase() + t.status.slice(1) : "-"}</span></td>
              //   </tr>
              // ))
  */

  return (
    <div className="dashboard-page">
      <h2 className="font-semibold md:font-bold text-2xl md:text-4xl">📊 Dashboard</h2>

      <div className="pt-4 dashboard-stats grid object-center grid-cols-1 md:grid-cols-2 gap-4">
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

      <motion.div className="transactions-container mt-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h3 className="font-semibold pt-5 text-2xl md:text-4xl my-5">Recent Transactions</h3>
        <table className="transactions-table border-collapse bg-transparent md:bg-[#1e293b]">
          <thead className="hidden md:table-header-group">
            <tr className="block md:table-row">
              <th className="block md:table-cell">Date</th>
              <th className="block md:table-cell">Type</th>
              <th className="block md:table-cell">Amount</th>
              <th className="block md:table-cell">Method/Plan</th>
              <th className="block md:table-cell">Status</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {transactions.length > 0 ? (
              transactions.map((t, i) => (
                <tr key={i} className="block border md:border-none md:table-row md:bottom-0 mb-4 md:mb-0 rounded-xl md:rounded-none p-0">
                  <td className="flex justify-between items-center p-2 md:table-cell bg-[#0f1c31] md:bg-transparent rounded-tl-xl rounded-tr-xl md:rounded-none"><span className="font-semibold block md:hidden">Date</span>{displayDate(t)}</td>
                  <td className="flex justify-between items-center p-2 md:table-cell bg-transparent"><span className="font-semibold block md:hidden">Type</span>{displayType(t)}</td>
                  <td className="flex justify-between items-center p-2 md:table-cell bg-[#0f1c31] md:bg-transparent"><span className="font-semibold block md:hidden">Amount</span>${(parseFloat(t.amount) || 0).toFixed(2)}</td>
                  <td className="flex justify-between items-center p-2 md:table-cell bg-transparent"><span className="font-semibold block md:hidden">Method/Plan</span>{displayMethod(t)}</td>
                  <td className="flex justify-between items-center p-2 md:table-cell bg-[#0f1c31] md:bg-transparent rounded-bl-xl rounded-br-xl md:rounded-none"><span className="font-semibold block md:hidden">Status</span>{t.status ? t.status.charAt(0).toUpperCase() + t.status.slice(1) : "-"}</td>
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
