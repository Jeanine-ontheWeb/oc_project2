async function login(email, password) {
  const res = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  return res.json();
}
connection__form.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Empêche le rechargement
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  try {
    const data = await login(email, password);
    // On attend la réponse
    localStorage.setItem("token", data.token);
    console.log("authentification OK");
  } catch (error) {
    console.log("Erreur de connexion :", error);
  }
});

const token = localStorage.getItem("token");
fetch("http://localhost:5678/api/works", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(newWork),
});
