async function login(email, password) {
  const res = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  return res.json();
}

// Sélecteurs
const connectionForm = document.querySelector("#connectionForm");
const errorMessage = document.querySelector(".errorMessage");

connectionForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  // On cache le message d’erreur à chaque tentative
  errorMessage.style.display = "none";

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  try {
    const data = await login(email, password);

    // Stockage du token
    localStorage.setItem("token", data.token);
    window.location.href = "homepageEdit.html";
  } catch (error) {
    errorMessage.style.display = "flex";
  }
});
