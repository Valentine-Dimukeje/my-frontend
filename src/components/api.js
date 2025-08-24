// src/api.js
const BASE = "http://127.0.0.1:8000";

export async function authFetch(path, options = {}) {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  let access = localStorage.getItem("access");
  let refresh = localStorage.getItem("refresh");

  const init = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(access ? { Authorization: `Bearer ${access}` } : {}),
    },
  };

  let res = await fetch(url, init);

  // 🔄 If token expired, try refresh
  if (res.status === 401 && refresh) {
    const refreshRes = await fetch(`${BASE}/api/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      access = data.access;

      // ✅ Save new access token
      localStorage.setItem("access", access);

      // Retry original request with new token
      const retryInit = {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
          Authorization: `Bearer ${access}`,
        },
      };

      res = await fetch(url, retryInit);
    } else {
      // ❌ Refresh also failed → logout
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
      throw new Error("Session expired. Please log in again.");
    }
  }

  return res;
}

// ✅ Fetch profile (wallet, username, email, etc.)
export async function getProfile() {
  const res = await authFetch("/api/auth/me/");
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

// ✅ Deposit money
export async function deposit(amount, method, tx_id) {
  const res = await authFetch("/api/deposit/", {
    method: "POST",
    body: JSON.stringify({ amount, method, tx_id }),
  });

  if (!res.ok) throw new Error("Deposit failed");
  return res.json();
}
