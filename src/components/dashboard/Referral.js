import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy } from 'lucide-react';
import axios from 'axios';
import '../styles/referral.css';

const referralLink = 'https://heritageinvestmentgp.com/ref/12345';

function Referral() {
  const [copied, setCopied] = useState(false);
  const [referredUsers, setReferredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const token = localStorage.getItem('token'); // Adjust as needed
        const res = await axios.get('https://api.heritageinvestmentgp.com/api/user/referrals', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReferredUsers(res.data.referrals || []);
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
          <input type="text" readOnly value={referralLink} />
          <button onClick={handleCopy}>
            <Copy size={18} /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="share-options">
          <button className="share-btn"><Share2 size={16} /> Share on WhatsApp</button>
          <button className="share-btn"><Share2 size={16} /> Share on Telegram</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h5>Total Referrals</h5>
          <p>{referredUsers.length}</p>
        </div>
        <div className="stat-card">
          <h5>Total Earnings</h5>
          <p>$ {referredUsers.reduce((sum, user) => sum + user.earnings, 0).toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h5>Active Referrals</h5>
          <p>{referredUsers.filter(user => user.status === 'Active').length}</p>
        </div>
      </div>

      <div className="program-details">
        <h4>How It Works</h4>
        <p>
          Share your referral link with friends. When they sign up and invest, you earn 5% commission on their deposits. The more you refer, the more you earn.
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
                  <td>$ {user.earnings?.toFixed(2) || '0.00'}</td>
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
