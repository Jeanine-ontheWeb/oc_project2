//ajout de la variable works pour stocker les données récupérées de l'API
let works = [];
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    works = data;
    displayWorks(works);
    console.log(works);
  });
let category = [];
fetch("http://localhost:5678/api/categories")
  .then((res) => res.json())
  .then((data) => {
    category = data;
    displayCategory(category);
    console.log(category);
  });

//Affichages des projets sur le site
function displayWorks(list) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  list.forEach((work) => {
    const figure = document.createElement("figure");
    figure.innerHTML = ` <img src="${work.imageUrl}" alt="${work.title}"> <h3>${work.title}</h3> `;
    gallery.appendChild(figure);
  });
}

//création de la variable filtres pour cibler la section des filtres dans le HTML
const filtres = document.querySelector(".filtres");

//Creation du bouton "Tous" pour afficher tous les projets et les boutons filtres
const allCategories = document.createElement("button");
allCategories.innerHTML = "Tous";
allCategories.dataset.id = 0;
filtres.appendChild(allCategories);

function displayCategory(categories) {
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat.name;
    btn.dataset.id = cat.id;
    filtres.appendChild(btn);
  });
}

filtres.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const buttons = filtres.querySelectorAll("button");
    //Ajout de la classe "active" au bouton cliqué et suppression de cette classe pour les autres boutons
    buttons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    //ajout de la logique pour filtrer les projets en fonction du bouton cliqué
    const filterId = Number(e.target.dataset.id);
    if (filterId === 0) {
      displayWorks(works);
    } else {
      const filtered = works.filter((work) => work.categoryId === filterId);
      displayWorks(filtered);
      console.log("filterId=", filterId);
    }
  }
});
