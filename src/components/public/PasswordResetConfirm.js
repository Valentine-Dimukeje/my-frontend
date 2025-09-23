import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE } from "../utils/config";
import "../styles/Auth.css";

function ResetPasswordConfirm() {
  const { uid, token } = useParams(); // URL: /reset-password/:uid/:token
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ message: "", error: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: "", error: "" });

    try {
      const res = await fetch(`${API_BASE}/api/auth/password-reset-confirm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || data.detail || "Unable to reset password");
      }

      // ✅ Show backend message
      setStatus({ message: data.message || "✅ Password reset successful!", error: "" });

      // Redirect to login after 2s
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
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-btn">
          Reset Password
        </button>
      </form>

      {status.message && <p className="success-msg">{status.message}</p>}
      {status.error && <p className="error-msg">{status.error}</p>}
    </motion.div>
  );
}

export default ResetPasswordConfirm;
