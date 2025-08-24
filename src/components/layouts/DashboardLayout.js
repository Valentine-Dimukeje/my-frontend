import React, { useState, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { motion } from "framer-motion";
import { WalletContext } from "../dashboard/walletContext";
import "../styles/layout.css";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { walletBalance } = useContext(WalletContext);

  return (
    <div className="dashboard-layout">
      {/* Sidebar - toggle visibility with CSS instead of unmounting */}
      <motion.div
        animate={{ width: isSidebarOpen ? 250 : 0 }}
        transition={{ duration: 0.3 }}
        className={`sidebar-container ${isSidebarOpen ? "open" : "closed"}`}
      >
        {/* Wallet Balance Display */}
        {isSidebarOpen && (
          <div className="wallet-balance-box">
            <h4>Wallet Balance</h4>
            <p>${walletBalance.toLocaleString()}</p>
          </div>
        )}

        {/* Sidebar Navigation */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </motion.div>

      {/* Main Content */}
      <div className="main-container">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="page-container">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
