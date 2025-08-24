import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/Auth.css";
import { authFetch } from "../api";
import { useLoader } from "../dashboard/LoaderContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useLoader();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // show global loader

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) {
        setLoading(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      const meRes = await authFetch("http://127.0.0.1:8000/api/auth/me/");
      await meRes.json();

      // Redirect after small delay for smoothness
      setTimeout(() => {
        window.location.href = "/admin";
      }, 800);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // hide loader
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
      <p>Don't have an account? <a href="/register">Register</a></p>
    </motion.div>
  );
}

export default Login;
