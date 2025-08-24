import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import "../styles/profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const res = await authFetch("http://127.0.0.1:8000/api/auth/me/");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      } else {
        alert("Failed to load profile");
      }
    }
    fetchProfile();
  }, []);

  if (!profile) return <p className="loading-text">Loading profile...</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="profile-heading">Account Profile</h2>

        <div className="profile-info">
          <strong>Username:</strong> <span>{profile.username}</span>
        </div>
        <div className="profile-info">
          <strong>Email:</strong> <span>{profile.email}</span>
        </div>
        <div className="profile-info">
          <strong>Name:</strong> <span>{profile.first_name} {profile.last_name}</span>
        </div>

        <div className="wallet-section">
          <h3>Wallets</h3>
          <p><strong>Main Wallet:</strong> ${profile.profile.main_wallet}</p>
          <p><strong>Profit Wallet:</strong> ${profile.profile.profit_wallet}</p>
        </div>

        <div className="devices-section">
          <h3>Connected Devices</h3>
          {profile.devices.length === 0 ? (
            <p>No devices connected.</p>
          ) : (
            <ul>
              {profile.devices.map((d, index) => (
                <li key={index}>
                  {d.device_name} - {d.ip_address} <br />
                  <small>Last active: {new Date(d.last_active).toLocaleString()}</small>
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
