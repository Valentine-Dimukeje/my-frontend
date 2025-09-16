import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/Auth.css";
import { authFetch } from "../utils/authFetch";
import { useLoader } from "../dashboard/LoaderContext";

function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    country: "",
  });
  const [errorMsg, setErrorMsg] = useState(null); // 👈 error state
  const { setLoading } = useLoader();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await authFetch("/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        const err = await res.json().catch(() => ({}));
        console.error("Registration failed:", res.status, err);

        // 👇 Convert Django errors → user-friendly text
        if (err.errors) {
          const labelMap = {
            email: "Email",
            password: "Password",
            username: "Username",
            first_name: "First name",
            last_name: "Last name",
            phone: "Phone number",
            country: "Country",
          };

          const messages = Object.entries(err.errors)
            .map(([field, msgs]) => {
              const fieldName = labelMap[field] || field;
              return `${fieldName}: ${msgs.join(", ")}`;
            })
            .join("\n");

          setErrorMsg(messages);
        } else if (err.message) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg("Registration failed. Please check your details.");
        }

        setLoading(false);
        return;
      }

      const data = await res.json();

      // ✅ store tokens
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // ✅ redirect
      window.location.href = "/dashboard";
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

        {/* 👇 show readable error messages */}
        {errorMsg && <p className="error-text">❌ {errorMsg}</p>}

        <button type="submit" className="auth-btn">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </motion.div>
  );
}

export default Register;
