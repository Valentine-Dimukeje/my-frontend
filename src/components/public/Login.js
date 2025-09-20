import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/Auth.css";
import { authFetch } from "../utils/authFetch";
import { API_BASE } from "../utils/config";
import { useLoader } from "../dashboard/LoaderContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useLoader();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Login request
      const res = await fetch(`${API_BASE}/api/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Login failed:", res.status, err);
        setLoading(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // Step 2: Fetch profile (optional)
      const meRes = await authFetch(`${API_BASE}/api/auth/me/`);
      if (meRes.ok) {
        const profile = await meRes.json();
        console.log("Profile:", profile);
      }

      // Step 3: Navigate to dashboard
      navigate("/dashboard");
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
      <div className="auth-footer">
            <a href="/register">Register</a>
            <a href="/forgot-password">Forgot Password?</a>
</div>


    </motion.div>
  );
}

export default Login;
