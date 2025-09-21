import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy } from 'lucide-react';
import axios from 'axios';
import '../styles/referral.css';

function Referral() {
  const [copied, setCopied] = useState(false);
  const [referredUsers, setReferredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [referralLink, setReferralLink] = useState('');

  // Copy referral link
  const handleCopy = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn("⚠️ No token found in localStorage.");
          setLoading(false);
          return;
        }

        // 1️⃣ Fetch referrals
        const res = await axios.get(
          'https://api.heritageinvestmentgrup.com/api/user/referrals/', 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReferredUsers(res.data.referrals || []);

        // 2️⃣ Fetch user info to build referral link
        const meRes = await axios.get(
          'https://api.heritageinvestmentgrup.com/api/auth/me/', 
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (meRes.data && meRes.data.username) {
          setReferralLink(`https://heritageinvestmentgrup.com/ref/${meRes.data.username}`);
        }

      } catch (err) {
        console.error('Error fetching referrals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  return (
    <motion.div className="referral-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="page-title">Referral Program</h2>

      <div className="referral-box">
        <h4>Your Referral Link</h4>
        <div className="link-group">
          <input type="text" readOnly value={referralLink || 'Loading...'} />
          <button onClick={handleCopy} disabled={!referralLink}>
            <Copy size={18} /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="share-options">
          <button
            className="share-btn"
            onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(referralLink)}`, '_blank')}
            disabled={!referralLink}
          >
            <Share2 size={16} /> Share on WhatsApp
          </button>
          <button
            className="share-btn"
            onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}`, '_blank')}
            disabled={!referralLink}
          >
            <Share2 size={16} /> Share on Telegram
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h5>Total Referrals</h5>
          <p>{referredUsers.length}</p>
        </div>
        <div className="stat-card">
          <h5>Total Earnings</h5>
          <p>$ {referredUsers.reduce((sum, user) => sum + Number(user.earnings || 0), 0).toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h5>Active Referrals</h5>
          <p>{referredUsers.filter(user => user.status === 'Active').length}</p>
        </div>
      </div>

      <div className="program-details">
        <h4>How It Works</h4>
        <p>
          Share your referral link with friends. When they sign up and invest, you earn 5% commission on their deposits. 
          The more you refer, the more you earn.
        </p>
      </div>

      <div className="table-section referred-users">
        <h4>Referred Users</h4>
        {loading ? (
          <p>Loading referrals...</p>
        ) : referredUsers.length === 0 ? (
          <p>No users referred yet.</p>
        ) : (
          <table className="referral-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Earnings</th>
              </tr>
            </thead>
            <tbody>
              {referredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.joined}</td>
                  <td className={user.status === 'Active' ? 'status-active' : 'status-pending'}>
                    {user.status}
                  </td>
                  <td>$ {Number(user.earnings || 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}

export default Referral;
