import Storage from "./Storage.js";
import Tache from "./Tache.js";

export default class ListeTaches {
  constructor() {
    this.taches = [];
    this.tacheEnEdition = null;
    this.container = document.getElementById("liste-taches");

    this.charger();
    this.afficher();
  }

  ajouter(text) {
    if (!text.trim()) return;

    const id = Date.now() + Math.floor(Math.random() * 1000);
    const tache = new Tache(id, text);

    this.taches.push(tache);
    this.sauvegarder();
    this.afficher();
  }

  supprimer(id) {
    this.taches = this.taches.filter((t) => t.id !== id);
    this.sauvegarder();
    this.afficher();
  }

  modifier(id, nouveauTexte) {
    const tache = this.taches.find((t) => t.id === id);
    if (!tache) return;

    tache.modifierTexte(nouveauTexte);
    this.tacheEnEdition = null;

    this.sauvegarder();
    this.afficher();
  }

  toggleTermine(id) {
    const tache = this.taches.find((t) => t.id === id);
    if (!tache) return;

    tache.toggle();
    this.sauvegarder();
    this.afficher();
  }

  afficher() {
    this.container.innerHTML = "";

    // Trier les tâches : non terminées d'abord, puis terminées
    const tachesTriees = [...this.taches].sort((a, b) => {
      if (a.termine === b.termine) return 0;
      return a.termine ? 1 : -1;
    });

    tachesTriees.forEach((tache) => {
      const div = document.createElement("div");
      div.className = "tache";

      // Checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = tache.termine;
      checkbox.onchange = () => this.toggleTermine(tache.id);
      div.appendChild(checkbox);

      // Mode édition
      if (this.tacheEnEdition === tache.id) {
        const input = document.createElement("input");
        input.className = "input-modif";
        input.type = "text";
        input.value = tache.text;

        const btnOk = document.createElement("button");
        btnOk.textContent = "OK";
        btnOk.className = "btn-ok";
        btnOk.onclick = () => this.modifier(tache.id, input.value);

        const btnAnnuler = document.createElement("button");
        btnAnnuler.textContent = "Annuler";
        btnAnnuler.className = "btn-annule";
        btnAnnuler.onclick = () => {
          this.tacheEnEdition = null;
          this.afficher();
        };

        div.append(input, btnOk, btnAnnuler);
      }
      // Mode affichage normal
      else {
        const span = document.createElement("span");
        span.textContent = tache.text;
        if (tache.termine) {
          span.style.textDecoration = "line-through";
          span.style.color = "gray";
        }

        const btnModifier = document.createElement("button");
        btnModifier.textContent = "Modifier";
        btnModifier.className = "actions-modif";
        btnModifier.onclick = () => {
          this.tacheEnEdition = tache.id;
          this.afficher();
        };

        const btnSupprimer = document.createElement("button");
        btnSupprimer.textContent = "Supprimer";
        btnSupprimer.className = "actions-supp";
        btnSupprimer.onclick = () => this.supprimer(tache.id);

        div.append(span, btnModifier, btnSupprimer);
      }

      this.container.appendChild(div);
    });
  }

  sauvegarder() {
    Storage.sauvegarder(this.taches);
  }

  charger() {
    const data = Storage.charger();
    this.taches = data.map((t) => new Tache(t.id, t.text, t.termine));
  }
}
