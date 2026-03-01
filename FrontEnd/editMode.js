//fetch récupération des travaux
let works = [];
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    works = data;
    displayWorks(works);
    console.log(works);
  });

function displayWorks(list) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  list.forEach((work) => {
    const figure = document.createElement("figure");
    figure.innerHTML = ` <img src="${work.imageUrl}" alt="${work.title}"> <h3>${work.title}</h3> `;
    gallery.appendChild(figure);
  });
}
