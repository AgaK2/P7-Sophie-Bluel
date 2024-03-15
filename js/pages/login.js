document.getElementById("error").style.display = "none";
// Ajouter un event listener sur l’événement submit pour se connecter
const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Récupération e-mail et mot de passe
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
        "email": email,
        "password": password
    };
    // Conversion 'data' au format JSON pour être transmis dans le body de la requête
    const chargeUtile = JSON.stringify(data);
    // Appel de l'API pour verifier l'e-mail et le mot de passe
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    })
        .then((response) => response.json())
        .then((result) => {
            // Vérifier que le token existe bien (on est bien connecté)
            if (result.token !== undefined) {
                // Stockage du token dans le local storage (pour pouvoir réaliser les envois et suppressions des projets)
                window.localStorage.setItem("token", result.token);

                // Redirection vers la page d'accueil
                window.location.href = "/";
            } else {
                // Afficher une erreur sur la page
                document.getElementById("error").style.display = "flex";
            }
        });
});