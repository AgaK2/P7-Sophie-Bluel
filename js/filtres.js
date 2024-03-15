import { affichageProjets } from "./projets.js";

// Fonction d'affichage du filtre
export function affichageFiltres(categories) {
  const parentFiltres = document.getElementById("filtre");

  // Boucle pour afficher les boutons de filtre avec la catégorie appropriée et id attribué
  for (const categorie of categories) {
    const p = document.createElement("p");
    p.textContent = categorie.name;
    p.dataset.category = categorie.id;
    parentFiltres.appendChild(p);
  }
}

// Fonction d'ajout d'un event listener sur l’événement de clic aux boutons
export function ajouterClickFiltres(projets) {
  const btnFiltres = document.getElementById("filtre");
  btnFiltres.addEventListener("click", (event) => {
    // Récupération de l'élément sur lequel on clique (le filtre)
    const element = event.target;

    // Recupération du category id sur l'élément
    const categoryId = element.dataset.category;

    // On filtre les projets en vérifiant que la categorie du filtre sur lequel on clique
    // correspond à l'id du projet
    if (categoryId === "0") {  // Filtre 'Tous'
      affichageProjets(projets);
    } else {
      const projetsFiltres = projets.filter((projet) => +projet.categoryId === +categoryId); //La méthode filter parcourt chaque élément du tableau projets 
                                                                                            //et vérifie la condition donnée dans la fonction flèche
      affichageProjets(projetsFiltres);
      console.log(projetsFiltres);
    }
  });
}