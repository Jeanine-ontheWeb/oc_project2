fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((id) => {
      const card = document.createElement("figure");
      card.innerHTML = `<img src="${id.imageUrl}" alt="${id.title}"><h3>${id.title}</h3>`;
      document.querySelector(".gallery").appendChild(card);
      console.log(data);
    });
  });


  const filtres = document.querySelector(".filtres");

fetch("http://localhost:5678/api/categories")
.then((res) => res.json()) 
.then((data) => { 
  const allCategories = document.createElement ("button");
  allCategories.innerHTML = "Tous";
  filtres.appendChild(allCategories);

  data.forEach((id) => { 
  const button = document.createElement("button"); 
  button.innerHTML = id.name; 
filtres.appendChild(button); 
 }); });
