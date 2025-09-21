import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE } from "../utils/config";
import "../styles/Auth.css";

function ResetPassword() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState({ message: "", error: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: "", error: "" });

    if (password !== confirm) {
      setStatus({ message: "", error: "❌ Passwords do not match!" });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/password-reset-confirm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to reset password");
      }

      setStatus({
        message: "✅ Password reset successful! Redirecting...",
        error: "",
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setStatus({ message: "", error: err.message });
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2>Reset Password</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type="submit" className="auth-btn">Reset Password</button>
      </form>

      {status.message && <p className="success-msg">{status.message}</p>}
      {status.error && <p className="error-msg">{status.error}</p>}
    </motion.div>
  );
}

export default ResetPassword;
