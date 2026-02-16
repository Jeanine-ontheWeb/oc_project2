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
    console.log("Connexion réussie :", data);
  } catch (error) {
    console.log("Erreur de connexion :", error);
  }
});
