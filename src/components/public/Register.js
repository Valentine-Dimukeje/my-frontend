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
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [strength, setStrength] = useState(0);
  const { setLoading } = useLoader();
  const navigate = useNavigate();

  // 🔑 Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      setStrength(checkStrength(value));
    }
  };

  // 🔐 Password strength checker
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

  // 🚀 Submit register form
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
          username: form.email,
          email: form.email,
          password: form.password,
          first_name: form.full_name.split(" ")[0] || "",
          last_name: form.full_name.split(" ").slice(1).join(" ") || "",
          phone: form.phone || "",
          country: form.country || "",
        }),
      });

      if (!res.ok) {
        let err;
        try {
          err = await res.json();
        } catch {
          err = { message: "Server error. Please try again later." };
        }

        if (err.errors) {
          const fieldFriendlyNames = {
            email: "Email address",
            password: "Password",
            username: "Email address",
            first_name: "First name",
            last_name: "Last name",
            phone: "Phone number",
            country: "Country",
          };

          const friendlyMessages = Object.entries(err.errors)
            .map(([field, msgs]) => {
              const fieldName = fieldFriendlyNames[field] || field;
              return msgs
                .map((msg) => {
                  if (msg.includes("This field may not be blank")) {
                    return `${fieldName} is required.`;
                  }
                  if (msg.includes("already exists")) {
                    return `This ${fieldName.toLowerCase()} is already in use.`;
                  }
                  if (msg.includes("valid email")) {
                    return `Please enter a valid email address.`;
                  }
                  if (msg.includes("at least 8 characters")) {
                    return `Password must be at least 8 characters long.`;
                  }
                  if (msg.includes("too common")) {
                    return `Please choose a stronger password.`;
                  }
                  if (msg.includes("entirely numeric")) {
                    return `Password cannot be entirely numbers.`;
                  }
                  return `${fieldName}: ${msg}`;
                })
                .join(" ");
            })
            .join("\n");

          setErrorMsg(friendlyMessages);
        } else if (err.message) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg("Registration failed. Please check your details and try again.");
        }

        setLoading(false);
        return;
      }

      // ✅ Success
      const data = await res.json();
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setSuccessMsg("🎉 Account created successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Register error:", error);
      setErrorMsg("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>Create Your Account</h2>

      {errorMsg && (
        <div className="error-box">
          ❌ {errorMsg.split("\n").map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      )}

      {successMsg && (
        <div className="success-box">
          ✅ <p>{successMsg}</p>
        </div>
      )}

      <form className="auth-form" onSubmit={handleRegister}>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {form.password && (
          <div className={`strength strength-${strength}`}>
            Password strength: {getStrengthLabel()}
          </div>
        )}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="auth-btn">Register</button>
      </form>

      <p>Already have an account? <a href="/login">Login</a></p>
    </motion.div>
  );
}

export default Register;
