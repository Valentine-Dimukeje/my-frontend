// src/pages/ChangePassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await authFetch("http://127.0.0.1:8000/api/auth/change-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
    });

    if (res.ok) {
      alert("Password changed successfully! Please log in again.");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/login");
    } else {
      const err = await res.json();
      alert(err.detail || "Failed to change password");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Change Password</h2>
      <div>
        <label>Old Password:</label><br />
        <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
      </div>
      <div>
        <label>New Password:</label><br />
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
      </div>
      <button type="submit">Change Password</button>
    </form>
  );
}

export default ChangePassword;
