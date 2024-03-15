// Appel à l'API avec fetch afin de récupérer dynamiquement les projets
export async function recuperationProjets() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const projets = await reponse.json();
  return projets;
}
// Appel à l'API avec fetch afin de récupérer dynamiquement les catégories
export async function recuperationCategories() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  const categories = await reponse.json();
  return categories;
}