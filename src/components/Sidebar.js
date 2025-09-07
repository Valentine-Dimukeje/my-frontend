// Sidebar.js
import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { WalletContext } from "./dashboard/walletContext";
import "./styles/sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { walletBalance, profitBalance, totalBalance } = useContext(WalletContext);
  const navigate = useNavigate();

  const formatMoney = (val) => {
    if (typeof val !== "number" || isNaN(val)) return "0";
    return val.toLocaleString();
  };

  const handleInvestClick = () => {
    navigate("/admin/plans");
    toggleSidebar();
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    toggleSidebar();
  };

  return (
    <>
      {/* === Overlay for mobile === */}
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>

      {/* === Sidebar === */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/" className="logo">Heritage Investment</Link>
          <button className="close-btn" onClick={toggleSidebar}>✖</button>
        </div>

        <div className="account-balance-box">
          <div className="account-balance-header">
            <h4>Account Balance</h4>
            <span className="wallet-text">WALLET</span>
          </div>

          <div className="wallet-row total">
            <span>💰 Total Balance</span>
            <span>${formatMoney(totalBalance)}</span>
          </div>

          <div className="wallet-row">
            <span>💳 Main Wallet</span>
            <span>${formatMoney(walletBalance)}</span>
          </div>

          <div className="wallet-row">
            <span>🏦 Profit Wallet</span>
            <span>${formatMoney(profitBalance)}</span>
          </div>

          <div className="wallet-buttons">
            <NavLink to="/admin/deposit" className="btn-deposit" onClick={toggleSidebar}>
              Deposit
            </NavLink>
            <button className="btn-invest" onClick={handleInvestClick}>
              Invest Now
            </button>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/admin" className="sidebar-link" onClick={toggleSidebar}>📊 Dashboard</NavLink>
          <NavLink to="/admin/plans" className="sidebar-link" onClick={toggleSidebar}>💼 Plans</NavLink>
          <NavLink to="/admin/investments" className="sidebar-link" onClick={toggleSidebar}>📈 Investments</NavLink>
          <NavLink to="/admin/deposit" className="sidebar-link" onClick={toggleSidebar}>💰 Deposit</NavLink>
          <NavLink to="/admin/withdraw" className="sidebar-link" onClick={toggleSidebar}>💸 Withdraw</NavLink>
          <NavLink to="/admin/profile" className="sidebar-link" onClick={toggleSidebar}>👤 Profile</NavLink>
          <NavLink to="/admin/referral" className="sidebar-link" onClick={toggleSidebar}>🤝 Referral</NavLink>
          <NavLink to="/admin/settings" className="sidebar-link" onClick={toggleSidebar}>⚙️ Settings</NavLink>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
