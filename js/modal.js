import { count } from "./pages/index.js";

const token = window.localStorage.getItem("token");
const parentProjetModal = document.getElementById("galerie-modal");
const newPhotoTitle = document.getElementById("title");
const inputCategorie = document.getElementById("categories");
const newImage = document.getElementById("new-image");
parentProjetModal.classList.add("galerie-modal");


// Fonction d'ouverture de fenêtre modale
export async function displayModal(projets) {
  document.getElementById("modal-1").style.display = "flex";
  document.getElementById("background-modal").style.display = "flex";

  // Afficher la galerie dans la modale
  // Vider l'element parent avant d'ajouter des éléments (pour éviter une éventuelle duplication du contenu)
  parentProjetModal.textContent = "";
  // Boucle pour créer des éléments de galerie modale
  for (const projet of projets) {
    const figure = document.createElement("figure");
    figure.classList.add("position-figure-modal");
    // Ajouter un identifiant à chaque projet
    figure.dataset.id = projet.id;
    const image = document.createElement("img");
    image.setAttribute("src", projet.imageUrl);
    image.classList.add("galerie-modal.img");

    // Créer une corbeille sur chaque projet
    const corbeille = document.createElement("div");
    corbeille.classList.add("corbeille-boite");
    const corbeilleIcon = document.createElement("i");
    corbeilleIcon.classList.add("fa-solid", "fa-trash-can", "fa-xs", "corbeille-icon");

    // Gestion du click sur la corbeille pour suppression
    corbeille.addEventListener("click", () => {
      const closest = corbeille.closest("figure");
      const dataId = closest.dataset.id;
      //Appel API via fetch pour supprimer des projets
      fetch(`http://localhost:5678/api/works/${dataId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Transmettre token au serveur pour l'authentification
        },
      }).then(() => {
        // Suppression de l'élément dans le DOM (dans la page)
        suppressionProjet(closest, dataId);
        // Suppression de l'élément dans le tableau des données
        projets = projets.filter((projet) => +projet.id !== +dataId);
      });
    });

    parentProjetModal.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(corbeille);
    corbeille.appendChild(corbeilleIcon);
  }
}


// Fonction de suppression de projet
function suppressionProjet(closest, dataId) {
  // Suppression de l'élément dans la modale
  closest.remove();
  // Suppression de l'élément en arrière plan dans le DOM
  const gallery = document.querySelector(".gallery");
  const elementASupprime = gallery.querySelector(`[data-id="${dataId}"]`);
  elementASupprime.remove();
}


// Afficher une nouvelle photo après son chargement dans le formulaire
const fileInput = document.querySelector("input[type=file]");
fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  newImage.src = URL.createObjectURL(file);
  document.getElementById("new-image").style.display = "block";
  document.querySelector(".elements-espace-ajouter").style.display = "none";

  if (closeModal(file)) {
    newImage.src = URL.revokeObjectURL(file); // Libérer des ressources après la fermeture de la modale
  }
}
);


// Fonction de fermeture de fenêtre modale
function closeModal() {
  const fermetureModal = document.querySelectorAll(".ferme-x-modal, .background-modal");
  fermetureModal.forEach((fermeture) => {
    fermeture.addEventListener("click", () => {
      document.getElementById("modal-1").style.display = "none";
      document.getElementById("background-modal").style.display = "none";
      document.getElementById("modal-2").style.display = "none";
      // Réinitialiser le formulaire
      document.getElementById("new-image").style.display = "none";
      document.querySelector(".elements-espace-ajouter").style.display = "block";
      newPhotoTitle.value = "";
      inputCategorie.value = "";
      newImage.src = "";
      inputPhoto.value = "";
      submitBouton.disabled = true;
      submitBouton.classList.remove("active-bouton");
    });
  });
}

// Fonction d'ouverture d'une modale2 (gestion du click)
function affichageModal2() {
  const btnAjouter = document.getElementById("btn_ajouter");
  btnAjouter.addEventListener("click", () => {
    document.getElementById("modal-1").style.display = "none";
    document.getElementById("modal-2").style.display = "flex";
  });

  // Revenir à la modale précédent
  const arrowLeft = document.getElementById("arrow-left");
  arrowLeft.addEventListener("click", () => {
    document.getElementById("modal-2").style.display = "none";
    document.getElementById("modal-1").style.display = "flex";
  });
}
//_______________________________________________________________________________________
// Sélection d'une catégorie pour le projet ajouté
function ajoutCategoriesModal(categories) {
  // Ajout de la première option vide
  const option = document.createElement("option");
  option.setAttribute("value", "");
  inputCategorie.appendChild(option);

  // Ajout des autres options
  for (const categorie of categories) {
    const option = document.createElement("option");
    option.textContent = categorie.name;
    option.dataset.id = categorie.id;
    inputCategorie.appendChild(option);
  }
}

const inputPhoto = document.getElementById("input-photo");
const submitBouton = document.querySelector(".btn-valider");

inputPhoto.addEventListener("change", validationForm);
newPhotoTitle.addEventListener("input", validationForm);
inputCategorie.addEventListener("change", validationForm);

// Activation du bouton valider après avoir rempli tous les champs du formulaire
function validationForm() {
  if (inputPhoto.value !== "" && newPhotoTitle.value !== "" && inputCategorie.value !== "") {
    submitBouton.disabled = false;
    submitBouton.classList.add("active-bouton");
  } else {
    submitBouton.disabled = true;
    submitBouton.classList.remove("active-bouton");
  }
}

const parentProjet = document.querySelector(".gallery");

// Formulaire d'envoi de nouveaux projets
function envoyerNouveauProjet() {
  const token = window.localStorage.getItem("token");
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProjet = new FormData();
    newProjet.append("image", inputPhoto.files[0]);
    newProjet.append("title", newPhotoTitle.value);
    newProjet.append("category", +inputCategorie.options[inputCategorie.selectedIndex].dataset.id); // Changer une chaîne de caractères en nombre

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newProjet,
    })
      .then((res) => res.json())
      .then((projet) => {
        ajouteImageModal(projet);

        // Afficher le nouveau projet dans la structure DOM
        const newFigure = document.createElement("figure");
        newFigure.classList.add("gallery.img");
        newFigure.dataset.id = projet.id;

        const newPhoto = document.createElement("img");
        newPhoto.src = projet.imageUrl;

        const newName = document.createElement("figcaption");
        newName.classList.add("projet_title");
        newName.innerText = newPhotoTitle.value;

        parentProjet.appendChild(newFigure);
        newFigure.appendChild(newPhoto);
        newFigure.appendChild(newName);
      });
  });
}

// Fonction d'affichage d'un nouveau projet dans la galerie modale
function ajouteImageModal(projet) {
  // Afficher le nouveau projet dans la modale
  const figure = document.createElement("figure");
  figure.classList.add("position-figure-modal");
  // Ajouter un identifiant
  figure.dataset.id = projet.id;

  const image = document.createElement("img");
  image.setAttribute("src", projet.imageUrl);
  image.classList.add("galerie-modal.img");
  image.src = projet.imageUrl;

  // Créer une corbeille
  const corbeille = document.createElement("div");
  corbeille.classList.add("corbeille-boite");
  const corbeilleIcon = document.createElement("i");
  corbeilleIcon.classList.add("fa-solid", "fa-trash-can", "fa-xs", "corbeille-icon");

  figure.appendChild(image);
  figure.appendChild(corbeille);
  corbeille.appendChild(corbeilleIcon);
  parentProjetModal.appendChild(figure);
}

export function initModal(projets, categories) {
  // Uniquement à la première ouverture
  if (count === 0) {
    ajoutCategoriesModal(categories);
    closeModal();
    affichageModal2();
    envoyerNouveauProjet();
  }

  displayModal(projets);
}
