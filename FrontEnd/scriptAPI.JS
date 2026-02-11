fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((id) => {
      const card = document.createElement("figure");
      card.textContent = id.title;
      card.innerHTML = `<img src="${id.imageUrl}" alt="${id.title}">`;
      document.querySelector(".gallery").appendChild(card);
      console.log(data);
    });
  });
