import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/Auth.css";
import { API_BASE } from "../utils/config";
import { useLoader } from "../dashboard/LoaderContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { setLoading } = useLoader();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email, // ✅ REQUIRED by Django / SimpleJWT
          password: password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(
          data?.detail ||
          data?.error ||
          "Invalid email or password."
        );
        return;
      }

      // ✅ Save tokens
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Welcome Back</h2>

      {error && <div className="error-box">❌ {error}</div>}

      <form className="auth-form" onSubmit={handleLogin} noValidate>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            role="button"
            aria-label="Toggle password visibility"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button type="submit" className="auth-btn">
          Login
        </button>
      </form>

      <div className="auth-footer">
        <Link to="/register">Create account</Link>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
    </motion.div>
  );
}

export default Login;
