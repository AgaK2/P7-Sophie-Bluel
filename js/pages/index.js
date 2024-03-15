import { recuperationProjets, recuperationCategories } from "../api.js";
import { affichageFiltres, ajouterClickFiltres } from "../filtres.js";
import { affichageProjets } from "../projets.js";
import { initModal } from "../modal.js";
export let count = 0;

const projets = await recuperationProjets();
const categories = await recuperationCategories();
const modifier = document.getElementById("modifier");

modifier.addEventListener("click", async (e) => {
  const newProjects = await recuperationProjets();
  initModal(newProjects, categories);
  count++;
});

const token = window.localStorage.getItem("token");

if (token !== null) {
  console.log("connecte");

  // Afficher l'interface du site si connecte
  document.getElementById("bar-noir").style.display = "flex";
  document.getElementById("modifier").style.display = "flex";
  document.getElementById("filtre").style.display = "none";
  document.getElementById("login").innerText = "logout";

  //Effacer le token de localStorage
  const clearToken = document.getElementById("login");
  clearToken.addEventListener("click", () => {
    window.localStorage.removeItem("token");
  });
} else {
  console.log("Pas connecte");
  // Afficher l'interface du site si pas connecte
}

affichageFiltres(categories);
affichageProjets(projets);
ajouterClickFiltres(projets);