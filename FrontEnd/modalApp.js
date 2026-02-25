//gestion ouverture et fermeture de la modale
let modal = null;
let lastFocusedElement = null;

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
    modalFigure.innerHTML = ` <img src="${work.imageUrl}" alt="${work.title}"> <button><i class="fa-solid fa-trash-can"></i></button> `;
    modalArray.appendChild(modalFigure);
  });
}
