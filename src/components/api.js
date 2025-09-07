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

  // 🔄 Refresh if needed
  if (res.status === 401 && refresh) {
    const refreshRes = await fetch(`${BASE}/api/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      access = data.access;
      localStorage.setItem("access", access);

      res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
          Authorization: `Bearer ${access}`,
        },
      });
    } else {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
      throw new Error("Session expired. Please log in again.");
    }
  }

  return res;
}
