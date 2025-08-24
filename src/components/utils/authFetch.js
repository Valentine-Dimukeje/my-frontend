export async function authFetch(url, options = {}) {
  let access = localStorage.getItem("access");
  let refresh = localStorage.getItem("refresh");

  if (!options.headers) options.headers = {};
  options.headers["Authorization"] = `Bearer ${access}`;
  options.headers["Content-Type"] = "application/json";

  let res = await fetch(url, options);

  // If access token expired, try refresh
  if (res.status === 401 && refresh) {
    let refreshRes = await fetch("http://127.0.0.1:8000/api/auth/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (refreshRes.ok) {
      let data = await refreshRes.json();
      localStorage.setItem("access", data.access);
      options.headers["Authorization"] = `Bearer ${data.access}`;
      res = await fetch(url, options); // retry original request
    } else {
      // Refresh failed — log out
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
    }
  }

  return res;
}
