import ListeTaches from "./modules/ListeTaches.js";

// Crée l’instance principale de la liste
const liste = new ListeTaches();

// Récupère les éléments du DOM
const inputTache = document.getElementById("input-tache");
const btnAjouter = document.getElementById("ajouter");

// Quand on clique sur "Ajouter"
btnAjouter.addEventListener("click", () => {
  liste.ajouter(inputTache.value); // ajoute la tâche
  inputTache.value = ""; // vide le champ
  inputTache.focus(); // remet le curseur dans l’input
});

// Permet d’ajouter une tâche en appuyant sur "Entrée"
inputTache.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    liste.ajouter(inputTache.value);
    inputTache.value = "";
  }
});
