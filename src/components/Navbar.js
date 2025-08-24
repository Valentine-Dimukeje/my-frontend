import React from "react";
import "./styles/navbar.css";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="navbar">
      <button className="menu-toggle" onClick={toggleSidebar}>☰</button>
      {/* <h3 className="navbar-title">Welcome to your Dashboard</h3> */}
      <div className="navbar-right">
        {/* <span className="balance">💵 Balance: $0.00</span> */}
        {/* <button className="btn-primary">+ Deposit</button> */}
      </div>
    </header>
  );
};

export default Navbar;
