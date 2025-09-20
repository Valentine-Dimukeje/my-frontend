import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import "../styles/profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await authFetch("http://127.0.0.1:8000/api/auth/me/");
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          alert("Failed to load profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
    fetchProfile();
  }, []);

  if (!profile) return <p className="loading-text">Loading profile...</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="profile-heading">Account Profile</h2>

        {/* Basic Info */}
        <div className="profile-info">
          <strong>Username:</strong> <span>{profile.username}</span>
        </div>
        <div className="profile-info">
          <strong>Email:</strong> <span>{profile.email}</span>
        </div>
        <div className="profile-info">
          <strong>Name:</strong>{" "}
          <span>
            {profile.first_name} {profile.last_name}
          </span>
        </div>
        <div className="profile-info">
          <strong>Phone:</strong> <span>{profile.phone || "N/A"}</span>
        </div>
        <div className="profile-info">
          <strong>Country:</strong>{" "}
          <span>
            {profile.country || "N/A"} {profile.flag || ""}
          </span>
        </div>

        {/* Wallets */}
        <div className="wallet-section">
          <h3>Wallets</h3>
          <p>
            <strong>Main Wallet:</strong> ${profile.main_wallet ?? "0.00"}
          </p>
          <p>
            <strong>Profit Wallet:</strong> ${profile.profit_wallet ?? "0.00"}
          </p>
          <p>
            <strong>Total Balance:</strong> ${profile.wallet_balance ?? "0.00"}
          </p>
        </div>

        {/* Notifications */}
        <div className="notifications-section">
          <h3>Notifications</h3>
          <p>Email: {profile.notifications?.email ? "✅ On" : "❌ Off"}</p>
          <p>SMS: {profile.notifications?.sms ? "✅ On" : "❌ Off"}</p>
          <p>System: {profile.notifications?.system ? "✅ On" : "❌ Off"}</p>
        </div>

        {/* Devices */}
        <div className="devices-section">
          <h3>Connected Devices</h3>
          {!profile.devices || profile.devices.length === 0 ? (
            <p>No devices connected.</p>
          ) : (
            <ul>
              {profile.devices.map((d, index) => (
                <li key={index}>
                  {d.device_name} - {d.ip_address} <br />
                  <small>
                    Last active: {new Date(d.last_active).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
