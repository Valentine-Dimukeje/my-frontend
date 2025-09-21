import { useState } from "react";
import { motion } from "framer-motion";
import { API_BASE } from "../utils/config";
import "../styles/Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ message: "", error: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: "", error: "" });

    try {
      const res = await fetch(`${API_BASE}/auth/password-reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.detail || "Unable to send reset link");
      }

      setStatus({
        message: "✅ Password reset email sent! Please check your inbox.",
        error: "",
      });
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
      <h2>Forgot Password</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="auth-btn">
          Send Reset Link
        </button>
      </form>

      {status.message && <p className="success-msg">{status.message}</p>}
      {status.error && <p className="error-msg">{status.error}</p>}

      <p><a href="/login">⬅ Back to Login</a></p>
    </motion.div>
  );
}

export default ForgotPassword;
