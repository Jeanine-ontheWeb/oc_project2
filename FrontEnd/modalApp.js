//gestion ouverture et fermeture de la modale
let modal = null;
let lastFocusedElement = null;
let token = localStorage.getItem("token");
const deleteProject = document.querySelector(".deleteProject");
const addingProject = document.querySelector(".addingProject");

let worksModal = [];
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    worksModal = data;
    displayWorksModal(worksModal);
  });

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  lastFocusedElement = e.target;
  modal = target;
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".modalCloseBtn").addEventListener("click", closeModal);
  modal.querySelector(".modalCloseBtn").focus();
  modal
    .querySelector(".modalStopPropagation")
    .addEventListener("click", stopPropagation);
};

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
  modal = null;
  lastFocusedElement.focus();
};

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
    attachDeleteListeners();
  });
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
      });
      figure.remove();
      preventDefault()
      const galleryFigure = document.querySelector(`figure[data-id="${id}"]`);
      if (galleryFigure) galleryFigure.remove();
      console.log(`Tu as supprimé l'article ${id}`);
    });
  });
}

//gestion du changement de visuel dans la modale
const addingButton = document.querySelector(".photoAddButton");
const backButton = document.querySelector(".backArrow");

addingButton.addEventListener("click", () => {
  deleteProject.classList.add("hiddenModal");
  addingProject.classList.remove("hiddenModal");
  backButton.classList.remove("hiddenModal");
});

backButton.addEventListener("click", () => {
  deleteProject.classList.remove("hiddenModal");
  addingProject.classList.add("hiddenModal");
  backButton.classList.add("hiddenModal");
});
