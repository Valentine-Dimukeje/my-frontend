const isLocalhost = window.location.hostname === "localhost";

export const API_BASE =
  process.env.REACT_APP_API_BASE ||
  (isLocalhost
    ? "http://127.0.0.1:8000"
    : "https://backend-osagie.up.railway.app");
