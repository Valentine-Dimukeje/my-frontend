import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import "../styles/layout.css";

function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="public-layout">
      {/* Navbar */}
      <header className="public-navbar">
        <div className="navbar-left">
          <button 
            className="menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          <Link to="/" className="logo">Heritage Investment</Link>
        </div>

        <div className="navbar-right">
          <Link to="/register" className="register-btn">Register</Link>
        </div>
      </header>

      {/* Sidebar Menu */}
      <nav className={`sidebar-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
      </nav>

      {/* Page Content */}
      <main className="public-main">
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;
