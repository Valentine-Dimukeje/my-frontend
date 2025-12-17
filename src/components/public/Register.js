import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/Auth.css";
import { authFetch } from "../utils/authFetch";
import { useLoader } from "../dashboard/LoaderContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [strength, setStrength] = useState(0);

  const { setLoading } = useLoader();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      setStrength(checkStrength(value));
    }
  };

  const checkStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const getStrengthLabel = () => {
    switch (strength) {
      case 1: return "Weak ❌";
      case 2: return "Fair ⚠️";
      case 3: return "Good ✅";
      case 4: return "Strong 🔒";
      default: return "";
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await authFetch("/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          first_name: form.full_name.split(" ")[0] || "",
          last_name: form.full_name.split(" ").slice(1).join(" ") || "",
          phone: form.phone,
          country: form.country,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setErrorMsg(err.message || "Registration failed.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setSuccessMsg("🎉 Account created successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="auth-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2>Create Your Account</h2>

      {errorMsg && <div className="error-box">❌ {errorMsg}</div>}
      {successMsg && <div className="success-box">✅ {successMsg}</div>}

      <form className="auth-form" onSubmit={handleRegister}>
        <input name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
        <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required />

        {/* Password */}
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {form.password && (
          <div className={`strength strength-${strength}`}>
            Password strength: {getStrengthLabel()}
          </div>
        )}

        {/* Confirm Password */}
        <div className="password-field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button type="submit" className="auth-btn">Register</button>
      </form>

      <p>Already have an account? <a href="/login">Login</a></p>
    </motion.div>
  );
}

export default Register;
