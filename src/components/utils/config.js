// src/config.js
const isLocalhost = window.location.hostname === "localhost";

export const API_BASE = isLocalhost
  ? "http://127.0.0.1:8000" // Django local dev server
  : "https://api.heritageinvestmentgrup.com"; // Django on Railway
