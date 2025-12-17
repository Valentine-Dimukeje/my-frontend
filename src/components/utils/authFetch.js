const response = await fetch(`${API_BASE}/api/auth/register/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

const text = await response.text();

console.log("RAW RESPONSE:", text);

const data = JSON.parse(text);
