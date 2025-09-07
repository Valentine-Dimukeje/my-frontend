import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/Auth.css";
import { authFetch } from "../utils/authFetch";
import { API_BASE } from "../utils/config";
import { useLoader } from "../dashboard/LoaderContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useLoader();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) {
        console.error("Login failed:", res.status);
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("Login response:", data); // 👀 Check tokens in console
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // Fetch user profile with token
      const meRes = await authFetch(`${API_BASE}/api/auth/me/`);
      await meRes.json();

      // Redirect after small delay
      setTimeout(() => {
        window.location.href = "/admin";
      }, 800);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-btn">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </motion.div>
  );
}

export default Login;
