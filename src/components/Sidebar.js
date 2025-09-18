import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { WalletContext } from "./dashboard/walletContext";
import "./styles/sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { walletBalance, profitBalance, totalBalance } = useContext(WalletContext);
  const navigate = useNavigate();

  const formatMoney = (val) =>
    typeof val === "number" && !isNaN(val) ? val.toLocaleString() : "0";

  const handleInvestClick = () => {
    navigate("/dashboard/plans");
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
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <Link to="/" className="logo">
            Heritage Investment
          </Link>
          <button className="close-btn" onClick={toggleSidebar}>
            ✖
          </button>
        </div>

        {/* Scrollable content */}
        <div className="sidebar-content">
          {/* Account balance */}
          <div className="account-balance-box">
            <div className="account-balance-header">
              <h4>Account Balance</h4>
              <span>WALLET</span>
            </div>
            <div className="wallet-row">
              <span>💰 Total</span>
              <span>${formatMoney(totalBalance)}</span>
            </div>
            <div className="wallet-row">
              <span>💳 Main</span>
              <span>${formatMoney(walletBalance)}</span>
            </div>
            <div className="wallet-row">
              <span>🏦 Profit</span>
              <span>${formatMoney(profitBalance)}</span>
            </div>
            <div className="wallet-buttons">
              <NavLink
                to="/dashboard/deposit"
                className="btn-deposit"
                onClick={toggleSidebar}
              >
                Deposit
              </NavLink>
              <button className="btn-invest" onClick={handleInvestClick}>
                Invest Now
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            <NavLink to="/dashboard" className="sidebar-link" onClick={toggleSidebar}>
              📊 Dashboard
            </NavLink>
            <NavLink to="/dashboard/plans" className="sidebar-link" onClick={toggleSidebar}>
              💼 Plans
            </NavLink>
            <NavLink to="/dashboard/investments" className="sidebar-link" onClick={toggleSidebar}>
              📈 Investments
            </NavLink>
            <NavLink to="/dashboard/deposit" className="sidebar-link" onClick={toggleSidebar}>
              💰 Deposit
            </NavLink>
            <NavLink to="/dashboard/withdraw" className="sidebar-link" onClick={toggleSidebar}>
              💸 Withdraw
            </NavLink>
            <NavLink to="/dashboard/profile" className="sidebar-link" onClick={toggleSidebar}>
              👤 Profile
            </NavLink>
            <NavLink to="/dashboard/referral" className="sidebar-link" onClick={toggleSidebar}>
              🤝 Referral
            </NavLink>
            <NavLink to="/dashboard/settings" className="sidebar-link" onClick={toggleSidebar}>
              ⚙️ Settings
            </NavLink>
          </nav>
        </div>

        {/* Footer */}
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
