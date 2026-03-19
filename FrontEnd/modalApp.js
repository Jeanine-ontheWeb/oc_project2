//variables générales
let modal = null;
let lastFocusedElement = null;
let token = localStorage.getItem("token");
const deleteProject = document.querySelector(".deleteProject");
const addingProject = document.querySelector(".addingProject");
const submitButton = document.querySelector(".submitButton");

//Fetch des travaux et stockage
let worksModal = [];
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    worksModal = data;
    displayWorksModal(worksModal);
  });

//Fetch des catégories et stockage
let categoryModal = [];
fetch("http://localhost:5678/api/categories")
  .then((res) => res.json())
  .then((data) => {
    categoryModal = data;
    displayCategory(categoryModal);
  });

//gestion ouverture de la modale
const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  lastFocusedElement = e.target;
  modal = target;
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", true);
  modal.addEventListener("click", closeModal);
  modal.querySelector(".modalCloseBtn").addEventListener("click", closeModal);
  modal.querySelector(".modalCloseBtn").focus();
  modal
    .querySelector(".modalStopPropagation")
    .addEventListener("click", stopPropagation);
};

//gestion de fermeture de la modale
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", true);
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".modalCloseBtn")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".modalStopPropagation")
    .removeEventListener("click", stopPropagation);
  addingProject.classList.add("hiddenModal");
  deleteProject.classList.remove("hiddenModal");
  backButton.classList.add("hiddenModal");
  resetForm();
  modal = null;
  lastFocusedElement.focus();
};

//stop propagation
const stopPropagation = function (e) {
  e.stopPropagation();
};
document.querySelectorAll(".modalJs").forEach((a) => {
  a.addEventListener("click", openModal);
});

//gestion de l'affichage des travaux dans la modale
function displayWorksModal(array) {
  const modalArray = document.querySelector(".modalArray");
  modalArray.innerHTML = "";
  array.forEach((work) => {
    const modalFigure = document.createElement("figure");
    modalFigure.dataset.id = work.id;
    modalFigure.innerHTML = ` <img src="${work.imageUrl}" alt="${work.title}"> 
    <button class="deleteButton"><i class="fa-solid fa-trash-can"></i></button> `;
    modalArray.appendChild(modalFigure);
  });
  attachDeleteListeners();
}

//gestion de la fonction de suppression
function attachDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".deleteButton");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const figure = e.target.closest("figure");
      const id = figure.dataset.id;

      //fetch pour la fonction delete
      fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        refreshPage();
      });
      figure.remove();
      e.preventDefault();

      const galleryFigure = document.querySelector(`figure[data-id="${id}"]`);
      if (galleryFigure) galleryFigure.remove();
    });
  });
}

//gestion du changement de visuel dans la modale
const addingButton = document.querySelector(".photoAddButton");
const backButton = document.querySelector(".backArrow");

//changement de visuel vers l'ajout
addingButton.addEventListener("click", () => {
  deleteProject.classList.add("hiddenModal");
  addingProject.classList.remove("hiddenModal");
  backButton.classList.remove("hiddenModal");
});
//changement de visuel vers la suppression
backButton.addEventListener("click", () => {
  resetForm();
  deleteProject.classList.remove("hiddenModal");
  addingProject.classList.add("hiddenModal");
  backButton.classList.add("hiddenModal");
});

// afficher catégorie dans la liste déroulante depuis le fetch
function displayCategory(list) {
  const categoryInput = document.querySelector("#categoryInput");
  categoryInput.innerHTML = "";

  list.forEach((categoryOption) => {
    const option = document.createElement("option");
    option.value = categoryOption.id;
    option.textContent = categoryOption.name;
    categoryInput.appendChild(option);
  });
}
//variables
const photoInput = document.querySelector("#photoInput");
const previewImage = document.querySelector("#previewImage");
const icon = document.querySelector(".logoImage");
const button = document.querySelector(".inputButton");
const paragraph = document.querySelector(".paragraphInput");

button.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  photoInput.click();
});

// Message d'erreur
photoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
//verification du type autorisé
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    alert("Le fichier doit être un JPG ou PNG");
    photoInput.value = "";
    return;
  }
//verification de la taille
  const maxSize = 4 * 1024 * 1024;
  if (file.size > maxSize) {
    alert("L'image doit faire moins de 4 Mo");
    photoInput.value = "";
    return;
  }
//creation objet 
  const imageURL = URL.createObjectURL(file);
  previewImage.src = imageURL;

  previewImage.classList.remove("hiddenModal");
  icon.classList.add("hiddenModal");
  button.classList.add("hiddenModal");
  paragraph.classList.add("hiddenModal");
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.querySelector("#titleInput").value;
  const category = document.querySelector("#categoryInput").value;
  const file = photoInput.files[0];
//message d'erreur si tout les champs ne sont pas remplis
  if (!title || !category || !file) {
    alert("Merci de remplir tous les champs");
    return;
  }
//fetch avec méthode post pour envoyer un nouveau projet et mettre a jour la gallery sans rechargement
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", file);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  }).then(() => {
    refreshPage();
    resetForm();
  });
});

//fonction vidage du formulaire
function resetForm() {
  document.querySelector("#titleInput").value = "";
  document.querySelector("#categoryInput").value = "";
  photoInput.value = "";
  previewImage.src = "#";
  icon.classList.remove("hiddenModal");
  button.classList.remove("hiddenModal");
  paragraph.classList.remove("hiddenModal");
  previewImage.classList.add("hiddenModal");
}

//fonction qui évite le rechargement de la page & modale
function refreshPage() {
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      worksModal = data;
      displayWorks(data);
      displayWorksModal(data);
    });
}
