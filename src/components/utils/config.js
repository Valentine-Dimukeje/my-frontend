const isLocalhost = window.location.hostname === "localhost";

// Priority: if you set REACT_APP_API_BASE in Render → use that
// Otherwise, fallback to localhost or production API
export const API_BASE =
  process.env.REACT_APP_API_BASE ||
  (isLocalhost
    ? "http://127.0.0.1:8000" // Django local dev server
    : "https://api.heritageinvestmentgrup.com"); // Django on Railway
