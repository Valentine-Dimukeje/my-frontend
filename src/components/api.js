import { API_BASE } from "./config";

/**
 * authFetch wraps fetch with JWT + credentials support.
 * Automatically retries with refresh token if access expired.
 */
export async function authFetch(path, options = {}) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;

  let access = localStorage.getItem("access");
  let refresh = localStorage.getItem("refresh");

  const init = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(access ? { Authorization: `Bearer ${access}` } : {}),
    },
    credentials: "include",
  };

  let res = await fetch(url, init);

  if (res.status === 401 && refresh) {
    const refreshRes = await fetch(`${API_BASE}/api/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
      credentials: "include",
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      access = data.access;
      localStorage.setItem("access", access);

      const retryInit = {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
          Authorization: `Bearer ${access}`,
        },
        credentials: "include",
      };

      res = await fetch(url, retryInit);
    } else {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
      throw new Error("Session expired. Please log in again.");
    }
  }

  return res;
}
