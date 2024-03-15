// Fonction d'affichage des projets (récupérés via API)
export function affichageProjets(projets) {
  const parentProjet = document.querySelector(".gallery");
  parentProjet.classList.add("gallery");

  // Vider l'element parent avant d'ajouter des éléments (pour éviter une éventuelle duplication du contenu)
  parentProjet.textContent = "";

  // Boucle pour créer des éléments de galerie DOM
  for (const projet of projets) {
    const figure = document.createElement("figure");
    figure.classList.add("gallery.img");
    figure.dataset.id = projet.id;

    const image = document.createElement("img");
    image.setAttribute("src", projet.imageUrl);

    const name = document.createElement("figcaption");
    name.classList.add("projet_title");
    name.innerText = projet.title;

    parentProjet.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(name);

    console.log(projet);
  }
}