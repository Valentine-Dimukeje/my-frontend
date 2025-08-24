import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/Auth.css";
import { useLoader } from "../dashboard/LoaderContext";

function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    country: "",
  });

  const { setLoading } = useLoader();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.email,
          email: form.email,
          password: form.password,
          first_name: form.full_name.split(" ")[0] || "",
          last_name: form.full_name.split(" ")[1] || "",
          phone: form.phone,
          country: form.country, // just send what user typed
        }),
      });

      if (!res.ok) {
        setLoading(false);
        return;
      }

      // Auto login after register
      const loginRes = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.email,
          password: form.password,
        }),
      });

      if (!loginRes.ok) {
        setLoading(false);
        return;
      }

      const loginData = await loginRes.json();
      localStorage.setItem("access", loginData.access);
      localStorage.setItem("refresh", loginData.refresh);

      setTimeout(() => {
        window.location.href = "/admin";
      }, 800);

    } catch (error) {
      console.error(error);
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

        {/* User types phone + country manually */}
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

        <button type="submit" className="auth-btn">Register</button>
      </form>

      <p>Already have an account? <a href="/login">Login</a></p>
    </motion.div>
  );
}

export default Register;
