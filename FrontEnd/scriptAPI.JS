let works=[];
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    works = data;
    displayWorks(works);});

  fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    //Récupération des données de l'API et création des éléments HTML pour chaque projet
    data.forEach((id) => {
      const card = document.createElement("figure");
      card.innerHTML = `<img src="${id.imageUrl}" alt="${id.title}"><h3>${id.title}</h3>`;
      document.querySelector(".gallery").appendChild(card);
      console.log(data);
    });
  });
//création de la variable filtres pour cibler la section des filtres dans le HTML
const filtres = document.querySelector(".filtres");

fetch("http://localhost:5678/api/categories")
  .then((res) => res.json())
  .then((data) => {
    //Creation du bouton "Tous" pour afficher tous les projets
    const allCategories = document.createElement("button");
    allCategories.innerHTML = "Tous";
    filtres.appendChild(allCategories);

    data.forEach((id) => {
      //Création d'un bouton pour chaque catégorie récupérée de l'API
      const button = document.createElement("button");
      button.innerHTML = id.name;
      filtres.appendChild(button);
    });
  });

filtres.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const buttons = filtres.querySelectorAll("button");
    //Ajout de la classe "active" au bouton cliqué et suppression de cette classe pour les autres boutons
    buttons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    //ajout de la logique pour filtrer les projets en fonction du bouton cliqué


  }
});
