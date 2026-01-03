import ListeTaches from "./modules/ListeTaches.js";
import ThemeManager from "./modules/ThemeManager.js";

// Crée l’instance principale de la liste
const liste = new ListeTaches();

// Crée l'instance du gestionnaire de thèmes
const themeManager = new ThemeManager();

// Récupère les éléments du DOM
const inputTache = document.getElementById("input-tache");
const btnAjouter = document.getElementById("ajouter");
const btnTheme = document.getElementById("theme-button");

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

// Changement de thème
btnTheme.addEventListener("click", () => {
  themeManager.changerTheme();
});
