// src/pages/Transactions.jsx
import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch"; // we’ll use the helper we made


function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTransactions() {
      const res = await authFetch("http://127.0.0.1:8000/api/transactions/");
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      } else {
        alert("Failed to load transactions");
      }
      setLoading(false);
    }
    loadTransactions();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.id}</td>
                <td>{txn.type}</td>
                <td>${txn.amount}</td>
                <td>{txn.status}</td>
                <td>{new Date(txn.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Transactions;
